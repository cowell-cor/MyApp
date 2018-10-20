var defaultBRCalcDataContent = {
		en: {

			calculatorNames: {
				hisaCalculator: 'HISA Calculator',
				prePaymentCalculator: 'Prepayment Calculator'
			},

			input: {
				amortization: 'Amortization',
				interestRate: 'Interest Rate'
			},

			select: {
				paymentFrequency: {
					oneTime: 'One Time Payment',
					annual: 'Annual',
					annually: 'Annually',
					monthly: 'Monthly',
					semiMonthly: 'Semi-Monthly',
					biWeekly: 'Bi-Weekly',
					weekly: 'Weekly',
					acceleratedBiWeekly: 'Accelerated Bi-Weekly',
					acceleratedWeekly: 'Accelerated Weekly',
					paymentFrequency: 'Payment Frequency'
				},

				boolean: {
					yes: 'Yes',
					no: 'No'
				},

				productAndTerm: {
					closed_1_year: '1 year fixed closed',
					closed_2_year: '2 year fixed closed',
					closed_3_year: '3 year fixed closed',
					closed_4_year: '4 year fixed closed',
					closed_5_year: '5 year fixed closed',
					closed_7_year: '7 year fixed closed',
					closed_10_year: '10 year fixed closed',
					open_5_year_variable: '5 Year Open Variable',
					closed_5_year_variable: '5 Year Closed Variable',
					open_1_year_fixed: '1 Year Open Fixed',
					convertible_6_months_fixed: '6 Month Convertible Fixed'
				},

				meridianSavingsAccount: {
					savings: 'Savings (1.40%)',
					tfsa: 'Tax-free Savings (1.40%)',
					rsp: 'RSP (1.40%)'
				},

				mortgageType:{
					fixed: 'Fixed',
					variable: 'Variable'
				}
			},

			errors: {
				default: 'Value entered is incorrect.',
				readjust: 'Value entered has been adjusted to the minimum or maximum value allowed.',
			},

			charts: {
			},

		units: {
			year: 'year',
			year_plural: 'years',
			day: 'day',
			day_plural: 'days'
		},

		ui: {
			btnContactAdvisor: 'Contact an Advisor',
			btnStartPreApproval: 'Start Pre-Approval'
		}
	},
	fr: {}
};

window.defaultBRCalcDataConfig = {

	fieldspecs: {
		hisa: {
			savingsHeader: {
				tooltip: {
					contentModel: 'message:hisaContent.tooltip.savingsContent'
				}
			},
			meridianSavingsAccount: {
				configModel: 'select.meridianSavingsAccount',
				contentModel: 'label:hisaContent.savingsOptions.meridianSavingsAccount',
			},
			initialDepositAmount: {
				configModel: 'input.currency2',
				contentModel: 'label:hisaContent.savingsOptions.initialDepositAmount'
			},
			monthlyDepositAmount: {
				configModel: 'input.currency2',
				contentModel: 'label:hisaContent.savingsOptions.monthlyDepositAmount'
			},
			savingDuration: {
				configModel: 'select.savingDuration',
				contentModel: 'label:hisaContent.savingsOptions.savingDuration',

			},
			debitTransferContent: {
				tooltip: {
					contentModel: 'message:hisaContent.tooltip.debitTransferContent'
				}
			},
			numberOfMonthlyDebitTransactions: {
				contentModel: 'label:hisaContent.debitTransfer.numberOfMonthlyDebitTransactions'
			},
			depositTransferContent: {
				tooltip: {
					contentModel: 'message:hisaContent.tooltip.depositTransferContent'
				}
			},
			monthlyCreditsPay: {
				configModel: 'input.currency2',
				contentModel: 'label:hisaContent.depositTransfer.monthlyCreditsPay'
			},
			sliderSavingDuration: {
				label: 'savings_slider',
				textId: 'savings_text'
			},
			sliderDebitTransfer: {
				label: 'debitTransfer_slider',
				textId: 'debitTransfer_text'
			},
			sliderDepositTransfer: {
				label: 'depositTransfer_slider',
				textId: 'depositTransfer_text'
			}

		},
		prePayment:{
			borrowAmount: {
				configModel: 'input.currency2',
				contentModel: 'label:prePaymentContent.scenarioInputs.borrowAmount'
			},
			remainingAmount: {
				configModel: 'input.currency2',
				contentModel: 'label:prePaymentContent.scenarioInputs.remainingAmount'
			},
			prePaymentAmount: {
				configModel: 'input.currency2',
				contentModel: 'label:prePaymentContent.scenarioInputs.prePaymentAmount'
			},
			lumpSumAmount: {
				configModel: 'input.currency2',
				contentModel: 'label:prePaymentContent.scenarioInputs.lumpSumAmount'
			},
			mortgageType: {
				configModel: 'select.mortgageType',
				contentModel: 'label:prePaymentContent.scenarioInputs.mortgageType',
			},
			maturityDate:{
				contentModel: 'label:prePaymentContent.scenarioInputs.maturityDate',
				directive: 'date'
			},
			interestRate: {
				configModel: 'input.percent2',
				contentModel: 'label:prePaymentContent.scenarioInputs.interestRate'
			},
			originalDiscount: {
				configModel: 'input.percent2',
				contentModel: 'label:prePaymentContent.scenarioInputs.originalDiscount',
				tooltip: {
					contentModel: 'message:prePaymentContent.tooltip.originalDiscount'
				}
			},
		}
	},

	scenarios: {

		retirementSavingsData: {
			data: {
				scenarios: [],
				scenarioModel: {
					data: {
						targetIncomeIsPercent: true,
						currentAge: 30,
						retirementStartAge: 65,
						yearsInRetirement: 30,
						annualIncome: 55000,
						targetIncomePercent: 0.7,
						targetIncomeAmount: 35000,
						oas: 6846.24,
						cpp: 13110,
						companyPension: 0,
						nonRegInvestments: 0,
						otherIncome: 0,
						currentRRSPSavings: 0,
						currentTFSASavings: 0,
						currentNONREGSavings: 0,
						monthlyRRSPcontribution: 0,
						monthlyTFSAcontribution: 0,
						monthlyNONREGcontribution: 0
					},
					validation: {
						currentAge: {
							max: 70,
							min: 18
						},
						retirementStartAge: {
							max: 80
						},
						yearsInRetirement: {
							min: 0
						},
						annualIncome: {
							min: 1,
							max: 1000000
						},
						targetIncomePercent: {
							min: 0.25,
							max: 1
						},
						targetIncomeAmount: {
							min: 1,
							max: 1000000
						},
						oas: {
							rules: [{
								name: 'readjust',
								contentModel: 'message:rscContent.errorMessages.oas'
							}],
							min: 0,
							max: 6846.24
						},
						cpp: {
							min: 0,
							max: 13110
						},
						companyPension: {
							min: 0,
							max: 100000
						},
						nonRegInvestments: {
							min: 0,
							max: 1000000
						},
						otherIncome: {
							min: 0,
							max: 1000000
						},
						currentRRSPSavings: {
							min: 0,
							max: 5000000
						},
						currentTFSASavings: {
							min: 0,
							max: 1000000
						},
						currentNONREGSavings: {
							min: 0,
							max: 5000000
						},
						monthlyRRSPcontribution: {
							rules: [{
								name: 'readjust',
								contentModel: 'message:rscContent.errorMessages.overAllowedRRSPContribution',
								customize: {
									max: 'max',
									currentYear: 'currentYear'
								}
							}],
							min: 0,
							max: 10000, // overide inside scenario
							currentYear: 2016 // overide inside scenario
						},
						monthlyTFSAcontribution: {
							rules: [{
								name: 'readjust',
								contentModel: 'message:rscContent.errorMessages.overAllowedTFSAContribution',
								customize: {
									max: 'max',
									currentYear: 'currentYear'
								}
							}],
							min: 0,
							max: 10000, // overide inside scenario
							currentYear: 2016 // overide inside scenario
						},
						monthlyNONREGcontribution: {
							min: 0,
							max: 10000
						}
					}
				},

				constants: {
					annualRRSPcontributionLimit: {
						// '2016':25370
						'2016': 24270
					},
					annualTFSAcontributionLimit: {
						'2016': 5500
					}
				},

				addSpouse: false,
				isScenarioViewSpouse: false,
				estimatedROR: 0.03,
				inflationRate: 0.02
			},

			validation: {
				// addSpouse:{ },
				// isScenarioViewSpouse:{ },
				estimatedROR: {
					min: 0.001,
					max: 0.2
				},
				inflationRate: {
					rules: [{
						name: 'readjust',
						contentModel: 'message:rscContent.errorMessages.inflationRate',
						customize: {
							average: 'average'
						}
					}],
					average: 0.0149,
					min: 0.001,
					max: 0.2
				}
			},
			results: {}
		},
		affordability: {
			data: {
				scenarios: [],
				scenarioModel: {
					data: {
						annualIncome: 80000,
						heatingCosts: 0,
						propertyTaxes: 0,
						totalOtherDebt: 0,
						condoFees: 0,
						vehicleLoanLease: 0,
						interestRate: 0.035,
						amortization: 25,
						downPaymentAmount: 15000,
						otherDebt: {
							vehicleLoanLease: 0,
							personalLoan: 0,
							lineOfCredit: 0,
							creditCards: 0,
							other: 0
						}
					},
					results: {},
					validation: {
						annualIncome: {
							max: 9999999,
							min: 10000,
							rules: [{
								validate: 'readjust',
								contentModel: 'message:errors.aff_annualIncome_readjust'
							}]
						},
						heatingCosts: {
							max: 10000,
							min: 0
						},
						propertyTaxes: {
							max: 20000,
							min: 0
						},
						condoFees: {
							max: 10000,
							min: 0
						},
						vehicleLoanLease: {
							max: 99999,
							min: 0
						},
						interestRate: {
							max: 0.2,
							min: 0.001
						},
						amortization: {
							max: 30,
							min: 5
						},
						downPaymentAmount: {
							max: 5000000,
							min: 2500,
							rules: [{
								validate: 'readjust',
								contentModel: 'message:errors.aff_downPaymentAmount_readjust'
							}]
						},
						totalOtherDebt: {
							max: 999999,
							min: 0,
							rules: [{
								validate: 'readjust',
								contentModel: 'message:errors.aff_totalOtherDebts_readjust'
							}]
						},
						vehicleLoanLease: {
							max: 99999,
							min: 0
						},
						personalLoan: {
							max: 99999,
							min: 0
						},
						lineOfCredit: {
							max: 500000,
							min: 0
						},
						creditCards: {
							max: 99999,
							min: 0
						},
						otherDebt: {
							max: 99999,
							min: 0
						}
					}
				},
				isComparingScenario: false
			},
			results: {}
		},
		lineOfCreditData: {
			data: {
				scenarios: [],
				scenarioModel: {
					data: {
						borrowReason_lineOfCredit: 'homeRenovation',
						borrowReason_personalLoan: 'homeRenovation',
						repaymentDetails: 'personalLoan',
						paymentFrequency: 'monthly',
						borrowAmount: 10000,
						interestRate: 0.03,
						amortization: 5
					},

					validation: {
						borrowAmount: {
							max: 100000,
							min: 1
						},
						interestRate: {
							max: 0.2,
							min: 0.001
						},
						amortization: {
							max: 5,
							min: 1
						}
					},
					results: {}
				},
				isComparingScenario: false
			},
			results: {}
		},
		mortgagePaymentData: {
			data: {
				scenarios: [],
				scenarioModel: {
					data: {
						amortization: 25,
						paymentFrequency: 'monthly',
						extraPaymentFrequency: 'annual',
						productAndType: 5,
						showExtra: false,
						mortgageAmount: 300000,
						interestRate: 0.0249,
						extraPaymentAmount: 0
					},

					results: {
						resultsByPaymentOption: {}
					},

					validation: {
						// Select validation - blank slate
						paymentFrequency: {},
						extraPaymentFrequency: {},
						productAndType: {},

						amortization: {
							min: 5,
							max: 25
						},
						showExtra: {
							value: false,
							validation: false
						},
						mortgageAmount: {
							min: 1,
							max: 10000000
						},
						interestRate: {
							min: 0.001,
							max: 0.2
						},
						extraPaymentAmount: {
							min: 0,
							max: 100000
						}
					}
				},
				isComparingScenario: false
			},
			results: {}
		},
		hisaData: {
			data: {
				scenarios: [],
				scenarioModel: {
					data: {
						showBoostFeature: false,
						boostSavingsEnabled: false,
						totalSavings: 0,
						boostSavingsAmt:0,
						initialDepositAmount: 20000,
						monthlyDepositAmount:0,
						savingDuration: 'monthly',
						savingsAccountType: "1",
						showExtra: false,
						interestRate: 0.0249,
						extraPaymentAmount: 0,
						monthlyCreditsPay: 0,
						numberOfMonthlyDebitTransactions: 0,
						sliderDebitTransferDefVal:0,
						sliderDepositTransferDefVal:0,
						sliderSavingDurationMonthly: {
							defaultValue: 6,
							min: 1,
							max: 24,
							step: 1,
							maxlength: 2,
							label: 'savings_slider',
							textId: 'savings_text'
						},
						sliderSavingDurationYearly: {
							defaultValue: 25,
							min: 1,
							max: 40,
							step: 1,
							maxlength: 2,
							label: 'savings_slider',
							textId: 'savings_text'
						},

						sliderDebitTransfer: {
							defaultValue: 0,
							min: 0,
							max: 5,
							step: 1,
							maxlength: 1,
							label: 'debitTransfer_slider',
							displayMin: '$0',
							displayMax: '$5',
							textId: 'debitTransfer_text'
						},
						sliderDepositTransfer: {
							defaultValue: 0,
							min: 0,
							max: 100,
							step: 1,
							maxlength: 3,
							label: 'depositTransfer_slider',
							displayMin: '0%',
							displayMax: '100%',
							textId: 'depositTransfer_text'
						},
						boostSavings: {
							boostSavingsPercentage: 3,
							boostMonths: 4
						},
						rateOfInterestValues: {
							savings: "0.0012",
							tfsa: "0.0012",
							rsp : "0.0012",
						},
						boostRateOfInterest:"0.0025",
					},

					results: {
						resultsBySavingDuration: {}
					},

					validation: {
						// Select validation - blank slate
						savingDuration: {},
						savingsAccountType: {},
						sliderSavingDurationMonthly: {
							min: 1,
							max: 24
						},
						sliderSavingDurationYearly: {
							min: 1,
							max: 40
						},
						showExtra: {
							value: false,
							validation: false
						},
						initialDepositAmount: {
							min: 0,
							max: 999999999.99
						},
						interestRate: {
							min: 0.001,
							max: 0.2
						},
						monthlyDepositAmount: {
							min: 0,
							max: 999999999.99
						},
						debitTransactions: {
							min: 0,
							max: 1000
						},
						sliderDebitTransactions: {
							min: 0,
							max: 5
						},
						monthlyCreditsPay: {
							min: 0,
							max: 999999999.99
						}
					}
				}
			},
			results: {}
		},
		prePaymentData: {
			data: {
				scenarios: [],
				scenarioModel: {
					data: {
						borrowAmount: 250000,
						remainingAmount: 0,
						prePaymentAmount: 0,
						lumpSumAmount: 0,
						mortgageType:"Fixed",
						interestRate: 0.000,
						maturityDate:null,
						originalDiscountRate: 0,
						prepaymentSubjectToPenalty: 0,
						annualPaymentPercentage: 0.2,
						interestRateSimilarTerm: 0.02
					},

					validation: {
						borrowAmount: {
							min: 0,
							max: 999999999.99
						},
						remainingAmount: {
							min: 0,
							max: 999999999.99
						},
						prePaymentAmount: {
							min: 0,
							max: 999999999.99
						},
						lumpSumAmount: {
							min: 0,
							max: 999999999.99
						},
						interestRate: {
							min: 0,
							max: 1
						},
						originalDiscountRate: {
							min: 0,
							max: 1
						}
					},
					results: {}
				}
			},
			results: {}
		}
	},

	validation: {
		rules: {
			readjust: {
				name: 'readjust',
				contentModel: 'message:errors.readjust'
			}
		},
		interestRate: {
			min: 0.1,
			max: 20,
			rules: [{
				configModel: 'validation.rules.readjust'
			}]
		},
		amortization: {
			min: 5,
			max: 25,
			rules: [{
				configModel: 'validation.rules.readjust'
			}]
		}
	},

	slider: {
		paymentFrequency: {
			start: 1,
			connect: 'lower',
			step: 1,
			range: {
				'min': 0,
				'max': 5
			}
		}
	},

	input: {
		amortization: {
			contentModel: 'label:input.amortization',
			directive: 'year',
			precision: 0
		},
		year: {
			directive: 'year',
			precision: 0
		},
		interestRate: {
			contentModel: 'label:input.interestRate',
			directive: 'percent',
			precision: 3
		},
		currency2: {
			directive: 'currency',
			precision: 2
		},
		currency0: {
			directive: 'currency',
			precision: 0
		},
		percent0: {
			directive: 'percent',
			precision: 0
		},
		percent2: {
			directive: 'percent',
			precision: 2
		},
		percent3: {
			directive: 'percent',
			precision: 3
		},

		boolean: {
			directive: 'boolean',
			options: [{
					contentModel: 'label:select.boolean.yes',
					value: true
				},
				{
					contentModel: 'label:select.boolean.no',
					value: false
				}
			]
		}
	},

	globals: {
		paymentFrequency: {
			ANNUAL: 'annual',
			ONE_TIME: 'oneTime',
			MONTHLY: 'monthly',
			SEMI_MONTHLY: 'semiMonthly',
			BI_WEEKLY: 'biWeekly',
			WEEKLY: 'weekly',
			ACCELERATED_BI_WEEKLY: 'acceleratedBiWeekly',
			ACCELERATED_WEEKLY: 'acceleratedWeekly',
			ANNUALLY: 'annually'
		},
		mortgageType:{
			FIXED: 'Fixed',
			VARIABLE: 'Variable'
		}
	},
	select: {

		paymentFrequencyOptions: {
			annual: {
				contentModel: 'label:select.paymentFrequency.annual',
				frequencyNumber: 1,
				frequencyNumber_365: 1,
				configModel: 'value:globals.paymentFrequency.ANNUAL'
			},
			annually: {
				contentModel: 'label:select.paymentFrequency.annually',
				frequencyNumber: 1,
				frequencyNumber_365: 1,
				configModel: 'value:globals.paymentFrequency.ANNUALLY'
			},
			oneTime: {
				contentModel: 'label:select.paymentFrequency.oneTime',
				frequencyNumber: 0,
				frequencyNumber_365: 0,
				configModel: 'value:globals.paymentFrequency.ONE_TIME'
			},
			monthly: {
				contentModel: 'label:select.paymentFrequency.monthly',
				frequencyNumber: 12,
				frequencyNumber_365: 12,
				configModel: 'value:globals.paymentFrequency.MONTHLY'
			},
			semiMonthly: {
				contentModel: 'label:select.paymentFrequency.semiMonthly',
				frequencyNumber: 24,
				frequencyNumber_365: 24,
				configModel: 'value:globals.paymentFrequency.SEMI_MONTHLY'
			},
			biWeekly: {
				contentModel: 'label:select.paymentFrequency.biWeekly',
				frequencyNumber: 26,
				frequencyNumber_365: 26.07142857142857142857142857,
				configModel: 'value:globals.paymentFrequency.BI_WEEKLY'
			},
			weekly: {
				contentModel: 'label:select.paymentFrequency.weekly',
				frequencyNumber: 52,
				frequencyNumber_365: 52.142857142857142857142857,
				configModel: 'value:globals.paymentFrequency.WEEKLY'
			},
			acceleratedBiWeekly: {
				contentModel: 'label:select.paymentFrequency.acceleratedBiWeekly',
				frequencyNumber: 26,
				frequencyNumber_365: 26.07142857142857142857142857,
				configModel: 'value:globals.paymentFrequency.ACCELERATED_BI_WEEKLY'
			},
			acceleratedWeekly: {
				contentModel: 'label:select.paymentFrequency.acceleratedWeekly',
				frequencyNumber: 52,
				frequencyNumber_365: 52.142857142857142857142857,
				configModel: 'value:globals.paymentFrequency.ACCELERATED_WEEKLY'
			}
		},
		productAndTermOptions: {
			closed_1_year: {
				contentModel: 'label:select.productAndTerm.closed_1_year',
				value: 1,
				termYears: 1,
				defaultInterestRate: 0.0249 // TEMP - will fetch from Rates.getAll()
			},
			closed_2_year: {
				contentModel: 'label:select.productAndTerm.closed_2_year',
				value: 2,
				termYears: 2,
				defaultInterestRate: 0.0249 // TEMP - will fetch from Rates.getAll()
			},
			closed_3_year: {
				contentModel: 'label:select.productAndTerm.closed_3_year',
				value: 3,
				termYears: 3,
				defaultInterestRate: 0.0249 // TEMP - will fetch from Rates.getAll()
			},
			closed_4_year: {
				contentModel: 'label:select.productAndTerm.closed_4_year',
				value: 4,
				termYears: 4,
				defaultInterestRate: 0.0249 // TEMP - will fetch from Rates.getAll()
			},
			closed_5_year: {
				contentModel: 'label:select.productAndTerm.closed_5_year',
				value: 5,
				termYears: 5,
				defaultInterestRate: 0.0249 // TEMP - will fetch from Rates.getAll()
			},
			closed_7_year: {
				contentModel: 'label:select.productAndTerm.closed_7_year',
				value: 7,
				termYears: 7,
				defaultInterestRate: 0.0249 // TEMP - will fetch from Rates.getAll()
			},
			closed_10_year: {
				contentModel: 'label:select.productAndTerm.closed_10_year',
				value: 10,
				termYears: 10,
				defaultInterestRate: 0.0249 // TEMP - will fetch from Rates.getAll()
			},
			open_5_year_variable: {
				contentModel: 'label:select.productAndTerm.open_5_year_variable',
				value: 11,
				termYears: 5,
				defaultInterestRate: 0.0249 // TEMP - will fetch from Rates.getAll()
			},
			closed_5_year_variable: {
				contentModel: 'label:select.productAndTerm.closed_5_year_variable',
				value: 12,
				termYears: 5,
				defaultInterestRate: 0.0249 // TEMP - will fetch from Rates.getAll()
			},
			open_1_year_fixed: {
				contentModel: 'label:select.productAndTerm.open_1_year_fixed',
				value: 13,
				termYears: 1,
				defaultInterestRate: 0.0249 // TEMP - will fetch from Rates.getAll()
			},
			convertible_6_months_fixed: {
				contentModel: 'label:select.productAndTerm.convertible_6_months_fixed',
				value: 14,
				termYears: 0.5,
				defaultInterestRate: 0.0249 // TEMP - will fetch from Rates.getAll()
			}
		},
		paymentFrequency: {
			contentModel: 'label:select.paymentFrequency.paymentFrequency',
			options: [{
					configModel: 'select.paymentFrequencyOptions.monthly'
				},
				{
					configModel: 'select.paymentFrequencyOptions.semiMonthly'
				},
				{
					configModel: 'select.paymentFrequencyOptions.biWeekly'
				},
				{
					configModel: 'select.paymentFrequencyOptions.weekly'
				},
				{
					configModel: 'select.paymentFrequencyOptions.acceleratedBiWeekly'
				},
				{
					configModel: 'select.paymentFrequencyOptions.acceleratedWeekly'
				}
			]
		},
		reducedPaymentFrequency: {
			contentModel: 'label:select.paymentFrequency.paymentFrequency',
			options: [{
					configModel: 'select.paymentFrequencyOptions.monthly'
				},
				{
					configModel: 'select.paymentFrequencyOptions.semiMonthly'
				},
				{
					configModel: 'select.paymentFrequencyOptions.biWeekly'
				},
				{
					configModel: 'select.paymentFrequencyOptions.weekly'
				}
			]
		},
		extraPaymentFrequency: {
			contentModel: 'label:select.paymentFrequency.paymentFrequency',
			options: [{
					configModel: 'select.paymentFrequencyOptions.annual'
				},
				{
					configModel: 'select.paymentFrequencyOptions.oneTime'
				},
				{
					configModel: 'select.paymentFrequencyOptions.monthly'
				},
				{
					configModel: 'select.paymentFrequencyOptions.semiMonthly'
				},
				{
					configModel: 'select.paymentFrequencyOptions.biWeekly'
				},
				{
					configModel: 'select.paymentFrequencyOptions.weekly'
				},
				{
					configModel: 'select.paymentFrequencyOptions.acceleratedBiWeekly'
				},
				{
					configModel: 'select.paymentFrequencyOptions.acceleratedWeekly'
				}
			]
		},
		productAndType: {
			options: [{
					configModel: 'select.productAndTermOptions.open_5_year_variable'
				},
				{
					configModel: 'select.productAndTermOptions.closed_5_year_variable'
				},
				{
					configModel: 'select.productAndTermOptions.open_1_year_fixed'
				},
				{
					configModel: 'select.productAndTermOptions.convertible_6_months_fixed'
				},
				{
					configModel: 'select.productAndTermOptions.closed_1_year'
				},
				{
					configModel: 'select.productAndTermOptions.closed_2_year'
				},
				{
					configModel: 'select.productAndTermOptions.closed_3_year'
				},
				{
					configModel: 'select.productAndTermOptions.closed_4_year'
				},
				{
					configModel: 'select.productAndTermOptions.closed_5_year'
				},
				{
					configModel: 'select.productAndTermOptions.closed_7_year'
				},
				{
					configModel: 'select.productAndTermOptions.closed_10_year'
				}
			]
		},
		meridianSavingsAccountOptions: {
			savings: {
				contentModel: 'label:select.meridianSavingsAccount.savings',
				value: 1
			},
			tfsa: {
				contentModel: 'label:select.meridianSavingsAccount.tfsa',
				value: 2
			},
			rsp: {
				contentModel: 'label:select.meridianSavingsAccount.rsp',
				value: 3
			}
		},
		savingDuration: {
			options: [{
					configModel: 'select.paymentFrequencyOptions.monthly'
				},
				{
					configModel: 'select.paymentFrequencyOptions.annually'
				},
			]
		},
		meridianSavingsAccount: {
			options: [{
					configModel: 'select.meridianSavingsAccountOptions.savings'
				},
				{
					configModel: 'select.meridianSavingsAccountOptions.tfsa'
				},
				{
					configModel: 'select.meridianSavingsAccountOptions.rsp'
				}
			]
		},
		mortgageTypeOptions: {
			fixed: {
				contentModel: 'label:select.mortgageType.fixed',
				//contentModel: 'label:select.meridianSavingsAccount.savings',
				configModel: 'value:globals.mortgageType.FIXED'
			},
			variable: {
				contentModel: 'label:select.mortgageType.variable',
				configModel: 'value:globals.mortgageType.VARIABLE'
			}
		},
		mortgageType:{
			options: [{
				configModel: 'select.mortgageTypeOptions.fixed'
			},
			{
				configModel: 'select.mortgageTypeOptions.variable'
			}]
		}
	},

	highchart: {
		chartHISA: {
			contentModel: 'charts.chartHISA',
			//colors: ['#3b6e98', '#e68923', '#3b6e98'],
			title: '',
			chart: {
				description: 'Most commonly used desktop screen reader',
				events: {
					load: function () {
						var s = this.series;
						var p = [];
						s.forEach(function (v, k) {
							var xAxis = s[0].chart.xAxis[0],
								length = xAxis.labelGroup && xAxis.labelGroup.element.children.length,
								firstIdx = 0,
								categories = xAxis.options.categories,
								lastIdx = length - 1;
								//replacing html of first and last category
								xAxis.labelGroup.element.children[0].innerHTML= categories[0];
								xAxis.labelGroup.element.children[length-1].innerHTML= categories[length-1];
						
								for(var i=1; i< length-1; i++){
									if (i !== firstIdx || i !== lastIdx)  {
										xAxis.labelGroup.element.children[i].innerHTML = '';
									}
								}
								//show the tooltip
								p.push(v.points[v.points.length - 1]);
								
						});
						this.tooltip.refresh(p);
					},
					redraw: function () {
						var s = this.series;
						s.forEach(function (v, k) {
							var xAxis = s[0].chart.xAxis[0],
								length = xAxis.labelGroup && xAxis.labelGroup.element.children.length,
								firstIdx = 0,
								categories = xAxis.options.categories,
								lastIdx = length - 1;
								//replacing html of first and last category
								xAxis.labelGroup.element.children[0].innerHTML= categories[0];
								xAxis.labelGroup.element.children[length-1].innerHTML= categories[length-1];
						
								for(var i=1; i< length-1; i++){
									if (i !== firstIdx || i !== lastIdx)  {
										xAxis.labelGroup.element.children[i].innerHTML = '';
									}
								}
								//show the tooltip
								//p.push(v.points[v.points.length - 1]);
								
						});
					}
				},
				type: 'area',
				marginTop: 100,
				height: 500,
				style: {
					fontFamily: 'Arial Regular'
				}
			},
			legend: {
				enabled: false
			},
			credits: {
				enabled: false
			},
			xAxis: {
				labels: {
					align: 'center',
					autoRotation: [0],
					padding:3,
					style:{
						backgroundColor:"white",
						//color:"white"
					},
				},
				allowDecimals: false
			},
			yAxis: {
				minPadding: 0, 
                maxPadding: 0,  
				minRange : 0.1,
				visible: false
			},
			tooltip: {
				backgroundColor: '#FFFFFF',
				borderRadius: 1,
				borderWidth: 1,
				borderColor: '#fff',
				shared: true,
				shadow: false,
				useHTML: true,
				valuePrefix: '$',
				positioner: function () {
					return {
						x: 30,
						y: 10
					};
				},
				crosshairs: [{
					width: 1,
					color: 'white',
					zIndex: 3
				}]
			},
			plotOptions: {
				area: {
					stacking: 'normal',
					lineWidth: 2,
					marker: {
						enabled: false,
						symbol: 'circle',
						radius: 4,
						lineColor:'#FFFFFF',
						states: {
							hover: {
								enabled: true
							}
						}
					}
				},
				series: {
					fillOpacity: 1,
					marker: {
						enabled: false
					},
					events: {
						mouseOut: function () {
							return false;
						}
					},
					cursor: 'pointer'
				}
			},
			series: []
		}
	}
};