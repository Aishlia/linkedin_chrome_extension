info = {
  name: "",
  title: "",
  location_of_contact: "",
  company_name: ""
};

function rid_of_amp(name) {
  new_name = name
  if (name.includes("&amp;")) {
    new_name = name.replace(/&amp;/g, "&");
  }
  return new_name
}

function get_info() {
  // Looking for the name
  let headers = document.getElementsByTagName("h1");
  for (elt of headers) {
    if (elt.classList.contains("member-name")) {
      info.name = rid_of_amp(elt.innerHTML);
    }
  }

  //Looking for current position at the company
  let h2 = document.getElementsByTagName("h2");
  for (elt of h2) {
    if (elt.classList.contains("position-title")) {
      info.title = rid_of_amp(elt.innerHTML);
      break; // 'position-title' includes past and present positions so break after first which is most recent
    }
  }

  // Looking for the location (the one listed directly under the name)
  let li = document.getElementsByTagName("li");
  for (elt of li) {
    if (elt.classList.contains("location-industry")) {
      let span = elt.getElementsByTagName("span");
      for (elt_a of span) {
        if (elt_a.classList.contains("location")) {
          info.location_of_contact = rid_of_amp(elt_a.innerHTML);
        }
      }
    }
  }

  // Looking for the company and website (just the url to the linkedin)
  try {
    let h3 = document.getElementsByTagName("h3");

    for (elt of h3) {
      if (elt.classList.contains("company-name")) {
        info.company_name = rid_of_amp(elt.getElementsByTagName("a")[0].innerHTML);
        company_url = elt.getElementsByTagName("a")[0].href;
        break; // 'company-name' includes past and present companies so break after first which is most recent
      }
    }
  } catch (err) {
    info.company_name = "";
  }

  chrome.runtime.sendMessage(info, function(response) {
    if (response.response) {
      console.log(response.response)
      return switch_page();
    }
  });
}

function switch_page() {
  let h3 = document.getElementsByTagName("h3");

  for (elt of h3) {
    if (elt.classList.contains("company-name")) {
      other_page_url = elt.getElementsByTagName("a")[0];
      if (other_page_url) other_page_url.click();
      else alert("no link to other thing");
      return get_url();
    }
  }
}

get_info();
