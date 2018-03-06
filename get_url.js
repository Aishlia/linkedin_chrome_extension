function get_url() {
  let a = document.getElementsByTagName("a");

  for (elt of a) {
    if (
      elt.classList.contains("meta-link") &&
      elt.classList.contains("website")
    ) {
      // Sends JSON Data to Background
      chrome.runtime.sendMessage({ url: elt.href }, function(response) {
        console.log(response.response);
      });
    }
  }
}

get_url();
