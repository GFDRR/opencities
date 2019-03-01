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
var apiUrl = "".concat(process.env.SANDBOX_ENDPOINT, "/stats/all/polygon/%60iqcBufy%60BVb%40n%40Dj%40HSQs%40Yr%40XRPZVT%5CTbA%5ClAd%40l%40n%40d%40jAh%40lBh%40%60Cj%40dC%7C%40DD%5ENr%40%5Cp%40h%40d%40j%40Zf%40Tl%40Np%40N~%40HnA%40H%3FbAN~ERpD%40PRhG%5CzLJj%40R%60%40j%40z%40bA~APXtApBNVFPF%60AZ%7CJ%40Jf%40lX%3FLTzL%40~B%3FNKjCC%5EqExZAHaCdOEXg%40%7CDGnA%3FhBDrBNzCPxBXzAJj%40Tl%40d%40r%40n%40t%40r%40n%40l%40%5C~%40XhAJjBB%60A%40%60%40FZ%3FTrAh%40dAzAdCrAjC%5EfAFXDPPt%40RlBC%60COtAWj%40%3F%3FEJ%3F%3FKTjCvCtA%60Bz%40t%40f%40%5C~BzBjBdDpAnAz%40fA%5ET~AuBbB%7DBh%40%5Bv%40%60BArAb%40%60CV%7CAZ%5Eh%40IXgDd%40sBf%40kA%5E_BN%7B%40AYe%40%5BEs%40HwAPu%40DaAaAuCuCc%40e%40I%3F%3F%5Cg%40c%40gBMcBDs%40%5EgDTgC%3FgA%3FeCKs%40%3F%3FAMKaDy%40yE%5DmDEQt%40OKo%40YO%5BDEg%40LmB%40EHBRi%40JSd%40w%40FGFQFIDGlAaBvAgC%7C%40wB%60%40o%40r%40e%40v%40Cx%40PnAdClA%60Cr%40bAZjAZhAJpA%3F%60BEpAM%7CAG%60Ag%40hBOfAGlA%3FjBE~AEpACdACnANhAZjDK%60BIlAWlAUfA%40z%40b%40d%40f%40VtANdDQjA%5BXs%40%40k%40K%5B_%40m%40Is%40B%7D%40NmAZi%40f%40c%40ZM%5CBPLL%3FBUOQ%5BQy%40e%40%7D%40g%40m%40g%40_As%40k%40u%40%5D%7D%40Mm%40Cm%40Ha%40%60%40%5DJ%5B%60%40i%40To%40r%40%7D%40d%40o%40b%40KHUAc%40IYYQc%40%5DIc%40C_AAm%40Gc%40As%40%3FwAKq%40DyAVsAEu%40S_BJmACmAYoBQqAHuASe%40DQHYPc%40%40eACmAMuDa%40yJEaA%3F%3F%3FG%5BwK%3FMEkG%3F%3F%3FKBsI%3FKHeC%3FWFcH%3FOEOIa%40%3FQP%7B%40BQOSAICKKI%5DIGKAYHu%40pByC%5D%5Di%40i%40%3F%3FbBmBHKx%40cAdBsBx%40iAN%5BVe%40f%40iA%60%40uAVmAPcB%3FWBaBEmAnAe%40ZKNSHa%40%40SMQYWSMMKEQ%40UNIRKPk%40H%5BBSGYIWoB%7BB_B_BSSq%40%5CYkACQGm%40Gu%40%3F%7D%40Bw%40L_B%60%40cCRsAFs%40%40i%40Ek%40U%7B%40Sg%40CICIEa%40E_%40%60BAj%5Bg%40Bj%40Cv%40Cf%40%3F%5CH~%40XdBf%40zDJ%60A%40LTxBVdBPfA%40FRhANdABJ%3F%3Fv%40bE%3F%3F%40FF%5EHTzA~B%7CE%7B%40nB%5BHI%40MWwEEy%40WkBCKe%40sCCMQgAAK%3FiAAKMuD_%40%7DDImA%3Fy%40FqA%40q%40nF_%40%3FHMZKp%40CZ%40xBFtG%3FF%3FVFb%40PjA%5CtB%40H%60AnF%40Fb%40dCVlB%40D%7B%40BTr%40DP%3FHAFEJEHEH%3FHDFBPBZB%5EDb%40FVDZBPLt%40F%5Ch%40tCT%7CDJvB%3F~AK%7CAQ%60ACp%40Cv%40%3FlAI~AEj%40%3Fv%40El%40Id%40Ed%40q%40nCKj%40EVCj%40El%40K%60%40%3Fb%40%40x%40Dv%40DdAEdAKj%40Up%40%3F%60%40Cd%40Jd%40Pd%40Ff%40%3Fv%40K%5C%3Fl%40Ej%40%3Fp%40%3Fn%40Px%40D%7C%40Cr%40Il%40Ux%40Od%40C%60%40DbALdAFbA%3FdAEr%40Ev%40%3Fh%40Lp%40Dx%40LlADr%40Lr%40%40r%40ERGBOf%40E%60%40J%5EVJVGf%40a%40ZS~%40Pf%40X%5Cl%40b%40~AFlAPxBEdBOjBEpAKp%40Ex%40Uf%40O%60%40Cb%40Dd%40%3F%5EOlAOdADp%40Rp%40Lb%40Fr%40%40%5E%5Dd%40eAx%40i%40l%40Ol%40Ed%40%40f%40d%40v%40p%40nA%5C%7C%40z%40h%40Vb%40%40j%40%3FrA%40jA%3Ff%40Lj%40%3F%5CCp%40%5Bp%40m%40dAoAjAg%40%60%40%3Fx%40Lr%40n%40h%40t%40j%40%5Ch%40b%40b%40n%40Px%40HjBd%40z%40Vl%40Xl%40j%40d%40dAP~AFlBQrBWp%40m%40Xe%40l%40%7B%40lAe%40dCeAdD%7B%40v%40Ob%40H%7C%40hAlAnDbA~AbAnBbBXzBBlAo%40vA%7BBr%40eBX%7B%40NDh%40b%40vBRfBEfA%5BjCXfBb%40~Cx%40pBEpBNlAnAx%40nBW%60AgB%60A%7BBD%7BBd%40uDf%40oJ%7C%40wMFmGAeJ%60%40%7BI%3Fw%40AeC%3FcBQeCWiAWs%40JeCc%40uHKeISyC_%40iDe%40%7DDWyBYc%40WwAAc%40S_EQiCc%40%7DBMq%40GqAQeBKq%40GwBKaAYiBAgBEs%40EkAAq%40Ae%40TgBJg%40DqAM_CsCq_%40c%40%7BIk%40gQ%7B%40mOmAySAm%40UwJ%3FGAsB%3FG%3F_C%3FGE_G%3FKCoB%3FGAaC%3FOCoD%3FQEgC%3FKGcD%3FKQsJ%3FOIkEAK%5BuH%3FKKoF%3FKGwD%3FKCuC%3FO%3FsC%3F%3F%3FSH_MUyKAW%3F%7DJ%3FWAiF%3FWBsB%3FIKsK%3FU%40iB%3FUA%7D%40UaCAo%40AWCoA%3F%7DAC%7DBuB%3FO%3FuDA_%40%3F%3F%3FkEAc%40bASr%40C%7C%40H%60AC%7CAId%40Cl%40GZEPYn%40O%5CEREPC%60%40CZEN%40L%40L%40T%40TA%60%40Ad%40%3FV%3FZAf%40%3Fp%40An%40Gf%40CTML%40N%40PA%5EEj%40%40hACp%40%3FP%40%5C%3FF%40j%40%40%60%40Ad%40Ah%40%40Z%3FjAJ%5C%40N%40HBXHRPPjAz%40lB~AnAbABHPl%40XdAP%60APfB%5CzFHfCGVQ%5CM%5COr%40E%60%40%3FR%3FJOpC%3FBAJIZSd%40KVEVAR%3FR%40F%3FFTbAJf%40%40FrAxFHv%40%40FIHCfAMfF%3FT%3F%3F%3FFB%60E%3FL%40pCP%60FkF%5CDYBm%40JuBUwEAO%5DcHAOMeCAKG%7B%40AMQgD%3FGE%7B%40KkAAKm%40sG%3FM%3FQBm%40Bo%40%40Q%40%5BDq%40b%40uABwA%3FcDLa%40e%40kHyAoAkGBsETs%40Jc%40Re%40Ta%40m%40i%40%60%40Zf%40a%40b%40H%7CBFdAHN%3FP%3F%60%40BNJLPLFL%40L%3FRAPBHFZJj%40RnA%3FRGZ%40PHXb%40%7CB%40HHn%40Ld%40j%40%7CDJ%5CVLFA%40FJdBB%7CA%3FFDpC%3FH%40rBBzA%3FBDhC%3FF%5DDHjE%3FJH%7CERj%40P%5EDJAr%40_%5Dj%40u%40C%7BDgJEKeE%7BJKMIISGs%40QGCcUgIo%40I_B_AMGiGaCIMoMgQaAmAeAu%40y%40Ww%40Gw%40%3Fq%40Hu%40Ri%40X_%40V_BfBmEhF_DvDyBpCGHgD~DIHiCvCuDpE?period=").concat(period);

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
