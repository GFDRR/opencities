"use strict";


var _window = window,
    ODRI = _window.ODRI,
    fetch = _window.fetch,
    process = _window.process,
    URL = _window.URL;

var from = new Date(2018, 0, 1);
var to = new Date();

//var from = url.searchParams.get('from') && new Date(url.searchParams.get('from')) || new Date(2018, 0, 1);
//var to = url.searchParams.get('to') && new Date(url.searchParams.get('to')) || new Date();
var period = [from, to].map(function (d) {
  return d.toISOString().substr(0, 10);
}).join();
var precision = 13;
var apiUrl = "".concat(process.env.SANDBOX_ENDPOINT, "/stats/all/polygon/%7Diw%7CA%7CbzYOvDy%40tAiFnAw%40t%40G%7CC%7C%40x%40hCZtBzAx%40%60Gq%40lEeBvBChCqFdIWzGl%40dCx%40z%40pHfAdI%7CIbAzB_%40bBp%40%60D%5DbGa%40dBcCzAgAxBaAnJ%5C%60BjH~G%7BCnRvAbC%60MtAzBlDs%40tCkAdAqATiJi%40mHzAkAdBXzBbGdA%60CfBdFxH%7CAfEDv%40mANkGc%40_AZeBfD%7C%40~C%60FrCKdA%7DBvDDhBvA~BKlC%7CDnAtAjCtBj%40fGHlBxBbCdAxGDv%40OpB%7BBjCyA%60A%7BBpDkCfDYdDqAlRkC%7CEaBvJi%40pDwAlQiCxEoD%7CEuK%60F%7BHz%40oE~A%3F~%40%7BBjDu%40rCwBzDaA%60DsBReBnCy%40zDKjEn%40%5CrAjHnHhCRfBrCfE~AbBTbBs%40jTtBfDGrDsAhABvDkN%7D%40yAPuAkE%7BHbAy%40%7DEiHdAs%40iFgGx%40%7B%40oCuEfB%7DAmHiGsI%7BAyE_DyJcBkDaG%7BDuDq%40RiBy%40%7DFU_BiBsACiAeH~%40w%40VaIw%40aBYyC%5CuAzCcCb%40%7DAAeFq%40wAC%7BCcAA%7DAoCOgCoBgDk%40oBDgEcAyFmF%7DEmAImA%7B%40iBaCEeGkDw%40i%40cCNgH%7DDoIL_CoCmC_E%7BIkBu%40%5BiD%7BAcC%5DuCyCyBd%40%7BFp%40%7B%40CwBiBwAsB%7BDaFuA_Nw%40yHuK%7DE%7B%40iDL%7D%40WwGlH%7BKjGwvA%60a%40jAtB~EcCrBFtA%7C%40JrAcAtH%5CnEk%40tC%7DArAmAzGsBrA_Ir%40%5B%60AZfApCvFlIf%40%7CBbAnB~D%7CGnB?period=").concat(period);

function mountViz(data) {
  var datesUI = document.querySelector('#dates');

  var format = function format(d) {
    return "".concat(d.getDate(), "/").concat(d.getMonth() + 1, "/").concat(d.getFullYear());
  };

  datesUI.innerHTML = "".concat(format(from), " - ").concat(format(to));

  ODRI.inlineStat('#buildingsUsers', {
    data: data,
    featureType: 'buildings',
    stat: 'users'
  });
  ODRI.inlineStat('#buildingsActivity', {
    data: data,
    featureType: 'buildings',
    stat: 'activity'
  });
  ODRI.overallStats('#overallStats', {
    data: data,
    stats: [{
      featureType: 'buildings',
      stat: 'activity'
    }, {
      featureType: 'highways',
      stat: 'activity'
    }, {
      featureType: 'waterways',
      stat: 'activity'
    }, {
      featureType: 'buildings',
      stat: 'users'
    }, {
      featureType: 'highways',
      stat: 'users'
    }, {
      featureType: 'waterways',
      stat: 'users'
    }]
  });
  ODRI.activity('#activity', {
    data: data,
    apiUrl: apiUrl,
    range: [from, to],
    precision: precision,
    facet: 'features',
    // users, features
    granularity: 'daily' // daily, monthly, weekly

  });
  ODRI.compareMap('#compare-map', {
    width: '100%',
    height: '800px',
    settings: {
      default_feature_type: 'buildings',
      // iframe_base_url:
      // polygon:
      default_start_year: '2018',
      default_end_year: 'now'
    }
  });
  ODRI.contributors('#contributors', {
    data: data,
    apiUrl: apiUrl,
    numUsers: 15,
    featureType: 'buildings'
  });
}

function timeoutPromise(timeout, err, promise) {
  return new Promise(function (resolve, reject) {
    promise.then(resolve, reject);
    setTimeout(reject.bind(null, err), timeout);

  });
}



document.addEventListener('DOMContentLoaded', function () {
  timeoutPromise(20000, new Error('Server timed out!'), fetch(apiUrl)).then(function (r) {
    return r.json();
  }).then(mountViz);
}
);
