var MathToys = require('../models/math-rest');

function denom(req, res, next) {
  let toys = new MathToys;
  // Get the denominator, or handle when there isn't one.
  let denom = req.params.denom || null;
  if (denom === null) {
    res.render('denom', { title: 'Denominator Analyzer', rows: [] });
  } else {
    toys.denom(denom).then(data => {
      let periods = Object.keys(data).sort();
      console.log('denom data', periods);
      res.render('denom', { title: 'Dnominator Analyzer', rows: periods, periodData: data });
    });
  }
}

function dc(req, res, next) {
  let toys = new MathToys;
  // Get the denominator, or handle when there isn't one.
  let denom = req.params.denom || null;
  let rows = [];
  if (denom === null) {
    res.render('dc', { title: 'Decimal Calculator', rows: [] });
  } else {
    toys.dc(denom).then(data => {
      rows.push(data[0]);
      res.render('dc', { title: 'Decimal Calculator', rows: rows });
    });
  }
}

function phi(req, res, next) {
  let toys = new MathToys;
  let rows = req.params.rows || null;
  let title = 'Phi Powers';
  let sqrt5 = Math.pow(5, .5);
  if (rows === null) {
    res.render('phi', { title, rows: [] });
  } else {
    toys.phi(rows).then(data => {
      let rows = [];
      data.forEach(d => {
        d.variant = `(${d.phi_num.whole} + ${d.phi_num.sqrt_5_coef * sqrt5}) / ${d.denom}`;
		rows.push(d);
      });
      res.render('phi', { title, rows });
    });
  }
}

const endpoints = {
  denom: denom,
  dc: dc,
  phi: phi
}

module.exports = endpoints;
