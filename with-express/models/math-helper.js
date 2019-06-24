'use strict';

/* determine 9s complement */
function complement(first, second) {
  let result = true;
  for (let i; i < first.length; i++) {
    if (1*first[i] + 1*second[i] !== 9) {
      result = false;
    }
  }
  return result;
}

/* parse decimal into non-repeating, first half, second half */
function parseDecimal(d) {
  let nonRepeating = d.length - d.repeating;
  d.periodNonRepeating = nonRepeating ? d.decimal.substr(0, nonRepeating) : '';
  let periodRepeating = d.repeating > 0 ? d.decimal.substr(nonRepeating) : '';
  if (d.repeating % 2 === 0 && d.repeating > 0) {
    let half = d.repeating / 2;
    let [firstHalf, secondHalf] = [periodRepeating.substr(0, half), periodRepeating.substr(half)];
    if (complement(firstHalf, secondHalf)) {
      d.firstHalf = firstHalf;
      d.secondHalf = secondHalf;
    } else {
      d.firstHalf = periodRepeating;
      d.secondHalf = '';
    }
  } else {
    d.firstHalf = periodRepeating;
    d.secondHalf = '';
  }

  return d;
}

function massageDenom(data) {
  return data;
}

function massageDc(data) {
  for (let i = 0; i < data.length; i++) {
    let parsed = parseDecimal(data[i]);
    data[i].periodNonRepeating = parsed.periodNonRepeating;
    data[i].periodRepeating = parsed.periodRepeating;
    data[i].firstHalf = parsed.firstHalf;
    data[i].secondHalf = parsed.secondHalf;
  }
  return data;
}

module.exports = {
  massageDenom: massageDenom,
  massageDc: massageDc
};
