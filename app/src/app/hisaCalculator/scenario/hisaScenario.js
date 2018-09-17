(function ($, jQuery) {
	brCalc.controller('hisaScenarioCtrl', function ($scope, $attrs, scenarios, $filter, contentManager, $rootScope, $sce) {
		var me = this,
			hisa = scenarios.getScenarios('hisaData'),
			scenario = hisa.getScenario($attrs.scenarioIndex);
		// Set the content for the tool (language-dependant content found in config)
		this.content = contentManager.setContent(hisaContent || {}, 'hisaContent').getContent('hisaContent');

		//////////////////////////////
		// View accessible variable //
		//////////////////////////////
		me.data = scenario.data;
		this.data.scenarioIndex = $attrs.scenarioIndex;

		this.results = scenario.results;

		this.validation = scenario.validation;

		// set default value for savings slider
		//me.data.value = 6;
		$scope.collapse = {
			savings: false,
			debitTransfer: true,
			depositTransfer: true
		};
		//tooltip content
		
		$scope.savingsTooltip = $sce.trustAsHtml(this.content.savingsOptions.tooltipContent);

		$scope.debitTooltip = $sce.trustAsHtml(this.content.debitTransfer.tooltipContent);

		$scope.depositTooltip = $sce.trustAsHtml(this.content.depositTransfer.tooltipContent);

		// default value for open account link
		$scope.openAcctLnk = "#link1";
		/**
		 * Reset the value of savings slider based on monthly or anually
		 * @param {monthly/annually} type 
		 */
		$scope.setDefaultVal = function (type) {
			switch (type) {
				case 'monthly':
					me.data.value = 6;
					//trigger the event to updated the slider color bar
					$rootScope.$broadcast('resetSlider', {
						sliderId: 'savings_slider',
						defaultVal: me.data.value,
						min: 0,
						max: 24,
						callback: function (val) {
							me.data.value = val;
						}
					});
					break;
				case 'annually':
					me.data.value = 25;
					$rootScope.$broadcast('resetSlider', {
						sliderId: 'savings_slider',
						defaultVal: me.data.value,
						min: 0,
						max: 40,
						callback: function (val) {
							me.data.value = val;
						}
					});
					break;
			}
		};
		//capture the change event from slider to update default value in scope
		$rootScope.$on('setDefaultVal', function (e, sliderId) {
			switch (sliderId) {
				case 'savings_slider':
					$scope.setDefaultVal(me.data.savingDuration);
					break;
				case 'debitTransfer_slider':
					$scope.resetDebitTransfer();
					break;
				case 'depositTransfer_slider':
					$scope.resetDepositTransfer();
					break;
			}
			$scope.$apply();
		});



		///////////////////////////////
		// Before watches initiation //
		///////////////////////////////
		initChart();
		//setResults();

		/////////////
		// Watches //
		/////////////

		$scope.$watch("sce.data.savingDuration", function (newValue) {
			$scope.setDefaultVal(newValue);
		});

		// TO DO : uncomment when original links are provided by ALISA
		//create dynamic value for open account link based on the savings
		// $scope.$watch("sce.data.savingsAccountType", function (newValue) {
		// 	switch (newValue) {
		// 		case '1':
		// 			$rootScope.$broadcast('openAccountLink', '#link1');
		// 			break;
		// 		case '2':
		// 			$rootScope.$broadcast('openAccountLink', '#link2');
		// 			break;
		// 		case '3':
		// 			$rootScope.$broadcast('openAccountLink', '#link3');
		// 			break;
		// 	}
		// });

		$scope.$watchCollection("sce.data", updateChart, true);
		//////////////////////////////
		// FIN FONCTIONS DE CALCULS //
		//////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////


		$rootScope.$on('openAccountLink', function (event, link) {
			$scope.openActLink = link;
		});

		///////////////////////////////
		// Before watches initiation //
		///////////////////////////////

		function initChart() {
			me.results.chartHISA = (function () {
				var config = contentManager.getHighchartConfig('chartHISA'),
				isDebit = me.data.numberOfMonthlyDebitTransactions * me.data.sliderDebitTransferDefVal,
				isDeposit = ((me.data.sliderDepositTransferDefVal / 100) * me.data.monthlyCreditsPay),
				isSavings = (me.data.initialDepositAmount + me.data.monthlyDepositAmount);
				config.series = [];
				
				isDebit > 0 && (config.series.unshift(getDebitSeries()));
				isDeposit > 0 && (config.series.unshift(getDepositSeries()));
				isSavings > 0 && config.series.push(getSavingsSeries());

				config.xAxis.categories = getCategories();

				return config;
			})();
		}
		function updateChart() {
			var config = angular.extend({}, me.results.chartHISA),
				isDebit  = me.data.numberOfMonthlyDebitTransactions * me.data.sliderDebitTransferDefVal,
				isDeposit = ((me.data.sliderDepositTransferDefVal / 100) * me.data.monthlyCreditsPay),
				isSavings = (me.data.initialDepositAmount + me.data.monthlyDepositAmount);
				
				config.series = [];
				
				isDebit > 0 && (config.series.unshift(getDebitSeries()));
				isDeposit > 0 && (config.series.unshift(getDepositSeries()));
				isSavings > 0 && config.series.push(getSavingsSeries());

			// Tooltip formatting
			config.tooltip.formatter = function () {
				var sum = 0,
					s;
				$.each(this.points, function () {
					sum += this.y;
				});
				
				s = '<span style="font-family:Arial Regular;font-size:16px;color:#39709A;line-height: 21px;"></span></span>After ' + this.x + ', you will have saved:</span><br/><span style="font-weight: bold;font-size:18px;color:#3F3F3F;line-height: 21px;">Total Savings </span><span style="font-weight: bold;font-size:18px;color:#3F3F3F;line-height: 21px;margin-left:20px">' + $filter('currency')(sum, 2) + '</span><div>';
				$.each(this.points, function () {
					s += '<div ><span style="clear: both;float:left;height:13px;width:17px;background-color:' + this.series.color + ';margin: 4px 5px;padding:0"></span><span style="float:left;font-size:14px;color:#3F3F3F;font-weight: bold;line-height:21px;padding:0">' + this.series.name + '</span><span  style="float:right;font-size:14px;color:#3F3F3F;font-weight: bold;line-height:21px;padding:0;margin-right: 7px;"> ' + $filter('currency')(this.y, 2) + '</span></div>';
				});
				return s + '</div>';
			};
			
			config.xAxis.categories = getCategories();
			me.results.chartHISA = config;

			setTableResults();
		}
		function getDebitSeries(){
			return {
				name: 'Debit Transfers',
				color: '#E68823',
				"marker": {
					"symbol": "circle",
					"fillColor": '#FFFFFF',
					"lineColor": "#FFFFFF"
				},
				data: getSeries('debit'),
				stack:0,
				point: {
					events: {
						mouseOver: function () {
							var xAxis = this.series.chart.xAxis[0],
								index = this.index,
								category = this.series.xAxis.options.categories[index]
							xAxis.labelGroup.element.children[index].innerHTML = category;
						},
						mouseOut: function () {
							var xAxis = this.series.chart.xAxis[0],
								index = this.index,
								length = xAxis.labelGroup && xAxis.labelGroup.element.children.length,
								firstIdx = 0,
								lastIdx = length - 1;
								if (index === firstIdx || index === lastIdx) return;
							
							xAxis.labelGroup && (xAxis.labelGroup.element.children[index].innerHTML = '');
						},
					}
				}
			};
		}
		function getDepositSeries(){
			return {
				name: 'Deposit Transfers',
				color: '#A8B402',
				"marker": {
					"symbol": "circle",
					"fillColor": '#FFFFFF',
					"lineColor": "#FFFFFF"
				},
				data: getSeries('deposit'),
				stack:1,
				point: {
					events: {
						mouseOver: function () {
							var xAxis = this.series.chart.xAxis[0],
								index = this.index,
								category = this.series.xAxis.options.categories[index];
							xAxis.labelGroup.element.children[index].innerHTML = category;
						},
						mouseOut: function () {
							var xAxis = this.series.chart.xAxis[0],
								index = this.index,
								length = xAxis.labelGroup && xAxis.labelGroup.element.children.length,
								firstIdx = 0,
								lastIdx = length - 1;
								if (index === firstIdx || index === lastIdx) return;
							xAxis.labelGroup && (xAxis.labelGroup.element.children[index].innerHTML = '');
						},
					}
				}
			};
		}
		function getSavingsSeries(){
			return {
				name: 'High Interest',
				color: '#39709A',
				"marker": {
					"symbol": "circle",
					"fillColor": '#FFFFFF',
					"lineColor": "#FFFFFF"
				},
				data: getSeries('savings'),
				stack:2,
				point: {
					events: {
						mouseOver: function () {
							var xAxis = this.series.chart.xAxis[0],
								index = this.index,
								category = this.series.xAxis.options.categories[index];
								xAxis.labelGroup.element.children[index].innerHTML = category;
						},
						mouseOut: function () {
							var xAxis = this.series.chart.xAxis[0],
								index = this.index,
								length = xAxis.labelGroup && xAxis.labelGroup.element.children.length,
								firstIdx = 0,
								lastIdx = length - 1;
								if (index === firstIdx || index === lastIdx) return;
								if (index !== firstIdx || index !== lastIdx) {
									xAxis.labelGroup && (xAxis.labelGroup.element.children[index].innerHTML = '');
								}
						},
					}
				}
			};
		}

		

		//hide boost Savings
		$scope.isBoostSavings = false;
		/**
		 * Function to show or hide disclaimer text
		 */
		$scope.showDisclaimer = function () {
			$scope.isBoostSavings = !$scope.isBoostSavings;
		};
		/**
		 * Show chart or table based onthe selection
		 * default, chart is always shown
		 */
		$scope.isChartOpen = true;
		$scope.isTableOpen = false;
		$scope.toggleChart = function (val) {
			switch (val) {
				case 'table':
					$scope.isTableOpen = true;
					$scope.isChartOpen = !$scope.isTableOpen;
					break;
				case 'graph':
					$scope.isTableOpen = false;
					$scope.isChartOpen = !$scope.isTableOpen;
					break;
			}
		};

		function getSeries(type) {
			var series = [],
				output;
			switch (type) {
				case 'savings':
					series.push(me.data.initialDepositAmount);
					output = calc(me.data.initialDepositAmount, me.data.monthlyDepositAmount, me.data.value);
					break;
				case 'debit':
					series.push(me.data.numberOfMonthlyDebitTransactions * me.data.sliderDebitTransferDefVal);
					output = calc(0, (me.data.numberOfMonthlyDebitTransactions * me.data.sliderDebitTransferDefVal), me.data.value);
					break;
				case 'deposit':
					series.push((me.data.sliderDepositTransferDefVal / 100) * me.data.monthlyCreditsPay);
					output = calc(0, ((me.data.sliderDepositTransferDefVal / 100) * me.data.monthlyCreditsPay), me.data.value);
					break;
			}

			//Generate series
			$.each(output, function (idx, obj) {
				series.push(obj.total);
			});
			return series;

		}

		function getCategories() {
			var label = me.data.savingDuration === 'monthly' ? ' month' : ' year',
			firstCategory = '0 '+ label;
			categories = [0];

			for (var i = 1; i <= me.data.value; i++) {
				if (i === 1) {
					categories.push(i + label);
				} else {
					categories.push(i + label + 's');
				}
			}
			return categories;
		}

		function calc(prevTotal, deposit, count) {
			var arrOfObj = [],
			isBoostEnabled = me.data.boostSavingsEnabled,
			savingDurationType = me.data.savingDuration;
			me.data.boostSavingsAmt = 0;
			switch (savingDurationType) {
				case 'monthly':
					arrOfObj = calculateMonthly(prevTotal, deposit, count,isBoostEnabled);
					if(isBoostEnabled){
						me.data.boostSavingsAmt = $filter('currency')(updateBoost(prevTotal, deposit, count,savingDurationType, arrOfObj),2);
					}
					break;
				case 'annually':
					arrOfObj = calculateYearly(prevTotal, deposit, count,isBoostEnabled);
					if(isBoostEnabled){
						me.data.boostSavingsAmt = $filter('currency')(updateBoost(prevTotal, deposit, count,savingDurationType, arrOfObj),2);
					}
					break;
			}
			return arrOfObj;
		}

		function calculateMonthly(prevTotal, deposit, count, isBoostEnabled) {
			var arrOfObj = [];
			for (var i = 1; i <= count; i++) {
				var obj = {
						interest: 0,
						month: i,
						deposit: deposit,
						total: 0
					},
					previousTotal;

				obj.deposit = (i === 1 ? (prevTotal + deposit) : deposit);
				previousTotal = (i === 1 ? (prevTotal + deposit) : arrOfObj[i - 2].total + deposit);
				//if boost is true
				if (isBoostEnabled && i < 5) {
					obj.total = (previousTotal) * (1 + (0.0012 + 0.0025));
				} else {
					obj.total = (previousTotal) * (0.0012 + 1);
				}
				obj.interest = (i === 1 ? obj.total - previousTotal : obj.total - previousTotal + arrOfObj[i - 2].interest);
				arrOfObj.push(obj);
			}
			me.data.totalSavings = arrOfObj.length > 0 && arrOfObj[arrOfObj.length - 1].total;
			return arrOfObj;
		}

		function calculateYearly(prevTotal, deposit, count, isBoostEnabled) {
			var monthLen,
				arrOfObjMonthly = [],
				arrOfObjYearly = [];

			for (var j = 1; j <= count; j++) {
				prevTotal = (j === 1 ? (prevTotal) : arrOfObjYearly[j - 2].total);
				arrOfObjMonthly = [];
				for (var i = 1; i <= 12; i++) {
					var obj = {
							interest: 0,
							month: i,
							deposit: deposit,
							total: 0
						},
						previousTotal;

					obj.deposit = (i === 1 ? (prevTotal + deposit) : deposit);
					previousTotal = (i === 1 ? (prevTotal + deposit) : arrOfObjMonthly[i - 2].total + deposit);
					if (isBoostEnabled && j === 1 && i < 5) {
						obj.total = (previousTotal) * (1 + (0.0012 + 0.0025));
					} else {
						obj.total = (previousTotal) * (0.0012 + 1);
					}
					obj.interest = (i === 1 ? obj.total - previousTotal : obj.total - previousTotal + arrOfObjMonthly[i - 2].interest);
					arrOfObjMonthly.push(obj);
				}
				monthLen = arrOfObjMonthly.length;
				var objYear = {
					interest: 0,
					deposit: deposit,
					total: 0
				};
				objYear.interest = j === 1 ? arrOfObjMonthly[monthLen - 1].interest : arrOfObjYearly[j - 2].interest + arrOfObjMonthly[monthLen - 1].interest;
				objYear.deposit = arrOfObjMonthly[monthLen - 1].deposit;
				objYear.total = arrOfObjMonthly[monthLen - 1].total;
				objYear.year = j;
				arrOfObjYearly.push(objYear);
			}
	
			me.data.totalSavings = arrOfObjYearly.length > 0 && arrOfObjYearly[arrOfObjYearly.length - 1].total;
			return arrOfObjYearly;
		}

		function updateBoost (prevTotal, deposit, count, savingsDurationType, objWithBoost){
			var objWithoutBoost,
				boostDiffAmt;
			switch (savingsDurationType) {
				case 'monthly':
					objWithoutBoost = calculateMonthly(prevTotal, deposit, count,false);
					break;
				case 'annually':
					objWithoutBoost = calculateYearly(prevTotal, deposit, count,false);
					break;
			}
			return boostDiffAmt = (objWithBoost.length > 0 && objWithBoost[objWithBoost.length - 1].total) - (objWithoutBoost.length > 0 && objWithoutBoost[objWithoutBoost.length - 1].total);
		}
		function setTableResults() {
			var totalDeposit = me.data.monthlyDepositAmount + (me.data.numberOfMonthlyDebitTransactions * me.data.sliderDebitTransferDefVal) + ((me.data.sliderDepositTransferDefVal / 100) * me.data.monthlyCreditsPay);
			me.results.resultsBySavingDuration = calc(me.data.initialDepositAmount, totalDeposit, me.data.value);
		}

		/**
		 * Function: getSavingsHeader
		 */
		$scope.getSavingsHeader = function () {
			var savingsType = me.data.savingDuration === 'monthly' ? 'month' : 'year',
				savingsDurationNumber = me.data.value,
				displayDuration = savingsDurationNumber > 1 ? savingsDurationNumber + ' ' + savingsType + 's' : savingsDurationNumber + ' ' + savingsType;
			//extract rate
			return $filter('currency')(me.data.initialDepositAmount, 2) + ' for ' + displayDuration + ' at ' + '1.40%';
		};

		/** TO DO
		 * Function: getSavingsHeader
		 */
		$scope.getDebitHeader = function () {
			var savingsType = me.data.savingDuration === 'monthly' ? 'month' : 'year',
				savingsDurationNumber = me.data.value,
				displayDuration = savingsDurationNumber > 1 ? savingsDurationNumber + ' ' + savingsType + 's' : savingsDurationNumber + ' ' + savingsType;
			//extract rate
			return $filter('currency')(me.data.initialDepositAmount, 2) + ' monthly transactions ' + displayDuration + ' at ' + '1.40%';
		};

		/** TO DO
		 * Function: getSavingsHeader
		 */
		$scope.getDepositHeader = function () {
			var savingsType = me.data.savingDuration === 'monthly' ? 'month' : 'year',
				savingsDurationNumber = me.data.value,
				displayDuration = savingsDurationNumber > 1 ? savingsDurationNumber + ' ' + savingsType + 's' : savingsDurationNumber + ' ' + savingsType;
			//extract rate
			return $filter('currency')(me.data.initialDepositAmount, 2) + ' for ' + displayDuration + ' at ' + '1.40%';
		};
		/**
		 * Function: resetDepositTransfer
		 */

		$scope.resetDebitTransfer = function () {
			$scope.sce.data.numberOfMonthlyDebitTransactions = 0;
			$scope.sce.data.sliderDebitTransferDefVal = 0;
			$rootScope.$broadcast('resetSlider', {
				sliderId: 'debitTransfer_slider',
				defaultVal: 0,
				min: 0,
				max: 5
			});
		};

		/**
		 * Function: resetDepositTransfer
		 */

		$scope.resetDepositTransfer = function () {
			$scope.sce.data.monthlyCreditsPay = 0;
			$scope.sce.data.sliderDepositTransferDefVal = 0;
			$rootScope.$broadcast('resetSlider', {
				sliderId: 'depositTransfer_slider',
				defaultVal: 0,
				min: 0,
				max: 100
			});
		};
		/**
		 * Function: hideDynamiclbl
		 * compares the current value with default values and return the flag
		 */

		$scope.hideDynamiclbl = function (txtVal, sliderVal, txtDef, sliderDef) {
			return txtVal === txtDef && sliderVal === sliderDef;
		};
	});
})($cmsj, $cmsj);