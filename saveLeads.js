function send_info(name, company, title) {
  var request = new XMLHttpRequest();

  name = "name=" + name;
  company = "&company=" + company
  title = "&title=" + title;

  var url = 'http://127.0.0.1:8000/contacts/'
  var params = name + company + title;

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

people = []
rejects = []

for (elt of results_list) {
    try {
      name = elt.getElementsByClassName('name')[0].firstChild.innerHTML
      company = encodeURIComponent(elt.getElementsByClassName('company-name')[0].innerHTML)
      position = encodeURIComponent(elt.getElementsByClassName('info-value')[0].innerHTML.replace(/<[/]b>/g, "").replace(/<b>/g, ''))
      send_info(name, company, position)
    } catch (err) {
      console.log("someone has missing info")
    }
}
