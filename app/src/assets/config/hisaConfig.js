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

        tooltip: {
            savingsHeader: 'Grow your nest egg',
            savingsContent: 'Grow your nest egg Whatever balance you start with, watch your savings grow even faster.',
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
            meridianSavingsAccount: 'Choose a Meridian Savings Account',
            autoSaveOptions: 'Add auto-save options to save even more.',
        },

        debitTransfer: {
            numberOfMonthlyDebitTransactions: 'Number of monthly debit transactions',
            amountToDepositPerTransaction: 'Amount to deposit per transaction',
            clear: 'Clear'
        },


        depositTransfer: {
            monthlyCreditsPay: 'Monthly credits / pay',
            percentageToTransferPerPay: 'Percentage to transfer per pay',
            clear: 'Clear'
        },

        boostSavings: {
            boostToggle: 'Show Me The Boost',
        },
        
        openYourAccount: 'Open your account',
        disclaimer: {
            show: 'Show Disclaimer',
            hide: 'Hide Disclaimer',
            boostNotSelected: '<p>This savings calculator is intended for illustration purposes only and should not be relied upon as financial advice without additional input from a trusted and competent financial advisor Results are based on the information you provide and the calculator assumes that the annual interest rate will never vary over the savings duration you have selected. The actual rate will likely vary over the course of time and such fluctuations will affect the overall savings calculation. Interest rates as shown are annualized rates and calculated daily and paid monthly.</p>',
            boostSelectedPara: '<p>"Bonus Interest" is 1.35% for the Eligible Account. Bonus Interest is added to Meridian’s GTG HISA posted rate of interest as shown on Meridian’s website ("Posted Rate") to calculate the total amount of interest payable under this Offer. For example, Posted Rate of 1.40% on GTG HISA + Bonus Interest of 1.35% = the Offer rate of 2.75% (example uses interest rates current as of May 18, 2018). Eligible Members receive Bonus Interest on deposits to the Eligible Account during the Promotion Period. Subject to the limits and qualifications outlined in these Terms and Conditions, Posted and Bonus interest is calculated on the closing daily balance and is paid monthly on deposits during the Promotion Period to the Eligible Account. Any change to the Posted Rate will result in a corresponding change to the Offer rate. Bonus Interest and/or Posted Rates are annualized rates and may change at any time without prior notice.</p><p>This calculator is intended for illustration purposes only and should not be relied upon as financial advice without additional input from a trusted and competent financial advisor. Results are based on the information you provide and the calculator assumes that the annual interest rate will never vary over the savings duration you have selected. The actual rate will likely vary over the course of time and such fluctuations will affect the overall savings calculation. Interest rates as shown are annualized rates and calculated daily and paid monthly.</p><p>This savings calculator is intended for illustration purposes only and should not be relied upon as financial advice without additional input from a trusted and competent financial advisor. Results are based on the information you provide and the calculator assumes that the annual interest rate will never vary over the savings duration you have selected. The actual rate will likely vary over the course of time and such fluctuations will affect the overall savings calculation. Interest rates as shown are annualized rates and calculated daily and paid monthly.</p> '

        }

    }
};