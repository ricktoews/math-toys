var axios = require('axios');
var mathHelper = require('./math-helper');

const API = {
  dc: 'http://arithmo-rest.toewsweb.net/dc/',
  phi: 'http://arithmo-rest.toewsweb.net/phi/powers/'
}

class MathToys {
  
  dc(d) {
    let url = API.dc + d;
    return axios.get(url).then(res => {
      return mathHelper.massageDc(res.data);
    })
    .catch(error => {
      let res = error.response;
      let status = res && res.status;
      return status;
    });
  }

  phi(n) {
    let url = API.phi + n;
	return axios.get(url).then(res => {
      return res.data;
	})
	.catch(error => {
      let res = error.response;
      let status = res && res.status;
      return status;
	});
  }
}

module.exports = MathToys;
