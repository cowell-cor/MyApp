global.Formula = {};

Formula.ARGSCONCAT = function (args) {
  var result = [];
  for (var i = 0; i < args.length; i++) {
    result = result.concat(args[i]);
  }
  return result;
};

//En: PMT, Fr: VPM
Formula.PMT = function (rate, periods, present, future, type) {
  // Credits: algorithm inspired by Apache OpenOffice

  // Initialize type
  type = (typeof type === 'undefined') ? 0 : type;

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);
  periods = eval(periods);

  // Return payment
  var result;
  if (rate === 0) {
    result = (present + future) / periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type === 1) {
      result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
    } else {
      result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
    }
  }
  return (-1)*result;
};

Formula.MIN = function () {
  var range = Formula.ARGSCONCAT(arguments);
  var n = range.length;
  var min = (n > 0) ? range[0] : 0;
  for (var i = 0; i < n; i++) {
    min = (range[i] < min && (range[i] !== true) && (range[i] !== false)) ? range[i] : min;
  }
  return min;
};

Formula.MAX = function () {
  var range = Formula.ARGSCONCAT(arguments);
  var n = range.length;
  var max = (n > 0) ? range[0] : 0;
  for (var i = 0; i < n; i++) {
    max = (range[i] > max && (range[i] !== true) && (range[i] !== false)) ? range[i] : max;
  }
  return max;
};

//En: POWER, Fr: PUISSANCE
Formula.POWER = function (number, power) {
  return Math.pow(number, power);
};

//En: PV, Fr: VA
Formula.PV = function (rate, periods, payment, future, type) {
  // Initialize type
  type = (typeof type === 'undefined') ? 0 : type;

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);
  periods = eval(periods);

  // Return present value
  if (rate === 0) {
    return (-1)*payment * periods - future;
  } else {
    return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods);
  }
};

Formula.ROUND = function (number, digits) {
  return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
};

Formula.ROUNDDOWN = function (number, digits) {
  var sign = (number > 0) ? 1 : -1;
  return sign * (Math.floor(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
};

Formula.ROUNDUP = function (number, digits) {
  var sign = (number > 0) ? 1 : -1;
  return sign * (Math.ceil(Math.abs(number) * Math.pow(10, digits))) / Math.pow(10, digits);
};

Formula.FV = function (rate, periods, payment, value, type) {
  // Credits: algorithm inspired by Apache OpenOffice

  // Initialize type
  type = (typeof type === 'undefined') ? 0 : type;

  // Evaluate rate (TODO: replace with secure expression evaluator)
  rate = eval(rate);

  // Return future value
  var result;
  if (rate === 0) {
      result = value + payment * periods;
  } else {
      var term = Math.pow(1 + rate, periods);
      if (type === 1) {
          result = value * term + payment * (1 + rate) * (term - 1.0) / rate;
      } else {
          result = value * term + payment * (term - 1) / rate;
      }
  }
  return (-1)*result;
};
