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
const apiUrl = `${process.env.SANDBOX_ENDPOINT}/stats/all/polygon/xky%60Ay%60te%40KFOFMNc%40Y%5BFIBODQJIFGDE%3FGBAE%3FKIBG%3FG%3FG%3FEAE%3FG%3FG%3FI%3FI%3FKAKCKCGCU%3FMMQb%40MN_%40VABMNKLS%5EU%60%40UVKLQLY%60AUr%40_%40bAUjADvBXfBj%40%60Ax%40v%40p%40dBt%40tB~%40vAf%40~%40h%40p%40fAlAz%40j%40xA%60%40%60Ch%40~AVfBCbCm%40tHwF%7CBE%7CA%5D%7CAo%40lB%40tDhArNfJdSlFbBoAzBmCdC_CqCiIbImB%7BA_GgO%60FoK_AwFlApApHo%40tCeJqFiDqBcEk%40t%40uBHeCQm%40w%40%3Fw%40Ok%40Be%40Ee%40Y%5B%5BWQY_%40SUiAcAwBoBsAgAyAeA%7BBiAeAo%40mAg%40mAg%40SQ_%40U?period=${period}`

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
