let results_list = document.getElementById("results-list").childNodes;

companies = []
rejects = []

for (elt of results_list) {
    url = elt.getElementsByClassName('name')[0].firstChild.href
    name = elt.getElementsByClassName('name')[0].firstChild.innerHTML
    if (elt.getElementsByClassName('info')[0].childNodes.length == 3) {
        industry = elt.getElementsByClassName('info')[0].childNodes[0].innerHTML
        geography = elt.getElementsByClassName('info')[0].childNodes[1].innerHTML
        company_headcount = Number((elt.getElementsByClassName('info')[0].childNodes[2].innerHTML.slice(0, -11)).replace(',',''))
    } else if (elt.getElementsByClassName('info')[0].childNodes.length == 2) {
        industry = elt.getElementsByClassName('info')[0].childNodes[0].innerHTMLjj
        geography = ''
        company_headcount = Number((elt.getElementsByClassName('info')[0].childNodes[1].innerHTML.slice(0, -11)).replace(',',''))
    }

    companyId = Number(url.slice(url.indexOf('?') + 11, url.indexOf('&moduleKey')))

    if (!(name.toLowerCase().includes("season") && name.toLowerCase().includes("episode"))) {
        companies.push({url: url,
                        name: name,
                        industry: industry,
                        geography: geography,
                        company_headcount: company_headcount,
                        companyId: companyId})
    } else {
        rejects.push({url: url,
                        name: name,
                        industry: industry,
                        geography: geography,
                        company_headcount: company_headcount,
                        companyId: companyId})
    }
}

console.log("companies", companies)
console.log("rejects", rejects)
