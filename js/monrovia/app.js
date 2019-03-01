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
var apiUrl = "".concat(process.env.SANDBOX_ENDPOINT, "/stats/all/polygon/nq%7B%60Aclre%40VRtALt%40Fp%40H~%40P%60%40%40p%40q%40v%40aAVUp%40o%40RIVMPK%3FKNWz%40y%40K%5Dk%40gBEM_A%7DBWgAXC~%40IpA%5BjA%5DxAYJU%7BAyFIBuFjBgAb%40KD_Bn%40QDaAXE%3F_ADcAK%5BE%7B%40GICNs%40Bg%40i%40%3FEq%40g%40k%40u%40e%40OSMIq%40W%5DBMW%7B%40%5ESJcA%40uA%3F%3Fe%40EaAKo%40OiAK%7DAgAPm%40a%40Ag%40o%40JeAYgAyAk%40O%5DsAQm%40Yw%40_As%40_Ah%40g%40Pi%40yAYq%40sAbAWK_AXUsAYe%40Is%40%5Da%40e%40VmAh%40i%40%60%40o%40%5Cg%40Zs%40V%7D%40~%40MZa%40HUz%40AN%3FDA%40%40%40CFQ%60%40GPENcAg%40%7B%40c%40aAc%40aAq%40MI_BoA%7DAgCe%40H_%40%3FMAYvAu%40%7C%40KxAa%40%5E%7D%40%60AWb%40a%40%60%40%5Dj%40i%40dAm%40~ASlBn%40lDbAxBl%40zA~BnFfB%7CBtBnBnD~%40pAXbDRnBw%40bBcBxAwAtC%7DAz%40%7B%40x%40%5B%60BUhAU%60AChABhA%3Fh%40%40%7CAr%40bApAfAh%40%60A~%40xAp%40rAlAXNTDZLh%40%60%40nA~%40%60%40p%40n%40Rx%40ZfA%5E?period=").concat(period);

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
