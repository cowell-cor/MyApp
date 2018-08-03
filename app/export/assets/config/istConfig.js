var istContent = {
	en: {
		calculatorName:'Investment Selector',
		pages:{
			isReg: {
				pageName:'Investment Type',
				configModel:'inputType:input.isReg.inputType',
				inputs:[
					{ label:'Registered Plan (i.e. TFSA, RRSP, RRIF, RESP, RDSP)', configModel:'value:input.isReg.options.reg' },
					{ label:'Non-registered plan', configModel:'value:input.isReg.options.nonreg' }
				],
				header:'Is this investment for a <strong>Registered</strong> or <span class="unbreakable"><strong>Non-registered Plan</strong>?</span>',
				popover:'Meridian has a full range of investment products available through both Registered and Non-registered accounts to help you reach your financial goals.'
			},
			accountType:{
				pageName:'Account Type',
				configModel:'inputType:input.accountType.inputType',
				inputs:[
					{ label:'I want my earnings to grow tax-free (<strong>TFSA</strong>)', configModel:'value:input.accountType.options.tfsa' },
					{ label:'I want to save for my own retirement income (<strong>RRSP</strong>)', configModel:'value:input.accountType.options.rrsp' },
					{ label:'I want to withdraw regularly from my savings account after retirement (<strong>RRIF</strong>)', configModel:'value:input.accountType.options.rrif' },
					{ label:'I want to save for my children\'s education (<strong>RESP</strong>)', configModel:'value:input.accountType.options.resp' },
					{ label:'I need financial assistance for my or my family member\'s disabilities (<strong>RDSP</strong>)', configModel:'value:input.accountType.options.rdsp' }
				],
				header:'<strong>Which</strong> Registered account are you <span class="unbreakable">interested in?<popover data-placement="top" data-content="{{ist.content.tooltip.accountType}}"></popover></span>'
			},
			amount:{
				pageName:'Amount',
				header:'<strong>How much</strong> do you want <span class="unbreakable">to invest?<popover data-placement="top" data-content="{{ist.content.tooltip.amount}}"></popover></span>'
			},
			term:{
				pageName:'Term',
				inputs:[
					{ label:'< 1 year', configModel:'value:input.term.options.lessThanAYear' },
					{ label:'1 year', configModel:'value:input.term.options.year1' },
					{ label:'2 year', configModel:'value:input.term.options.year2' },
					{ label:'3 year', configModel:'value:input.term.options.year3' },
					{ label:'4 year', configModel:'value:input.term.options.year4' },
					{ label:'> 5 year', configModel:'value:input.term.options.over5Year' }
				],
				header:'<strong>When</strong> do you plan on using <span class="unbreakable">these funds?<popover data-placement="top" data-content="{{ist.content.tooltip.term}}"></popover></span>'
			},
			earlyAccess:{
				pageName:'Access to Funds',
				configModel:'inputType:input.earlyAccess.inputType',
				inputs:[
					{ label:'Yes', value:'true' },
					{ label:'Maybe', value:'maybe' },
					{ label:'No, I will not redeem my investment early', value:'false' }
				],
				header:'Will you need to access these funds <strong>prior </strong><span class="unbreakable"><strong>to maturity</strong>?<popover data-placement="top" data-content="{{ist.content.tooltip.earlyAccess}}"></popover></span>'
			},
			accessTerm:{
				pageName:'Access Term',
				inputs:[
					{ label:'1 year', value:1 },
					{ label:'2 year', value:2 },
					{ label:'3 year', value:3 },
					{ label:'4 year', value:4 },
					{ label:'5 year', value:5 }
				],
				header:'How soon do you need <span class="unbreakable">the funds?</span>',
				popover:''
			},
			returnType:{
				pageName:'Risk Tolerance',
				configModel:'inputType:input.returnType.inputType',
				inputs:[
					{ label:'Guaranteed return', value:'guaranteed' },
					{ label:'Variable return with guaranteed principal', value:'variableGuaranteed' },
					{ label:'Flexibility to take advantage of changing interest rates', value:'flexible' },
					{ label:'100% variable return', value:'variable' }
				],
				header:'Based on <strong>my risk tolerance</strong>, I would prefer an <span class="unbreakable">investment with:<popover data-placement="top" data-content="{{ist.content.tooltip.returnType}}"></popover></span>'
			},					
			results:{
				pageName:'Results',
				header:'Based on <strong>your answers</strong>, we recommend the <span class="unbreakable">following product:</span>',
				popover:'',
				displayOnGraph:'Display on graph',
				chartHeader:'<strong>Your projected results</strong>',
				compareHeader:'Compare with <strong>other products</strong> you may be <span class="unbreakable">interested in:</span>',
				yield:'Yield',
				investment:'Investment',
				length:'Length',
				endBalance:'End balance',
				after:'after'
			}
		},
		disclaimer:'<p>The Investment Selector Calculator is designed to be an informational and educational tool only, and when used alone, the results do not constitute financial, investment, or tax advice from Meridian Credit Union Limited, and should not be relied upon as such. It is offered free of charge, “as is”, and without any guarantees, representations, or warranties whatsoever, including, but not limited to, any warranty as to the quality, accuracy, currency or suitability of the information presented by this calculator for any particular purpose. We strongly recommend that you seek the advice of a Meridian financial services professional before making any type of investment. We also encourage you to review your investment strategy periodically as your financial circumstances change. The results presented by this calculator are hypothetical and may not reflect the actual growth of your own investments. They are also based on the information you enter and a number of assumptions (further details are available upon request) that may or may not be relevant to your situation.   Meridian and its affiliates hereby also disclaim any responsibility for the consequences of any decisions or actions taken in reliance upon or as a result of the information provided by this calculator, as well as for any damages (whether ordinary, special, consequential  or exemplary) or losses of any kind due to human or mechanical errors or omissions in the design, or operation, or use of the calculator, or due to its lack of availability at any given time. Meridian is under no obligation to provide support, service, corrections, or upgrades to the calculator’s software.</p><p>Repayment of the principal amount and earned interest of Meridian deposit investments is guaranteed by deposit insurance provided by the Deposit Insurance Corporation of Ontario, subject to a limit of $100,000 for aggregate non-registered deposits. There is no coverage limit for deposits held within a registered plan.</p>',
		chart: {
			investmentStart:'Investment start: ',
			after:' after ',
			rangeSuffix:' - Range',
			from:'From ',
			to:' to '
		},
		tooltip:{
			isReg:'Meridian has a full range of investment products available through both Registered and Non-registered accounts to help you reach your financial goals.',
			accountType:'There are five types of government-regulated investment plans that can help you grow your savings and may also offer tax advantages. Please speak with an Advisor before selecting the Registered Plan that’s right for you.',
			amount:'Meridian has a number of automatic savings options to help you reach your savings goals faster.',
			term:'Typically, for term products, the longer the term, the higher the investment rate.',
			earlyAccess:'Non-redeemable terms lock in your funds for the length of the term chosen.  Meridian has a variety of investment products that offer great rates and the flexibility to access your funds.',
			returnType:'Typically the higher the potential return, the riskier the investment.  However, investors are always guaranteed to receive their principal investment upon maturity with GICs.'
		}
	}
},

istConfig = {
	input:{
		isReg:{
			inputType:'radio',
			options:{
				reg:'reg',
				nonreg:'nonreg'
			}
		},
		accountType:{
			inputType:'radio',
			options:{
				tfsa:'tfsa',
				rrsp:'rrsp',
				rrif:'rrif',
				resp:'resp',
				rdsp:'rdsp'
			}
		},
		earlyAccess:{
			inputType:'radio'
		},
		returnType:{
			inputType:'radio'
		},
		term:{
			options:{
				lessThanAYear:0,
				year1:1,
				year2:2,
				year3:3,
				year4:4,
				over5Year:5
			}
		}
	},

	highchart:{
		ist_highchart:{
			contentModel:'charts.ist_highchart',
			colors:['#e68923','#a8b400','#4f324c','#7facc2','#515350','#856f8e','#266685'],
			credits:{
				enabled:false
			},
			chart:{
				type:'spline'
			},
			title: {
				text: ''
			},
			xAxis: {
				min:0,
				type: 'number',
				labels:{}
			},
			yAxis: {
				labels:{},
				title:{
					align:'high',
					style:{display:'none'},
					margin:0,
					x:0,y:0,
					rotation:0
				}
			},
			tooltip: {
	      	crosshairs: true
			},
			legend:{
				useHTML:true
			},
			plotOptions: {
				spline: {
					pointStart:0,
					states:{
						hover:{
							marker:{
								enabled:true,
								symbol:'circle',
								halo:{
									size:0
								}
							}
						}
					},
					marker: {
						enabled:false,
						symbol:'circle'
					}
				},
				arearange: {
					pointStart:0,
					states:{
						hover:{
							marker:{
								enabled:true,
								symbol:'circle',
								halo:{
									size:0
								}
							}
						}
					}
				},
				
			},
			series:[]
		}
	},

	pageOrder:['isReg','accountType','amount','term','earlyAccess','accessTerm','returnType','results'],
	
	istProductsPriorityList:[
		'indexLinkedGIC3yr_financialServices',
		'indexLinkedGIC3yr_consumerStaples',
		'indexLinkedGIC3yr_healthCare',

		'indexLinkedGIC5yr_financialServices',
		'indexLinkedGIC5yr_consumerStaples',
		'indexLinkedGIC5yr_healthCare',
		'indexLinkedGIC5yr_canadianMarket',
		'indexLinkedGIC5yr_americanMarket',
		'indexLinkedGIC5yr_global',
		'indexLinkedGIC5yr_naturalResources',

		'indexLinkedGIC1yr_globalDiversified'
	],

	istRatesDefault: {
		'CTAURL':'http://www.meridiancu.ca/find-us/our-locations/Pages/default.aspx',
		'term':0,
		'ctaLabel':'Contact Us'
	},

	istRates: {
		indexLinkedGIC3yr_financialServices : {
			'ID':'201',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/index-linked-GICs/financial-services-GIC/Pages/default.aspx',
			'note':'Meridian has a variety of index-linked GICs to choose from, with some offering a guaranteed minimum rate.'
		},
		indexLinkedGIC3yr_consumerStaples : {
			'ID':'203',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/index-linked-GICs/consumer-staples-GIC/Pages/default.aspx',
			'note':'Meridian has a variety of index-linked GICs to choose from, with some offering a guaranteed minimum rate.'
		},
		indexLinkedGIC3yr_healthCare : {
			'ID':'205',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/index-linked-GICs/health-care-GIC/Pages/default.aspx',
			'note':'Meridian has a variety of index-linked GICs to choose from, with some offering a guaranteed minimum rate.'
		},
		indexLinkedGIC5yr_financialServices : {
			'ID':'202',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/index-linked-GICs/financial-services-GIC/Pages/default.aspx',
			'note':'Meridian has a variety of index-linked GICs to choose from, with some offering a guaranteed minimum rate.'
		},
		indexLinkedGIC5yr_consumerStaples : {
			'ID':'204',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/index-linked-GICs/consumer-staples-GIC/Pages/default.aspx',
			'note':'Meridian has a variety of index-linked GICs to choose from, with some offering a guaranteed minimum rate.'
		},
		indexLinkedGIC5yr_healthCare : {
			'ID':'206',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/index-linked-GICs/health-care-GIC/Pages/default.aspx',
			'note':'Meridian has a variety of index-linked GICs to choose from, with some offering a guaranteed minimum rate.'
		},
		indexLinkedGIC5yr_canadianMarket : {
			'ID':'208',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/index-linked-GICs/canadian-market-GIC/Pages/default.aspx',
			'note':'Meridian has a variety of index-linked GICs to choose from, with some offering a guaranteed minimum rate.'
		},
		indexLinkedGIC5yr_americanMarket : {
			'ID':'209',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/index-linked-GICs/American-GIC/Pages/default.aspx',
			'note':'Meridian has a variety of index-linked GICs to choose from, with some offering a guaranteed minimum rate.'
		},
		indexLinkedGIC5yr_global : {
			'ID':'210',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/index-linked-GICs/global-5-gic/Pages/default.aspx',
			'note':'Meridian has a variety of index-linked GICs to choose from, with some offering a guaranteed minimum rate.'
		},
		indexLinkedGIC5yr_naturalResources : {
			'ID':'207',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/index-linked-GICs/natural-resources-GIC/Pages/default.aspx',
			'note':'Meridian has a variety of index-linked GICs to choose from, with some offering a guaranteed minimum rate.'
		},
		indexLinkedGIC1yr_globalDiversified : {
			'ID':'200',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/index-linked-GICs/short-term-GIC/Pages/default.aspx',
			'note':'Meridian has a variety of index-linked GICs to choose from, with some offering a guaranteed minimum rate.'
		},
		ladderGIC5yr : {
			'ID':'199',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},
		nonRedeemableLongTermGIC5yr : {
			'ID':'35',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},

		escalatorGIC3yr : {
			'ID':'192',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Escalator-GIC/Pages/default.aspx'
		},

		escalatorGIC3yr_TFSA : {
			'ID':'221',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Escalator-GIC/Pages/default.aspx'
		},

		escalatorGIC3yr_RRSP : {
			'ID':'222',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Escalator-GIC/Pages/default.aspx'
		},

		escalatorGIC5yr : {
			'ID':'193',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/5-yr-escalator-GIC/Pages/default.aspx'
		},

		escalatorGIC5yr_RRSP : {
			'ID':'223',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/5-yr-escalator-GIC/Pages/default.aspx'
		},


		nonRedeemableLongTermGIC4yr : {
			'ID':'34',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},
		respSavings : {
			'ID':'10',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/plans/resp/Pages/default.aspx'
		},
		nonRedeemableLongTermGIC3yr : {
			'ID':'33',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},
		gtgHisa : {
			'ID':'7',
			'productLink':'http://www.meridiancu.ca/personal-banking/accounts/high-interest-savings/Pages/default.aspx'
		},
		gtgHisa_TFSA : {
			'ID':'8',
			'productLink':'http://www.meridiancu.ca/personal-banking/accounts/high-interest-savings/Pages/default.aspx'
		},
		gtgHisa_RRSP : {
			'ID':'9',
			'productLink':'http://www.meridiancu.ca/personal-banking/accounts/high-interest-savings/Pages/default.aspx'
		},
		gtgHisa_RRIF : {
			'ID':'226',
			'productLink':'http://www.meridiancu.ca/personal-banking/accounts/high-interest-savings/Pages/default.aspx'
		},
		nonRedeemableLongTermGIC2yr : {
			'ID':'32',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},
		nonRedeemableLongTermGIC1yr : {
			'ID':'31',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},
		nonRedeemableLongTermGIC5yr_TFSA : {
			'ID':'215',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},
		nonRedeemableLongTermGIC4yr_TFSA : {
			'ID':'214',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},
		nonRedeemableLongTermGIC3yr_TFSA : {
			'ID':'213',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},
		nonRedeemableLongTermGIC2yr_TFSA : {
			'ID':'212',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},
		nonRedeemableLongTermGIC1yr_TFSA : {
			'ID':'211',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},


		nonRedeemableLongTermGIC5yr_RRSP : {
			'ID':'220',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},
		nonRedeemableLongTermGIC4yr_RRSP : {
			'ID':'219',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},
		nonRedeemableLongTermGIC3yr_RRSP : {
			'ID':'218',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},
		nonRedeemableLongTermGIC2yr_RRSP : {
			'ID':'217',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},
		nonRedeemableLongTermGIC1yr_RRSP : {
			'ID':'216',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx'
		},


		redeemableShortTermGICs : {
			'ID':'45',
			'productLink':'http://www.meridiancu.ca/personal-banking/investments/GICs/Fixed-Rate-GICs/Pages/default.aspx',
			'note':'Short Term Redeemable GICs are available for 30, 60, 90, 180 and 270 day terms.'
		},

		advantageSavings : {
			'ID':'1',
			'productLink':'http://www.meridiancu.ca/personal-banking/accounts/savings/Pages/default.aspx'
		},
		advantageSavings_TFSA : {
			'ID':'2',
			'productLink':'http://www.meridiancu.ca/personal-banking/accounts/savings/Pages/default.aspx'
		},
		advantageSavings_RRSP : {
			'ID':'3',
			'productLink':'http://www.meridiancu.ca/personal-banking/accounts/savings/Pages/default.aspx'
		},
		advantageSavings_RRIF : {
			'ID':'4',
			'productLink':'http://www.meridiancu.ca/personal-banking/accounts/savings/Pages/default.aspx'
		},
		mutualFunds : {
			'ID':'224',
			'productLink':'http://www.meridiancu.ca/wealth-management/Mutual-Funds/Pages/Index.aspx',
			'note':'Please speak with a Meridian Advisor to find out more about our full suite of mutual fund products.'
		},
		ilgics: {
			'ID':'225'
		}
	}
};