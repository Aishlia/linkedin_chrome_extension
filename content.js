// Looking for the name
let headers = document.getElementsByTagName('h1');
for (elt of headers) {
  if (elt.classList.contains('member-name')) {
    name = elt.innerHTML;
  }
}

//Looking for current position at the company (bad)
let h2 = document.getElementsByTagName('h2');
for (elt of h2) {
  if (elt.classList.contains('position-title')) {
    title = elt.innerHTML;
    break; // 'position-title' includes past and present positions so break after first which is most recent
  }
}

// Looking for the location (the one listed directly under the name)
let li = document.getElementsByTagName('li');
for (elt of li) {
  // if (elt.classList.contains('title')) {
  //   title = elt.innerHTML;
  //   console.log("Title: ", title); // Title
  // }
  if (elt.classList.contains('location-industry')) {
      let span = elt.getElementsByTagName('span');
      for (elt_a of span) {
        if (elt_a.classList.contains('location')) {
          location_of_company = elt_a.innerHTML;
        }
      }
  }
}

// Looking for the company and website (just the url to the linkdin)
let h3 = document.getElementsByTagName('h3');

for (elt of h3) {
  if (elt.classList.contains('company-name')) {
    company_name = elt.getElementsByTagName('a')[0].innerHTML
    other_page_url = elt.getElementsByTagName('a')[0]
    if (other_page_url) other_page_url.click();
    company_url = elt.getElementsByTagName('a')[0].href
    break; // 'company-name' includes past and present companies so break after first which is most recent
  }
}

let a = document.getElementsByTagName('a');

for (elt of a) {
  if (elt.classList.contains('meta-link') && elt.classList.contains('website')){
    company_url = elt.href;
    console.log(elt.href);
  }
}


// console.log("Name: ", name); // Name
// console.log("Title: ", title); // sometime people put TITLE, 'company name' <<-- clean that up
// console.log("Location: ", location_of_company) // Location
// console.log("Company Name: ", company_name); // Company Name
// console.log("Company URL: ", company_url);

// console.log("Full list/lists in dev")
// let everything = document.getElementsByTagName('li');
// for (elt of everything) {
//   if (elt.classList.contains('title')) {
//     console.log(elt.innerHTML);
//     //break; // 'position-title' includes past and present positions so break after first which is most recent
//   }
// }

// let paragraphs = document.getElementsByTagName('p');
// for (elt of paragraphs) {
//     data = elt;
//     elt.style['background-color'] = '#FF00FF';
// }
