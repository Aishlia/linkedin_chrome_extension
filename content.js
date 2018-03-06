// info = {
//   'name':'',
//   'title':'',
//   'location_of_company':'',
//   'company_name':'',
//   'company_url':''
// }
//
// function get_info() {
//   // Looking for the name
//   let headers = document.getElementsByTagName('h1');
//   for (elt of headers) {
//     if (elt.classList.contains('member-name')) {
//       info.name = elt.innerHTML;
//     }
//   }
//
//   //Looking for current position at the company (bad)
//   let h2 = document.getElementsByTagName('h2');
//   for (elt of h2) {
//     if (elt.classList.contains('position-title')) {
//       info.title = elt.innerHTML;
//       break; // 'position-title' includes past and present positions so break after first which is most recent
//     }
//   }
//
//   // Looking for the location (the one listed directly under the name)
//   let li = document.getElementsByTagName('li');
//   for (elt of li) {
//     // if (elt.classList.contains('title')) {
//     //   title = elt.innerHTML;
//     //   console.log("Title: ", title); // Title
//     // }
//     if (elt.classList.contains('location-industry')) {
//         let span = elt.getElementsByTagName('span');
//         for (elt_a of span) {
//           if (elt_a.classList.contains('location')) {
//             info.location_of_company = elt_a.innerHTML;
//           }
//         }
//     }
//   }
//
//   // Looking for the company and website (just the url to the linkdin)
//   let h3 = document.getElementsByTagName('h3');
//
//   for (elt of h3) {
//     if (elt.classList.contains('company-name')) {
//       info.company_name = elt.getElementsByTagName('a')[0].innerHTML
//       company_url = elt.getElementsByTagName('a')[0].href
//       break; // 'company-name' includes past and present companies so break after first which is most recent
//     }
//   }
// }

// ----------
// window.setTimeout(linkdin_url, (Math.floor((Math.random() * 7) + 4))*1000);
//
// function linkdin_url() {
//   let h3 = document.getElementsByTagName('h3');
//
//   for (elt of h3) {
//     if (elt.classList.contains('company-name')) {
//       other_page_url = elt.getElementsByTagName('a')[0];
//       if (other_page_url) other_page_url.click();
//       break;
//     }
//   }
//
//   let a = document.getElementsByTagName('a');
//
//   for (elt of a) {
//     if (elt.classList.contains('meta-link') && elt.classList.contains('website')){
//       info.company_url = elt.href;
//       console.log(elt.href);
//     }
//   }
// }

// document.getElementById('clickme').addEventListener('click', get_info);

//console.log(info);

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
