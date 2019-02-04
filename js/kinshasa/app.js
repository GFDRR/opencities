const { ODRI, fetch, process, URL } = window

const url = new URL(window.location.href)
const from =
  (url.searchParams.get('from') && new Date(url.searchParams.get('from'))) ||
  new Date(2018, 0, 1)
const to =
  (url.searchParams.get('to') && new Date(url.searchParams.get('to'))) ||
  new Date()

const period = [from, to].map(d => d.toISOString().substr(0, 10)).join()
const precision = 13
const apiUrl = `${process.env.SANDBOX_ENDPOINT}/stats/all/polygon/%7Diw%7CA%7CbzYOvDy%40tAiFnAw%40t%40G%7CC%7C%40x%40hCZtBzAx%40%60Gq%40lEeBvBChCqFdIWzGl%40dCx%40z%40pHfAdI%7CIbAzB_%40bBp%40%60D%5DbGa%40dBcCzAgAxBaAnJ%5C%60BjH~G%7BCnRvAbC%60MtAzBlDs%40tCkAdAqATiJi%40mHzAkAdBXzBbGdA%60CfBdFxH%7CAfEDv%40mANkGc%40_AZeBfD%7C%40~C%60FrCKdA%7DBvDDhBvA~BKlC%7CDnAtAjCtBj%40fGHlBxBbCdAxGDv%40OpB%7BBjCyA%60A%7BBpDkCfDYdDqAlRkC%7CEaBvJi%40pDwAlQiCxEoD%7CEuK%60F%7BHz%40oE~A%3F~%40%7BBjDu%40rCwBzDaA%60DsBReBnCy%40zDKjEn%40%5CrAjHnHhCRfBrCfE~AbBTbBs%40jTtBfDGrDsAhABvDkN%7D%40yAPuAkE%7BHbAy%40%7DEiHdAs%40iFgGx%40%7B%40oCuEfB%7DAmHiGsI%7BAyE_DyJcBkDaG%7BDuDq%40RiBy%40%7DFU_BiBsACiAeH~%40w%40VaIw%40aBYyC%5CuAzCcCb%40%7DAAeFq%40wAC%7BCcAA%7DAoCOgCoBgDk%40oBDgEcAyFmF%7DEmAImA%7B%40iBaCEeGkDw%40i%40cCNgH%7DDoIL_CoCmC_E%7BIkBu%40%5BiD%7BAcC%5DuCyCyBd%40%7BFp%40%7B%40CwBiBwAsB%7BDaFuA_Nw%40yHuK%7DE%7B%40iDL%7D%40WwGlH%7BKjGwvA%60a%40jAtB~EcCrBFtA%7C%40JrAcAtH%5CnEk%40tC%7DArAmAzGsBrA_Ir%40%5B%60AZfApCvFlIf%40%7CBbAnB~D%7CGnB?period=${period}`

function mountViz (data) {
  const datesUI = document.querySelector('#dates')
  const format = d => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  datesUI.innerHTML = `${format(from)} - ${format(to)}`
  ODRI.inlineStat('#buildingsUsers', {
    data,
    featureType: 'buildings',
    stat: 'users'
  })
  ODRI.inlineStat('#buildingsActivity', {
    data,
    featureType: 'buildings',
    stat: 'activity'
  })
  ODRI.overallStats('#overallStats', {
    data,
    stats: [
      {
        featureType: 'buildings',
        stat: 'activity'
      },
      {
        featureType: 'highways',
        stat: 'activity'
      },
      {
        featureType: 'waterways',
        stat: 'activity'
      },
      {
        featureType: 'buildings',
        stat: 'users'
      },
      {
        featureType: 'highways',
        stat: 'users'
      },
      {
        featureType: 'waterways',
        stat: 'users'
      }
    ]
  })
  ODRI.activity('#activity', {
    data,
    apiUrl,
    range: [from, to],
    precision,
    facet: 'features', // users, features
    granularity: 'daily' // daily, monthly, weekly
  })
  ODRI.compareMap('#compare-map', {
    width: '100%',
    height: '800px',
    settings: {
      default_feature_type: 'buildings',
      // iframe_base_url:
      // polygon:
      default_start_year: '2016',
      default_end_year: 'now'
    }
  })
  ODRI.contributors('#contributors', {
    data,
    apiUrl,
    numUsers: 15,
    featureType: 'buildings'
  })
}

function timeoutPromise (timeout, err, promise) {
  return new Promise(function (resolve, reject) {
    promise.then(resolve, reject)
    setTimeout(reject.bind(null, err), timeout)
  })
}

document.addEventListener('DOMContentLoaded', function () {
  timeoutPromise(20000, new Error('Server timed out!'), fetch(apiUrl))
    .then(r => r.json())
    .then(mountViz)
})
