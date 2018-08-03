(function($,jQuery){

brCalc.controller('investmentSelector', function($scope, $filter, contentManager) {

		this.content = contentManager.setContent(istContent,'istContent').getContent('istContent');
		var calcConfig = contentManager.setConfig(istConfig).getConfig(),
			me = this,
			VALUE_UNLIMITED = 'unlimited';

		updateIstRates();

		//////////////////////////////
		// Scope accessible objects //
		//////////////////////////////
		// Make pageOrder scope accessible in view
		this.pageOrder = calcConfig.pageOrder;
		this.sectionsNumber = this.pageOrder.length;
		this.lastSectionId = this.sectionsNumber-1;

		this.sections = $.extend(true,{},this.content.pages,getSectionsValidation());

		this.data = {
			stopAsking:false,
			term:0,
			accessTerm:1
		};

		this.results = {
			products:{},
			graphVisibility:[],
			highchart:{}
		};

		// Set current section
		this.maxProgress = 0;
		this.progressPercent = 0;
		this.currentSection = {};

		updateCurrentSection(0);

		initHighchart();

		//////////////////////////////
		// Scope accessible methods //
		//////////////////////////////

		// Methods to change sections
		this.goToNextSection = function(){
			if (me.sections[me.currentSection.name].isValid) {
				// Can't move forward without validating answers
				updateCurrentSection(getNextSectionId(me.currentSection.id));
			}
		};
		this.goToPreviousSection = function(){
			updateCurrentSection(getPreviousSectionId(me.currentSection.id));
		};
		this.goToSection = function(name){
			var id = getSectionId(name);
			updateCurrentSection(id);
		};

		///////////////////
		// Watch objects //
		///////////////////
		$scope.$watchCollection("ist.data",function(/*data*/){
			updateAvailability(0,true);
			updateProgress(); // Update progress and allowed sections each time the data is modified
		});
		$scope.$watch("ist.data.accountType",adjustStopAksingState);
		$scope.$watch("ist.data.isReg",adjustStopAksingState);
		$scope.$watchCollection("ist.results.graphVisibility",function(){
			// Only update on result (last) page
			if(me.currentSection.name==='results') {
				updateHighchartVisibility();
			}
		});
		$scope.$watch("ist.currentSection.id",function(){
			updateAvailability(me.currentSection.id,true);
			updateProgress();
		});

		//////////////////////
		// Internal methods //
		//////////////////////
		
		function getTermString (val,precision) {
			precision = precision || 0;
			return val===0?0:val<1?$filter('day')(val,0):$filter('year')(val,precision);
		}

		function initHighchart() {
			me.results.highchart.config = (function(){

				var config = calcConfig.highchart.ist_highchart,
					content = me.content.chart;

				// Tooltip formatting
				if (!config.tooltip) config.tooltip = {};
				config.tooltip.formatter = function(){
					var options = this.point.options,
						str = '<strong>' + this.series.name + '</strong><br/>';
					if (options.x === 0) { str += content.investmentStart + $filter('currency')(this.y,2); }
					else{
						if (options.high!==undefined) str += content.from + $filter('currency')(options.low,2) + content.to + $filter('currency')(options.high,2);
						else str += $filter('currency')(options.y,2);
						str += content.after + getTermString(options.x,0);
					}
					return str;
				};

				if (!config.xAxis) config.xAxis = {};
				if (!config.xAxis.labels) config.xAxis.labels = {};
				config.xAxis.labels.formatter = function (){ return $filter('year')(this.value,2); };

				if (!config.yAxis) config.yAxis = {};
				if (!config.yAxis.labels) config.yAxis.labels = {};
				config.yAxis.labels.formatter = function (){ return $filter('currency')(this.value,0); };

				return config;
			})();
		}

		function updateAvailability(startIndex, validate){
			var i=startIndex || 0,
				len=me.pageOrder.length,
				sections = me.sections;
			for (;i<len;i++){
				sections[me.pageOrder[i]].updateAvailability();
				if (validate===true) {
					sections[me.pageOrder[i]].validate();
				}
			}
		}

		function getProgressPercent (){
			return (me.currentSection.id)/(me.pageOrder.length-1);
		}

		function adjustStopAksingState(){
			me.data.stopAsking = me.data.isReg==='reg' && (me.data.accountType==='resp'||me.data.accountType==='rdsp'||me.data.accountType===undefined);
		}

		function toggleGraphEvent (event) {
			var scenarios = me.results.scenarios,i=0,len = scenarios.length;
			for(;i<len;i++) {
				if (scenarios[i].graphID===event.target._i) {
					me.results.graphVisibility[i] = event.type === 'show';
				}
			}
			forceDigest();
		}

		function forceDigest () {
			if (!$scope.$$phase) $scope.$apply();
		}

		function updateHighchart(){
			var config = angular.extend({},me.results.highchart.config),
				results = me.results,
				highestTerm=0,
				series = [],
				graphVisibility = [],
				scenarios = me.results.scenarios,
				i=0,
				len = scenarios.length,
				hide = true;

			// Reset graph visibility
			results.graphVisibility = [];

			// Hide chart when the only scenarios available has nothing to show on chart
			for(;i<len;i++) {
				if (scenarios[i].hasChart){
					if (hide) {
						graphVisibility[i] = true;
						hide = false;
					}
					else {
						graphVisibility[i] = false;
					}

					scenarios[i].graphID = series.length;
					scenarios[i].series[0].visible = graphVisibility[i];
					series = series.concat(scenarios[i].series);
					highestTerm = scenarios[i].term>highestTerm?scenarios[i].term:highestTerm;
				}
			}

			results.hideChart = hide;

			config.series = series;

			if (highestTerm<=1) {
				config.xAxis.tickInterval = 0.25;
			}
			else if (highestTerm>1&&highestTerm<=3) {
				config.xAxis.tickInterval = 0.5;
			}
			else {
				config.xAxis.tickInterval = 1;
			}

			me.results.highchart.config = config;
			// new graph visibility
			me.results.graphVisibility = graphVisibility;
		}

		function updateHighchartVisibility () {
			var scenarios = me.results.scenarios || [],
				len = scenarios.length,
				i = 0,
				graphVisibility = me.results.graphVisibility,
				chart = me.results.highchart.element,
				series = chart.series;

			if (series) {
				for(;i<len;i++){
					if (scenarios[i].hasChart===true) {
						series[scenarios[i].graphID][graphVisibility[i]?'show':'hide']();
					}
				}
			}
		}

		function updateProgress(){
			var data = angular.extend({},me.data),
				sections = me.sections,
				po = me.pageOrder,
				len = po.length,
				curr = me.currentSection.id,
				i = curr,
				maxAllowed = curr,
				maxProgress = me.maxProgress || curr;

			maxProgress = curr>maxProgress ? curr : maxProgress;

			for (;i<=maxProgress;i++){
				if (sections[po[i]].isAvailable){
					maxAllowed = i;
				}
			}
			
			// If determined maxAllowed is smaller than previously set maxProgress...
			if (maxAllowed<maxProgress) {
				if (!sections[po[maxAllowed]].isValid) {
					maxAllowed = getPreviousSectionId(maxAllowed);
				}
			}

			me.maxProgress = maxAllowed;
			me.data = data;
			if (me.currentSection.id === len-1) calculate(data);
		}

		function updateCurrentSection (id) {
			me.currentSection = {id:id,name:me.pageOrder[id]};
			me.sections[me.currentSection.name].visited = true;
			me.progressPercent = getProgressPercent();
		}

		function getSectionId (name) {
			var i=0,
				po = me.pageOrder,
				len=po.length;
			for (;i<len;i++) {
				if (po[i]===name) {
					return i;
				}
			}
			return me.currentSection.id;
		}

		function getNextSectionId (id) {
			var i=id+1,
				po = me.pageOrder,
				len=po.length,
				sectionId;
			for (;i<len;i++) {
				sectionId = po[i];
				if (me.sections[sectionId].isAvailable) {
					return i;
				}
			}
			return id;
		}

		function getPreviousSectionId (id) {
			var i=id-1,
				po = me.pageOrder,
				sectionId;
			for (;i>=0;i--) {
				sectionId = po[i];
				if (me.sections[sectionId].isAvailable) {
					return i;
				}
			}
			return id;
		}

		function calculate (data) {
			var results = me.results;

			if (me.currentSection.id === me.pageOrder.length-1) {
				results.currentScenarioId = 0;
				createScenarios(results,data);
				updateHighchart();
			}
		}

		function createScenarios (results,data) {
			var products = getRecommendedProducts(data),
				len = products.length,
				scenarios = [],
				product,
				sc,
				i = 0,
				nbSeries,
				getTerm = function(product) {
					var term = product.term || 0;

					if (!term) {
						if (!me.sections.term.isAvailable) {
							// default term when Member can't set a term himself and when there is no term specified in product
							term = 5;
						}
						else if (me.sections.accessTerm.isAvailable) {
							term = me.data.accessTerm;
						}
						else {
							// Default to using specified member term lenght, at least one year
							term = me.data.term || 1;
						}
					}
					return term;
				};

			/* Each product get their own scenario */
			for (;i<len;i++){
				product = products[i];
				sc = {
					amount:data.amount,
					color:results.highchart.config.colors[i],
					product:product,
					term:getTerm(product)
				};

				sc.series = createSeries(sc,i);

				nbSeries = sc.series.length;
				
				if (nbSeries) {
					sc.balanceMin = sc.series[0].data[sc.series[0].data.length-1][1];
					sc.balanceMax = sc.series[nbSeries-1].data[sc.series[nbSeries-1].data.length-1][2] || sc.balanceMin;
					// Link show and hide events from graph to graphVisibility model
					sc.series[0].events = {
						show:toggleGraphEvent,
						hide:toggleGraphEvent
					};

				}

				sc.yield = sc.product.MinRate!==undefined?sc.product.MinRate:sc.product.RateNumber;

				sc.display = createScenarioDisplay(sc);
				sc.hasChart = nbSeries!==0;

				scenarios.push(sc);
			}

			// results.scenarios = scenarios.sort(function(s1,s2){return s2.balanceMin-s1.balanceMin;});
			results.scenarios = scenarios.sort(function(s1,s2){return s2.yield-s1.yield;});
		}

		function createScenarioDisplay (sc) {
			var dsScenario = {},
				p = sc.product;

			dsScenario.title = p.label;

			// Update rate text to show in definition
			if (p.MinRate!==undefined&&p.MaxRate!==undefined) {
				if (p.MaxRate!==VALUE_UNLIMITED) {
					dsScenario.rate = $filter('percent')(p.MinRate,2) +' - '+ $filter('percent')(p.MaxRate,2);
				}
				else {
					dsScenario.rate = $filter('percent')(p.MinRate,2) +' - '+ VALUE_UNLIMITED;
				}
			}
			else if (p.RateNumber) {
				dsScenario.rate = $filter('percent')(p.RateNumber,2);
			}

			dsScenario.investment = $filter('currency')(sc.amount,2);
			dsScenario.term = $filter('moreThanAYear')(sc.term,0,-1);

			// Update balance text to show in definition
			if (sc.balanceMin===sc.balanceMax) {
				dsScenario.balance = dsScenario.rate && $filter('currency')(sc.balanceMin,2) || undefined;
			}
			else if (p.MaxRate!==VALUE_UNLIMITED) {
				dsScenario.balance = $filter('currency')(sc.balanceMin,2) + ' - ' + $filter('currency')(sc.balanceMax,2);
			}

			dsScenario.url = p.productLink;
			dsScenario.note = p.note;

			return dsScenario;
		}

		function createSeries (scenario) {
			var serie = [],
				product = scenario && scenario.product || {},
				amount = scenario && scenario.amount || 0,
				term = scenario.term,
				baseSerie = {
					name:'',
					data:[]
				},

				data = [],
				range = [],

				rate = product.RateNumber,
				rateMin = product.MinRate,
				rateMax = product.MaxRate,

				hasRange = rateMin!==undefined&&rateMax!==undefined,
				isValidSerie = ((hasRange&&rateMax!==VALUE_UNLIMITED) || (!hasRange&&rate!==0)) && amount && term,

				i=0;

			baseSerie.name = product.label;

			if (!isValidSerie) return serie;
			
			// Calculate series...
				
			for(;i<=Math.ceil(term);i++){
				if (i>term&&term%1!==0) {
					// Last position in data will not match 1 year increments
					i = term;
				}

				if (hasRange) {
					amountMin = range[Math.ceil(i)-1]&&range[Math.ceil(i)-1][1] || amount;
					amountMax = range[Math.ceil(i)-1]&&range[Math.ceil(i)-1][2] || amount;

					range.push([i,(amountMin+(i!==0?amountMin*rateMin:0)),(amountMax+(i!==0?amountMax*rateMax:0))]);
				}

				amount = data[Math.ceil(i)-1] && data[Math.ceil(i)-1][1]*(1+rate) || amount;
				data.push([i,amount]);
			}

			// Set highchart graph info...
			baseSerie.data = data;
			baseSerie.color = scenario.color;
			baseSerie.marker = {lineColor:scenario.color,lineWidth:3};
			// Set additionnal graph info for a range graph (MinRate and MaxRate are available in product rates)
			if (hasRange) {
				baseSerie = angular.merge({},baseSerie,{
					name:baseSerie.name+me.content.chart.rangeSuffix,
					data:range,
					color:scenario.color,
					fillOpacity:0.3,
					lineWidth:0,
					type:'arearange'
				});
			}
			serie.push(baseSerie);

			return serie;
		}

		// Call once - fetch rates from database
		function updateIstRates () {
			var ratesMapping={},
				indexLinkedMaxs={
					updateList:[]
				},
				i=0,
				rates,product,id,nameId,title,group,ctaurl,currIndexLinkedBase;

			// fetch associated rates from mapping
			if (window.Rates && Rates.getAll) {
				rates = Rates.getAll();

				for (;i<rates.length;i++) {
					id = rates[i].ID;
					ratesMapping[id]=rates[i];
				}

			}


			
			// Replace dummy rates with rates found
			for (nameId in calcConfig.istRates) {
				product = calcConfig.istRates[nameId];

				id = product.ID;
				if (ratesMapping[id]!==undefined) {

					product.enabled = true;

					$.extend(product,ratesMapping[id]);

					// Set Rates as number
					if (product.MaxRate!==undefined && product.MinRate!==undefined) {
						product.MinRate = stringToNumber(product.MinRate)/100;
						currIndexLinkedBase = nameId.split('_')[0];
						
						if (String(product.MaxRate).toLowerCase()===VALUE_UNLIMITED) {
							indexLinkedMaxs.updateList.push(nameId);
						}
						else {
							product.MaxRate = stringToNumber(product.MaxRate)/100;

							if (!indexLinkedMaxs[currIndexLinkedBase] || indexLinkedMaxs[currIndexLinkedBase]&&indexLinkedMaxs[currIndexLinkedBase]<product.MaxRate) {
								indexLinkedMaxs[currIndexLinkedBase] = product.MaxRate;
							}
						}
					}

					product.RateNumber = product.RateNumber/100;

					// Set TERM
					title = product.Title && String(product.Title).toLowerCase() || '';
					group = product.Group && String(product.Group).toLowerCase() || '';

					if (title.indexOf('year')!==-1) {
						product.term = stringToNumber(title.substr(0,title.indexOf('year')));
					}
					else if (title.indexOf('days')!==-1) {
						product.term = stringToNumber(title.substr(0,title.indexOf('days')))/365;
					}
					else if (group.indexOf('year')!==-1) {
						product.term = stringToNumber(group.substr(0,group.indexOf('year')));
					}
					else if (group.indexOf('days')!==-1) {
						product.term = stringToNumber(group.substr(0,group.indexOf('days')))/365;
					}
					// No TERM, will default to term selected by Member
					else {
						product.term = calcConfig.istRatesDefault.term;
					}

					// Set CTAs
					product.CTAURL = product.CTAURL || calcConfig.istRatesDefault.CTAURL;
					ctaurl = product.CTAURL;
					if (ctaurl.indexOf('find-us')!==-1) {
						product.ctaLabel = 'Contact Us';
					}
					else if (ctaurl.indexOf('GetStarted')!==-1 || ctaurl.indexOf('join.meridiancu.ca')!==-1) {
						product.ctaLabel = 'Open Now';
					}
					else {
						product.ctaLabel = calcConfig.istRatesDefault.ctaLabel;
					}

					product.label = product.CalculatorProductName || product.Title;
					calcConfig.istRates[nameId] = product;
				}
				else {
					product.enabled = false;
				}
			}

			// Replace VALUE_UNLIMITED with highest available value
			if (indexLinkedMaxs.updateList.length) {
				do {
					nameId = indexLinkedMaxs.updateList.shift();
					currIndexLinkedBase = nameId.split('_')[0];
					calcConfig.istRates[nameId].MaxRate = indexLinkedMaxs[currIndexLinkedBase];
				} while (indexLinkedMaxs.updateList.length);
			}
			
		}

		function getIndexLinkedGICList (id) {
			var allIndexLinked = calcConfig.istProductsPriorityList
					.filter(function(value){
						return value.indexOf(id)!==-1;
					});
			return getProductsFromData(allIndexLinked);
		}

		function getProductsFromData (requestObj) {

			requestObj = typeof requestObj === 'string' ? [requestObj] : requestObj ;
			requestObj = requestObj.filter(onlyUnique);
			var i=0,
				rLen = requestObj.length,
				products=[],
				linkedProducts=[],
				p;

			for (;i<rLen;i++){
				if (requestObj[i].indexOf('indexLinkedGIC')!==-1 && requestObj[i].indexOf('_')===-1) {
					linkedProducts = getIndexLinkedGICList(requestObj[i]);
				}
				else {
					p = calcConfig.istRates[requestObj[i]];
					if (p.enabled) products.push(p);
				}
			}

			products.sort(function(b,a){
				return (a.RateNumber||(a.MaxRate&&(a.MaxRate!==VALUE_UNLIMITED||0))||0)-(b.RateNumber||(b.MaxRate&&(b.MaxRate!==VALUE_UNLIMITED||0))||0);
			});
			return linkedProducts.concat(products);
		}

		function getRecommendedProducts (data) {
			var products = [],
				baseGroup1 = ['advantageSavings','gtgHisa'],
				baseGroup2 = [],
				index,

				isReg = data.isReg==='reg',

				accountType = data.accountType,
				isResp = accountType==='resp',
				isTfsa = accountType==='tfsa',
				isRrif = accountType==='rrif',
				isRrsp = accountType==='rrsp',
				isRdsp = accountType==='rdsp',
				isRegOther = isTfsa || isRrsp || isRrif, // those reg scenarios don't have the "stopAsking" effect

				term = data.term,

				earlyAccess = data.earlyAccess,
				accessBeforeTerm = 'true',
				accessAtTerm = 'false',
				mayAccessBeforeTerm = 'maybe',

				returnType = data.returnType,
				isVariableGuaranteed = returnType === 'variableGuaranteed',
				isFlexible = returnType === 'flexible',
				isGuaranteed = returnType === 'guaranteed',
				isVariable = returnType === 'variable',

				accessTerm = data.accessTerm,
				amount = data.amount,

				mutualFundsMin = 10000;

			if ( isReg ) {
				// Cover the basics...
				if (isResp) {
					products.push('respSavings');
					if (amount >= mutualFundsMin) {
						products.push('mutualFunds');
					}
				}
				else if (isRdsp) {
					products.push('mutualFunds');
				}
			}

			if ( !isReg || isRegOther ) {
				// Cover the basics...
				baseGroup2 = baseGroup1.concat(['redeemableShortTermGICs']);				

				if (earlyAccess===accessBeforeTerm || term===0) {
					if (term<=3 || accessTerm===1) {
						products = products.concat(baseGroup2);
					}
					else if (term>3) {
						products = products.concat(baseGroup1);
					}
				}
				else if (earlyAccess===mayAccessBeforeTerm) {
					if (term<=3) {
						products = products.concat(baseGroup1);
					}
				}
				else if (earlyAccess===accessAtTerm) {
					if ( (term<=3 && isVariableGuaranteed) || isFlexible || (term<3 && isGuaranteed)) {
						products = products.concat(baseGroup1);
					}
				}

				// Indexed && non-redeemable
				// Escalator
				if (term!==0) {
					if (earlyAccess === accessAtTerm) {
						//Index/non-redeemable
						if (isVariableGuaranteed || isVariable) {
							index = term===5?5:term>=3?3:1;
							products.push('indexLinkedGIC'+index+'yr');
						}
						else if (isGuaranteed) {
							index = term;
							products.push('nonRedeemableLongTermGIC'+index+'yr');
						}

						//Escalator
						if (term>1) {
							if (isGuaranteed || isFlexible || (isVariableGuaranteed&&term===5)) {
								index = term===5?5:3;
								// MAY 12 feedback
								if (term!==2) {
									products.push('escalatorGIC'+index+'yr');
								}
							}
						}

						// Ladder
						if (term===5) {
							if (isGuaranteed || isFlexible) {
								products.push('ladderGIC5yr');
							}
							else if (isVariable && amount >= mutualFundsMin) {
								products.push('mutualFunds');
							}
						}
						// Mutual funds
						else if (term>=3 && isVariable && amount >= mutualFundsMin) {
							products.push('mutualFunds');
						}
					}
					else if(earlyAccess === accessBeforeTerm && term>3) {
						//Index/non-redeemable
						index = accessTerm===5?5:accessTerm>=3?3:1;
						products.push('indexLinkedGIC'+index+'yr');
						index = accessTerm;
						products.push('nonRedeemableLongTermGIC'+index+'yr');

						//Escalator
						if (accessTerm===5 && isReg) {
								products.push('escalatorGIC5yr');
						}
						else if (accessTerm>2) {
							products.push('escalatorGIC3yr');
						}
					}
					else if (earlyAccess===mayAccessBeforeTerm) {
						// Escalator
						index = term===5?5:term===1?1:3;
						if (index===1) {
							products.push('redeemableShortTermGICs');
						}
						else if (term>2&&(index===5&&isReg||index!==5)) {
							products.push('escalatorGIC'+index+'yr');
						}

						if (term>3) {
							// Mutual funds
							if (term>=4 && amount>=mutualFundsMin) {
								products.push('mutualFunds');
							}
							if (term===5) {
								products.push('ladderGIC5yr');
							}
						}						
					}
				}		

				if (isRegOther) {
					products = products.filter(function(value){return value !== 'redeemableShortTermGICs';}); // remove redeemableShortTermGICs
				}
				// Remove all escalatorGIC5yr product recommendation if nonreg
				if (!isReg) {
					products = products.filter(function(value){return value !== 'escalatorGIC5yr';});
				}
			}
			if (isReg) {
				products = getAccountSpecificProduct(products,accountType);
			}

			products = getProductsFromData(products);

			return products;
		}

		function getAccountSpecificProduct (products,accountType) {
			products = products || [];
			accountType = accountType && accountType.toUpperCase() || '';

			var i = 0,
				len = products.length,
				n;

			if (products && products.length) {
				for (;i<len;i++) {
					n = products[i]+'_'+accountType;
					if (calcConfig.istRates[n]) {
						products[i] = n;
					}
				}
			}

			return products;
		}

		function getSectionsValidation () {
			// Generic validation functions
			var defaultValidation = {
					isAvailable:false,
					isValid:false,
					updateAvailability:function(){ this.isAvailable = true; },
					validate:function(){ this.isValid = true; }
				},
				// Make sure all sections have their validate & isAvailable method
				v = (function(){
					var i=0,
						po = me.pageOrder,
						len=po.length,
						dValid={};
					for (;i<len;i++){
						dValid[po[i]]=defaultValidation;
					}
					return dValid;
				})();

			return angular.merge({},v,{
				isReg:{
					validate:function(){this.isValid = me.data.isReg!==undefined;}
				},
				accountType:{
					updateAvailability:function(){this.isAvailable = me.data.isReg==='reg';},
					validate:function(){this.isValid = me.data.accountType!==undefined;}
				},
				amount:{
					updateAvailability:function(){this.isAvailable = (me.sections.accountType.isAvailable&&me.data.accountType!==undefined) || me.data.isReg==='nonreg';},
					validate:function(){this.isValid = me.data.amount!==undefined;}
				},
				term:{
					updateAvailability:function(){this.isAvailable = !me.data.stopAsking && me.sections.amount.visited && me.sections.amount.isValid && ((me.data.isReg==='nonreg'&&me.data.amount!==undefined) || me.data.accountType!==undefined);},
					validate:function(){this.isValid = me.data.term!==undefined;}
				},
				earlyAccess:{
					updateAvailability:function(){this.isAvailable = !me.data.stopAsking && (me.data.term!==0 && me.sections.term.visited && me.sections.term.isValid);},
					validate:function(){this.isValid = me.data.earlyAccess!==undefined;}
				},
				accessTerm:{
					updateAvailability:function(){
						var available = !me.data.stopAsking && (me.sections.earlyAccess.isAvailable && me.data.earlyAccess==='true' && me.data.term>=4),
							callback = function(){
								// Method only used when the answers shown varies depending on scenario
								var choices = me.content.pages.accessTerm.inputs,
									aGroup = me.data.term===4?1:2,
									answers = {
										1:[1,2,3],
										2:[1,2,3,4,5]
									},
									availableAnswers = answers[aGroup],
									i=0,len=choices.length,j=0,lenA=availableAnswers.length,
									result=[];
								choicesLoop: {
									for (;i<len;i++) {
										j=0;
										for (;j<lenA;j++) {
											if (choices[i].value===availableAnswers[j]){
												result.push(choices[i]);
												if (result.length===lenA) break choicesLoop;
											}
										}
									}
								}

								me.sections.accessTerm.inputs = result;
							};
						if (available) callback();
						this.isAvailable = available;
					},
					validate:function(){this.isValid = me.data.accessTerm!==undefined;}
				},
				returnType:{
					updateAvailability:function(){
						var available = !me.data.stopAsking && me.data.term && me.data.earlyAccess === 'false',
							callback = function(){
								// Method only used when the answers shown varies depending on scenario
								var choices = me.content.pages.returnType.inputs,
									term = me.data.term && me.data.term >= 3 ? 3 : me.data.term,
									answers = {
										1:['guaranteed','variableGuaranteed'],
										2:['guaranteed','variableGuaranteed','flexible'],
										3:['guaranteed','variableGuaranteed','flexible','variable']
									},
									availableAnswers = answers[term],
									i=0,len=choices.length,j=0,lenA=availableAnswers.length,
									result=[];
								choicesLoop: {
									for (;i<len;i++) {
										j=0;
										for (;j<lenA;j++) {
											if (choices[i].value===availableAnswers[j]){
												result.push(choices[i]);
												if (result.length===lenA) break choicesLoop;
											}
										}
									}
								}

								me.sections.returnType.inputs = result;
							};
						if (available) callback();
						this.isAvailable = available;
					},
					validate:function(){this.isValid = me.data.returnType!==undefined;}
				},
				results:{
					updateAvailability:function(){ 
						// Accessing result different paths
						var sections = me.sections,
							data = me.data,

							stopAsking = data.stopAsking,

							done_amount = sections.amount.visited && sections.amount.isValid,
							done_term = sections.term.visited && sections.term.isValid,
							done_earlyAccess = !stopAsking && sections.earlyAccess.isAvailable && sections.earlyAccess.isValid,
							done_accessTerm = sections.accessTerm.isAvailable && sections.accessTerm.visited,
							done_returnType = sections.returnType.isAvailable && sections.returnType.isValid,

							isScenario1 = stopAsking && sections.accountType.isValid && done_amount,
							isScenario2 = !stopAsking && done_term && data.term===0,
							isScenario3 = !sections.accessTerm.isAvailable && done_earlyAccess && data.earlyAccess!='false',
							isScenario4 = done_term && data.term!==0 && done_returnType,
							isScenario5 = done_accessTerm;

						// console.log(isScenario1 , isScenario2 , isScenario3 , isScenario4 , isScenario5);
						this.isAvailable = isScenario1 || isScenario2 || isScenario3 || isScenario4 || isScenario5;
					}
				}
			});
		}
	});
})($cmsj,$cmsj);