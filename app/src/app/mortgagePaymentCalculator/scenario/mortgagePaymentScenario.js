(function($,jQuery){
brCalc.controller('mortgagePaymentScenarioCtrl', function($scope,scenarios,$attrs,$filter,contentManager) {
	var me = this,
		scenario = $scope.mpc.mortgagePaymentData.getScenario($attrs.scenarioIndex),
		content = $scope.mpc.content,

		paymentFrequencyGlobals = contentManager.getConfig('globals.paymentFrequency'),

		specs = $scope.config.fieldspecs.mortgagePayment,
		paymentFrequencyOptions = specs.paymentFrequency.options,
		extraPaymentFrequencyOptions = specs.extraPaymentFrequency.options,
		productAndTypeOptions = specs.productAndType.options;

	this.data = scenario.data;

	this.data.scenarioIndex = $attrs.scenarioIndex;
	this.results = scenario.results;
	this.validation = scenario.validation;

	initChartMPC();

	initValidation();

	$scope.$watchCollection("sce.data",startCalculate,true);
	
	$scope.toggleExtraPayments = function(){
		me.data.showExtra = !(me.data.showExtra===true);
	};

	// Is this used somewhere?/////
	// me.getCurrent = function(){
	// 	return scenario.results.current;
	// };
	///////////////////////////////
	
	// Set custom validation
	function initValidation () {
		if (me.validation===undefined) return;

		var matchPaymentFrequencyValidation = {
			name:'matchPaymentFrequency',
			validate:function(value,validationObject){

				validationObject.matchingValue = validationObject.matchingValue || 'paymentFrequency';

				if (validationObject.matchingValue === 'paymentFrequency') {
					if (value === 'annual' || value === 'oneTime') return true;

					this.correctedValue = me.data.paymentFrequency;
					return me.data.paymentFrequency === value;
				}
				else if (validationObject.matchingValue === 'extraPaymentFrequency') {
					if (me.data.extraPaymentFrequency === 'annual' || me.data.extraPaymentFrequency === 'oneTime') return true;

					this.correctedValue = me.data.extraPaymentFrequency;
					return me.data.extraPaymentFrequency === value;
				}
			},
			message:'{{ content.errors.mortgage_matchPaymentFrequency }}',
			priority:1
		};

		// B11 part 3
		me.validation.extraPaymentAmount.addRule({
			name: 'prePaymentIncreaseOver20Percent',
			validate: function (value, validationObject) {
				if (me.data.extraPaymentFrequency !== 'annual') {
					if (value > me.results.current.mortgagePayment * 0.2) {
						this.correctedValue = me.results.current.mortgagePayment * 0.2;
						return false;
					}
				}
				return true;
			},
			message: content.errorMessages.prePaymentIncreaseOver20Percent,
			priority: 1
		});
		me.validation.mortgageAmount.addRule({
			name: 'mortgagePaymentTooLowForPrePayment',
			validate: function (value, validationObject) {
				var annuityFactor = getAnnuityFactor(me.data),
				// getMortgagePayment( data, results ) -> fake/calculate minimal data & results because actual results haven't been updated yet.
					paymentAmount = getMortgagePayment({mortgageAmount:value},{annuityFactor:annuityFactor});

				if (me.data.extraPaymentFrequency !== 'annual') {
					if (me.data.extraPaymentAmount > paymentAmount * 0.2) {
						this.correctedValue = getMortgageAmountFromPayment({mortgagePayment: me.data.extraPaymentAmount / 0.2, annuityFactor:annuityFactor});
						return false;
					}
				}
				return true;
			},
			message: content.errorMessages.mortgagePaymentTooLowForPrePayment,
			priority: 1
		});

		// B11 part 2
		me.validation.extraPaymentAmount.addRule({
			name:'annualPrePaymentOver20Percent',
			validate: function (value, validationObject) {

				var annualPrincipalPrepayment = getAnnualPrincipalPrepayment(value),
					paymentFrequencyNumber;

				if (annualPrincipalPrepayment > me.data.mortgageAmount * 0.2) {
					annualPrincipalPrepayment = me.data.mortgageAmount * 0.2;
					paymentFrequencyNumber = getPaymentFrequencyDetails(extraPaymentFrequencyOptions, me.data.extraPaymentFrequency).frequencyNumber_365;
					
					this.correctedValue = annualPrincipalPrepayment/paymentFrequencyNumber;

					return false;
				}
				return true;
			},
			message: content.errorMessages.annualPrePaymentOver20Percent,
			priority:1
		});
		me.validation.mortgageAmount.addRule({
			name:'mortgageAmountTooLowForAnnualPrePayment',
			validate: function (value, validationObject) {

				var annualPrincipalPrepayment = getAnnualPrincipalPrepayment(me.data.extraPaymentAmount);

				if (annualPrincipalPrepayment > value * 0.2) {
					this.correctedValue = annualPrincipalPrepayment / 0.2;
					return false;
				}
				return true;
			},
			message: content.errorMessages.mortgageAmountTooLowForAnnualPrePayment,
			priority:1
		});
		// B11 part 1
		me.validation.extraPaymentFrequency.set('matchingValue','paymentFrequency').addRule(matchPaymentFrequencyValidation);
		me.validation.paymentFrequency.set('matchingValue','extraPaymentFrequency').addRule(matchPaymentFrequencyValidation);

	}

	function startCalculate(newData,oldData,scope){

		var changedDataName = getChangedPropertyName(oldData,newData);
		
		if (changedDataName==='productAndType') {
			// update interestRate field
			// TODO: Update this to match Meridian Rates.getAll();
			// 	waiting on Meridian to give us the associated rates
			me.data.interestRate = getSelectOption(productAndTypeOptions,stringToNumber(me.data.productAndType)).defaultInterestRate;
		}

		else if (changedDataName==='paymentFrequency') {
			// update interestRate field
			// TODO: Update this to match Meridian Rates.getAll();
			// 	waiting on Meridian to give us the associated rates
			me.validation.extraPaymentFrequency.set('matchingValue',newData.paymentFrequency);
		}

		// Do NOT invalidate fields the user is not currently working on.
		// Instead, create rules on the current field which invalidates the out-of-focus field, and create the error there instead.
		// scenario.validate();

		calculate();
	}

	// C17 - OPTIONAL extraPaymentAmount
	function getAnnualPrincipalPrepayment (extraPaymentAmount) {
		var paymentFrequencyNumber = getPaymentFrequencyDetails(extraPaymentFrequencyOptions, me.data.extraPaymentFrequency).frequencyNumber_365;
		return (extraPaymentAmount || me.data.extraPaymentAmount) * paymentFrequencyNumber;
	}

	function getPaymentFrequencyDetails (options,paymentFrequency) {
		return getSelectOption(options, paymentFrequency);
	}
	
	function calculate(p){
		// console.log('calculate');
		var results = {},
			data = me.data;

		results.productAndTypeYears = getSelectOption(productAndTypeOptions,stringToNumber(data.productAndType)).termYears;

		//=SI(B6="Monthly";12;(SI(B6="Semi Monthly";24;SI(B6="Bi-Weekly";365/14;SI(B6="Weekly";365/7;SI(B6="Accel BiWeekly";365/14;SI(B6="Accel Weekly";365/7)))))))
		
		results.paymentFrequency = p !== undefined ? p : getPaymentFrequencyDetails(paymentFrequencyOptions, data.paymentFrequency);

		results.paymentFrequencyLabel = results.paymentFrequency.label;
		results.extraPaymentFrequencyLabel = getSelectOption(extraPaymentFrequencyOptions,data.extraPaymentFrequency).label;

		results.oneTimePrepayment = data.extraPaymentFrequency === paymentFrequencyGlobals.ONE_TIME ? data.extraPaymentAmount : 0;
		results.annualPrepayment = data.extraPaymentFrequency === paymentFrequencyGlobals.ANNUAL ? data.extraPaymentAmount : 0;
		results.increasePaymentBy = data.extraPaymentFrequency !== paymentFrequencyGlobals.ONE_TIME && data.extraPaymentFrequency !== paymentFrequencyGlobals.ANNUAL ? data.extraPaymentAmount : 0;

		//=((1-((1+(B5/2))^(2/(365/7)) )^(-(365/7)*B4))/((1+(B5/2))^(2/(365/7)) -1))
		//=((1-(opp1^opp2)^(-(results.paymentFrequencyNumber)*data.amortization))/(opp1^opp2 -1))
		
		results.annuityFactor = getAnnuityFactor(data, results.paymentFrequency);

		// B22 - hard coded in Excel
		results.paymentTopUps = false;
		// B23 - hard coded in Excel
		results.paymentTopUpsAmount = 0;

		results.includePromotion = false;//?who set that?
		results.promotionInterestRate = 0.02;//?who set that?
		results.promotionExtraPayment = 0;//?who set that?

		results.mortgagePayment = getMortgagePayment(data,results);

		results.numberOfPaymentTerms = results.productAndTypeYears * results.paymentFrequency.frequencyNumber_365 ;

		results.monthlyMortgagePayment = results.mortgagePayment * results.paymentFrequency.frequencyNumber_365 / 12;
		
		//=((1+(B5/2))^(2/(C6))-1)
		results.paymentInterestRate = Math.pow(1+(data.interestRate/2),2/results.paymentFrequency.frequencyNumber_365)-1;

		results.paymentList = [];
		results.annualPaymentList = [];
		results.termPaymentList = [];

		results.amortizationInterest = 0;
		results.amortizationPrincipal = 0;
		results.amortizationInterestAndPrincipal = 0;
			
		results.termInterest = 0;
		results.termPrincipal = 0;
		results.termInterestAndPrincipal = 0;
		results.balanceAtEndOfTerm = 0;
			
		var balanceLeft = data.mortgageAmount,
			maxItt = 11111,
			count = 1,
			obj,
			yearObj,
			prevObj,
			termCompleted = false;

		while(maxItt !== 0 && balanceLeft > 0){
			maxItt--;

			obj = {};
			results.paymentList.push(obj);

			obj.term = count;
			obj.year = parseInt((obj.term-1)/results.paymentFrequency.frequencyNumber_365,10);
			obj.interestRate = results.paymentInterestRate;
			//=SI(M3<J3;M3+K4;J3)
			if(prevObj){
				obj.interest = prevObj.balance < 0 ? 0 : prevObj.balance * obj.interestRate;

				obj.payment = prevObj.balance < prevObj.payment ? prevObj.balance + obj.interest : prevObj.payment;
				
			}else{
				obj.payment = results.mortgagePayment;
				obj.interest = data.mortgageAmount * obj.interestRate;
			}
			obj.principal = obj.payment - obj.interest;
			
			//=B10+SI(Z2="Yes";Z4;0)
			
			//=SI(F3=1;0;SI(C$9=1;SI(G4-G3>0;B$10;0);SI(C$9=2;0;B$10)))

			if(!prevObj){
				if(results.includePromotion){
					obj.extraPayment += results.promotionExtraPayment;
				}
				obj.extraPayment = data.extraPaymentAmount;
			}else if(obj.paidOff){
				obj.extraPayment = 0;
			}else{
				if(data.extraPaymentFrequency === paymentFrequencyGlobals.ANNUAL){
					if(obj.year > prevObj.year){
						obj.extraPayment = data.extraPaymentAmount;
					}else{
						obj.extraPayment = 0;
					}
					
				}else if(data.extraPaymentFrequency === paymentFrequencyGlobals.ONE_TIME){

					obj.extraPayment = 0;
				}else{
					obj.extraPayment = data.extraPaymentAmount;
				}
			}
			

			balanceLeft = obj.balance = balanceLeft - obj.principal - obj.extraPayment;

			obj.termCompleted = obj.term >= results.numberOfPaymentTerms;
			obj.paidOff = obj.balance === 0;

			
			results.amortizationInterest += obj.interest;
			/* ERROR - the following is a little bit off */
			results.amortizationPrincipal += obj.principal;
			results.amortizationInterestAndPrincipal = results.amortizationInterest + results.amortizationPrincipal;
			
			if(!obj.termCompleted){
				results.termInterest = results.amortizationInterest ;
				results.termPrincipal = results.amortizationPrincipal ;
				results.termInterestAndPrincipal = results.termInterest + results.termPrincipal;
				results.balanceAtEndOfTerm = obj.balance;
			}

			/* year obj */
			if(prevObj){
				if(prevObj.year !== obj.year){
					yearObj = $.extend(true,{},obj);
					results.annualPaymentList.push(yearObj);
					if(!obj.termCompleted){
						results.termPaymentList.push(yearObj);
					}
				}else{
					yearObj.payment+=obj.payment;
					yearObj.interest+=obj.interest;
					yearObj.principal+=obj.principal;
					yearObj.extraPayment+=obj.extraPayment;
					yearObj.balance=obj.balance;
				}
			}else{
				yearObj = $.extend(true,{},obj);
				results.annualPaymentList.push(yearObj);
				if(!obj.termCompleted){
					results.termPaymentList.push(yearObj);
				}
			}
			count++;
			prevObj = obj;
		}

		results.amortizationInterestSavings = 0;

		results.paymentAmortization = results.annualPaymentList.length;

		me.results.resultsByPaymentOption[results.paymentFrequency.value] = results;

		/* Here we are doing the calculation for all the payment options */
		var pOptLoop = 0,
			pOptLen = paymentFrequencyOptions.length,
			pOpt,
			otherResult,
			monthlyResult,
			currentResults,
			x;
		if(p===undefined){
			me.results.current = results;

			for (; pOptLoop < pOptLen; pOptLoop++) {
				pOpt = paymentFrequencyOptions[pOptLoop];
				if(pOpt.value!==results.paymentFrequency.value){
					otherResults = calculate(pOpt);
				}
			}

			monthlyResult = me.results.resultsByPaymentOption.monthly;

			for (x in me.results.resultsByPaymentOption) {
				currentResults = me.results.resultsByPaymentOption[x];

				currentResults.amortizationInterestSavings = monthlyResult.amortizationInterest - currentResults.amortizationInterest;
			}
			
			if (results.paymentFrequency.value !== paymentFrequencyGlobals.MONTHLY) {
				updateHighchart([getSelectOption(paymentFrequencyOptions,paymentFrequencyGlobals.MONTHLY),results.paymentFrequency]);
			}
			else {
				updateHighchart([getSelectOption(paymentFrequencyOptions,paymentFrequencyGlobals.ACCELERATED_WEEKLY),results.paymentFrequency]);
			}
			
		}
		return results;
	}

	function updateHighchart(compareList){
		var data = me.data,
			results = me.results,
			config = $.extend(true,{},me.results.chartMPC),
			categories = [],
			series = [],
			i=0,
			j=0,
			paymentOptions = results.resultsByPaymentOption,
			val;

		for(;i<data.amortization;i++){

			for (j=0;j<compareList.length;j++) {

				if (!series[j]) {
					series[j] = {
						name:compareList[j].label,
						data:[],
						annualPaymentList:paymentOptions[compareList[j].value]&&paymentOptions[compareList[j].value].annualPaymentList
					};
				}
				val = series[j].annualPaymentList[i]&&series[j].annualPaymentList[i].balance||0;
				series[j].data.push(val);

				if ( i+1>=data.amortization ) {
					delete series[j].annualPaymentList;
				}
			}
			categories[i] = i + 1;
		}
		
		config.xAxis.categories = categories;
		config.series = series;
		
		me.results.chartMPC = config;
	}

	// chartMPC - Custom formatting
	function initChartMPC () {
		me.results.chartMPC = (function(){
			var config = contentManager.getHighchartConfig('chartMPC');
			// Tooltip formatting
			config.tooltip.formatter = function(){
				var str=$scope.content.units.year,
					i=0,
					pts=this.points,
					len=pts.length;

				str = '<strong>'+str[0].toUpperCase()+str.slice(1);
				str += ' '+this.x+'</strong><br/>';
				for (;i<len;i++) {
					str+='<strong>'+pts[i].series.name+'</strong>: '+$filter('currency')(pts[i].y,2)+'<br/>';
				}
				return str;
			};
			return config;
		})();
	}

	// B17
	// =ROUND(IF(B22="YES";(B2/B16)+B23;(B2/B16));2)
	function getMortgagePayment(data,results){
		var mortgagePayment = data.mortgageAmount/ results.annuityFactor;
		if(results.paymentTopUps){
			mortgagePayment += results.paymentTopUpsAmount;
		}
		return Formula.ROUND(mortgagePayment,2);
	}
	// B17 - Reverse engineer mortgageAmount (for validation correction)
	// =ROUND(IF(B22="YES";(B2/B16)+B23;(B2/B16));2)
	function getMortgageAmountFromPayment(results){
		var mortgagePayment = results.mortgagePayment;
		if(results.paymentTopUps){
			mortgagePayment -= results.paymentTopUpsAmount;
		}
		return Formula.ROUND(mortgagePayment * results.annuityFactor,2);
	}

	function getAnnuityFactor(data,paymentFrequency){
		paymentFrequency = paymentFrequency!==undefined ? paymentFrequency : getSelectOption(paymentFrequencyOptions,data.paymentFrequency);

		var multiplier = 1,
			opp1,opp2,pow1;

		if(paymentFrequency.value === paymentFrequencyGlobals.ACCELERATED_BI_WEEKLY){
			multiplier = 2;
			paymentFrequency = getSelectOption(paymentFrequencyOptions,paymentFrequencyGlobals.MONTHLY);
		}else if(paymentFrequency.value === paymentFrequencyGlobals.ACCELERATED_WEEKLY){
			multiplier = 4;
			paymentFrequency = getSelectOption(paymentFrequencyOptions,paymentFrequencyGlobals.MONTHLY);
		}

		opp1 = 1+(data.interestRate/2);
		opp2 = 2/paymentFrequency.frequencyNumber_365;
		pow1 = Math.pow(opp1,opp2);

		return ((1-Math.pow(pow1,(-(paymentFrequency.frequencyNumber_365)*data.amortization)))/(pow1 -1)) * multiplier;
	}
});
})($cmsj,$cmsj);