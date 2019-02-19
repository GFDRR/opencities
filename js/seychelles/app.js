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
var apiUrl = "".concat(process.env.SANDBOX_ENDPOINT, "/stats/all/polygon/slqpIfkm%5Bkkd%40rpb%40aoT%7BvJs_%5Ee%7Dr%40apLkzLscFoaNlwNkpWd~Rfq%40?period=").concat(period);

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
