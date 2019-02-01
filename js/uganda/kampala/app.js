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
const apiUrl = `${process.env.SANDBOX_ENDPOINT}/stats/all/polygon/k_dfEwcq%40%7D%40eAQa%40m%40wCGwADI%5CEZQPWRgALsBu%40KgAGoBIk%40D_%40A%5DIMSOuAMu%40YOu%40Oe%40UgAu%40Ri%40v%40uAuAs%40g%40%5Be%40%5Bm%40m%40_Au%40oAu%40%5BKu%40a%40QEuASkAKcG%40CJEB%3FFBRHPCTIR%3FPCFBJA%40%40FGP%3Fz%40DBDNDFBNPJBJCB%40DEL%40FJLALBD%3FJFNTZHBBHP%40HBNRFT%5CHEDI%40EHm%40Im%40CEAGHGBILETMNIPMJEL%40JEDCHAREBCLGH%3FLC%3FSPCNBNIDAJOPEHC%5CML%3FJCFKL%3FPBLEFDPD%40%40ALDN%3FHDV%3FBCHFZDWA%3FBf%40FEDI%40a%40Ge%40%3FA%40SGQ%40%3F%40D%40ABBFJJ%3FPPJDh%40BB%3FRCAA%40ETJDBBGH%40FHDEZC%40m%40GUGGEE%3FMHAZDJJD%7C%40HJN%5DhCs%40OWAOFCPFHJD%60ARGp%40YBAH%5D%3FLBNPGh%40A%60AQ%40%3FTE%40%3FFO%3F%40RN%3F%3FBB%3FAXJ%3FBF%3F%7C%40p%40%3FHnAD%40FJAHRx%40%3FFFVGBCNm%40PED%3FX%40DC%40%3FDFLHBDFEJ%40NGFBDCBEj%40ABICIJC%3F%40LHPGLBJEHAVGRGBEHQj%40IHCL%40DSJIJ%3FFBBEN%3FHFFANBHGLGX%40HEDAFMDMNITI%3F%40JKJAHEDNF%5EAH%40NHF%3FHLCLJX%3FNJ%5CGf%40BD%3FHNN%40TNPT%7C%40FHVF%40NJFHDV%40LNNDBTHHATFD%3FBLDLTBNKPDNJH%3FTC%40%3FHEHD%40AJBFC%40%3FJOJGL%3FPCB%3FJEF%40DCPKPBHED%40FEFAJCB%3FBD%40%40B%3FFGPIB%3FLC%40CRKBENIBEFC%3FGRMBEGGFWBINGC%3FHEHK%40OJCAOPKDQXC%3F%3FDB%3F%3FBI%3FABECE%3FEFS%3FGTG%40EDECK%40AFKN%40BCD%40JG%40ADG%40%3FFGHK%40IDE%3FEHQJ%40BIAEHE%3FABGAEFI%40EB%5BDQFY%3FOCCFCA%3FCQBKCADEAGBEACBCCABMAa%40PG%3FQGi%40f%40AFDLDDNZHXCAGQU_%40%5BFi%40QADJDJXMPICMHKCCDI%3F%3FBEABFIB%3FEK%40BXPDDC%40DVA%40CJADEN%3FBBDABEB%3FB%40%40DD%3FBC%3FGHCN%3FVGDH%40NHRXd%40FB~%40BPBXO%40LVFDCBFDBL%3FRFFCAID%3FDBXDDNNHFCPTD%3FAFBDRLNDPQB%3FBFD%3FDGF%40FCAEDGLB%3FKD%40%40DD%40HK%3FBB%3F%40IDCPBHGBGN%40DKHDNO%40GB%3F%3FB%40GTAHIJENAFE%3FCDGFCF%3FBC%40EJA%3FCHFJA%60%40K%40GDCD%3F%40FD%3FDEDBTANKBBXEBE%3F%5BMWCOKUAe%40EU%40UCSBYE%5DFK%3FIDMCSDQAKGGAGIG%3FCD%3FISKAI%40AUDO%3FIGUMQ%40IDGCGDGJCNLP%3FJGXUVMBEBQJG%40UBICGDG%40OHQDCDO%40MFGCOHCBBJ%40BEFBBCFDH%40ONBJAF%40DJJLRJ%3FDEJ%3FHIFQECBE%3FEMSHEAMG%3FACO%3FQDM%3FEADK%3FMN%5BAUDOVW%40MLQ%5C%5BL%40AFBF%3FDID%3FDKL%3F%60%40BF%3FJOVLN%3FZPl%40b%40THPHBLHVHNARZPJF%40BHTJC%40HLRRNVCBEAANBDAJRf%40NVPP%3FFNPNFTPBJJDBHDDdAr%40DNzCwGxAiDlAaBbAuC%60%40%7BD%60BwFt%40%7BEj%40YJMr%40qAtAkAtAeAfA%7BB~%40yAn%40%7B%40Pw%40D_%40P%5BX_%40bBcDTw%40ZW%60%40q%40WUsBsAq%40i%40qAuAm%40s%40aBfA?period=${period}`

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
