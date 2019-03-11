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
var apiUrl = "".concat(process.env.SANDBOX_ENDPOINT, "/stats/all/polygon/kr~%60HhylrBa%40B%7D%40S%7B%40MM%40g%40IiCxEzChAXNNPZ%60AVh%40FRBr%40NnBHE%3FUAWBONQ%5CAxB%60%40fBUdB%7CGvArEXl%40PPUNeAXaEbAFZFdBw%40EkAFk%40Di%40FuCZ%40VEJMHYBg%40AkBFaBFn%40bGHtAc%40LKPDVv%40pAlNo%40LA%60Cg%40jAUt%40KlAEjCI~DmCB%5D%5BgCF%7B%40OgBa%40eAbDfAhEzArKvDpIrCXq%40h%40w%40~C%7BDeBoEdAYhA_EtBYMoBoANuA%5COu%40cIcGQk%40r%40oAEOw%40k%40eAuF%5CESy%40_Cb%40cB%5DuATH%60BoBTkAPm%40HeB%60%40oCZ%7BADy%40%3FGsAwBHDtAk%40%40Bj%40wBZJd%40mDl%40kCyJ?period=").concat(period);

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
