/*
  denom.js
  One job: handle the Calculate button from the Decimal Calculator.
*/
var Route = {
  denom: '/math/denom/'
};


// this is what's actually supposed to happen when you click the Calculate button.
var calc = (e) => {
  let btn = e.currentTarget
  // this assumes the input field is the previous sibling of the calculate button.
  let fld = btn.previousSibling;
  let denom = fld.value;
  // this assumes the denom value is an integer.
  window.location = Route.denom + denom;
}

var adjustPeriod = (e) => {
  let span = e.currentTarget;
  let periodEl = span.parentNode.previousSibling;
  let period = periodEl.dataset.original;
  let periodLength = period.length;
  let position = span.dataset.position - 1;
  let newPeriod = ('' + period + period);
  newPeriod = newPeriod.substr(position, periodLength);
  periodEl.innerHTML = newPeriod;
}

// adds click handler to specified element.
function addHandler(selector) {
  try {
    var calcButton = document.querySelector(selector);
    calcButton.addEventListener('click', calc);
  } catch (e) {
    console.log(`Coudn't attach click event to the specified element: ${selector}`);
    console.log(e);
  }
}

function addPeriodHandler(selector) {
          console.log('addPeriodHandler selector', selector);
  try {
   var numEls = document.querySelectorAll(selector);
   numEls.forEach(el => {
     el.addEventListener('click', adjustPeriod);
   });
  } catch (e) {
    console.log(`Coudn't attach click event to the specified element: ${selector}`);
    console.log(e);
  }
}

export { addHandler, addPeriodHandler };
