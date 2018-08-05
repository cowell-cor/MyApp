window.hisaContent = {
    en: {
        hisaHeader: 'Based on your responses, here is what you’ll save: [$amount, based on calculation]',
        savingsHeader: 'Savings',
        savingsDynamicContent: '[Dollars] for [duration in months or years] at [rate percentage]',
        debitTransferHeader: 'Debit Transfer',
        debitTransferDefaultContent: 'Try this option',
        debitTransferDynamicContent: 'When there are inputs to the section, and the section is wrapped, the following dynamic text appears:  <X> monthly transactions at <$X> each',
        depositTransferHeader: 'Deposit Transfer',
        depositTransferDefaultContent: 'Try this option',
        depositTransferDynamicContent: 'When there are inputs to the section, and the section is wrapped, the following dynamic text appears:  <XX%> of <$XXXX> monthly',

        errorMessages: {
            currentAge: 'What is your current age?',
            currentAge_spouse: 'What is your spouse\'s current age?',
            retirementStartAgeTooHigh: 'The sum of the retirement start age and amount of years in retirement must not exceed 105 years.',
            retirementStartAgeTooLow: 'Retirement age must be greater than current age.',
            currentAgeOverRetirementStartAge: 'Current age must be lower than retirement age.',
            inflationRate: 'Average Canadian Inflation over past five years is {{ [average] | percent:2 }}.',
            rrspContributionTooHigh: 'Your annual RRSP contribution exceeds the maximum contribution allowed based on your income entered.',
            overAllowedTFSAContribution: 'TFSA Contribution Limit for [currentYear] = {{ [max]*12 | currency:0 }} or {{ [max] | currency:0 }} per month.',
            overAllowedRRSPContribution: 'Maximum RRSP Contributions for [currentYear] = {{ [max]*12 | currency:0 }} or {{ [max] | currency:0 }} per month.'
        },

        highchart: {
            dynamicHeader: 'After [number of months or years] [months/years], you will have:',
            totalSavings: 'Total Savings:',
            debitTransfer: 'Debit Transfers',
            highInterest: 'High Interest',
            depositTransfer: 'Deposit Transfers',
            graph: 'Graph',
            table: 'Table'
        },

        tooltip: {
            savingsHeader: 'Grow your nest egg',
            savingsContent: 'Whatever balance you start with, watch your savings grow even faster when combining the benefits of Auto-Save with your chequing account and a high interest savings account.',
            debitTransfer: 'Start saving every time you use your debit card',
            debitTransferContent: 'For each transaction you make you can have $1 to $5 automatically transferred into your high interest savings account',
            depositTransfer: 'Save even more when you make direct deposits',
            depositTransferContent: 'Each time a credit is deposited into your account (for example, your pay is electronically deposited), you can automatically transfer a percentage to your high interest savings account',

        },

        savingsOptions: {
            initialDepositAmount: 'Initial deposit amount',
            monthlyDepositAmount: 'Monthly deposit amount',
            savingDuration: 'Saving duration',
            savingDurationSlider: 'Saving duration',
            savingDurationSliderMonthlyDefault: 6,
            savingDurationSliderAnuallyDefault: 25,
            savingDurationSliderMonthlyMax: 24,
            savingDurationSliderAnuallyMax: 40,
            meridianSavingsAccount: {
                header:'Choose a Meridian Savings Account',
                savings:'Savings',
                tfsa:'Tax-free Savings',
                rsp:'RSP'
            },
            autoSaveOptions: 'Add auto-save options to save even more.',
        },

        debitTransfer: {
            numberOfMonthlyDebitTransactions: 'Number of monthly debit transactions',
            amountToDepositPerTransaction: 'Amount to deposit per transaction',
            amountToDepositPerTransactionMin: 0,
            amountToDepositPerTransactionMax: 5,
            amountToDepositPerTransactionDefault: 2,
            clear: 'Clear'
        },


        depositTransfer: {
            monthlyCreditsPay: 'Monthly credits / pay',
            percentageToTransferPerPay: 'Percentage to transfer per pay',
            percentageToTransferPerPayMin: 0,
            percentageToTransferPerPayDefault: 0,
            percentageToTransferPerPayMin: 0,
            percentageToTransferPerPayMax: 100,
            percentageToTransferPerPayDefault: 0,
            clear:'Clear'
        },

        boostMenu: {
            header: 'Boost your savings by an additional 3%.',
            subHeader: 'Get an additional 3% for the first 4 months when you open your account.',
            boostToggle: 'Boost Toggle',
        },
        openYourAccount: 'Open your account',
        disclaimer: {
            show: 'Show Disclaimer',
            hide: 'Hide Disclaimer',
            boostNotSelected: 'This savings calculator is intended for illustration purposes only and should not be relied upon as financial advice without additional input from a trusted and competent financial advisor Results are based on the information you provide and the calculator assumes that the annual interest rate will never vary over the savings duration you have selected. The actual rate will likely vary over the course of time and such fluctuations will affect the overall savings calculation. Interest rates as shown are annualized rates and calculated daily and paid monthly.',
            boostSelected: '"Bonus Interest" is 1.35% for the Eligible Account. Bonus Interest is added to Meridian’s GTG HISA posted rate of interest as shown on Meridian’s website ("Posted Rate") to calculate the total amount of interest payable under this Offer. For example, Posted Rate of 1.40% on GTG HISA + Bonus Interest of 1.35% = the Offer rate of 2.75% (example uses interest rates current as of May 18, 2018). Eligible Members receive Bonus Interest on deposits to the Eligible Account during the Promotion Period. Subject to the limits and qualifications outlined in these Terms and Conditions, Posted and Bonus interest is calculated on the closing daily balance and is paid monthly on deposits during the Promotion Period to the Eligible Account. Any change to the Posted Rate will result in a corresponding change to the Offer rate. Bonus Interest and/or Posted Rates are annualized rates and may change at any time without prior notice.This calculator is intended for illustration purposes only and should not be relied upon as financial advice without additional input from a trusted and competent financial advisor. Results are based on the information you provide and the calculator assumes that the annual interest rate will never vary over the savings duration you have selected. The actual rate will likely vary over the course of time and such fluctuations will affect the overall savings calculation. Interest rates as shown are annualized rates and calculated daily and paid monthly.',

        },
        results: {
            // header:'Based on your responses we\'ve determined the following',
            headerPart1: 'You will need to save ',
            headerPart1_spouse: 'Your spouse will need to save ',
            headerPart2: ' for your retirement.',
            headerPart2_spouse: ' for their retirement.',

            scenarioShortfallPart1: 'To make up for your shortfall, you can contribute: ',
            scenarioShortfallPart1_spouse: 'Your spouse can make up for the shortfall, by contributing: ',
            scenarioShortfallPart2: ' monthly.',

            scenarioSurplusPart1: 'You are saving an additional ',
            scenarioSurplusPart1_spouse: 'Your spouse is saving an additional ',
            scenarioSurplusPart2: ' per month more than is required to meet your goal.',
            scenarioSurplusPart2_spouse: ' per month more than is required to meet their goal.',

            scenarioOnTrack: 'Congratulations. You are on track to reach your retirement savings goal.',
            scenarioOnTrack_spouse: 'Congratulations. Your spouse is on track to reach their retirement savings goal.',

            resultsSummaryPart1: '',
            resultsSummaryPart2: ' will yield an annual income of ',
            resultsSummaryOverXyear: ' over ',
        },

        chartTooltip: {
            age: 'Age: '
        },

        report: {},

        disclaimer: 'The Retirement Savings Calculator is designed to be an informational and educational tool only, and when used alone, the results do not constitute financial, retirement planning, or tax advice from Meridian Credit Union Limited, and should not be relied upon as such.  It is offered free of charge, “as is”, and without any guarantees, representations or warranties whatsoever, including, but not limited to, any warranty as to the quality, accuracy, currency or suitability of the information presented by this calculator for any particular purpose.  We strongly recommend that you seek the advice of a Meridian financial services professional before making any type of financial retirement plan.  We also encourage you to review your retirement strategy periodically as your financial circumstances change.  The results presented by this calculator are hypothetical and may not reflect the actual amount you will need to save for retirement or the degree to which you are actually on track to save enough to meet that identified need.  They are also based on the information you enter and a number of estimates and assumptions (further details are available upon request) that may or may not be relevant to your situation.   Meridian and its affiliates hereby also disclaim any responsibility for the consequences of any decisions or actions taken in reliance upon or as a result of the information provided by this calculator, as well as for any damages (whether ordinary, special, consequential  or exemplary) or losses of any kind due to human or mechanical errors or omissions in the design, operation, or use of the calculator, or due to its lack of availability at any given time.   Meridian is under no obligation to provide support, service, corrections, or upgrades to the calculator’s software.'
    }
};