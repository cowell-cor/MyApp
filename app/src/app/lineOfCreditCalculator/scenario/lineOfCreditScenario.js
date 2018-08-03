(function($,jQuery){
brCalc.controller('lineOfCreditScenarioCtrl', function($scope,$attrs,scenarios,$filter,contentManager) {
		var me = this,
			scenario = $scope.loc.lineOfCreditData.getScenario($attrs.scenarioIndex),

			PERSONAL_LOAN = 'personalLoan',
			LINE_OF_CREDIT = 'lineOfCredit',

			BORROW_REASON = 'borrowReason',

			content = $scope.loc.content,

			specs = $scope.config.fieldspecs.lineOfCredit,

			paymentFrequencyOptions = specs.paymentFrequency.options;

		this.data = scenario.data;
		this.data.scenarioIndex = $attrs.scenarioIndex;
		this.results = scenario.results;
		this.validation = scenario.validation;

		this.highcharts = {};

		initChart();

		$scope.$watchCollection("sce.data",preProcessWatch,true);
		$scope.showModal = false;

		function preProcessWatch ( newData, oldData, scope ) {

			var changedDataName = getChangedPropertyName(oldData,newData);

			if (changedDataName==='repaymentDetails') {

				// if borrow reasons are different between personalLoan and lineOfCredit switch
				if (newData[BORROW_REASON+'_'+PERSONAL_LOAN] !== newData[BORROW_REASON+'_'+LINE_OF_CREDIT]) {
					// AND if the previous borrow reason exists in the new personalLoan/lineOfCredit
					if ( getSelectOption(specs[BORROW_REASON+'_'+newData.repaymentDetails].options, oldData[BORROW_REASON+'_'+oldData.repaymentDetails]) ) {
						// change borrowReason(personalLoan/lineOfCredit) to match
						me.data[BORROW_REASON+'_'+newData.repaymentDetails] = me.data[BORROW_REASON+'_'+oldData.repaymentDetails]
					}

				}
			}

			calculate();
		}
		
		function calculate(){
			var results = {},
				data = me.data;
			
			/* calculation of the minimum monthly payment */

			results.paymentFrequency = getSelectOption(paymentFrequencyOptions,data.paymentFrequency);
			results.periods = data.amortization * results.paymentFrequency.frequencyNumber;

			// TEXT RESULTS for display
			results.borrowReason = getSelectOption(specs[BORROW_REASON+'_'+data.repaymentDetails].options, data[BORROW_REASON+'_'+data.repaymentDetails]);

			if(data.repaymentDetails === PERSONAL_LOAN){

				results.scenarioName = content.scenarioTypes.personalLoan.name;

				results.minimumMonthlyPayment = Formula.PMT(data.interestRate / results.paymentFrequency.frequencyNumber, results.periods,-data.borrowAmount,0,0);
				
				results.interestCostForTurn = Formula.ROUND(results.minimumMonthlyPayment,2) * results.paymentFrequency.frequencyNumber * data.amortization - data.borrowAmount;
			}
			else if(data.repaymentDetails === LINE_OF_CREDIT){

				results.scenarioName = content.scenarioTypes.lineOfCredit.name;

				results.minimumMonthlyPayment = data.borrowAmount * data.interestRate / 12;
				
			}
			
			results.paymentList = [];
			results.annualPaymentList = [];

			var balanceLeft = data.borrowAmount,
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
				obj.year = parseInt((obj.term-1)/results.paymentFrequency.frequencyNumber,10);

				obj.payment = results.minimumMonthlyPayment;

				obj.interest = balanceLeft * data.interestRate / results.paymentFrequency.frequencyNumber;
				obj.principal = obj.payment - obj.interest;
				balanceLeft -= obj.principal;
				obj.balance = balanceLeft;
				//console.log("obj",obj);

				if(prevObj){
					if(prevObj.year !== obj.year){
						yearObj = $.extend(true,{},obj);
						results.annualPaymentList.push(yearObj);
					}else{
						yearObj.payment+=obj.payment;
						yearObj.interest+=obj.interest;
						yearObj.principal+=obj.principal;
						yearObj.balance=obj.balance;
					}
				}else{
					yearObj = $.extend(true,{},obj);
					results.annualPaymentList.push(yearObj);
				}

				count++;
				prevObj = obj;
			}

			me.results.current = results;
			
			updateHighchart();

			return results;
		}

		function initChart() {
			me.results.chartLOC = (function(){

				var config = contentManager.getHighchartConfig('chartLOC');

				// Tooltip formatting
				config.tooltip.formatter = function(){
					// console.log(this);
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

		function updateHighchart(){
			var annualPaymentList = me.results.current.annualPaymentList,
				i=0,
				len=annualPaymentList.length,
				data=[],
				categories=[],
				config = angular.extend({},me.results.chartLOC);

			for (;i<len;i++) {
				categories.push(i+1);
				data.push(annualPaymentList[i].balance);
			}

			config.xAxis.categories = categories;
			config.series[0].data = data;

			me.results.chartLOC = config;
		}
	});
})($cmsj,$cmsj);