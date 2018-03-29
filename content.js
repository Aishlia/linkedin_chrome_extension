// function send_info(name, company, email) {
//     var request = new XMLHttpRequest();
//
//     name = "name=" + name;
//     company = "&company=" + company;
//     // location = "&location=" + location;
//     // title = "&title=" + title;
//     // website = "&website=" + website;
//     email = "&email=" + email;
//
//     request.open(
//       "POST", "http://127.0.0.1:8000/contacts/?" + name + company + email, true
//     );
//
//     request.setRequestHeader('Content-Type', 'application/javascript')
//     request.send();
// }

// send_info("Edyarbsdfgds", "ZZZresdfgdsa", "asdf@adfgdfgsdf.com");




// let div = document.getElementsByTagName("div");
//
// for (elt of div) {
//   if (elt.id == 'stream-container') {
//     console.log(elt);
//
//     let c = elt.getElementsByClassName("text-form-container")
//     // c.value = 'hello'
//     console.log(c)
//   }
// }

// **************
// var location_of_person = [];
// var seniority = [];
// var first_page_people = [];
//
// function cleanName(name) {
//   var position = name.indexOf("(");
//   name = name.slice(0, (position-1))
//   return name;
// }
//
// function lists(){
//   // The selection buttons on the sidebar
//   let ol = document.getElementsByClassName('facet-suggestions');
//
//   for (elt of ol){
//     let list = elt.getElementsByTagName("li");
//     if (elt.getAttribute('data-short-name') == 'G') {
//       for (li of list) {
//         location_of_person.push(cleanName(li.textContent));
//       }
//     }
//     if (elt.getAttribute('data-short-name') == 'SE') {
//       for (li of list) {
//         seniority.push(cleanName(li.textContent));
//       }
//     }
//   }
//
//   // Number of people in the company
//   string_of_employees = document.getElementsByClassName('page-heading')[0].innerHTML;
//   number = string_of_employees.indexOf("(") + 1;
//   number_of_employees = Number(string_of_employees.slice(number, number+2))
//
//   // pulling first page of people
//   let list_of_results = document.getElementById('results-list').getElementsByClassName("result");
//
//   for (elt of list_of_results) {
//     name = elt.getElementsByClassName("name-link")[0].innerHTML
//     position = elt.getElementsByClassName("info")[0].getElementsByTagName('p')[0].innerHTML
//     url = elt.getElementsByClassName("image-wrapper")[0].href
//     info = {
//       name: name,
//       position: position,
//       url: url
//     }
//     first_page_people.push(info)
//   }
//
// //   if (number_of_employees > 25) {
// //     let input = document.getElementsByClassName("keywords-input");
// //     input.value = 'iot';
// // //stream-container > div.smart-search > div.left-rail-facets > section > div.facets-container > ul > li.facet.keywords > form > div > input
// //   }
//
//   if (number_of_employees <= 25) {
//     if (number_of_employees.length == 1) {
//       target = first_page_people[0];
//       console.log(target);
//       // return target;
//     }
//
//     for (i in first_page_people) {
//       if (first_page_people[i].position.includes('CEO') || first_page_people[i].position.includes('CTO') || first_page_people[i].position.includes('President')) {
//         target = first_page_people[i]
//         console.log(target)
//         // return target;
//       }
//     }
//     // console.log("No CEO found")
//   }
// }
//
// setTimeout(lists, 2000);
// ************

//
// // div id=stream-container
// // => siv class=smart-search
// // => div class=left-rail-facets
// => section class=sticky
// => div class=facets-container
// => ul class=facet-list
// => li class=facet keywords
// => form class=keywords-input text-form-input
// =? div class=text-form-container
