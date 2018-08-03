describe("Retirement Calculator test suite :", function() {
  /**
   * 
    install Node.js (obviously).

    Next install Jasmine. Open a command prompt and run:

    npm install -g jasmine

    Next, cd to any directory and set up an example 'project':

    jasmine init
    jasmine examples

    Now run your unit tests:

    jasmine

   */
    if(typeof require !== 'undefined') XLSX = require('xlsx');
    //
    var calculator = require('../calc_standalone.js');
    

    //Fill input and results data
    function getInfoFromData(data, inputData, resultsToCompare){
      // var inputData = {};
      //var resultsToCompare = {};
      inputData.maxYears = 101; 
      for(var i in data)
      {
        
        if(data[i]['Primary']==='Current Age')
        {
          inputData.currentAgePrimary = data[i]['Primary-values'];
          
        }
        if(data[i]['Spouse']==='Current Age Spouse' && data[i]['spouse-values']!=0)
        {
          inputData.spouse = true;
          inputData.currentAgeSecondary = data[i]['spouse-values'];
        }
        if(data[i]['Assumptions'] ==='Estimated ROR')
        {
          inputData.estimatedROR = data[i]['Assumptions-values'];
        }
        if(data[i]['Primary'] ==='Retirement Start Age')
        {
          inputData.retirementStartAgePrimary = data[i]['Primary-values'];
        }
        if(data[i]['Spouse'] ==='Retirement Start Age Spouse')
        {
          inputData.retirementStartAgeSecondary = data[i]['spouse-values'];
        }
        if(data[i]['Primary'] ==='Years in Retirement')
        {
          inputData.yearInRetirementPrimary = data[i]['Primary-values'];
        }
        if(data[i]['Spouse'] ==='Years in Retirement Spouse')
        {
          inputData.yearInRetirementSecondary = data[i]['spouse-values'];
        }
        if(data[i]['Assumptions'] ==='Inflation rate')
        {
          inputData.inflationRate = data[i]['Assumptions-values'];
        }
        if(data[i]['Primary'] ==='Annual Income')
        {
          inputData.annualIncomePrimary = data[i]['Primary-values'];
        }
        if(data[i]['Spouse'] ==='Annual Income Spouse')
        {
          inputData.annualIncomeSecondary = data[i]['spouse-values'];
        }
        
        if(data[i]['Primary'] ==='Target Retirement income amount')
        {
          inputData.targetRetirementIncomePrimaryAmount = data[i]['Primary-values'];
          if( typeof inputData.targetRetirementIncomePrimaryAmount === 'undefined')
          {
            inputData.targetRetirementIncomePrimaryAmount = 0;
          }
        }
        if(data[i]['Spouse'] ==='Target Retirement income amount Spouse')
        {
          inputData.targetRetirementIncomeSecondaryAmount = data[i]['spouse-values'];
          if( typeof inputData.targetRetirementIncomeSecondaryAmount === 'undefined')
          {
            inputData.targetRetirementIncomeSecondaryAmount = 0;
          }
        }
        
        if(data[i]['Primary'] ==='Target Retirement income percent')
        {
          inputData.targetRetirementIncomePrimaryPercent = data[i]['Primary-values'];
          if( typeof inputData.targetRetirementIncomePrimaryPercent === 'undefined')
          {
            inputData.targetRetirementIncomePrimaryPercent = 0;
          }
        }
        if(data[i]['Spouse'] ==='Target Retirement income percent Spouse')
        {
          inputData.targetRetirementIncomeSecondaryPercent = data[i]['spouse-values'];
          if( typeof inputData.targetRetirementIncomeSecondaryPercent === 'undefined')
          {
            inputData.targetRetirementIncomeSecondaryPercent = 0;
          }
        }
        
        if(data[i]['Primary'] ==='Old Age Security')
        {
          inputData.oasPrimary = data[i]['Primary-values'];
           if( typeof inputData.oasPrimary === 'undefined')
           {
             inputData.oasPrimary = 0;
           }
        }
        if(data[i]['Spouse'] ==='Old Age Security Spouse')
        {
          inputData.oasSecondary = data[i]['spouse-values'];
           if( typeof inputData.oasSecondary === 'undefined')
           {
             inputData.oasSecondary = 0;
           }
        }
        
        if(data[i]['Primary'] ==='CPP/QPP')
        {
          inputData.cppPrimary = data[i]['Primary-values'];
           if( typeof inputData.cppPrimary === 'undefined')
           {
             inputData.cppPrimary = 0;
           }
        }
        if(data[i]['Spouse'] ==='CPP/QPP Spouse')
        {
          inputData.cppSecondary = data[i]['spouse-values'];
           if( typeof inputData.cppSecondary === 'undefined')
           {
             inputData.cppSecondary = 0;
           }
        }
        
        if(data[i]['Primary'] ==='Company Pension')
        {
          inputData.companyPensionPrimary = data[i]['Primary-values'];
          if( typeof inputData.companyPensionPrimary === 'undefined')
          {
            inputData.companyPensionPrimary = 0;
          }
        }
        if(data[i]['Spouse'] ==='Company Pension Spouse')
        {
          inputData.companyPensionSecondary = data[i]['spouse-values'];
          if( typeof inputData.companyPensionSecondary === 'undefined')
          {
            inputData.companyPensionSecondary = 0;
          }
        }
        
        if(data[i]['Primary'] ==='Non Reg Investments')
        {
          inputData.nonRegInvestmentsPrimary = data[i]['Primary-values'];
          if( typeof inputData.nonRegInvestmentsPrimary === 'undefined')
          {
            inputData.nonRegInvestmentsPrimary = 0;
          }
        }
        if(data[i]['Spouse'] ==='Non Reg Investments Spouse')
        {
          inputData.nonRegInvestmentsSecondary = data[i]['spouse-values'];
           if( typeof inputData.nonRegInvestmentsSecondary === 'undefined')
          {
            inputData.nonRegInvestmentsSecondary = 0;
          }
        }
        
        if(data[i]['Primary'] ==='Other sources of income')
        {
          inputData.otherIncomePrimary = data[i]['Primary-values'];
          if( typeof inputData.otherIncomePrimary === 'undefined')
          {
            inputData.otherIncomePrimary = 0;
          }
        }
        if(data[i]['Spouse'] ==='Other sources of income Spouse')
        {
          inputData.otherIncomeSecondary = data[i]['spouse-values'];
          if( typeof inputData.otherIncomeSecondary === 'undefined')
          {
            inputData.otherIncomeSecondary = 0;
          }
        }
        
        if(data[i]['Primary'] ==='Current RRSP Savings')
        {
          inputData.currentRRSPSavingsPrimary = data[i]['Primary-values'];
          if( typeof inputData.currentRRSPSavingsPrimary === 'undefined')
          {
            inputData.currentRRSPSavingsPrimary = 0;
          }
        }
        if(data[i]['Spouse'] ==='Current RRSP Savings Spouse')
        {
          inputData.currentRRSPSavingsSecondary = data[i]['spouse-values'];
          if( typeof inputData.currentRRSPSavingsSecondary === 'undefined')
          {
            inputData.currentRRSPSavingsSecondary = 0;
          }
        }
        
        if(data[i]['Primary'] ==='RRSP contributions')
        {
          inputData.RRSPcontributionsPrimary = data[i]['Primary-values'];
          if( typeof inputData.RRSPcontributionsPrimary === 'undefined')
          {
            inputData.RRSPcontributionsPrimary = 0;
          }
        }
        if(data[i]['Spouse'] ==='RRSP contributions Spouse')
        {
          inputData.RRSPcontributionsSecondary = data[i]['spouse-values'];
          if( typeof inputData.RRSPcontributionsSecondary === 'undefined')
          {
            inputData.RRSPcontributionsSecondary = 0;
          }
        }
        
        if(data[i]['Primary'] ==='Current TFSA Savings')
        {
          inputData.currentTFSASavingsPrimary = data[i]['Primary-values'];
           if( typeof inputData.currentTFSASavingsPrimary === 'undefined')
          {
            inputData.currentTFSASavingsPrimary = 0;
          }
        }
        if(data[i]['Spouse'] ==='Current TFSA Savings Spouse')
        {
          inputData.currentTFSASavingsSecondary = data[i]['spouse-values'];
           if( typeof inputData.currentTFSASavingsSecondary === 'undefined')
          {
            inputData.currentTFSASavingsSecondary = 0;
          }
        }
        
        if(data[i]['Primary'] ==='TFSA contributions')
        {
          inputData.TFSAContributionsPrimary = data[i]['Primary-values'];
            if( typeof inputData.TFSAContributionsPrimary === 'undefined')
          {
            inputData.TFSAContributionsPrimary = 0;
          }
        }
        if(data[i]['Spouse'] ==='TFSA contributions Spouse')
        {
          inputData.TFSAContributionsSecondary = data[i]['spouse-values'];
            if( typeof inputData.TFSAContributionsSecondary === 'undefined')
          {
            inputData.TFSAContributionsSecondary = 0;
          }
        }
        
        if(data[i]['Primary'] ==='Current Non-Reg Savings')
        {
          inputData.currentNONREGSavingsPrimary = data[i]['Primary-values'];
            if( typeof inputData.currentNONREGSavingsPrimary === 'undefined')
          {
            inputData.currentNONREGSavingsPrimary = 0;
          }
        }
        if(data[i]['Spouse'] ==='Current Non-Reg Savings Spouse')
        {
          inputData.currentNONREGSavingsSecondary = data[i]['spouse-values'];
            if( typeof inputData.currentNONREGSavingsSecondary === 'undefined')
          {
            inputData.currentNONREGSavingsSecondary = 0;
          }
        }
        
        if(data[i]['Primary'] ==='Non-Reg contributions')
        {
          inputData.NONREGContributionsPrimary = data[i]['Primary-values'];
            if( typeof inputData.NONREGContributionsPrimary === 'undefined')
          {
            inputData.NONREGContributionsPrimary = 0;
          }
        }
        if(data[i]['Spouse'] ==='Non-Reg contributions Spouse')
        {
          inputData.NONREGContributionsSecondary = data[i]['spouse-values'];
            if( typeof inputData.NONREGContributionsSecondary === 'undefined')
          {
            inputData.NONREGContributionsSecondary = 0;
          }
        }
        
        if(data[i]['Primary'] ==='Savings at Retirement')
        {
          resultsToCompare.savingsAtRetirementPrimary = data[i]['Primary-values'];
            if( typeof inputData.savingsAtRetirementPrimary === 'undefined')
          {
            inputData.savingsAtRetirementPrimary = 0;
          }
        }
        if(data[i]['Spouse'] ==='Savings at Retirement Spouse')
        {
          resultsToCompare.savingsAtRetirementSecondary = data[i]['spouse-values'];
            if( typeof inputData.savingsAtRetirementSecondary === 'undefined')
          {
            inputData.savingsAtRetirementSecondary = 0;
          }
        }
        
        if(data[i]['Primary'] ==='Annual Income based on Actual Savings')
        {
          resultsToCompare.annualIncomeBasedOnActualSavingsPrimary = data[i]['Primary-values'];
        }
        if(data[i]['Spouse'] ==='Annual Income based on Actual Savings Spouse')
        {
          resultsToCompare.annualIncomeBasedOnActualSavingsSecondary = data[i]['spouse-values'];
        }
        
        if(data[i]['Primary'] ==='Estimated Retirement Income Could be')
        {
          resultsToCompare.estimatedRetirementIncomePrimary = data[i]['Primary-values'];
        }
        if(data[i]['Spouse'] ==='Estimated Retirement Income Could be Spouse')
        {
          resultsToCompare.estimatedRetirementIncomeSecondary = data[i]['spouse-values'];
        }
        
        if(data[i]['Primary'] ==='NPV of Desired Income')
        {
          resultsToCompare.npvDesiredIncomePrimary = data[i]['Primary-values'];
        }
        if(data[i]['Spouse'] ==='NPV of Desired Income Spouse')
        {
          resultsToCompare.npvDesiredIncomeSecondary = data[i]['spouse-values'];
        }
        
        if(data[i]['Primary'] ==='PV of investment required to meet Desire Income')
        {
          resultsToCompare.pvOfInvestmentRequiredPrimary = data[i]['Primary-values'];
        }
        if(data[i]['Spouse'] ==='PV of investment required to meet Desire Income Spouse')
        {
          resultsToCompare.pvOfInvestmentRequiredSecondary = data[i]['spouse-values'];
        }
        
          if(data[i]['Primary'] ==='PV of Recommended Investment at Retirement')
        {
          resultsToCompare.pvOfRecommendedInvestementPrimary = data[i]['Primary-values'];
        }
        if(data[i]['Spouse'] ==='PV of Recommended Investment at Retirement Spouse')
        {
          resultsToCompare.pvOfRecommendedInvestementSecondary = data[i]['spouse-values'];
        }
        
        if(data[i]['Primary'] ==='Value of Recommended Investment Income per year')
        {
          resultsToCompare.valueOfRecommendedInvestmentPerYearPrimary = data[i]['Primary-values'];
        }
        if(data[i]['Spouse'] ==='Value of Recommended Investment Income per year Spouse')
        {
          resultsToCompare.valueOfRecommendedInvestmentPerYearSecondary = data[i]['spouse-values'];
        }
        
        if(data[i]['Primary'] ==='FV Savings')
        {
          resultsToCompare.fvSavingsPrimary = data[i]['Primary-values'];
        }
        if(data[i]['Spouse'] ==='FV Savings Spouse')
        {
          resultsToCompare.fvSavingsSecondary = data[i]['spouse-values'];
        }
        
        if(data[i]['Primary'] ==='Shortfall/Surplus')
        {
          resultsToCompare.shortFallPrimary = data[i]['Primary-values'];
        }
        if(data[i]['Spouse'] ==='Shortfall/Surplus Spouse')
        {
          resultsToCompare.shortFallSecondary = data[i]['spouse-values'];
        }
        
          if(data[i]['Primary'] ==='Monthly Contribution Amount needed to meet Goal')
        {
          resultsToCompare.monthlyContributionAmountPrimary = data[i]['Primary-values'];
        }
        if(data[i]['Spouse'] ==='Monthly Contribution Amount needed to meet Goal Spouse')
        {
          resultsToCompare.monthlyContributionAmountSecondary = data[i]['spouse-values'];
        }
        
          if(data[i]['Primary'] ==='Total Monthly Contributions Needed')
        {
          resultsToCompare.totalMonthlyContributionsNeededPrimary = data[i]['Primary-values'];
        }
        if(data[i]['Spouse'] ==='Total Monthly Contributions Needed Spouse')
        {
          resultsToCompare.totalMonthlyContributionsNeededSecondary = data[i]['spouse-values'];
        }
        
          if(data[i]['Primary'] ==='Total Contributions Needed')
        {
          resultsToCompare.totalAnnualContributionsNeededPrimary = data[i]['Primary-values'];
        }
        if(data[i]['Spouse'] ==='Total Contributions Needed Spouse')
        {
          resultsToCompare.totalAnnualContributionsNeededSecondary = data[i]['spouse-values'];
        }
        
      }
      
    }


    var workbook = XLSX.readFile('../RetirementCalcTestCases.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var dataRoot =  [];
    var i = 0;
    sheet_name_list.forEach(function(y) {
      // if(y==='Input'){ 
        var worksheet = workbook.Sheets[y];
        var headers = {};
        var data = [];
        for(z in worksheet) {
          if(z[0] === '!') continue;
            //parse out the column, row, and value
            var col = z.substring(0,1);
            var row = parseInt(z.substring(1));
            var value = worksheet[z].v;
            //store header names
            if(row == 1) {
                headers[col] = value;
                continue;
              }

              if(!data[row]) data[row]={};
              data[row][headers[col]] = value;
          
        }
        //drop those first two rows which are empty
        data.shift();
        data.shift();
        dataRoot[i] = data;
        // console.log(data);
        //
        i++;
    });
  
Formula.ROUND = function (number, digits) {
  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
};


    for(j in dataRoot) {
    
      var inputData={};
      var resultsToCompare={};   
      getInfoFromData(dataRoot[j],inputData, resultsToCompare);
      var results = calculator.unitTest(inputData);
      console.log("Test :"+j);
     console.log("Input DATA");
      console.log(inputData);
      console.log("ResultsToCompare");
      console.log(resultsToCompare);
      console.log("Results");
      console.log(results);
        //JASMINE
        
          it("Savings at Retirement", function(){
            expect(resultsToCompare.savingsAtRetirementPrimary).toEqual(Formula.ROUND(results.savingsAtRetirementPrimary,0));
            expect(resultsToCompare.savingsAtRetirementSecondary).toEqual(Formula.ROUND(results.savingsAtRetirementSecondary,0));
          } );
          it("Annual Income based on Actual Savings", function(){
            expect(Formula.ROUND(resultsToCompare.annualIncomeBasedOnActualSavingsPrimary,1)).toEqual(Formula.ROUND(results.annualIncomeBasedOnActualSavingsPrimary,1));
            expect(Formula.ROUND(resultsToCompare.annualIncomeBasedOnActualSavingsSecondary,1)).toEqual(Formula.ROUND(results.annualIncomeBasedOnActualSavingsSecondary,1));
          } );
          it("Estimated Retirement Income Could be", function(){
            expect(Formula.ROUND(resultsToCompare.estimatedRetirementIncomePrimary,1)).toEqual(Formula.ROUND(results.estimatedRetirementIncomePrimary,1));
            expect(Formula.ROUND(resultsToCompare.estimatedRetirementIncomeSecondary,1)).toEqual(Formula.ROUND(results.estimatedRetirementIncomeSecondary,1));
          } );
          it("NPV of Desired Income", function(){
            expect(resultsToCompare.npvDesiredIncomePrimary).toEqual(Formula.ROUND(results.npvDesiredIncomePrimary,0));
            expect(resultsToCompare.npvDesiredIncomeSecondary).toEqual(Formula.ROUND(results.npvDesiredIncomeSecondary,0));
          } );
          it("PV of investment required to meet Desire Income", function(){
            expect(resultsToCompare.pvOfInvestmentRequiredPrimary).toEqual(Formula.ROUND(results.pvOfInvestmentRequiredPrimary,0));
            expect(resultsToCompare.pvOfInvestmentRequiredSecondary).toEqual(Formula.ROUND(results.pvOfInvestmentRequiredSecondary,0));
          } );
          
           it("PV of recommended investment", function(){
            expect(resultsToCompare.pvOfRecommendedInvestementPrimary).toEqual(Formula.ROUND(results.pvOfRecommendedInvestementPrimary,0));
            expect(resultsToCompare.pvOfRecommendedInvestementSecondary).toEqual(Formula.ROUND(results.pvOfRecommendedInvestementSecondary,0));
          } );
         
          it("Value of Recommended Investment Income per year:", function(){
            expect(Formula.ROUND(resultsToCompare.valueOfRecommendedInvestmentPerYearPrimary,0)).toEqual(Formula.ROUND(results.valueOfRecommendedInvestmentPerYearPrimary,0));
            expect(parseInt(Formula.ROUND(resultsToCompare.valueOfRecommendedInvestmentPerYearSecondary,0))).toEqual(parseInt(Formula.ROUND(results.valueOfRecommendedInvestmentPerYearSecondary,0)));
          } );
          it("FV Savings:", function(){
            expect(Formula.ROUND(resultsToCompare.fvSavingsPrimary,0)).toEqual(Formula.ROUND(results.fvSavingsPrimary,0));
            expect(Formula.ROUND(resultsToCompare.fvSavingsSecondary,0)).toEqual(Formula.ROUND(results.fvSavingsSecondary,0));
          } );
          
          it("Shortfall/Surplus:", function(){
            expect(Formula.ROUND(resultsToCompare.shortFallPrimary,0)).toEqual(Formula.ROUND(results.shortFallPrimary,0));
            expect(Formula.ROUND(resultsToCompare.shortFallSecondary,0)).toEqual(Formula.ROUND(results.shortFallSecondary,0));
          } );
          
          it("Monthly Contribution Amount needed to meet Goal:", function(){
            expect(Formula.ROUND(resultsToCompare.monthlyContributionAmountPrimary,0)).toEqual(Formula.ROUND(results.monthlyContributionAmountPrimary,0));
            expect(Formula.ROUND(resultsToCompare.monthlyContributionAmountSecondary,0)).toEqual(Formula.ROUND(results.monthlyContributionAmountSecondary,0));
          } );
        
    }

});

