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

    if (request.status >= 200 && request.status < 400) {
      // Sends JSON Data to Background
      chrome.runtime.sendMessage({ email: data.email }, function(response) {
        console.log(response);
      });
    } else {
      console.log("error");
    }
  };
  console.log("Searching...")
  request.send();
}

get_url();
