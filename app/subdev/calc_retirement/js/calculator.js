var app = angular.module('retirement', [])
	.controller('retirementCalc', function($scope) {

 		var me = this;
 		
		 /////////////////////////
 		// User entered values //
		 /////////////////////////
		/*me.data = {
			
			spouse : true,
			currentAgePrimary	: 30, 						//B4
			currentAgeSecondary	: 30, 						//C4
			retirementStartAgePrimary :65, 					//B5
			retirementStartAgeSecondary	:65, 				//C5
			yearInRetirementPrimary : 30, 					//B6
			yearInRetirementSecondary : 20, 				//C6
			annualIncomePrimary : 55000, 					//B7
			annualIncomeSecondary : 100000, 				//C7
			targetRetirementIncomePrimaryAmount : 35000, 	//B8
			targetRetirementIncomeSecondaryAmount : 0, 		//C8
			targetRetirementIncomePrimaryPercent : 0, 		//B9 
			targetRetirementIncomeSecondaryPercent : 0.5, 	//C9
			oasPrimary	: 6846.24, 							//B12
			oasSecondary	: 6846.24, 						//C12
			cppPrimary	:	6000, 							//B13
			cppSecondary	:	6000,						//C13
			companyPensionPrimary :	100,					//B14
			companyPensionSecondary :	100,				//C14
			nonRegInvestmentsPrimary	:	100,			//B15
			nonRegInvestmentsSecondary	:	100,			//C15
			otherIncomePrimary	:	100,					//B16
			otherIncomeSecondary	:	100,				//C16
			currentRRSPSavingsPrimary 	:	50000,			//B19
			currentRRSPSavingsSecondary 	:	50000,		//C19
			RRSPcontributionsPrimary	:	100,			//B20
			RRSPcontributionsSecondary	:	100,			//C20
			currentTFSASavingsPrimary	:	50000,			//B22
			currentTFSASavingsSecondary	:	50000,			//C22
			TFSAContributionsPrimary	:	100,			//B23
			TFSAContributionsSecondary	:	100,			//C23
			currentNONREGSavingsPrimary	:	40000,			//B25
			currentNONREGSavingsSecondary	:	40000,		//C25
			NONREGContributionsPrimary	: 0,				//B26
			NONREGContributionsSecondary	: 0,			//C26
			estimatedROR : 0.03,							//B30
			annualRRSPLimit	:	23820,						//B31
			inflationRate : 0.02,							//B34
			maxYears : 101
		};
		me.data = {
			
			spouse : false,
			currentAgePrimary	: 25, 						//B4
			currentAgeSecondary	: 0, 						//C4
			retirementStartAgePrimary :65, 					//B5
			retirementStartAgeSecondary	:0, 				//C5
			yearInRetirementPrimary : 35, 					//B6
			yearInRetirementSecondary : 20, 				//C6
			annualIncomePrimary : 55000, 					//B7
			annualIncomeSecondary : 100000, 				//C7
			targetRetirementIncomePrimaryAmount : 35000, 	//B8
			targetRetirementIncomeSecondaryAmount : 0, 		//C8
			targetRetirementIncomePrimaryPercent : 0, 		//B9 
			targetRetirementIncomeSecondaryPercent : 0.5, 	//C9
			oasPrimary	: 6846.24, 							//B12
			oasSecondary	: 6846.24, 						//C12
			cppPrimary	:	6000, 							//B13
			cppSecondary	:	6000,						//C13
			companyPensionPrimary :	100,					//B14
			companyPensionSecondary :	100,				//C14
			nonRegInvestmentsPrimary	:	100,			//B15
			nonRegInvestmentsSecondary	:	100,			//C15
			otherIncomePrimary	:	100,					//B16
			otherIncomeSecondary	:	100,				//C16
			currentRRSPSavingsPrimary 	:	50000,			//B19
			currentRRSPSavingsSecondary 	:	50000,		//C19
			RRSPcontributionsPrimary	:	100,			//B20
			RRSPcontributionsSecondary	:	100,			//C20
			currentTFSASavingsPrimary	:	50000,			//B22
			currentTFSASavingsSecondary	:	50000,			//C22
			TFSAContributionsPrimary	:	100,			//B23
			TFSAContributionsSecondary	:	100,			//C23
			currentNONREGSavingsPrimary	:	40000,			//B25
			currentNONREGSavingsSecondary	:	40000,		//C25
			NONREGContributionsPrimary	: 0,				//B26
			NONREGContributionsSecondary	: 0,			//C26
			estimatedROR : 0.04,							//B30
			annualRRSPLimit	:	23820,						//B31
			inflationRate : 0.02,							//B34
			maxYears : 101
		};*/
		
		me.data = {
			
		maxYears: 101,
  currentAgePrimary: 25,
  spouse: true,
  currentAgeSecondary: 24,
  estimatedROR: 0.065,
  retirementStartAgePrimary: 55,
  retirementStartAgeSecondary: 60,
  yearInRetirementPrimary: 30,
  yearInRetirementSecondary: 30,
  inflationRate: 0.015,
  annualIncomePrimary: 55000,
  annualIncomeSecondary: 45000,
  targetRetirementIncomePrimaryAmount: 45000,
  targetRetirementIncomeSecondaryAmount: 40000,
  targetRetirementIncomePrimaryPercent: 0,
  targetRetirementIncomeSecondaryPercent: 0,
  oasPrimary: 4000,
  oasSecondary: 0,
  cppPrimary: 4000,
  cppSecondary: 3000,
  companyPensionPrimary: 1000,
  companyPensionSecondary: 0,
  nonRegInvestmentsPrimary: 1000,
  nonRegInvestmentsSecondary: 0,
  otherIncomePrimary: 0,
  otherIncomeSecondary: 800,
  currentRRSPSavingsPrimary: 20000,
  currentRRSPSavingsSecondary: 10000,
  RRSPcontributionsPrimary: 200,
  RRSPcontributionsSecondary: 0,
  currentTFSASavingsPrimary: 0,
  currentTFSASavingsSecondary: 0,
  TFSAContributionsPrimary: 200,
  TFSAContributionsSecondary: 200,
  currentNONREGSavingsPrimary: 0,
  currentNONREGSavingsSecondary: 0,
  NONREGContributionsPrimary: 0,
  NONREGContributionsSecondary: 100,
  savingsAtRetirementPrimary: 0,
  savingsAtRetirementSecondary: 0
		};
		//////////////////////
		//  Constant values //
		//////////////////////
		me.misc = {
			2005:16500,
			2006:18000,
			2007:19000,
			2008:20000,
			2009:21000,
			2010:22000,
			2011:22450,
			2012:22970,
			2013:23820,
			2014:24270,
			2015:24270,
			2016:24270
		};

		///////////////////////
		// Calculated values //
		///////////////////////
		me.results = { // calculated values


		}; 

		me.tempValues = {
			inputB21 : me.data.RRSPcontributionsPrimary*12,
			inputC21 : me.data.RRSPcontributionsSecondary*12,
			inputB24 : me.data.TFSAContributionsPrimary*12,
			inputC24 : me.data.TFSAContributionsSecondary*12,
			inputB27 : me.data.NONREGContributionsPrimary*12,
			inputC27 : me.data.NONREGContributionsSecondary*12,
			cppStartAgePrimary :  calculateCppStartAgePrimary() ,//B59
			oasStartAgePrimary : Math.min(67,me.data.retirementStartAgePrimary),//B60
			cppStartAgeSecondary : 65, //B61 //TODO != primary calculation ??
			oasStartAgeSecondary : 65, //B62
			inputB70 : me.data.targetRetirementIncomePrimaryAmount===0?2:1,	// TODO  B8 or B9
			inputB73 : me.data.targetRetirementIncomeSecondaryAmount===0?2:1,    // TODO  C8 or C9
			realInterestRate : (1+me.data.estimatedROR)/(1+me.data.inflationRate)-1,
			primaryAge :  [],
			secondaryAge : [],
			primaryActualBeginingBalance : [],//G
			secondaryActualBeginingBalance : [],//G
			primaryActualEndingBalance : [],//P
			secondaryActualEndingBalance : [],//P
			primaryHypotheticalBeginingBalance : [],
			secondaryHypotheticalBeginingBalance : [],
			primaryHypotheticalEndingBalance : [],
			secondaryHypotheticalEndingBalance : [],
			primaryContributions : [], //H
			secondaryContributions : [],
			incomeNeededPrimary : [],
			incomeNeededSecondary : [],
			actualOasPrimary : [],
			actualCppPrimary : [],
			actualOtherIncomePrimary : [],
			actualOasSecondary : [],
			actualCppSecondary : [],
			actualOtherIncomeSecondary : [],
			actualIncomeRequiredPrimary : [],
			actualIncomeRequiredSecondary : [],
			actualPrimaryS : [],
			actualSecondaryS : []					
		};

		
		////////////////////////
		// Calculate function //
		////////////////////////
		function calculateAge(){
			var primaryAgeOffset = me.data.currentAgePrimary - 1,
				secondaryAgeOffset = me.data.currentAgeSecondary - 1,
				isSpouse = Boolean(me.data.spouse),
				primaryAge=me.tempValues.primaryAge,
				secondaryAge=me.tempValues.secondaryAge,
				i=1,
				maxYears=me.data.maxYears;
				primaryAge[0] = 0;
				secondaryAge[0] = 0;
			for (i = 1; i <= maxYears; ++i)
			{
				primaryAge[i] = primaryAgeOffset  + i; 
				if (isSpouse)
				{
					secondaryAge[i] = secondaryAgeOffset + i;
				}
			}	
		}
		
		//IF(C2<Input!$B$5,0,IF(AND(C2>=Input!$B$5,C2<Input!$B$5+Input!$B$6),1,2))
		function calculateStage( ageVal, retirementAge, yearInRetirement ){
			if(ageVal < retirementAge)
			{
				return 0;
			}
			else
			{
				if(retirementAge <= ageVal && ageVal < (retirementAge + yearInRetirement))
				{
					return 1;
				}	
				else
				{
					return 2;
				}
			}
		}
		
		
		//=IF(AND($B$5>=60,$B$5<=70),$B$5,IF(B5<60,60,IF(B5>70,70,0)))
		function calculateCppStartAgePrimary(){
			if(me.data.retirementStartAgePrimary >=60 && me.data.retirementStartAgePrimary<=70 )
			{
				return me.data.retirementStartAgePrimary;
			}
			else{
				if(me.data.retirementStartAgePrimary<60)
				{
					return 60;
				}
				else{
					if(me.data.retirementStartAgePrimary > 70)
					{
						return 70;
					}
					else{
						return 0;
					}
				}
			}
		}
		
	
		
		//=IF(D2=0,Input!$B$21+Input!$B$24+Input!$B$27,0)
		function calculateContributions () {
			var primaryRetirementAge = me.data.retirementStartAgePrimary,
				secondaryRetirementAge = me.data.retirementStartAgeSecondary,
				yearInRetirementPrimary = me.data.yearInRetirementPrimary,
				yearInRetirementSecondary = me.data.yearInRetirementSecondary,
				primaryContributions = me.tempValues.primaryContributions,
				secondaryContributions = me.tempValues.secondaryContributions,
				isSpouse = Boolean(me.data.spouse),
				i = 1, 
				maxYears = me.data.maxYears, 
				ageP,ageS, stageP, stageS;
				primaryContributions[0] = 0;
				secondaryContributions[0] = 0;
			for( i = 1;i <= maxYears; ++i)
			{
				 ageP = me.tempValues.primaryAge[i];
				 stageP = calculateStage(ageP,primaryRetirementAge, yearInRetirementPrimary);
				
				if(stageP == 0)
				{
					primaryContributions[i] = me.tempValues.inputB21 + me.tempValues.inputB24 + me.tempValues.inputB27;
				}
				else
				{
					primaryContributions[i] = 0;	
				}
				if(isSpouse)
				{
					ageS = me.tempValues.secondaryAge[i];
					stageS = calculateStage(ageS, secondaryRetirementAge, yearInRetirementSecondary);
					if(stageS == 0)
					{
						secondaryContributions[i] = me.tempValues.inputC21 + me.tempValues.inputC24 + me.tempValues.inputC27;
					}
					else{
						secondaryContributions[i] = 0;
					}
				}
			}
		}
		
		function  calculateActualCppStart(age, cppStartAge) {
			if(age>=cppStartAge)
			{
				return 1;
			}
			else
			{
				return 0;
			}
		}
		
		function calculateActualOasStart(age,stage,oasStartAge ){
			if(age>=oasStartAge && stage==1)
			{
				return 1;
			}
			else
			{
				return 0;
			}
		}
		
		
		//=IF(D2=1,Input!$B$69,0)
		//Input!$B$69=IF(B70=2,B9*B7,B8)
		function calculateIncomeNeeded(){
			var yearInRetirementPrimary = me.data.yearInRetirementPrimary,
				yearInRetirementSecondary = me.data.yearInRetirementSecondary,
				primaryRetirementAge = me.data.retirementStartAgePrimary,
				secondaryRetirementAge = me.data.retirementStartAgeSecondary,
				incomeNeededPrimary = me.tempValues.incomeNeededPrimary,
				incomeNeededSecondary = me.tempValues.incomeNeededSecondary,
				isSpouse = Boolean(me.data.spouse),
				i = 1, 
				maxYears = me.data.maxYears, 
				ageP,ageS, stageP, stageS;
				incomeNeededPrimary[0] = 0;
				incomeNeededSecondary[0] = 0;
				for(i = 1;i <= maxYears; ++i)
				{
					 ageP = me.tempValues.primaryAge[i];
					 stageP = calculateStage(ageP, primaryRetirementAge, yearInRetirementPrimary);
									
					if(stageP === 1)
					{
						if(me.tempValues.inputB70 === 2 )
						{
							incomeNeededPrimary[i]=me.data.annualIncomePrimary * me.data.targetRetirementIncomePrimaryPercent;
						}
						else{
							incomeNeededPrimary[i]=me.data.targetRetirementIncomePrimaryAmount;
						}
						
					}
					else
					{
						
						incomeNeededPrimary[i] = 0;
					}
					if(isSpouse)
					{
						ageS = me.tempValues.secondaryAge[i];
						stageS = calculateStage(ageS, secondaryRetirementAge, yearInRetirementSecondary );
						if(stageS === 1)
						{
							if(me.tempValues.inputB73 === 2 )
							{
								incomeNeededSecondary[i]=me.data.annualIncomeSecondary * me.data.targetRetirementIncomeSecondaryPercent;
							}
							else
							{
								incomeNeededSecondary[i]=me.data.targetRetirementIncomeSecondaryAmount;
							}
						}
						else{
							incomeNeededSecondary[i] = 0;
						}
					}
				}
				
		}
		//=IF(F2=1,FV(Input!$B$56,'Primary Details - Actual'!B2,,-Input!$B$12),0)
		function calculateOAS(){
				var yearInRetirementPrimary = me.data.yearInRetirementPrimary,
				yearInRetirementSecondary = me.data.yearInRetirementSecondary,
				primaryRetirementAge = me.data.retirementStartAgePrimary,
				secondaryRetirementAge = me.data.retirementStartAgeSecondary,
				oasStartAgePrimary = me.tempValues.oasStartAgePrimary,
				oasStartAgeSecondary = me.tempValues.oasStartAgeSecondary,
				actualOasPrimary = me.tempValues.actualOasPrimary,
				actualOasSecondary = me.tempValues.actualOasSecondary,
				isSpouse = Boolean(me.data.spouse),
				i = 1, 
				maxYears = me.data.maxYears, 
				ageP,ageS, stageP, stageS,
				retYearsPrimary = 0,
				retYearsSecondary = 0;
				actualOasPrimary[0] = 0;
				actualOasSecondary[0] = 0;
			for( i = 1;i <= maxYears; ++i)
				{
					 ageP = me.tempValues.primaryAge[i];
					
					 stageP = calculateStage(ageP,primaryRetirementAge,yearInRetirementPrimary);
					
					 retYearsPrimary = 0;
						
					if(ageP>=primaryRetirementAge)
					{
						retYearsPrimary = ageP-primaryRetirementAge;
					}
					
					if(calculateActualOasStart(ageP, stageP, oasStartAgePrimary ))
					{
						actualOasPrimary[i] = Formula.FV(me.tempValues.realInterestRate,retYearsPrimary,0,-1*me.data.oasPrimary,0);
						
					}
					else{
						actualOasPrimary[i]  = 0;
					}
					if(isSpouse)
					{
						ageS = me.tempValues.secondaryAge[i];
						stageS = calculateStage(ageS, secondaryRetirementAge,yearInRetirementSecondary );
						retYearsSecondary = 0;
						if(ageS>=secondaryRetirementAge)
						{
							retYearsSecondary = ageS-secondaryRetirementAge;
						}
						if(calculateActualOasStart(ageS, stageS, oasStartAgeSecondary ))
						{
							actualOasSecondary[i] = Formula.FV(me.tempValues.realInterestRate,retYearsSecondary,0,-1*me.data.oasSecondary,0);
							
						}
						else{
							actualOasSecondary[i]  = 0;
						}
					}
				}
		}
		//=IF(E2=1,FV(Input!$B$56,'Primary Details - Actual'!B2,,-Input!$B$13),0)
		function calculateCPP(){
			var yearInRetirementPrimary = me.data.yearInRetirementPrimary,
				yearInRetirementSecondary = me.data.yearInRetirementSecondary,
				primaryRetirementAge = me.data.retirementStartAgePrimary,
				secondaryRetirementAge = me.data.retirementStartAgeSecondary,
				cppStartAgePrimary = me.tempValues.cppStartAgePrimary,
				cppStartAgeSecondary = me.tempValues.cppStartAgeSecondary,
				actualCppPrimary = me.tempValues.actualCppPrimary,
				actualCppSecondary = me.tempValues.actualCppSecondary,
				isSpouse = Boolean(me.data.spouse),
				i = 1, 
				maxYears = me.data.maxYears, 
				ageP,ageS, stageP, stageS,
				retYearsPrimary = 0,
				retYearsSecondary = 0;
				actualCppPrimary[0] = 0 ;
				actualCppSecondary[0]= 0;
			for( i = 1;i <= maxYears; ++i)
				{
					 ageP = me.tempValues.primaryAge[i];
					 
					 retYearsPrimary = 0;
					
					if(ageP>=primaryRetirementAge)
					{
						retYearsPrimary = ageP-primaryRetirementAge;
					}
					
					if(calculateActualCppStart(ageP,cppStartAgePrimary)===1)
					{
						actualCppPrimary[i] = Formula.FV(me.tempValues.realInterestRate,retYearsPrimary,0,-1*me.data.cppPrimary,0);
					}
					else
					{
						actualCppPrimary[i] = 0;
					}
					if(isSpouse)
					{
						ageS = me.tempValues.secondaryAge[i];
						retYearsSecondary = 0;
						if(ageS>=secondaryRetirementAge)
						{
							retYearsSecondary = ageS-secondaryRetirementAge;
						}
						if(calculateActualCppStart(ageS,cppStartAgeSecondary)===1)
						{
							actualCppSecondary[i] = Formula.FV(me.tempValues.realInterestRate,retYearsSecondary,0,-1*me.data.cppSecondary,0);
						}
						else
						{
							actualCppSecondary[i] = 0;
						}
					}
				}
		}

		//=IF(D2=1,Input!$B$16+Input!$B$14+Input!$B$15,0)
		function calculateOtherIncomes(){
			var yearInRetirementPrimary = me.data.yearInRetirementPrimary,
				yearInRetirementSecondary = me.data.yearInRetirementSecondary,
				primaryRetirementAge = me.data.retirementStartAgePrimary,
				secondaryRetirementAge = me.data.retirementStartAgeSecondary,
				actualOtherIncomePrimary = me.tempValues.actualOtherIncomePrimary,
				actualOtherIncomeSecondary = me.tempValues.actualOtherIncomeSecondary,
				isSpouse = Boolean(me.data.spouse),
				i = 1, 
				maxYears = me.data.maxYears, 
				ageP, ageS, stageP, stageS;
				actualOtherIncomePrimary[0]=0;
				actualOtherIncomeSecondary[0]=0;
				for( i = 1;i <= maxYears; ++i)
				{
					 ageP = me.tempValues.primaryAge[i];
					 stageP = calculateStage(ageP, primaryRetirementAge, yearInRetirementPrimary);
									
					if(stageP===1)
					{
						actualOtherIncomePrimary[i] = me.data.companyPensionPrimary + me.data.otherIncomePrimary + me.data.nonRegInvestmentsPrimary;
					}
					else
					{
						actualOtherIncomePrimary[i] = 0;
					}
					if(isSpouse)
					{
						ageS = me.tempValues.secondaryAge[i];
						stageS = calculateStage(ageS, secondaryRetirementAge, yearInRetirementSecondary);
						if(stageS===1)
						{
							actualOtherIncomeSecondary[i] = me.data.companyPensionSecondary + me.data.otherIncomeSecondary + me.data.nonRegInvestmentsSecondary;
						}
						else
						{
							actualOtherIncomeSecondary[i] = 0;
						}
					}
				}
		}
		
		function calculateIncomeRequiredFromInvestment(){
			var yearInRetirementPrimary = me.data.yearInRetirementPrimary,
				yearInRetirementSecondary = me.data.yearInRetirementSecondary,
				primaryRetirementAge = me.data.retirementStartAgePrimary,
				secondaryRetirementAge = me.data.retirementStartAgeSecondary,
				actualIncomeRequiredPrimary = me.tempValues.actualIncomeRequiredPrimary,
				actualIncomeRequiredSecondary = me.tempValues.actualIncomeRequiredSecondary,
				incomeNeededPrimary = me.tempValues.incomeNeededPrimary,
				incomeNeededSecondary = me.tempValues.incomeNeededSecondary,
				actualOasPrimary = me.tempValues.actualOasPrimary,
				actualOasSecondary = me.tempValues.actualOasSecondary,
				actualCppPrimary = me.tempValues.actualCppPrimary,
				actualCppSecondary = me.tempValues.actualCppSecondary,
				actualOtherIncomePrimary = me.tempValues.actualOtherIncomePrimary,
				actualOtherIncomeSecondary = me.tempValues.actualOtherIncomeSecondary,
				isSpouse = Boolean(me.data.spouse),
				i = 1, 
				maxYears = me.data.maxYears, 
				ageP,ageS, stageP, stageS;
				actualIncomeRequiredPrimary[0] = 0;
				actualIncomeRequiredSecondary[0] = 0;
				for( i = 1;i <= maxYears; ++i)
				{
					 ageP = me.tempValues.primaryAge[i];
					 stageP = calculateStage(ageP, primaryRetirementAge, yearInRetirementPrimary);
					 
					if(stageP===1)
					{
						actualIncomeRequiredPrimary[i]= incomeNeededPrimary[i] - actualOasPrimary[i] - actualCppPrimary[i] - actualOtherIncomePrimary[i] ;
					}
					else
					{
						actualIncomeRequiredPrimary[i] = 0;
					}
					if(isSpouse)
					{
						ageS = me.tempValues.secondaryAge[i];
						stageS = calculateStage(ageS, secondaryRetirementAge, yearInRetirementSecondary);
						if(stageS===1)
						{
							actualIncomeRequiredSecondary[i] = incomeNeededSecondary[i] - actualOasSecondary[i] - actualCppSecondary[i] - actualOtherIncomeSecondary[i] ;
						}
						else
						{
							actualIncomeRequiredSecondary[i] = 0;
						}
					}
				}
		}
		
		
		function calculateBalanceActualDetails () {
			//=IF(OR(P2<0,D3=2),0,P2*(1+Input!$B$56))
			var primaryActualBeginingBalance = me.tempValues.primaryActualBeginingBalance,
			secondaryActualBeginingBalance = me.tempValues.secondaryActualBeginingBalance,
			//=IF(D3=2,P2,G3+H3-O3)
			primaryActualEndingBalance = me.tempValues.primaryActualEndingBalance,
			secondaryActualEndingBalance = me.tempValues.secondaryActualEndingBalance,
			yearInRetirementPrimary = me.data.yearInRetirementPrimary,
			yearInRetirementSecondary = me.data.yearInRetirementSecondary,
			primaryRetirementAge = me.data.retirementStartAgePrimary,
			secondaryRetirementAge = me.data.retirementStartAgeSecondary,
			actualIncomeRequiredPrimary = me.tempValues.actualIncomeRequiredPrimary,
			actualIncomeRequiredSecondary = me.tempValues.actualIncomeRequiredSecondary,
			primaryContributions = me.tempValues.primaryContributions,
			secondaryContributions = me.tempValues.secondaryContributions,
			isSpouse = Boolean(me.data.spouse),
			i = 1, 
			maxYears = me.data.maxYears, 
			ageP,ageS, stageP, stageS;
			primaryActualBeginingBalance[0] = 0;
			secondaryActualBeginingBalance[0] = 0;
			primaryActualEndingBalance[0] = 0;
			secondaryActualEndingBalance[0] = 0;
			primaryActualBeginingBalance[1] = me.data.currentRRSPSavingsPrimary + me.data.currentTFSASavingsPrimary + me.data.currentNONREGSavingsPrimary;
			primaryActualEndingBalance[1] = primaryActualBeginingBalance[1] + primaryContributions[1] - actualIncomeRequiredPrimary[1];
			if(isSpouse)
			{
				secondaryActualBeginingBalance[1] = me.data.currentRRSPSavingsSecondary + me.data.currentTFSASavingsSecondary + me.data.currentNONREGSavingsSecondary;
				secondaryActualEndingBalance[1] = secondaryActualBeginingBalance[1] + secondaryContributions[1] - actualIncomeRequiredSecondary[1];
			}
					
			for( i = 2; i<= maxYears; ++i)
			{
				 ageP = me.tempValues.primaryAge[i];
				 stageP = calculateStage(ageP, primaryRetirementAge, yearInRetirementPrimary);
				 				
				if(primaryActualEndingBalance[i-1]<0 || stageP === 2)
				{
					primaryActualBeginingBalance[i] = 0
				}
				else
				{
					primaryActualBeginingBalance[i] = primaryActualEndingBalance[i-1] * (1 + me.tempValues.realInterestRate);
				}
								
				if(stageP === 2)
				{
					primaryActualEndingBalance[i] = primaryActualEndingBalance[i-1];
				}
				else
				{
					primaryActualEndingBalance[i] = primaryActualBeginingBalance[i] + primaryContributions[i] - actualIncomeRequiredPrimary[i];
				}
				if(isSpouse)
				{
					ageS = me.tempValues.secondaryAge[i];
					stageS = calculateStage(ageS, secondaryRetirementAge, yearInRetirementSecondary);
					if(secondaryActualEndingBalance[i-1]<0 || stageS === 2)
					{
						secondaryActualBeginingBalance[i] = 0
					}
					else
					{
						secondaryActualBeginingBalance[i] = secondaryActualEndingBalance[i-1] * (1 + me.tempValues.realInterestRate);
					}
					if(stageS === 2)
					{
						secondaryActualEndingBalance[i] = secondaryActualEndingBalance[i-1];
					}
					else
					{
						secondaryActualEndingBalance[i] = secondaryActualBeginingBalance[i] + secondaryContributions[i] - actualIncomeRequiredSecondary[i];
					}
				}
			}
			
		}
		
		function calculateActualS(){
			var actualIncomeRequiredPrimary = me.tempValues.actualIncomeRequiredPrimary,
				actualIncomeRequiredSecondary = me.tempValues.actualIncomeRequiredSecondary,
				primaryRetirementAge = me.data.retirementStartAgePrimary,
				secondaryRetirementAge = me.data.retirementStartAgeSecondary,
				actualPrimaryS = me.tempValues.actualPrimaryS,
				actualSecondaryS = me.tempValues.actualSecondaryS,
				isSpouse = Boolean(me.data.spouse),
				i = 1, 
				maxYears = me.data.maxYears, 
				ageP,ageS, stageP, stageS,
				retYearsPrimary = 0,
				retYearsSecondary = 0;
				actualPrimaryS[0] = 0;
				actualSecondaryS[0] = 0;
				//=IF(PV(Input!$B$56,'Primary Details - Hypothetical'!B2,0,'Primary Details - Hypothetical'!H2,1),0,PV(Input!$B$56,'Primary Details - Hypothetical'!B2,0,'Primary Details - Hypothetical'!H2,1))
				//actualIncomeRequiredPrimary[1] = 
				for( i = 1; i<= maxYears; ++i)
				{
					ageP = me.tempValues.primaryAge[i];
					
					retYearsPrimary = 0;
					
					if(ageP>=primaryRetirementAge)
					{
						retYearsPrimary = ageP-primaryRetirementAge;
					}
					
					//=PV(Input!$B$56,'Primary Details - Hypothetical'!B3,0,'Primary Details - Hypothetical'!H3,1)
					//Formula.PV = function (rate, periods, payment, future, type) {
					actualPrimaryS[i] = Formula.PV(me.tempValues.realInterestRate, retYearsPrimary, 0, actualIncomeRequiredPrimary[i],1);
					if(isSpouse)
					{
						ageS = me.tempValues.secondaryAge[i];
						retYearsSecondary = 0;
						//if(ageS>=secondaryRetirementAge)
						if(ageS>=primaryRetirementAge) //TODO a verifier excel non correct ??
						{
						//	retYearsSecondary = ageS-secondaryRetirementAge;
							retYearsSecondary = ageS-primaryRetirementAge;
						}
						actualSecondaryS[i] = Formula.PV(me.tempValues.realInterestRate,retYearsSecondary,0,actualIncomeRequiredSecondary[i],1)
					}
				}
				
		}
		
		function calculateResults()
		{
			var ageP, ageS,
			isSpouse = Boolean(me.data.spouse),
			i = 1,
			maxYears = me.data.maxYears;
			 me.tempValues.sumSprimary = 0;
			 me.tempValues.sumSsecondary = 0;
			for( i = 1; i<= maxYears; ++i)
			{
				 ageP = me.tempValues.primaryAge[i];
				
				if(ageP === me.data.retirementStartAgePrimary)
				{
					me.results.savingsAtRetirementPrimary = me.tempValues.primaryActualBeginingBalance[i];
				} 
				me.tempValues.sumSprimary = me.tempValues.sumSprimary + me.tempValues.actualPrimaryS[i];
				if(isSpouse)
				{
					 ageS = me.tempValues.secondaryAge[i];
					if(ageS === me.data.retirementStartAgeSecondary)
					{
						me.results.savingsAtRetirementSecondary = me.tempValues.secondaryActualBeginingBalance[i];
					}
					me.tempValues.sumSsecondary = me.tempValues.sumSsecondary + me.tempValues.actualSecondaryS[i];
				}
				
				
			}
			//Formula.PMT = function (rate, periods, present, future, type) {
			me.results.annualIncomeBasedOnActualSavingsPrimary = Formula.PMT(me.tempValues.realInterestRate, me.data.yearInRetirementPrimary,(-1)*me.results.savingsAtRetirementPrimary,0,1);
			me.results.estimatedRetirementIncomePrimary = me.results.annualIncomeBasedOnActualSavingsPrimary + me.data.oasPrimary + me.data.cppPrimary + me.data.companyPensionPrimary + me.data.nonRegInvestmentsPrimary + me.data.otherIncomePrimary;
			me.results.npvDesiredIncomePrimary = Math.max((-1)*me.tempValues.sumSprimary,0);
			me.results.pvOfInvestmentRequiredPrimary = Math.max(Formula.PV(me.tempValues.realInterestRate,me.data.retirementStartAgePrimary-me.data.currentAgePrimary,me.tempValues.inputB21+me.tempValues.inputB24+me.tempValues.inputB27,(-1)*me.results.npvDesiredIncomePrimary,1),0);
			me.results.pvOfRecommendedInvestementPrimary = me.results.npvDesiredIncomePrimary;
			me.results.valueOfRecommendedInvestmentPerYearPrimary = Formula.PMT(me.tempValues.realInterestRate,me.data.yearInRetirementPrimary,(-1)*me.results.pvOfRecommendedInvestementPrimary,0,1);
			me.results.fvSavingsPrimary = Formula.FV(me.tempValues.realInterestRate, me.data.retirementStartAgePrimary-me.data.currentAgePrimary,(-1)*me.tempValues.inputB21-me.tempValues.inputB24-me.tempValues.inputB27,-1*me.data.currentRRSPSavingsPrimary-me.data.currentTFSASavingsPrimary-me.data.currentNONREGSavingsPrimary,1);
			me.results.shortFallPrimary = me.results.savingsAtRetirementPrimary - me.results.npvDesiredIncomePrimary;
			me.results.monthlyContributionAmountPrimary = Formula.PMT(me.tempValues.realInterestRate,me.data.retirementStartAgePrimary-me.data.currentAgePrimary,0,me.results.shortFallPrimary,1)/12;
			me.results.totalMonthlyContributionsNeededPrimary = me.results.monthlyContributionAmountPrimary + me.data.RRSPcontributionsPrimary+me.data.TFSAContributionsPrimary + me.data.NONREGContributionsPrimary;
			me.results.totalAnnualContributionsNeededPrimary = me.results.totalMonthlyContributionsNeededPrimary * 12;
			
			if(isSpouse)
			{
				me.results.annualIncomeBasedOnActualSavingsSecondary = Formula.PMT(me.tempValues.realInterestRate, me.data.yearInRetirementSecondary,(-1)*me.results.savingsAtRetirementSecondary,0,1);
				me.results.estimatedRetirementIncomeSecondary = me.results.annualIncomeBasedOnActualSavingsSecondary + me.data.oasSecondary + me.data.cppSecondary + me.data.companyPensionSecondary + me.data.nonRegInvestmentsSecondary + me.data.otherIncomeSecondary;
				me.results.npvDesiredIncomeSecondary = Math.max((-1)*me.tempValues.sumSsecondary,0);
				me.results.pvOfInvestmentRequiredSecondary = Math.max(Formula.PV(me.tempValues.realInterestRate,me.data.retirementStartAgeSecondary-me.data.currentAgeSecondary,me.tempValues.inputC21+me.tempValues.inputC24+me.tempValues.inputC27,(-1)*me.results.npvDesiredIncomeSecondary,1),0);
				me.results.pvOfRecommendedInvestementSecondary = me.results.npvDesiredIncomeSecondary;
				me.results.valueOfRecommendedInvestmentPerYearSecondary = Formula.PMT(me.tempValues.realInterestRate,me.data.yearInRetirementSecondary,(-1)*me.results.pvOfRecommendedInvestementSecondary,0,1);
				me.results.fvSavingsSecondary = Formula.FV(me.tempValues.realInterestRate, me.data.retirementStartAgeSecondary-me.data.currentAgeSecondary,(-1)*me.tempValues.inputC21-me.tempValues.inputC24-me.tempValues.inputC27,-1*me.data.currentRRSPSavingsSecondary-me.data.currentTFSASavingsSecondary-me.data.currentNONREGSavingsSecondary,1);
				me.results.shortFallSecondary = me.results.savingsAtRetirementSecondary - me.results.npvDesiredIncomeSecondary;
				me.results.monthlyContributionAmountSecondary = Formula.PMT(me.tempValues.realInterestRate,me.data.retirementStartAgeSecondary-me.data.currentAgeSecondary,0,me.results.shortFallSecondary,1)/12;
				me.results.totalMonthlyContributionsNeededSecondary = me.results.monthlyContributionAmountSecondary + me.data.RRSPcontributionsSecondary + me.data.TFSAContributionsSecondary + me.data.NONREGContributionsSecondary;
				me.results.totalAnnualContributionsNeededSecondary = me.results.totalMonthlyContributionsNeededSecondary * 12;
			}
			
	}
	
	function calculateScenario()
		{
			if(me.results.fvSavingsPrimary < me.results.npvDesiredIncomePrimary)
				{
					me.results.scenarioPrimary = 1;
				}
				else
				{
					if(me.results.fvSavingsPrimary === me.results.npvDesiredIncomePrimary)
					{
						me.results.scenarioPrimary =  3;
					}
					else
					{
						me.results.scenarioPrimary =  2;
					}
					
				}
			
			
			if(Boolean(me.data.spouse))
			{
				if(me.results.fvSavingsSecondary < me.results.npvDesiredIncomeSecondary)
				{
					me.results.scenarioSecondary = 1;
				}
				else
				{
					if(me.results.fvSavingsSecondary === me.results.npvDesiredIncomeSecondary)
					{
						me.results.scenarioSecondary =  3;
					}
					else
					{
						me.results.scenarioSecondary =  2;
					}
					
				}
			}
		}
		
		
		function calculateHypotheticalBalance(){
			var primaryHypotheticalEndingBalance = me.tempValues.primaryHypotheticalEndingBalance,
				secondaryHypotheticalEndingBalance = me.tempValues.secondaryHypotheticalEndingBalance,
				primaryHypotheticalBeginingBalance = me.tempValues.primaryHypotheticalBeginingBalance,
				secondaryHypotheticalBeginingBalance = me.tempValues.secondaryHypotheticalBeginingBalance,
				yearInRetirementPrimary = me.data.yearInRetirementPrimary,
				yearInRetirementSecondary = me.data.yearInRetirementSecondary,
				primaryRetirementAge = me.data.retirementStartAgePrimary,
				secondaryRetirementAge = me.data.retirementStartAgeSecondary,
				actualIncomeRequiredPrimary = me.tempValues.actualIncomeRequiredPrimary,
				actualIncomeRequiredSecondary = me.tempValues.actualIncomeRequiredSecondary,
				primaryContributions = me.tempValues.primaryContributions,
				secondaryContributions = me.tempValues.secondaryContributions,
				isSpouse = Boolean(me.data.spouse),
				i = 1, 
				maxYears = me.data.maxYears, 
				ageP,ageS, stageP, stageS,
				retYearsPrimary = 0,
				retYearsSecondary = 0;
				primaryHypotheticalBeginingBalance[0] = 0;
				secondaryHypotheticalBeginingBalance[0] = 0; 
				primaryHypotheticalEndingBalance[0] = 0;
				secondaryHypotheticalEndingBalance[0] = 0;
				primaryHypotheticalBeginingBalance[1] = me.results.pvOfInvestmentRequiredPrimary;
				primaryHypotheticalEndingBalance[1]=primaryHypotheticalBeginingBalance[1] + primaryContributions[1] - actualIncomeRequiredPrimary[1];
				if(isSpouse)
				{
					secondaryHypotheticalBeginingBalance[1] = me.results.pvOfInvestmentRequiredSecondary;
					secondaryHypotheticalEndingBalance[1] = secondaryHypotheticalBeginingBalance[1] + secondaryContributions[1] - actualIncomeRequiredSecondary[1];
				}
				for(i = 2; i<=maxYears; ++i)
				{
					ageP = me.tempValues.primaryAge[i];
				 	stageP = calculateStage(ageP, primaryRetirementAge, yearInRetirementPrimary);
					if(primaryHypotheticalEndingBalance[i-1] < 0 || stageP ===2)
					{
						primaryHypotheticalBeginingBalance[i] = 0;
					}
					else
					{
						primaryHypotheticalBeginingBalance[i] = primaryHypotheticalEndingBalance[i-1] * (1+me.tempValues.realInterestRate);
					}
					if(stageP===2)
					{
						primaryHypotheticalEndingBalance[i] = primaryHypotheticalEndingBalance[i-1];
					}
					else
					{
						primaryHypotheticalEndingBalance[i] = primaryHypotheticalBeginingBalance[i] + primaryContributions[i] - actualIncomeRequiredPrimary[i];
					}
					if(isSpouse)
					{
						ageS = me.tempValues.secondaryAge[i];
						stageS = calculateStage(ageS, secondaryRetirementAge, yearInRetirementSecondary);
						if(secondaryHypotheticalEndingBalance[i-1]<0 || stageS ===2)
						{
							secondaryHypotheticalBeginingBalance[i] = 0;
						}
						else
						{
							secondaryHypotheticalBeginingBalance[i] = secondaryHypotheticalEndingBalance[i-1] * (1+me.tempValues.realInterestRate);
						}
						if(stageS===2)
						{
							secondaryHypotheticalEndingBalance[i] = secondaryHypotheticalEndingBalance[i-1];
						}
						else
						{
							secondaryHypotheticalEndingBalance[i] = secondaryHypotheticalBeginingBalance[i] + secondaryContributions[i] - actualIncomeRequiredSecondary[i];
						}
					}
				}
				
				
		}
		
		
		function displayText(){
			if(me.results.scenarioPrimary ===8)
			{
				me.results.textE32 = "Yearly";
				me.results.textF32 = "Yearly";
				me.results.textG32 = "Yearly";
			}
			else{
				me.results.textE32="$"+ Formula.ROUND(me.results.pvOfRecommendedInvestementPrimary,0)+ " will yield an annual income of $"+ Formula.ROUND(me.results.valueOfRecommendedInvestmentPerYearPrimary,0) + " over " +me.data.yearInRetirementPrimary + " years ";
				me.results.textF32="$"+ Formula.ROUND(me.results.savingsAtRetirementPrimary,0)+ " will yield an annual income of $"+ Formula.ROUND(me.results.annualIncomeBasedOnActualSavingsPrimary,0) + " over " +me.data.yearInRetirementPrimary + " years ";
				me.results.textG32= Formula.ROUND(me.results.fvSavingsPrimary-me.results.pvOfRecommendedInvestementPrimary,0);
			}
			if(Boolean(me.data.spouse))
			{
				if(me.results.scenarioSecondary ===8)
				{
					me.results.textE33 = "Yearly";
					me.results.textF33 = "Yearly";
					me.results.textG33 = "Yearly";
				}
				else{
					me.results.textE33="$"+ Formula.ROUND(me.results.pvOfRecommendedInvestementSecondary,0)+ " will yield an annual income of $"+ Formula.ROUND(me.results.valueOfRecommendedInvestmentPerYearSecondary,0) + " over " +me.data.yearInRetirementSecondary + " years ";
					me.results.textF33="$"+ Formula.ROUND(me.results.savingsAtRetirementSecondary,0)+ " will yield an annual income of $"+ Formula.ROUND(me.results.annualIncomeBasedOnActualSavingsSecondary,0) + " over " +me.data.yearInRetirementSecondary + " years ";
					me.results.textG33= Formula.ROUND(me.results.fvSavingsSecondary-me.results.pvOfRecommendedInvestementSecondary,0);
				}
			}
		}
		
		
		function calculate () {
			var data = me.data,
				results = me.results;

				calculateAge();
				calculateContributions();
				calculateIncomeNeeded();
				calculateOAS();
				calculateCPP();
				calculateOtherIncomes();
				calculateIncomeRequiredFromInvestment();
				calculateBalanceActualDetails () ;
				
				calculateActualS();
				calculateResults();
				calculateScenario();
				calculateHypotheticalBalance();
				displayText();
				
		}

		calculate();		
		console.log(me.tempValues);
		console.log(me.results);
	});