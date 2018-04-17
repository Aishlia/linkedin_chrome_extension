function send_info(name, linkedin_url, geography, industry, company_headcount, companyId) {
  var request = new XMLHttpRequest();

  name = "name=" + name;
  linkedin_url = "&linkedin_url=" + linkedin_url;
  geography = "&geography=" + geography;
  industry = "&industry=" + industry;
  company_headcount = "&company_headcount=" + company_headcount;
  companyId = "&companyId=" + companyId;

  var url = 'http://127.0.0.1:8000/company/'
  var params = name + linkedin_url + geography + industry + company_headcount + companyId;
  console.log(url, params)

  request.open(
    "POST", url, true
  );

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      // Sends JSON Data to Background
      console.log("Record Saved", data);
    } else {
      console.log("error", data);
    }
  };

  request.send(params);
}

let results_list = document.getElementById("results-list").childNodes;

companies = []
rejects = []

for (elt of results_list) {
    url = elt.getElementsByClassName('name')[0].firstChild.href
    name = elt.getElementsByClassName('name')[0].firstChild.innerHTML
    if (elt.getElementsByClassName('info')[0].childNodes.length == 3) {
        industry = elt.getElementsByClassName('info')[0].childNodes[0].innerHTML
        geography = elt.getElementsByClassName('info')[0].childNodes[1].innerHTML
        company_headcount = (elt.getElementsByClassName('info')[0].childNodes[2].innerHTML.slice(0, -10)).replace(',','')
    } else if (elt.getElementsByClassName('info')[0].childNodes.length == 2) {
        industry = elt.getElementsByClassName('info')[0].childNodes[0].innerHTML
        geography = ''
        company_headcount = (elt.getElementsByClassName('info')[0].childNodes[1].innerHTML.slice(0, -10)).replace(',','')
    }

    companyId = Number(url.slice(url.indexOf('?') + 11, url.indexOf('&moduleKey')))

    if (!(name.toLowerCase().includes("season") && name.toLowerCase().includes("episode"))) {
        console.log({url: url,
                        name: name,
                        industry: industry,
                        geography: geography,
                        company_headcount: company_headcount,
                        companyId: companyId})
        companies.push({url: url,
                        name: name,
                        industry: industry,
                        geography: geography,
                        company_headcount: company_headcount,
                        companyId: companyId})
        send_info(name, url, geography, industry, company_headcount, companyId)
    } else {
        rejects.push({url: url,
                        name: name,
                        industry: industry,
                        // geography: geography,
                        company_headcount: company_headcount,
                        companyId: companyId})
    }
}

console.log("companies", companies)
console.log("rejects", rejects)
