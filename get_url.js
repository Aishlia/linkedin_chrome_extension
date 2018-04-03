function get_url() {
  let a = document.getElementsByTagName("a");

  for (elt of a) {
    if (
      elt.classList.contains("meta-link") &&
      elt.classList.contains("website")
    ) {
      // Sends JSON Data to Background
      chrome.runtime.sendMessage({ url: elt.href }, function(response) {
        if (response.response.name && response.response.url) {
          return get_email(response.response.name, response.response.url);
        }
      });
    }
  }
}

function proper_website(url) {
  if (url.includes("https://") || url.includes("http://"))
    return url;
  else if (url.includes("www."))
    return "http://" + url;
  else
    return "http://www." + url;
}

function send_info(name_in, company_in, person_location_in, title_in, website_in, email_in) {
  website = proper_website(website_in);
  var request = new XMLHttpRequest();

  name = "name=" + name_in;
  company = "&company=" + company_in;
  person_location = "&location=" + person_location_in;
  title = "&title=" + title_in;
  website = "&website=" + website_in;
  email = "&email=" + email_in;

  var url = 'http://127.0.0.1:8000/contacts/'
  var params = name + company + person_location + title + website + email;

  request.open(
    "POST", url, true
  );

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    // Change 'None' to ''
    if (data.email == 'None') {
      data.email = '';
    }

    if (request.status >= 200 && request.status < 400) {
      // Sends JSON Data to Background
      console.log("Record Saved", data);
    } else {
      console.log("error", data);
    }
  };

  request.send(params);
}

function get_email(name, url) {
  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest();

  // Prep Params
  name = "name=" + name;
  url = "&url=" + url;

  // Open a new connection, using the GET request on the URL endpoint
  request.open(
    "GET", "https://email-finder-breadware.herokuapp.com/api?" + name + url, true
  );

  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    // Change 'None' to ''
    if (data.email == 'None') {
      data.email = '';
    }

    if (request.status >= 200 && request.status < 400) {
      // Sends JSON Data to Background
      chrome.runtime.sendMessage({ email: data.email }, function(response) {
        return send_info(response.response.name,
          response.response.company_name,
          response.response.location_of_contact,
          response.response.title,
          response.response.url,
          response.response.email);
      });
    } else {
      console.log("error");
    }
  };
  console.log("Searching...")
  request.send();
}

get_url();
