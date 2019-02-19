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
var apiUrl = "".concat(process.env.SANDBOX_ENDPOINT, "/stats/all/polygon/y_tgAbmv%5B%7Bf%40fVy%5Bb_%40ml%40aJoN%7C%5CuZnNapBrkB%7DRpc%40qlA~dBas%40j%7DBhAzrBtxAbcA%60T%60%5EmCjjAvFdt%40xe%40sErEhLaJnNfAb_%40_Itd%40dUlC%60%5Ezf%40oXvo%40hBfVkyEtaJ%60gAzQ~mCvo%40hW%7B%5BBCb%5E%7Bc%40%60%40i%40fOgRh%40q%40LO%60%40g%40TYX%5D%5Cc%40NSf%40m%40FGn%40y%40l%40u%40HKd%40k%40PUZa%40Z_%40~C%7DDDGb%5Coa%40JO%60%40g%40TYlNiQ%7C%40iA%5Ee%40V%5BV%5B%5Ee%40NQf%40o%40~GsIl%40u%40%3FAt%40_Af%40m%40NS%5Cc%40V%5BTY%60%40g%40LOh%40q%40BEvLgO%5Ca%40X_%40RWb%40i%40JMj%40s%40BCxEcGNQf%40o%40DGn%40y%40l%40u%40HKb%40k%40RUZ_%40Za%40PUb%40k%40HKl%40u%40n%40w%40%3F%3F%3F%3FDEFEn%40i%40%3F%3F%7CCmCvAoAPOLKFGTSPOFGRQNMNM%40ARQTSLKn%40k%40DE%5E%5BVU%3F%3FtF%7DEPOJKrj%40gf%40nHqG%3F%3FtEmVt%40_EH_%40TmA%3FAl%40aDtB%7BKHe%40nGsLRoEgAcC%40GvBgLpFuYh%40wA~G_R%7CIcVBEFOFQDMfAyCtAsD%60BoE%7CBgCv%40y%40BCRN~FuIj_%40_c%40pAmA%7CAwAvDoDY%5DwAyAfGuHfBvAn%40h%40fCyClF%7DHpDmFtBcCxr%40_y%40dN_PjHmIxZc%5EBCHKh%40m%40%3F%3FFGpOoQ%40ADExBaCl%40o%40HKh%40k%40LMd%40g%40PQfEsEbGoGzCcDp%40s%40%40A%40AjBqBhDqD%3F%3FxEeFbDkDZ%5DFGTUVWTWHIdAiAlBsBh%40k%40DEDEpI_JjEgFtN%7BPdK%7BL%40AVM%5Ca%40LOh%40m%40rA%7DARYFI%60%40m%40NUDGVYHKTWHKFGLO%3F%3FV%5BDEBEPS%3F%3FZ%5D%40C%3F%3FhIwJJMj%40q%40DETY%3F%3F%3F%3FpHgHDCDEb%40c%40FG%40AJKh%40i%40JIBCDE%3F%3FVUJIBCFGDEd%40e%40PQn%40m%40%3FAjCgC%3F%3F%3F%3FU%5BQUbGuGVUp%40o%40xFiFtD%7BDfCkCb%40%7B%40~BsExAqDXkIs%40i%5Dc%40%7DUw%40%7DK%3FK%3FGyFXeB%7CA_%40%5C_BPE%40CmC%7B%40PqAAoArDaLFwIb%40%5Bl%40%5DbL%7BC%40EvBR%40rAAzL%40%5E%3FlA%3F%60YI%60%40%3F%3F%3F_%40xe%40%3F%3FmFjEqAGQCs%40O%3F%3F%3F%3F%5DlA%3F%3FCJ%7B%40xC_BdAkAv%40QQu%40y%40m%40q%40AA%3F%3F%3F%3F%3F%3F%3F%3F%7B%40EkDO%3F%3FBwG%40_E%3Fg%40%3FQ%3F%3F%3FC%3FS%3FkA%40yCc%40%3F%3F%3FoA%3Fw%40%3F%3F%3F_G%3F%3F%3F%3FlB%3F%3F%3F%3F%7C%40A%3F%3F%3FB%3FL%3FJ%3FD%3FD%3FP%3FN%3FB%3FB%3FF%3F%3F%3F%3F%3F%3FC%3FS%3FiECY%3Fq%40%3F%3F%3FApAAt%40Af%40C%60DA%7CAA%60ByBFY%40C%3FmDJgCHiGPW%40cJ%7CA%7DCjAoAvAsBxFeDhGaD~AyAH%3F%3FC%3F%7DG%5D_E%7B%40oAc%40wC%7DAECGIg%40m%40wEuF%3F%3FkAwAII%5D_%40UWa%40a%40oF%7DFa%40c%40m%40qAI%7D%40Cq%40GaB%3F%3FvBc%40j%40MJC%5CI%5DwBa%40_CQgAAEAIESES%5DwBMw%40_%40%7DBcD%7DR%3F%3FoBP%3F%3Fm%40sF%7BBuSS%7DAc%40mDWyGKwCAYE%7D%40U_G%3FkF%3F%7DC%3FaA%3F%5BAiAAo%40C%7DACaBCyC%3FG%3FAx%40%7BOXoCXsCh%40%7BEJ%7B%40BUD%5Dp%40eG%40Or%40qG%3F%3F%3F%3F%3FA%3F%3Ff%40sE%60AcD%3FABI%3F%3F%3F%3FLe%40FSfDgLnCmJbDiIFQZw%40d%40kAjPiXhCiEBCFIxE%7DHBEZg%40DG%40A%3F%3F%3F%3FR%5B%60%40m%40bA%7BAHKLQPWRYBENUd%40s%40%3F%3F%3F%3F%40Ct%40gAZe%40T%5DDGt%40iA%3F%3F%3F%3F%3F%3F%3F%3Ff%40u%40LQ%40AXa%40%3F%3F%5Ci%40r%40eA%40A%40CZg%40FIDGLQFILQ%3F%3F%60%40m%40FIhWa%60%40jQaP~ViUbQcKVO%5CSr%40a%40BAbBaAIi%40%5ByBmHtEkAjCkCd%40q%40dBkCq%40eBqBbCeBp%40%7DAk%40kA%7DAeAkA%5EcFcD%7DA~%40kBKQw%40cDD%7DDiC%3FoD%3FcDpAq%40vC%5EnByCw%40yNrDeJv%40%7DJeJ%3Fm%40%7DCfK%7DDlA%7DD%7DJoBrAeOsDgJ_IgEcBqNfEyOgE_IrDmKoFkHmPcLgEuLkMyKgkGvo%40?period=").concat(period);

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
