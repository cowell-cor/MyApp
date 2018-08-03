var PAYMENT_FREQUENCY_ONE_TIME = 0,
	PAYMENT_FREQUENCY_ANNUAL = 1;
	PAYMENT_FREQUENCY_MONTHLY = 2,
	PAYMENT_FREQUENCY_SEMI_MONTHLY = 3,
	PAYMENT_FREQUENCY_BI_WEEKLY = 4,
	PAYMENT_FREQUENCY_WEEKLY = 5,
	PAYMENT_FREQUENCY_ACCELERATED_BI_WEEKLY = 6,
	PAYMENT_FREQUENCY_ACCELERATED_WEEKLY = 7,
	VALUE_UNLIMITED = 'unlimited';

var termPaymentOptionsList = [
	PAYMENT_FREQUENCY_MONTHLY,
	PAYMENT_FREQUENCY_SEMI_MONTHLY,
	PAYMENT_FREQUENCY_BI_WEEKLY,
	PAYMENT_FREQUENCY_WEEKLY,
	PAYMENT_FREQUENCY_ACCELERATED_BI_WEEKLY,
	PAYMENT_FREQUENCY_ACCELERATED_WEEKLY
];

var PAYMENT_FREQUENCY_ONE_TIME_KEY = "oneTime",
	PAYMENT_FREQUENCY_ANNUAL_KEY = "annual";
	PAYMENT_FREQUENCY_MONTHLY_KEY = "monthly",
	PAYMENT_FREQUENCY_SEMI_MONTHLY_KEY = "semiMonthly",
	PAYMENT_FREQUENCY_BI_WEEKLY_KEY = "biWeekly",
	PAYMENT_FREQUENCY_WEEKLY_KEY = "weekly",
	PAYMENT_FREQUENCY_ACCELERATED_BI_WEEKLY_KEY = "acceleratedBiWeekly",
	PAYMENT_FREQUENCY_ACCELERATED_WEEKLY_KEY = "acceleratedWeekly";


function getPaymentFrequencyKey(paymentFrequency,baseOn365Days){
	if(paymentFrequency === PAYMENT_FREQUENCY_ANNUAL){
		return PAYMENT_FREQUENCY_ANNUAL_KEY;
	}else if(paymentFrequency === PAYMENT_FREQUENCY_MONTHLY){
		return PAYMENT_FREQUENCY_MONTHLY_KEY;
	}else if(paymentFrequency === PAYMENT_FREQUENCY_SEMI_MONTHLY){
		return PAYMENT_FREQUENCY_SEMI_MONTHLY_KEY;
	}else if(paymentFrequency === PAYMENT_FREQUENCY_BI_WEEKLY){
		return PAYMENT_FREQUENCY_BI_WEEKLY_KEY;
	}else if(paymentFrequency === PAYMENT_FREQUENCY_WEEKLY){
		return PAYMENT_FREQUENCY_WEEKLY_KEY;
	}else if(paymentFrequency === PAYMENT_FREQUENCY_ACCELERATED_BI_WEEKLY){
		return PAYMENT_FREQUENCY_ACCELERATED_BI_WEEKLY_KEY;
	}else if(paymentFrequency === PAYMENT_FREQUENCY_ACCELERATED_WEEKLY){
		return PAYMENT_FREQUENCY_ACCELERATED_WEEKLY_KEY;
	}else if(paymentFrequency === PAYMENT_FREQUENCY_ANNUAL){
		return PAYMENT_FREQUENCY_ANNUAL_KEY;
	}else if(paymentFrequency === PAYMENT_FREQUENCY_ONE_TIME){
		return PAYMENT_FREQUENCY_ONE_TIME_KEY;
	}
	return false;
};

/* Method that return the number of payment by year depending of the paymentFrequency id */
/* if the param baseOn365Days === true, the number of payment will be calculated based on 365 days and not 52 weeks */
function getPaymentFrequencyNumber(paymentFrequency,baseOn365Days){
	if(paymentFrequency === PAYMENT_FREQUENCY_ANNUAL){
		return 1;
	}else if(paymentFrequency === PAYMENT_FREQUENCY_MONTHLY){
		return 12;
	}else if(paymentFrequency === PAYMENT_FREQUENCY_SEMI_MONTHLY){
		return 24;
	}else if(paymentFrequency === PAYMENT_FREQUENCY_BI_WEEKLY || paymentFrequency === PAYMENT_FREQUENCY_ACCELERATED_BI_WEEKLY){
		if(baseOn365Days){
			return 365/14;
		}
		return 26;
	}else if(paymentFrequency === PAYMENT_FREQUENCY_WEEKLY || paymentFrequency === PAYMENT_FREQUENCY_ACCELERATED_WEEKLY){
		if(baseOn365Days){
			return 365/7;
		}
		return 52;
	}
	return 0;
};