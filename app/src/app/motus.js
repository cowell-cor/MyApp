(function ($, jQuery) {

	window.cachedLang = false;

	window.getLanguage = function () {
		var htmlLang = $('html').attr('lang'),
			splLang,
			winLang;
		if (window.cachedLang) {
			return window.cachedLang;
		} else if (htmlLang) {
			splLang = htmlLang.split("-")[0];
			window.cachedLang = splLang;
			return splLang;
		} else {
			winLang = window.lang || window.lg || window.language;
			if (typeof winLang === "string") {
				window.cachedLang = winLang;
				return winLang;
			}
		}
		window.cachedLang = 'en';
		return window.cachedLang;
	};

	window.getSelectOption = function (optionsArray, value, prop) {
		prop = prop || 'value';
		if (typeof optionsArray === 'object' && optionsArray.length) {
			optionsArray = optionsArray.filter(function (option) {
				return option[prop] === value;
			});
			if (optionsArray.length) return optionsArray[0];
			// else return value;
		}
	};

	window.getItemAtPath = function (path, scope) {
		scope = scope || window;
		if (path) {
			path = path.split('.');
			do {
				if (scope[path[0]] !== undefined) scope = scope[path.shift()];
				else break;
			} while (path.length);

			return scope;
		}
		return undefined;
	};

	// Backward compatible trim function
	window.trimString = function (x) {
		return x.replace(/^\s+|\s+$/gm, '');
	};

	window.cleanValue = function (value) {
		if (typeof value === "string") {
			value = value.replaceAll("\\$").replaceAll("%").replaceAll(",");
		}
		return value;
	};

	window.brCalc = angular.module('br-calc', ['ui.bootstrap', 'ngAnimate', 'angular-bind-html-compile'])

		.service("contentManager", function () {
			var me = this,

				originalContent = {}, // will never be transcluded
				originalConfig = {}, // will never be transcluded

				locContent = {},

				content = {},
				config = {},

				GENERAL = 'general',
				CONTENT_MODEL = 'contentModel',
				CONFIG_MODEL = 'configModel',

				getLanguage = window.getLanguage,
				getLanguage = getLanguage,
				// getLanguage = getLanguage,

				language = getLanguage();
			///////////////////////////
			// LOCAL general methods //
			///////////////////////////
			function getItemAtPath(path, scope) {
				scope = scope || window;
				if (path) {
					path = path.split('.');
					do {
						scope = scope[path.shift()];
					} while (path.length && scope !== undefined);

					return scope;
				}
				return undefined;
			}
			// Go though a config and fetch the models to replace in config
			function transcludeModels(config, scope, modelKey, deepCopy) {
				config = config || {};
				modelKey = modelKey || 'model';
				var isNull = config === null,
					isObject = !isNull && typeof config === 'object',
					isArray = isObject && config.length !== undefined,
					key,
					model,
					prop,
					value,
					potentialPath,
					i = 0;

				if (isObject) {
					if (deepCopy) {

						if (isArray) {
							config = $.merge([], config);
						} else {
							config = $.extend(true, {}, config);
						}
					}
					for (key in config) {
						value = config[key];
						if (value !== null) {
							if (typeof value === 'object') {
								config[key] = transcludeModels(value, scope, modelKey, deepCopy);
							} else if (key === modelKey) {

								value = value.split(',');
								for (; i < value.length; i++) {

									potentialPath = trimString(value[i]);
									if (potentialPath.indexOf(':') !== -1) {
										prop = potentialPath.split(':').shift();
										potentialPath = potentialPath.split(':').pop();
									} else {
										prop = false;
									}

									model = getItemAtPath(potentialPath, scope);

									if (model !== undefined) {
										if (typeof model === 'object') {
											transcludeModels(model, scope, modelKey, deepCopy);
											if (prop) {
												config[prop] = $.extend({}, model);
											} else {
												config = $.extend(true, {}, model, config);
											}
										} else {
											config[prop || potentialPath.split('.').pop()] = model;
										}
									}
								}
								delete config[modelKey]; // cleanup
								prop = undefined;
							}
						}
					}
				}
				return config;
			}

			function getName(name) {
				return typeof name === 'string' && name !== '' && name || GENERAL;
			}
			///////////////////////////
			// LOCAL content methods //
			///////////////////////////
			function getLocalisedContent(contentObject, deepCopy) {
				contentObject = contentObject || {};
				if (deepCopy) {
					contentObject = $.extend(true, {}, contentObject);
				}
				return contentObject[language] || {};
			}

			// Should be used any time config is changed
			// 	-> transclude config's contentModel with content.general (assuming content.general has already been transcluded at set)
			// 	-> transclude config's configModel with itself
			// 	-> transclude content.general contentConfig with its localized version
			// 	-> for each level of content (excluding 'general'):
			// 		-> transclude content's contentModel with its localized version
			// 	-> transclude content's configModel with config
			// function transcludeAllContent(name) {
			function transcludeContent(name) {
				if (name && name !== GENERAL) {
					if (content[name]) {
						transcludeModels(locContent[name], content || {}, CONTENT_MODEL);
						transcludeModels($.extend(true, content[name], locContent[name]), config, CONFIG_MODEL);
					}
				} else {
					locContent.general = getLocalisedContent(originalContent.general, true);
					$.extend(true, content, transcludeModels(locContent.general, content || {}, CONTENT_MODEL));

					for (name in locContent) {
						if (name !== GENERAL) {
							locContent[name] = getLocalisedContent(originalContent[name], true);
							$.extend(true, content[name], transcludeModels(locContent[name], content || {}, CONTENT_MODEL));
						}
					}
					// CONFIG transclude all content's config
					transcludeModels(content, config, CONFIG_MODEL);
				}
			}
			/**
			 * setContent (LOCAL)
			 * 	Extracts the appropriate localized (language sensitive) part of the config and store it
			 * 	Create a content entry using the localized content config
			 * 	Transclude the new content
			 * @param {object} contentObject Full content config, where the first layer refers to language description. Ex: {en:{...},fr:{...}}
			 * @param {string} name          Name given to the content config.
			 */
			function setContent(name) {
				// Get localised content AND create deep copy of originalContent
				locContent[name] = getLocalisedContent(originalContent[name], true);
				// New content entry
				if (name !== GENERAL) {
					if (content[name] === undefined) {
						content[name] = $.extend(true, {}, locContent[name]);
					} else {
						$.extend(true, content[name], locContent[name]);
					}
				} else {
					$.extend(true, content, locContent[name]);
				}
				// Transclude this content entry
				transcludeContent(name);
				transcludeConfig();
			}
			/////////////////////////////
			// INTERNAL config methods //
			/////////////////////////////
			function transcludeConfig() {
				$.extend(true, config, getTranscludedConfig());
			}

			function getTranscludedConfig() {
				var transcludedConfig = transcludeModels(originalConfig, content || {}, CONTENT_MODEL, true);
				transcludeModels(transcludedConfig, $.extend(true, {}, config, transcludedConfig), CONFIG_MODEL);

				return transcludedConfig;
			}
			////////////////////
			// PUBLIC methods //
			////////////////////
			this.setContent = function (contentObject, name) {
				// Provided object should at least have English language
				if (contentObject && contentObject.en) {
					name = getName(name);
					originalContent[name] = $.extend(true, originalContent[name] || {}, contentObject); // merge with existing object
					setContent(name);
				}
				// me.setConfig();
				return me;
			};
			this.setConfig = function (configObject) {
				// config shouldn't be localised (possess language attributes)
				$.extend(true, originalConfig, configObject || {}); // merge with existing object
				transcludeConfig();
				transcludeContent(); // Transclude ALL content
				return me;
			};
			this.getContent = function (name) {
				if (getName(name) !== GENERAL) {
					return content[getName(name)];
				}
				return content;
			};
			this.getConfig = function (path, clone) {

				if (typeof path === 'boolean') {
					clone = path;
					path = undefined;
				}
				if (clone === true) {
					return path && $.extend(true, {}, getItemAtPath(path, config)) || $.extend(true, {}, config);
				} else {
					return path && getItemAtPath(path, config) || config;
				}
			};
			// Gives out a clone of the originalConfig object in order to prevent changes to the configs by reference
			this.getOriginalConfig = function () {
				return $.extend(true, {}, originalConfig);
			};
			this.getHighchartConfig = function (name) {
				return config.highchart && config.highchart[name] || {};
			};
		})
		////////////////
		// CONTROLLER //
		////////////////
		.controller('br-calc', ['$scope', '$location', 'tabData', 'contentManager', '$uibModal', function ($scope, $location, tabData, contentManager, $uibModal) {
			var versionCaching = 'r=' + new Date().getTime(); // Force clear cache of HTML partials

			var dispellAllFocus = function (e) {
					// data.ignore -> any other focusable elements we wouldn't like to prevent a focus to be transfered to
					var ignore = e && e.data && e.data.ignore && $(e.data.ignore) || $(''),
						currentActiveField = e && e.data && e.data.originalEvent && $(e.data.originalEvent.currentTarget) || $(e.currentTarget);

					if (e.type !== 'keydown' && $(e.target).not(ignore).length === 0) return;
					currentActiveField.blur();

				},
				focusOnNextField = function (e) {
					var self = $(e.currentTarget),
						body = $('body [ng-app="br-calc"]'),
						focusable, next;

					focusable = body.find('input,select,textarea').filter(':visible');
					next = focusable.eq(focusable.index(e.currentTarget) + 1);
					if (next.length) {
						next.focus();
					} else {
						if (focusable.length !== 1) {
							focusable.eq(0).focus();
						} else {
							self.blur();
						}
					}
				},
				interceptEnterKey = function (callback) {
					return function (e) {
						if (e.keyCode === 13 && e.which === 13) {
							callback(e);
							return false;
						}
					};
				},
				// Interdependant events to select input field texts
				addSelectText = function (e) {
					$(e.currentTarget).on('focus', selectText);
				},
				selectText = function (e) {
					if (e.target && e.target.type === 'range') return;
					e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);
					$(e.currentTarget).on('blur', removeSelectText);
				},
				removeSelectText = function (e) {
					$(e.currentTarget)
						.off('focus', selectText)
						.off('blur', removeSelectText);
				};

			// $scope.openModal = function (templateUrl) {
			// 	var modalInstance = $uibModal.open({
			// 		animation: true,
			// 		ariaLabelledBy: 'modal-title',
			// 		ariaDescribedBy: 'modal-body',
			// 		templateUrl: templateUrl/*,
			// 		// controller: 'ModalInstanceCtrl',
			// 		// controllerAs: '$ctrl',
			// 		size: size,
			// 		resolve: {
			// 		items: function () {
			// 		return $ctrl.items;
			// 		}
			// 		}*/
			// 	});
			// };

			$scope.tabData = tabData;
			$scope.isMobile = window.BU && BU.detect.isMobileBrowser() || false;
			$('body')
				// Listen on popover close event
				.on('click', '[ng-app="br-calc"] .popover .close', function (e) {
					$(e.currentTarget).parents('.popover').popover('hide');
				})

				.on('click', '[ng-app="br-calc"] button', function (e) {
					return false;
				})

				// ENTER key behaviour
				.on('keydown', '[ng-app="br-calc"] input, [ng-app="br-calc"] select, [ng-app="br-calc"] textarea', interceptEnterKey(dispellAllFocus))
				// .on('keydown', 'input, select, textarea', interceptEnterKey(focusOnNextField))

				// Mousedown while a field :focus automatically BLUR the field
				.on('focus', '[ng-app="br-calc"] input, [ng-app="br-calc"] select, [ng-app="br-calc"] textarea', function (e) {
					$('body').on('mousedown', {
						ignore: 'input, select, option, textarea',
						originalEvent: e
					}, dispellAllFocus);
				})
				.on('focus', '[ng-app="br-calc"] input', addSelectText)
				.on('blur', '[ng-app="br-calc"] input, [ng-app="br-calc"] select, [ng-app="br-calc"] textarea', function () {
					$('body').off('mousedown', dispellAllFocus);
				});

			// Close visible popovers and tooltip on resize
			// This fixes resize and orientationchange positionning issues.
			$(window).on('resize orientationchange', function ( /*e*/ ) {
				var tooltip = $('[ng-app="br-calc"] [tooltip]+.tooltip:visible');
				if(tooltip.length > 0){
					$('[ng-app="br-calc"] [tooltip]+.tooltip:visible').tooltip('hide');
					$('[ng-app="br-calc"] [popover]+.popover:visible').popover('hide');
				}
			});

			$scope.module = {
				investmentSelector: 'app/investmentSelector/investmentSelector.html?' + versionCaching,
				affordabilityCalculator: 'app/affordabilityCalculator/affordabilityCalculator.html?' + versionCaching,

				lineOfCreditCalculator: 'app/lineOfCreditCalculator/lineOfCreditCalculator.html?' + versionCaching,
				lineOfCreditCalculatorScenario: 'app/lineOfCreditCalculator/scenario/lineOfCreditScenario.html?' + versionCaching,
				lineOfCreditCalculatorScenarioDetails: 'app/lineOfCreditCalculator/scenario/lineOfCreditScenarioDetails.html?' + versionCaching,
				lineOfCreditCalculatorScenarioReport: 'app/lineOfCreditCalculator/scenarioReport/lineOfCreditScenarioReport.html?' + versionCaching,

				retirementSavingsCalculator: 'app/retirementSavingsCalculator/retirementSavingsCalculator.html?' + versionCaching,
				retirementSavingsCalculatorScenario: 'app/retirementSavingsCalculator/scenario/retirementSavingsScenario.html?' + versionCaching,
				retirementSavingsCalculatorScenarioResults: 'app/retirementSavingsCalculator/scenarioResults/retirementSavingsScenarioResults.html?' + versionCaching,
				retirementSavingsCalculatorScenarioDetails: 'app/retirementSavingsCalculator/scenario/retirementSavingsScenarioDetails.html?' + versionCaching,
				retirementSavingsCalculatorScenarioReport: 'app/retirementSavingsCalculator/scenarioReport/retirementSavingsScenarioReport.html?' + versionCaching,

				mortgagePaymentCalculator: 'app/mortgagePaymentCalculator/mortgagePaymentCalculator.html?' + versionCaching,
				mortgagePaymentCalculatorScenario: 'app/mortgagePaymentCalculator/scenario/mortgagePaymentScenario.html?' + versionCaching,
				mortgagePaymentCalculatorScenarioDetails: 'app/mortgagePaymentCalculator/scenario/mortgagePaymentScenarioDetails.html?' + versionCaching,
				mortgagePaymentCalculatorScenarioResults: 'app/mortgagePaymentCalculator/scenarioResults/mortgagePaymentScenarioResults.html?' + versionCaching,
				mortgagePaymentCalculatorScenarioReport: 'app/mortgagePaymentCalculator/scenarioReport/mortgagePaymentScenarioReport.html?' + versionCaching,


				hisaCalculator: 'app/hisaCalculator/hisaCalculator.html?' + versionCaching,
				hisaCalculatorScenario: 'app/hisaCalculator/scenario/hisaScenario.html?' + versionCaching,
				hisaCalculatorScenarioResults: 'app/hisaCalculator/scenario/hisaScenarioResults.html?' + versionCaching,
				hisaBoostSavings: 'app/hisaCalculator/scenario/boostSavings.html?' + versionCaching,

				motusHISACalculator: 'app/motusHISACalculator/motusHISACalculator.html?' + versionCaching,
				motusHISAaCalculatorScenario: 'app/motusHISACalculator/scenario/motusHISAScenario.html?' + versionCaching,
				motusHISAaCalculatorScenarioResults: 'app/motusHISACalculator/scenario/motusHISAScenarioResults.html?' + versionCaching,
				motusHISABoostSavings: 'app/motusHISACalculator/scenario/boostSavings.html?' + versionCaching,
			};

			contentManager.setContent(defaultBRCalcDataContent);
			contentManager.setConfig(defaultBRCalcDataConfig);

			$scope.content = contentManager.getContent();

			$scope.config = contentManager.getConfig();

			$scope.round = function (value) {
				return Math.round(value);
			};

			$scope.sortable = function (object) {
				var results = object ? Object.keys($.extend({}, object)) : [],
					i = 0;
				for (; i < results.length; i++) {
					results[i] = object[results[i]];
				}
				return results;
			};

			// replace the config's own model with language selected:
			/*var tempConfig = $.extend(true,{},meridianDataConfig);
			delete tempConfig.content;
			tempConfig = $scope.getContent(tempConfig,$scope.content);
			meridianDataConfig = $.extend(true,meridianDataConfig,tempConfig);*/

		}])
		////////////////
		// DIRECTIVES //
		////////////////
		///
		// Modal
		// 	Call a partial using bootstrap's modal
		.directive("modal", function () {
			var directiveDefinitionObject = {
				restrict: 'E',
				scope: {
					isOpen: '=',
					name: '@',
					header: '<',
					close: '<'
				},
				transclude: true,
				replace: true,
				templateUrl: 'app/partials/modal.html',
				controller: function ($scope, $element, $attrs) {
					$scope.isOpen = $scope.isOpen === true;

					var isChangeFromModal = false,
						openModal = function () {
							$element.modal('show');
						},
						closeModal = function () {
							$element.modal('hide');
						};

					$element
						.modal({
							show: false
						})
						.on('show.bs.modal', function () {
							$scope.isOpen = true;
						})
						.on('hide.bs.modal', function () {
							$scope.isOpen = false;
							$scope.$applyAsync();
						});

					$scope.$watch('isOpen', function (newValue, oldValue) {
						if (newValue !== oldValue) {
							if (isChangeFromModal === true) {
								isChangeFromModal = false;
							} else {
								if (oldValue === true) closeModal();
								else openModal();
							}
						}
					});
				}
			};
			return directiveDefinitionObject;
		})
		// tooltip
		// 	Init Bootstrap tooltip elements
		// .directive("tooltip",function(){
		// 	return {
		// 		restrict:"A",
		// 		link: function (scope,element/*,attrs*/) { element.tooltip(); /*console.log('Defined tooltip - directive')*/ }
		// 	};
		// })
		// collapse
		// 	Init Bootstrap collapse elements
		// .directive("collapse",function(){
		// 	return {
		// 		restrict:"A",
		// 		link: function (scope,element/*,attrs*/) { console.log('sdlfkhsldfsjkdf"');element.collapse(); }
		// 	};
		// })
		// popover
		// 	Init Bootstrap popover elements
		.directive("popover", ['$compile', function ($compile) {

			return {
				restrict: "E",
				transclude: true,
				replace: true,
				controller: function ($scope, $element, $attrs, $transclude) {
					// console.log('$element.html()',$element.html(),$element);
					// Replace <transclude-content> element with content inserted in meri-select
					$transclude(function (clone, scope) {
						if (clone.length) {
							// console.log('clone.html()',clone.html());
							$scope.popContent = clone.html();
						}
					});
				},
				compile: function compile( /*tElement, tAttrs*/ ) {

					return {
						// Before Link compile
						pre: function preLink( /*scope, elem, attrs, ctrl*/ ) {},
						// After Link compile
						// Attach events here
						post: function postLink(scope, elem, attrs /*, ctrl*/ ) {
							var content = scope.popContent || attrs.content || '';

							elem.popover({
									template: '<div class="popover"><div class="popover-content"></div><a href="javascript:void(0)" class="close">X</a></div>',
									trigger: 'click'
								})
								.on('hidden.bs.popover', function (e) {
									$(e.target).data("bs.popover").inState.click = false;
								});
						}
					};
				},
				template: '<a href="javascript:void(0)" class="br-icon" data-toggle="popover" data-placement="top" popover>&nbsp;</a>'
			};
		}])
		// slider
		.directive("slider", function (contentManager) {
			return {
				restrict: 'A',
				link: function (scope, ele, attr) {
					var config,
						configName,
						slider,
						update = function (number, event) {
							number = number === undefined || isNaN(number) ? 0 : number;
							setDataToScope(attr.slider, scope, stringToNumber(number));
							if (!event || event === 'change') {
								slider.set(number);
							}
						},
						generalUpdateMethod = function (eventType) {
							return function (number) {
								update(number, eventType);
							};
						};
					if (contentManager.getConfig().slider && noUiSlider) {
						configName = attr.config || "";
						config = contentManager.getConfig().slider[configName];
						if (config) {

							config.start = getDataAtScope(attr.slider, scope) || (config.start !== undefined ? config.start : undefined);
							slider = noUiSlider.create(ele[0], config);

							slider.on('change.meri', generalUpdateMethod('change'));
							slider.on('update.meri', generalUpdateMethod('update'));
							scope.$watch(attr.slider, function (value) {
								slider.off('.meri');
								slider.set(value);
								slider.on('change.meri', generalUpdateMethod('change'));
								slider.on('update.meri', generalUpdateMethod('update'));
							});
						}
					}
				}
			};
		})

		.directive("ngFlag", function ($injector) {
			return {
				restrict: 'A',
				link: function (scope, ele, attr) {
					ele.on("click", function () {
						var flagKey = attr.ngFlag,
							flagValue = attr.ngFlagValue;

						if (flagValue === "true") {
							flagValue = true;
						} else if (flagValue === "false") {
							flagValue = false;
						}
						setDataToScope(flagKey, scope, flagValue, $injector);
					});
				}
			};
		})

		.directive("boolean", function () {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function (scope, ele, attr, ctrl) {

					var formatter = function (value) {
							return value ? 'true' : 'false';
						},
						parser = function (value /*,e*/ ) {
							return value !== 'false' && value !== '0';
						};

					ctrl.$formatters.unshift(formatter);
					ctrl.$parsers.unshift(parser);
				}
			};
		})

		.directive("number", function ($filter /*,$compile, $locale, $window*/ ) {
			return {
				restrict: 'A',
				require: '?ngModel',
				link: function (scope, ele, attr, ctrl) {
					if (attr.ngModel) {
						var precision = parseFloat(attr.precision),
							type = attr.number || 'number',
							percentModifier = 1,
							filter,
							parser,
							formatter,
							min,
							max,
							forceRange,
							removeFormat,
							applyFormat,
							resolveDataPercent = function (value) {
								return value / percentModifier;
							},
							resolveViewPercent = function (value) {
								return value * percentModifier;
							};

						if (!$filter(type)) {
							type = 'number';
						} else if (type === 'percent') {
							percentModifier = 100;
						}

						filter = $filter(type);

						if (isNaN(precision)) {
							precision = undefined;
						}

						// Where formattedValue = 3.00%
						// 	return: 3.00 (plainValue)
						removeFormat = function (formattedValue) {
							return $filter("naturalNumber")(formattedValue, precision);
						};

						// Where plainValue = 3.00 for 0.03 (3%)
						// 	return: %3.00 (formattedValue)
						applyFormat = function (plainValue) {
							// remove anything NOT a number
							plainValue = $filter('naturalNumber')(plainValue, precision);
							plainValue = resolveDataPercent(plainValue);
							return filter(plainValue, precision);
						};

						// Where value = modelValue 0.03 (for 3%)
						ctrl.$render = function (value) {
							// console.log('RENDER');
							// Take entered value and apply the format
							value = value || ctrl.$modelValue;
							// applyFormat() will divide by 100; filter('percent') already does *100
							// But $formatters will only use applyFormat
							value = resolveViewPercent(value);
							ctrl.$viewValue = applyFormat(value);
							ele.val(ctrl.$viewValue);
						};

						// Executes when model data changed and view must be updated
						formatter = function (value) {
							// console.log('FORMATTER');
							return applyFormat(value);
						};

						parser = function (value) {
							// console.log('PARSER');
							value = cleanValue(value);
							value = stringToNumber(value, precision);
							value = resolveDataPercent(value);

							// if meriValid is present, let it take care of min-max validation
							if (!attr.meriValid) {
								min = attr.min && attr.min !== '' ? stringToNumber(attr.min, precision) : undefined;
								max = attr.max && attr.max !== '' ? stringToNumber(attr.max, precision) : undefined;
								forceRange = attr.forceRange === "false" ? false : true;

								if (forceRange) {
									if (min !== undefined) {
										value = Math.max(min, value);
									}
									if (max !== undefined) {
										value = Math.min(max, value);
									}
								}
							}
							return value;
						};

						ctrl.$formatters.unshift(formatter);
						ctrl.$parsers.unshift(parser);

						ele.on("focus", function ( /*e*/ ) {
							// console.log('focus...');
							// Get and modify model value before raw display
							var value = resolveViewPercent(ctrl.$modelValue);
							// Set new view value
							ctrl.$setViewValue($filter("naturalNumber")(value, precision));
							// Update field element display
							ele.val(ctrl.$viewValue);
						});

						ele.on("blur", function ( /*e*/ ) {
							// console.log('blur...');
							// Set view value to formatted current view value
							// !! WARNING This value hasn't gone through parsers or validation yet
							ctrl.$setViewValue(applyFormat(ctrl.$viewValue));
							// Update field element display
							ele.val(ctrl.$viewValue);
						});
					}
				}
			};
		})

		/* Directive used on select html tag. It forces the select to keep their options values in string format but to save the selected value in number into the data object. */
		/* For example : We used this directive on payment frequency select. The value of the monthly option is : "1".But we want to have 1 in the data. We also use this directive on the product and term select field. */
		.directive("selectNumber", function ( /*$filter,$locale, $window*/ ) {

			function parser(value) {
				return stringToNumber(value);
			}

			function formatter(value) {
				return value + "";
			}

			return {
				restrict: 'A',
				require: 'ngModel',
				link: function (scope, ele, attr, ctrl) {
					ctrl.$formatters.unshift(formatter);
					ctrl.$parsers.unshift(parser);
				}
			};
		})
		/* Directive that permit to control the tabData service */
		/* This directive should be put on a A html element */
		/* The tabValue will */
		.directive("tabDefaultValue", function (tabData) {
			return {
				restrict: 'A',
				link: function (scope, ele, attr /*, ctrl*/ ) {
					var tabValue = attr.tabDefaultValue || "",
						tabValueSp = tabValue.split(":"),
						tabGroupName,
						tabGroupValue;

					if (tabValueSp.length == 2) {
						tabGroupName = tabValueSp[0];
						tabGroupValue = tabValueSp[1];

						tabData.setCurrentTab(tabGroupName, tabGroupValue);
					}

				}
			};
		})
		/* Directive that permit to control the tabData service */
		/* This directive should be put on a A html element */
		/* the tab-group determine which group value will be set by clicking on this elem */
		.directive("tabGroup", function (tabData) {
			return {
				restrict: 'A',
				link: function (scope, ele, attr /*, ctrl*/ ) {
					var tabName = attr.href || attr.tabValue,
						tabGroup = attr.tabGroup,
						storedValue = getStoredData(tabGroup + '-tab');

					if (typeof tabGroup === "string" && typeof tabName === "string") {
						tabName = tabName.replaceAll("#", "");
						if (attr.tabDefault && attr.tabDefault === "true" && !storedValue || storedValue === tabName) {
							tabData.setCurrentTab(tabGroup, tabName);
						}
					}

					ele.on('click', function (e) {
						e.preventDefault();
						e.stopPropagation();

						tabData.setCurrentTab(attr.tabGroup, tabName);
						scope.$apply();
					});
				}
			};
		})
		/* Directive that permit to save the current element ngModel value into the localStorage */
		/* The directive will also get back the value from the localStorage and inject it onto the ngModel */
		.directive('ngStorage', function () {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function ($scope, $element, $attrs /*, ngModel*/ ) {

					var ngModelStr = $attrs.ngModel,
						ngModelStrSplit = ngModelStr.split("."),
						x = 0,
						len = ngModelStrSplit.length,
						obj = $scope,
						last = len - 1,
						key;

					for (; x < len; x++) {
						key = ngModelStrSplit[x];

						if (x === last) {
							obj[key] = getStoredData($attrs.ngModel);
						} else {
							if (obj[key]) {
								obj = obj[key];
							} else {
								obj = obj[key] = {};
							}
						}
					}

					$scope.$watch($attrs.ngModel, function (value) {
						setStoredData($attrs.ngModel, value);
					});

				}
			};
		})

		//Range Slider which accepts min,max,default value
		.directive('meriRangeSlider', function ($rootScope) {
			var tpl = "<div class='slider-cont form-group'>" +
				"<div class='slider-container'><div class='slider-content'>" +
				"<input aria-hidden='true' id='{{sliderId}}' class='slider' type='range' min='{{min}}' max='{{max}}' step='{{step}}' value='{{defaultVal}}' ng-model='defaultVal' />" +
				"<div class='slider-label'><span>{{displayMin || min}}</span>" +
				"<span>{{displayMax||max}}<span></div></div>" +
				"<div class='slider-text'><input id='{{sliderTextId}}' aria-label='{{label}}' maxlength='{{maxLen}}' ng-model=defaultVal  /></div></div></div>";

			return {
				restrict: 'E',
				template: tpl,
				scope: {
					min: '=',
					max: '=',
					savingDuration:'=',
					defaultVal: '=defaultVal',
					step: '=',
					sliderId: '=',
					displayMin: '=',
					displayMax: '=',
					sliderTextId: '=',
					maxLen:'=',
					label:'='
				},
				link: function ($scope, $elm) {
					$elm.on('change', function () {
						handleEvents('change');
					});

					// change value from inputbox
					$elm.on('keyup', function (event) {
						handleEvents('blur');
					});
					console.log($scope.label)
					$scope.$on('resetSlider', function (e, slider) {
						var sliderElm = $('#' + slider.sliderId)[0],
							outputVal = ((slider.defaultVal - slider.min) / (slider.max - slider.min));
						sliderElm.style.backgroundImage = '-webkit-gradient(linear, left top, right top, ' +
							'color-stop(' + outputVal + ', #06816E), ' +
							'color-stop(' + outputVal + ', #fff)' +
							')';
						if(slider.isError)	removeError();
						if (slider.callback) {
							slider.callback(slider.defaultVal);
						}
					});

					function handleEvents(eventName){
						var inputVal = parseInt(document.getElementById($scope.sliderTextId).value),
							isMin = (inputVal <= $scope.min || isNaN(inputVal)) ? true : false;
						if(isInputValid(inputVal)){
							updateSlider(inputVal);
							removeError();
						}else{
							updateSlider(inputVal);
							if(eventName === 'change' ){
								$rootScope.$broadcast('setDefaultVal', $scope.sliderId, isMin);
								addError();
								var slider = $('#' + $scope.sliderId)[0];
								slider.max = $scope.max;
								slider.min = $scope.min;
							} 
							
						}
					}

					function addError(){
						var parentElem = $elm[0].children[0];
						var errElm = parentElem.getElementsByClassName('error-message');
						if(errElm.length === 0){
							var errorElem = '<span>Value entered has been adjusted to the minimum or maximum value allowed.</span>';
							var span = document.createElement('div');
							span.classList.add("error-message");
							span.innerHTML = errorElem;
							parentElem.appendChild(span);
						}
						parentElem.classList.add('error');
					}

					function removeError(){
						var parentElem = $elm[0].children[0];
						var errElm = parentElem.getElementsByClassName('error-message');
						$(errElm).remove();
						parentElem.classList.remove('error');
					}

					function isInputValid(inputVal){
						if((inputVal >= $scope.min) && (inputVal<= $scope.max)){
							return true;
						}
						return false;
					}
					
					function updateSlider(inputValue) {
						var slider = $('#' + $scope.sliderId)[0];
						slider.max = $scope.max;
						slider.min = $scope.min;
						
						if(isNaN(inputValue)){
							slider.max = slider.min = inputValue = 0;	
						}

						var outputVal = ((inputValue - $scope.min) / ($scope.max - $scope.min));
						slider.style.backgroundImage = '-webkit-gradient(linear, left top, right top, ' +
							'color-stop(' + outputVal + ', #06816E), ' +
							'color-stop(' + outputVal + ', #fff)' +
							')';
					}
				}

			};
		})

		.directive('meriSelect', function ($compile) {

			var directiveDefinitionObject = {
				restrict: 'E',
				// transclude: true,
				transclude: false,
				scope: {
					fieldSpecs: '<'
				},
				replace: true,
				controller: function ($scope, $element, $attrs /*,$transclude*/ ) {

					var excludeAttrTransfer = {
							fieldSpecs: true,
							fieldValidation: true,
							binding: true,
							label: true
						},
						addAttributes = [],
						filterDirective,
						binding = $attrs.binding,
						fieldSpecs = $scope.fieldSpecs || {};


					// // Replace <transclude-content> element with content inserted in meri-select
					// $transclude(function(clone, scope) {
					// 	$element.find('transcluded-content').replaceWith(clone);
					// 	// transcludedContent = clone;
					// 	// transclusionScope = scope;
					// });

					$scope.options = fieldSpecs.options || [];

					$scope.label = fieldSpecs.label || '';

					switch (fieldSpecs.directive) {
						case 'boolean':
							filterDirective = 'boolean';
							break;
						case 'year':
						case 'percent':
						case 'currency':
						case 'number':
							filterDirective = 'select-number';
							break;
						default:
							filterDirective = false;
					}

					addAttributes.push({
						attr: 'ng-model',
						value: binding
					});

					$scope.label = fieldSpecs.label || $attrs.label || "";

					if (filterDirective) addAttributes.push({
						attr: filterDirective,
						value: fieldSpecs.directive
					});
					if (fieldSpecs.precision !== undefined) addAttributes.push({
						attr: 'data-precision',
						value: fieldSpecs.precision
					});
					// if ($attrs.fieldValidation) addAttributes.push({attr: 'meri-valid', value: $attrs.fieldValidation });
					if ($attrs.fieldValidation) addAttributes.push({
						attr: 'meri-form-valid',
						value: $attrs.fieldValidation
					});

					for (prop in $attrs.$attr) {
						if (excludeAttrTransfer[prop] === undefined) {
							addAttributes.push({
								attr: $attrs.$attr[prop],
								value: $attrs[prop]
							});
						}
					}

					$scope.selectAttributes = addAttributes;
				},
				compile: function compile( /*tElement, tAttrs*/ ) {

					return {
						// Before Link compile
						pre: function preLink(scope, elem /*, attrs, ctrl*/ ) {
							var i = 0,
								len = scope.selectAttributes.length,
								prop,
								select = elem.find('select');
							for (; i < len; i++) {
								if (scope.selectAttributes[i].attr === 'class') {
									select.addClass(scope.selectAttributes[i].value || '');
								} else {
									select.attr(scope.selectAttributes[i].attr, scope.selectAttributes[i].value !== undefined ? scope.selectAttributes[i].value : '');
								}
							}

							select.on('keyup', function (e) {
								var eKey = e.which || e.key,
									selected = select.find("option:selected");
								if ((eKey === 38) || (eKey === 40)) {
									select.change();

									// console.log('KEY UP, current now',selected.val());
									return false;
								}


							});

							// select.on('keydown',function(e){
							// 	var eKey = e.which || e.key,
							// 		selected = select.find("option:selected"),
							// 		next = selected.next(); // previous
							// // 	if ( (eKey === 38 && !selected.is(":first-child")) || (eKey === 40 && !selected.is(":last-child")) ) {    //    up arrow
							// // 		// console.log('----- KEYDOWN value:',selected.val(),select);
							// // 		console.log('----- KEYDOWN value:',selected.val(),select);
							// // 		select.change();
							// // 		return false;
							// // 	}

							// 	// console.log('KEY DOWN, current, next',selected.val(),next.val());
							// 	return false;
							// });
						},
						// After Link compile
						// Attach events here
						post: function postLink(scope, elem /*, attrs, ctrl*/ ) {
							$compile(elem.contents())(scope.$parent);
						}
					};
				},

				template: function (element, attr) {
					return '<div class="form-group">' +
						'<label for="{{ label }}">{{ label }}</label>' +
						'<select id="{{ label }}" class="form-control">' +
						'<option ng-repeat="option in options" value="{{ option.value }}">{{ option.label }}</option>' +
						'</select>' +
						// '<transcluded-content></transcluded-content>' +
						'<span class="clearfix"></span>' +
						'</div>';
				}
			};

			return directiveDefinitionObject;
		})

		.directive('meriTooltip', function ($compile) {
			var template = {
					tooltip: '<a href="javascript:void(0)" class="br-icon" uib-tooltip="{{ getMeriTooltipContent() }}">&nbsp;</a>'
				},

				directiveDefinitionObject = {
					restrict: 'E',
					transclude: false,
					scope: {
						parent: '=',
						message: '='
					},
					replace: true,
					controller: function ($scope, $element, $attrs, $interpolate) {
						$scope.getMeriTooltipContent = function () {
							if (typeof $scope.message.getMessage) {
								return $interpolate($scope.message.getMessage())($scope.parent || $scope.$parent);
							} else if (typeof $scope.message === 'string') {
								return $interpolate($scope.message)($scope.parent || $scope.$parent);
							} else {
								return '';
							}
						};
					},
					compile: function compile(tElement, tAttrs) {
						return {
							// Before Link compile
							pre: function preLink( /*scope, elem, attrs, ctrl*/ ) {},
							// After Link compile
							// Attach events here
							post: function postLink( /*scope, elem, attrs, ctrl*/ ) {}
						};
					},

					template: function (element, attr) {
						return template.tooltip;
					}
				};

			return directiveDefinitionObject;
		})

		.directive('meriInput', function ($compile, $interpolate) {

			var template = {
					meriTooltip: '<meri-tooltip parent="parent" message="tooltip"></meri-tooltip>',
					// unbreakable:{open:'<span class="unbreakable">',close:'</span>'}
					unbreakable: '<span class="unbreakable"></span>'
				},

				// 
				directiveDefinitionObject = {
					restrict: 'E',
					// transclude: true,
					transclude: false,
					scope: {
						fieldSpecs: '<',
						value: '=binding'
					},
					replace: true,
					controller: function ($scope, $element, $attrs /*,$transclude*/ ) {
						var excludeAttrTransfer = {
								fieldSpecs: true,
								fieldValidation: true,
								binding: true,
								label: true
							},
							inputAttributes = [],
							filterDirective,
							fieldSpecs = $scope.fieldSpecs || {},
							binding = $attrs.binding,
							prop;

						$scope.parent = $scope.$parent;

						// // Replace <transclude-content> element with content inserted in meri-input
						// $transclude(function(clone, scope) {
						// 	$element.find('transcluded-content').replaceWith(clone);
						// 	// transcludedContent = clone;
						// 	// transclusionScope = scope;
						// });
						if ($attrs.fieldSpecs && $attrs.fieldSpecs !== '' && $attrs.fieldSpecs.split('.').length > 1) {
							$scope.name = 'meri-' + $attrs.fieldSpecs.split('.').slice(1).join('-');
						} else {
							$scope.name = 'meri-' + ($attrs.fieldSpecs || '');
						}

						$scope.id = $scope.$parent.$eval($attrs.id) || $attrs.id || '';

						switch (fieldSpecs.directive) {
							case 'boolean':
								filterDirective = 'boolean';
								break;
							case 'year':
							case 'percent':
							case 'currency':
								$scope.filter = fieldSpecs.directive;
								$scope.fieldType = 'number';
								// CAN remove:
								filterDirective = 'number';
								break;
							default:
								filterDirective = false;
						}



						inputAttributes.push({
							attr: 'ng-model',
							value: binding,
						});

						inputAttributes.push({
							attr: 'aria-label'
						});

						$scope.binding = binding;
						$scope.label = fieldSpecs.label || $attrs.label || "";

						if (filterDirective) {
							// CAN upgrade:
							inputAttributes.push({
								attr: filterDirective,
								value: fieldSpecs.directive
							});
						}
						if (fieldSpecs.precision !== undefined) {
							$scope.filterOption = fieldSpecs.precision;
							// CAN remove:
							inputAttributes.push({
								attr: 'data-precision',
								value: fieldSpecs.precision
							});
						}
						if ($attrs.fieldValidation) inputAttributes.push({
							attr: 'meri-form-valid',
							value: $attrs.fieldValidation
						});
						if (fieldSpecs.tooltip) {

							$scope.tooltip = customMessageFactory(fieldSpecs.tooltip);
							// TEMPORARY!!!
							// Create function to get a parse-safe string from $attrs.tooltipCustoms
							if ($attrs.tooltipCustoms) {
								$scope.tooltip.setCustom(JSON.parse($attrs.tooltipCustoms.split("'").join('"')));
							}
						}

						for (prop in $attrs.$attr) {
							if (excludeAttrTransfer[prop] === undefined) {
								inputAttributes.push({
									attr: $attrs.$attr[prop],
									value: $attrs[prop]
								});
							}
						}

						$scope.inputAttributes = inputAttributes;
					},
					compile: function compile(tElement, tAttrs) {

						return {
							// Before Link compile
							pre: function preLink(scope, elem /*, attrs, ctrl*/ ) {
								var i = 0,
									len = scope.inputAttributes.length,
									prop,
									input = elem.find('input'),
									label = elem.find('label'),
									labelText,
									labelLastWord;
								for (; i < len; i++) {
									if (scope.inputAttributes[i].attr === 'class') {
										input.addClass(scope.inputAttributes[i].value || '');
										elem.removeClass(scope.inputAttributes[i].value || '');
									} else {
										input.attr(scope.inputAttributes[i].attr, scope.inputAttributes[i].value !== undefined ? scope.inputAttributes[i].value : '');
									}
								}
								input.attr('aria-label','Enter '+scope.fieldSpecs.label);
								//console.log(input)

								if (scope.tooltip) {
									labelText = scope.label.split(' ');
									labelLastWord = labelText.pop();


									scope.label = labelText.join(' ') + ' ';
									prop = $(template.unbreakable).text(labelLastWord).append($compile(template.meriTooltip)(scope));

									labelText = label.text('{{ label }} ').append(prop);
								}
							},
							// After Link compile
							// Attach events here
							post: function postLink(scope, elem /*, attrs, ctrl*/ ) {
								$compile(elem.contents())(scope.$parent);
							}
						};
					},

					template: function (element, attr) {
						return '<div class="form-group">' +
							'<label for="{{ id }}">{{ label }}</label>' +
							'<input id="{{ id }}" name="{{ id }}" class="form-control" type="text" ng-model-options="\{ updateOn: \'blur\',allowInvalid: \'true\' \}"/>' +
							// '<input id="{{ id }}" name="{{ id }}" class="form-control" type="{{ fieldType }}" ng-model-options="\{ updateOn: \'blur\',allowInvalid: \'true\' \}"/>' +
							// '<span class="view-value" ng-if="filter===\'currency\'">{{ value | currency:filterOption }}</span>'+
							// '<span class="view-value" ng-if="filter===\'percent\'">{{ value | percent:filterOption }}</span>'+
							// '<span class="view-value" ng-if="filter===\'year\'">{{ value | year:filterOption }}</span>'+
							'<span class="clearfix"></span>' +
							'</div>';
					}
				};

			return directiveDefinitionObject;
		})

		.directive('chart', function () {
			return {
				restrict: 'E',
				require: '?ngModel',
				transclude: true,
				scope: {
					value: '=ngModel',
					highchart: '=highchart'
				},
				link: function (scope, elem, attrs, ngModel) {
					if (!ngModel || !window.Highcharts) return;
					var isChartHISA = elem.hasClass('chartHISA');
					if (isChartHISA) {
						//window.Highcharts.wrap(window.Highcharts.Tooltip.prototype, 'hide', function (defaultCallback) {});
						/**
						 * Override the reset function, we don't need to hide the tooltips and crosshairs.
						 */
						window.Highcharts.Pointer.prototype.reset = function () {
							return undefined;
						};
					}

					ngModel.$render = function () {
						scope.value = ngModel.$modelValue;

						if (scope.value) {

							elem.highcharts(scope.value);

							if (attrs.highchart) {
								scope.highchart = elem.highcharts();
							}

							var count = 0,
								countMax = 10,
								tmFunc = function () {
									++count;
									if (elem.is(':visible')) {
										if (count !== 1) {
											elem.highcharts().reflow();
											elem.highcharts().redraw();
										}
									} else if (count < countMax) {
										setTimeout(tmFunc, 100);
									}
								};
							tmFunc();
						}
					};
				}
			};
		})

		.directive("meriFormValid", function ($compile) {

			var validStr = 'validation',
				directiveDefinitionObject = {
					restrict: 'A',
					require: '?ngModel',
					scope: true,

					link: function (scope, elem, attrs, ngModelCtrl) {

						var parentElem = elem.parents('.form-group'),
							validator = function (value) {
								return value;
							},
							errorElem, v;

						v = scope.$parent.$eval(attrs.meriFormValid) || {} /*validationConfig[validStr][propName] = factoryValidation( specs )*/ ;

						if (!parentElem.length) parentElem = elem.parent();
						if (parentElem.length > 1) parentElem = parentElem.eq(0);

						if (v && typeof v.validate === 'function') {

							// This will allow the validation object to trigger the ngModel validator
							v.setModel(ngModelCtrl);

							if (!parentElem.find('.error-message').length) parentElem.append('<span class="error-message"></span>');

							errorElem = parentElem.find('.error-message');

							// parentElem.append('<span class="error-message"></span>');

							// errorElem = parentElem.find('.error-message');

							if (elem[0].tagName === 'INPUT') {

								validator = function (value) {
									// console.log('validate value',value,ngModelCtrl.$modelValue,ngModelCtrl);
									var valid;

									if (v && typeof v.validate === 'function') {

										valid = v.validate(value);
										if (valid !== true) {
											// set error message
											errorElem.text(valid.message);
											$compile(errorElem.contents())(scope.$parent);
											// Make error visible
											parentElem.addClass('error');

											value = valid.value;
											// Update view value with validated value (will format value)
											// Render function from "number" also updates $modelValue
											ngModelCtrl.$viewValue = value;
											//ngModelCtrl.$modelValue = value;
											ngModelCtrl.$render(value);
											// ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
											// elem.val(ngModelCtrl.$viewValue);
											// Commit view value to the actual model (and corrects any unsynchronised data between view/model)
											// This step will recommit the value through the $parsers & $validators pipelines
											ngModelCtrl.$commitViewValue();
										}
									}

									// console.log('VALIDATOR value',value,ngModelCtrl.$pending);
									return value;
								};
							} else if (elem[0].tagName === 'SELECT') {

								validator = function (value) {
									var valid;

									if (v && typeof v.validate === 'function') {
										valid = v.validate(value);
										if (valid !== true) {

											value = valid.value;
											// Update view value with validated value (will format value)
											// Render function from "number" also updates $modelValue
											ngModelCtrl.$viewValue = value;
											ngModelCtrl.$render(value);
											elem.val(ngModelCtrl.$viewValue);
											elem.find('option[value="' + value + '"]').eq(0).prop('selected', true);
											ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
											// Commit view value to the actual model (and corrects any unsynchronised data between view/model)
											// This step will recommit the value through the $parsers & $validators pipelines
											ngModelCtrl.$commitViewValue();

											// set error message
											errorElem.text(valid.message);
											$compile(errorElem.contents())(scope.$parent);
											// Make error visible
											parentElem.addClass('error');
										}
									}
									return value;
								};
							}

							ngModelCtrl.$validators.meriValid = validator;

							// Errors are always removed from element onBlur
							// Event order:
							// 	focus
							// 	blur
							// 	parsers
							// 	validators
							// If errors remain, validator will reset error
							elem.on('blur', function ( /*event*/ ) {
								parentElem.removeClass('error');
								errorElem.text('');
							});
						}
					}
				};
			return directiveDefinitionObject;
		})

		/////////////
		// FILTERS //
		/////////////
		// html
		// 	Allow ng-bind-html to render html tags
		// 	To enable render expression, use bind-html-compile directive (plug-in)
		.filter('html', ['$sce', /*'$compile',*/ function ($sce /*,$compile*/ ) {

			return function (text) {
				return $sce.trustAsHtml(text);
			};
		}])
		// number
		// 	Filter to convert a displayed value into numeral string
		.filter('number', function () {
			return function (val, precision, round, natural) {
				var hasPrecision,
					roundFct = Formula.ROUND
				/*,
								indexStart,
						  		len,
						  		supposeLen*/
				;
				if (typeof precision === "string") {
					precision = stringToNumber(precision);
				}
				hasPrecision = typeof precision === "number";
				val = stringToNumber(val);
				round = stringToNumber(round);

				if (round < 0) {
					roundFct = Formula.ROUNDDOWN;
				} else if (round > 0) {
					roundFct = Formula.ROUNDUP;
				}

				if (hasPrecision) {

					val = roundFct(val, precision);

					if (!natural) {
						// WARNING toLocaleString() is not compatible with IE9
						// val = val.toLocaleString(getLanguage());
						val = formatGeneral(val, precision, getLanguage());
					}
				}
				return val + "";
			};
		})

		.filter('naturalNumber', function ($filter) {
			return function (val, precision, round) {
				val = $filter('number')(val, precision, round, true);
				return val;
			};
		})
		// percent
		// 	Filter to convert a displayed value into numeral percentage string
		.filter('percent', function ($filter) {
			return function (val, precision, round) {
				val = stringToNumber(val);
				val *= 100;
				val = $filter('number')(val, precision, round);
				return val + "%";
			};
		})
		//year
		.filter('year', function ($filter) {
			return function (val, precision, round) {
				var lg = getLanguage(),
					word;

				if (lg === 'en') {
					word = 'year';
				} else if (lg === 'fr') {
					word = 'an';
				}

				if (word) {
					val = $filter('number')(val, precision, round);
					val = val + " " + plurializeWordWithNumber(word, val);
				}

				return val;
			};
		})
		.filter('month', function ($filter) {
			return function (val, precision, round) {

				var lg = getLanguage(),
					word;

				if (lg === 'en') {
					word = 'month';
				} else if (lg === 'fr') {
					word = 'mois';
				}

				if (word) {
					val = val * 365.25 / (365.25 / 12);
					val = $filter('number')(val, precision, round);
					val = val + " " + (lg !== 'fr' ? plurializeWordWithNumber(word, val) : word);
				}
				return val;
			};
		})
		.filter('day', function ($filter) {
			return function (val, precision, round) {

				var lg = getLanguage(),
					word;

				if (lg === 'en') {
					word = 'day';
				} else if (lg === 'fr') {
					word = 'jour';
				}

				if (word) {
					val = val * 365.25;
					val = $filter('number')(val, precision, round);
					val = val + " " + plurializeWordWithNumber(word, val);
				}
				return val;
			};
		})
		.filter("moreThanAYear", function ($filter) {
			return function (val, precision, round) {

				val = $filter('number')(val, precision, round);

				if (val < 1) {
					return "< " + $filter('year')(1, precision, round);
				}
				return $filter('year')(val, precision, round);
			};
		})
		//currency
		.filter('currency', function ($filter) {
			return function (val, precision, round) {
				var lg = getLanguage();
				val = $filter('number')(val, precision, round);

				if (lg === 'en') {
					val = "$" + val;
				} else if (lg === 'fr') {
					val = val + "$";
				}
				return val;

			};
		})
		/////////////
		// SERVICE //
		/////////////

		.service("tabData", function () {
			var data = {
				tabList: {

				}
			};

			this.setCurrentTab = function (tabGroupName, tabName) {
				if (typeof tabGroupName === "string" && typeof tabName === "string") {
					tabName = tabName.replaceAll("#", "");
					data.tabList[tabGroupName] = tabName;
					setStoredData(tabGroupName + '-tab', tabName);
					var tabGroupElem = $('[ng-app="br-calc"] [tab-group=' + tabGroupName + ']'),
						currentTabGroupElem = tabGroupElem.filter("[href='#" + tabName + "']"),
						otherTabGroupElem = tabGroupElem.not(currentTabGroupElem);

					currentTabGroupElem.addClass('br-selected');
					otherTabGroupElem.removeClass('br-selected');
				}
			};

			this.getCurrentTab = function (tabGroupName) {
				return data.tabList[tabGroupName];
			};
		})
		// TODO: Remove validation responsibility from scenarios
		// TODO: Replace all older meri input with NEW optimised meri-input
		.service("scenarios", ['contentManager', function (contentManager) {

			var me = this,
				// appScenariosConfig = contentManager.getConfig('scenarios',true);
				appScenariosConfig = contentManager.getConfig('scenarios');

			this.scenarios = {
				model: {

					data: {
						scenarios: [],
						scenarioModel: {
							data: {},
							results: {},
							validation: {},

							validate: validateScenario
						}
					},

					results: {},

					validation: {},

					getScenario: getScenario
				}
			};

			this.getScenario = function (name, index) {
				return me.getScenarios(name).getScenario(index);
			};

			this.getScenarios = function (name) {

				var scenarioFamily = name && me.scenarios[name];
				if (!scenarioFamily) {
					if (name !== undefined && name !== '') {

						if (!me.scenarios[name] && appScenariosConfig[name]) {
							// scenarioFamily = me.scenarios[name] = $.extend(true,{},me.scenarios.model,appScenariosConfig[name]);
							scenarioFamily = me.scenarios[name] = $.extend(true, appScenariosConfig[name], me.scenarios.model);
							createDefaultValidation(scenarioFamily);
						}
					}
				}
				scenarioFamily = me.scenarios[name] = scenarioFamily || $.extend(true, {}, me.scenarios.model);
				return scenarioFamily;
			};

			// Internal methods
			// This => reference to the element from which it is called
			function getScenario(index) {
				var scenario = this.data.scenarios[index];
				if (!scenario) {
					scenario = this.data.scenarios[index] = newScenario(this.data.scenarioModel);
					scenario.data.index = index;
				}
				return scenario;
			}

			function newScenario(model, overridingModel) {

				var scenario = $.extend(true, {}, model || {}, overridingModel || {});
				createDefaultValidation(scenario);

				scenario.resetScenario = getDefaultResetFunction(scenario);

				return scenario;
			}

			function getDefaultResetFunction(defaultModel) {
				var defaultScenario = $.extend(true, {}, defaultModel);
				return function () {
					$.extend(true, this, defaultScenario);
				};
			}

			function resetScenario() {

				var scenario = this.data.scenarios[index];
				if (scenario) {
					scenario = this.data.scenarios[index] = newScenario(this.data.scenarios[index], this.data.scenarioModel);
					scenario.data.index = index;
				}
				return scenario;
			}

			function createDefaultValidation(scenario) {
				var prop;
				// Remains for now in order to be backward compatible.
				// REMOVE when other cals config is modified
				for (prop in scenario.validation) {
					scenario.validation[prop] = factoryValidation(scenario.validation[prop]);
					// scenario.validation[prop].setValue(scenario.data[prop]);
				}
			}

			function validateScenario() {
				var prop;
				for (prop in this.validation) {
					this.validation[prop].triggerValidation();
				}
			}
		}]);

	// {
	// 	currentAge:'sce.data.currentAge',
	// 	8:88,
	// 	'lala':97,
	// 	"yup":[2,4,'trevor',"another"],
	// 	last:{
	// 		currentAge:'sce.data.currentAge',
	// 		8:88,
	// 		'lala':97,
	// 		"yup":[2,4,'trevor',"another"]
	// 	}
	// }
	// 
	// var TESTING = "{currentAge:'sce.data.currentAge',8:88,'lala':97,\"yup\":[2,4,'trevor',\"another\"],last:{currentAge:'sce.data.currentAge',8:88,'lala':97,\"yup\":[2,4,'trevor',\"another\"]}}";

	// function getParseFriendlyString (str,recurrent) {
	// 	var parseFriendlyStr='',
	// 		allSplit = str.split(':'),
	// 		i=0,
	// 		allLen=allSplit.length,
	// 		isProp=true,
	// 		// isValue=false,
	// 		isOpenQuote=false;

	// 	for (;i<allLen;i++) {

	// 	}

	// 	if (!recurrent) {
	// 		parseFriendlyStr = '"' + parseFriendlyStr + '"';
	// 	}

	// 	return parseFriendlyStr;
	// }

	// console.log(getParseFriendlyString(TESTING));

	function customMessageFactory(options) {
		var me = typeof options === 'string' ? {
				message: options
			} : options || {},
			renderedMessage = me.message || '';

		me.message = renderedMessage;
		me.custom = me.custom || {};

		function generateMessage() {
			var m = me.message,
				prop;
			for (prop in me.custom) {
				if (m.indexOf('[' + prop + ']') !== -1) m = m.split('[' + prop + ']').join(me.custom[prop]);
			}
			return m;
		}

		function updateRenderedMessage() {
			renderedMessage = generateMessage();
		}

		function updateCustoms(customs) {
			customs = typeof customs === 'object' && customs !== null && customs || {};
			$.extend(true, me.custom, customs);
		}

		return {
			getMessage: function () {
				return renderedMessage;
			},
			setCustom: function (options) {
				updateCustoms(options);
				updateRenderedMessage();
				return this;
			}
		};
	}


	var factoryValidation = function (c) {
		// Even undefined validation config should get a validation object, as a blank slate for future setup
		var validationConfig = $.extend(true, {
				rules: []
			}, c || {}),
			defaultIsValid = true,
			currentValue,
			rulesDictionnary = {
				readjust: {
					name: 'readjust',
					validate: function (value, validationObject) {
						var bustMin = validationObject.min !== undefined && value < validationObject.min,
							bustMax = validationObject.max !== undefined && value > validationObject.max;
						if (bustMin || bustMax) {
							if (bustMin) this.correctedValue = validationObject.min;
							if (bustMax) this.correctedValue = validationObject.max;
						}

						return !(bustMin || bustMax);
					},
					message: '{{ content.errors.readjust }}'
				},
				default: {
					name: 'default',
					validate: function () {
						return defaultIsValid;
					},
					message: '{{ content.errors.default }}',
					priority: 0 // 0 = no rule priority, 1 = highest priority, 2 = lower priority, etc.
				}
			},
			ngModelCtrl; // needed in order to programatically trigger ngModel validator

		function generateError(value, validationObject) {
			return {
				name: validationObject.currentRule.name,
				message: customizeMessage(validationObject, validationObject.currentRule),
				value: currentValue
			};
		}

		function customizeMessage(validationObject, rule) {
			var message = rule.message,
				customize = rule.customize,
				key,
				prop;

			if (customize) {
				for (prop in customize) {
					key = '[' + prop + ']';
					message = message.split(key).join(getItemAtPath(customize[prop], validationObject) + '');
				}
			}
			return message;
		}

		// Validate and set default values
		function validateRulesConfig() {

			var i = 0,
				len = validationConfig.rules && validationConfig.rules.length || 0,
				rule,
				dictRule;

			if (!len && c.validation !== false) {
				// When setting validation rules, if no rule is set AND validation=false not specified,
				// assume default validation readjust
				// validationConfig.rules.push('readjust');
				validationConfig.rules.push(rulesDictionnary.readjust);
				len = 1;
			} else if (c.validation === false) {
				validationConfig.rules.push(rulesDictionnary.default);
				len = 1;
			}

			for (; i < len; i++) {
				rule = validationConfig.rules[i];

				dictRule = rulesDictionnary[rule.name || ''];
				// Validate function && name
				if (typeof rule === 'string' && rulesDictionnary[rule]) {
					rule = validationConfig.rules[i] = rulesDictionnary[rule];
				} else if (typeof rule.validate === 'string' && rulesDictionnary[rule.validate]) {
					if (rule.name === undefined) {
						rule.name = rulesDictionnary[rule.validate].name;
					}
					if (rule.priority === undefined) {
						rule.priority = rulesDictionnary[rule.validate].priority || rulesDictionnary.default.priority;
					}
					if (rule.message === undefined) {
						rule.message = rulesDictionnary[rule.validate].message || rulesDictionnary.default.message;
					}
					rule.validate = rulesDictionnary[rule.validate].validate;
				} else if (!rule.validate || typeof rule.validate !== 'function') {
					rule.validate = dictRule && dictRule.validate || rulesDictionnary.default.validate;
				}
				// Priority
				if (rule.priority === undefined) {
					rule.priority = rulesDictionnary.default.priority;
				} else if (typeof rule.priority !== 'number') {
					if (typeof rule.priority !== 'string') {
						rule.priority = rulesDictionnary.default.priority;
					} else {
						rule.priority = stringToNumber(rule.priority);
					}
				}
				// Message
				if (rule.message === undefined) {
					rule.message = dictRule && dictRule.message || rulesDictionnary.default.message;
				} else {
					rule.message = rule.message + '';
				}
				// Autocorrect
				if (rule.autocorrect === undefined) {
					rule.autocorrect = true;
				}
			}
		}

		// Validation filters
		function organiseByPriority() {
			validationConfig.rules = validationConfig.rules.sort(function (a, b) {
				return (a.priority || 9999999) - (b.priority || 9999999);
			});
		}

		function removeRule(name) {
			validationConfig.rules = validationConfig.rules.filter(function (a) {
				return a.name !== name;
			});
		}

		function getRuleByName(name) {
			return validationConfig.rules.filter(function (a) {
				return a.name === name;
			})[0];
		}

		// Refresh
		function refresh() {
			validateRulesConfig();
			organiseByPriority();
		}

		function setModel(modelCtrl) {
			if (modelCtrl && modelCtrl.$setDirty) {
				ngModelCtrl = modelCtrl;
			}
		}

		function setValue(value) {
			currentValue = value;
		}

		function addRule(rule) {
			var i = 0;
			if (rule && rule.name) {
				for (; i < validationConfig.rules.length; i++) {
					if (validationConfig.rules[i].name === rule.name) {
						$.extend(true, validationConfig.rules[i], rule);
						return;
					}
				}
			}
			validationConfig.rules.push(rule);
		}

		refresh();

		return {
			triggerValidation: function () {
				if (ngModelCtrl && ngModelCtrl.$validate && currentValue !== undefined) {

					// Because validating an unchanged field "invalidates" the value from angular's point of view,
					// modelValue sent back to the data is "undefined".
					// In order to prevent this, ng-model-options allowInvalid must be set to "true".
					// meri-input elements are set to support this.
					if (ngModelCtrl.$options === null || ngModelCtrl.$options === undefined) {
						ngModelCtrl.$options = {};
					}
					if (!ngModelCtrl.$options.allowInvalid) ngModelCtrl.$options.allowInvalid = true;

					ngModelCtrl.$validate();
				}
				return this;
			},

			setModel: function (modelCtrl) {
				setModel(modelCtrl);
				return this;
			},

			setValue: function (value) {
				setValue(value);
				return this;
			},

			set: function (propName, value, revalidate) {
				propName = propName !== undefined && propName !== 'rules' && propName + '' || '';
				validationConfig[propName] = value;
				if (revalidate === true) {
					return this.validate(currentValue);
				} else {
					return this;
				}
			},

			validate: function (value) {
				// console.log('validate', value, validationConfig.rules);
				var i = 0,
					len = validationConfig.rules.length,
					rule,
					isValid = true,
					reducedValidationConfig;

				this.setValue(value);

				for (; i < len; i++) {
					rule = validationConfig.rules[i];
					reducedValidationConfig = $.extend(true, {}, validationConfig, {
						currentRule: rule
					});
					// Autocorrect state is set to the whole validation object
					reducedValidationConfig.autocorrect = rule.autocorrect;

					isValid = rule.validate(currentValue, reducedValidationConfig);
					if (isValid !== true) {
						if (rule.autocorrect) setValue(rule.correctedValue !== undefined ? rule.correctedValue : value);
						isValid = generateError(currentValue, reducedValidationConfig);
						break;
					}
				}
				return isValid;
			},

			addRule: function (rule) {
				// console.log('addRule',rule);
				addRule(rule);
				refresh();
				// console.log('after addRule',validationConfig.rules);
				return this;
			},

			removeRule: function (name) {
				if (name && typeof name === 'string' && name !== '') removeRule(name);
				return this;
			},

			refresh: function () {
				refresh();
				return this;
			},

			hasRule: function (name) {
				return name !== undefined && getRuleByName(name).length || false;
			},

			// get : function (prop) {
			// 	return validationConfig[prop];
			// },

			trace: function () {
				console.log('DEBUG VALIDATOR', rulesDictionnary.readjust.rand);
				console.log('validationConfig', $.extend(true, {}, validationConfig));
				console.log('rules', $.extend(true, {}, validationConfig).rules);
				console.log('END DEBUG VALIDATOR', currentValue);

				return rulesDictionnary.readjust.rand;
			}
		};
	};

	window.getChangedPropertyName = function (oldData, newData) {
		var prop,
			changedValueProp;
		for (prop in newData) {
			if (typeof newData[prop] === 'object' && typeof oldData[prop] === 'object') {
				changedValueProp = getChangedPropertyName(oldData[prop], newData[prop]);
				if (typeof changedValueProp === 'string') return changedValueProp;
			} else if (oldData[prop] === undefined || oldData[prop] !== newData[prop]) {
				return prop;
			}
		}
		return false;
	};

	window.formatGeneral = function (v, p, lang) {
		p = p >> 0;
		var s1 = '',
			s2 = '',
			nbr = String.fromCharCode(160),
			t = lang == 'fr' ? nbr : ',',
			c = lang == 'fr' ? ',' : '.';

		v = isNaN(v = parseFloat("" + v)) ? 0 : v;
		v = v.toFixed(p !== undefined ? p : 2).split('.');
		v[0] = v[0].replace(/(\d)(?=(\d{3})+\b)/g, '$1' + t);

		return (s1 || '') + v.join(c) + (s2 || '');
	};

	window.plurializeWordWithNumber = function (word, num) {
		var lg = getLanguage();
		num = typeof num !== 'number' ? stringToNumber(num) : num;
		if (lg === 'fr' && num > 1) word = word + "s";
		else if (lg === 'en' && num !== 1) word = word + "s";
		return word;
	};

	window.setStoredData = function (key, val) {
		if (window.localStorage) window.localStorage.setItem(key, val);
	};

	window.getStoredData = function (key) {
		return window.localStorage && window.localStorage.getItem(key);
	};

	/* Extension od the string class */
	/* Method that replace all the found string by another one */
	// String.prototype.replaceAll = function (find, replace) {
	//     var str = this;
	//     return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&amp;'), 'g'), replace);
	// };

	String.prototype.replaceAll = function (search, replacement) {
		var target = this;
		replacement = replacement || "";
		return target.replace(new RegExp(search, 'g'), replacement);
	};

	String.prototype.toCamelCase = function (str) {
		return (str || this)
			.replaceAll("-", " ")
			.replaceAll("_", " ")
			.replace(/\s(.)/g, function ($1) {
				return $1.toUpperCase();
			})
			.replace(/\s/g, '')
			.replace(/^(.)/, function ($1) {
				return $1.toLowerCase();
			});
	};

	window.getCurrentPrefix = function (url) {
		var prefix = url.split('/');
		if (prefix.length > 1) {
			prefix.pop();
		}
		prefix = prefix.join('/').split('\\');
		if (prefix.length > 1) {
			prefix.pop();
		}
		prefix = prefix.join('\\');
		return prefix;
	};

	window.stringToStringNumber = function (value) {
		if (typeof value === "string") {
			value = value.replaceAll("%", "");
			value = value.replaceAll("$", "");
			value = value.replaceAll(" ", "");
		}
		return value;
	};

	/* Method that convert a string into a valid number */
	window.stringToNumber = function (value) {
		var parsed = parseFloat(value);
		if (!isNaN(parsed)) {
			if (typeof value === 'string') {
				value = parseFloat(value.split(',').join(''));
			} else {
				value = parsed;
			}
		} else {
			value = 0;
		}
		return value;
	};

	/* Filter method to use with arrays */
	window.onlyUnique = function (value, index, self) {
		return self.indexOf(value) === index;
	};

	window.getDataAtScope = function (ngModel, scope) {
		var ngModelSplitted,
			len,
			count = 0,
			obj = scope,
			key,
			isLast,
			value;

		ngModel = ngModel || "";
		if (ngModel) {
			ngModelSplitted = ngModel.split(".");
			len = ngModelSplitted.length;
			for (; count < len; count++) {
				isLast = count + 1 === len;
				key = ngModelSplitted[count];
				if (isLast && obj) {
					value = obj[key];
					break;
				}
				if (obj) {
					obj = obj[key];
				}
			}
		}
		return value;
	};

	window.setDataToScope = function (ngModel, scope, value, $injector) {
		var ngModelSplitted,
			len,
			count = 0,
			obj = scope,
			key,
			isLast,
			prev,
			service;

		ngModel = ngModel || "";
		if (ngModel) {

			ngModelSplitted = ngModel.split(".");
			len = ngModelSplitted.length;
			if ($injector) {
				service = $injector.get(ngModelSplitted[0]);
				if (service) {
					obj = service;
					count++;
				}
			}

			for (; count < len; count++) {

				isLast = count + 1 === len;
				key = ngModelSplitted[count];

				if (isLast && obj) {

					obj[key] = value;

					if (!scope.$$phase) {
						scope.$apply();
					}
				}
				if (obj) {
					obj = obj[key] || {};
				}
				prev = key;
			}
		}
	};
})($cmsj, $cmsj);