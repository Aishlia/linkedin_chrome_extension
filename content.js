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

var location_of_person = [];
var seniority = [];
var first_page_people = [];

function cleanName(name) {
  var position = name.indexOf("(");
  name = name.slice(0, (position-1))
  return name;
}

function lists(){
  // The selection buttons on the sidebar
  let ol = document.getElementsByClassName('facet-suggestions');

  for (elt of ol){
    let list = elt.getElementsByTagName("li");
    if (elt.getAttribute('data-short-name') == 'G') {
      for (li of list) {
        location_of_person.push(cleanName(li.textContent));
      }
    }
    if (elt.getAttribute('data-short-name') == 'SE') {
      for (li of list) {
        seniority.push(cleanName(li.textContent));
      }
    }
  }

  // Number of people in the company
  string_of_employees = document.getElementsByClassName('page-heading')[0].innerHTML;
  number = string_of_employees.indexOf("(") + 1;
  number_of_employees = Number(string_of_employees.slice(number, number+2))

  // pulling first page of people
  let list_of_results = document.getElementById('results-list').getElementsByClassName("result");

  for (elt of list_of_results) {
    name = elt.getElementsByClassName("name-link")[0].innerHTML
    position = elt.getElementsByClassName("info")[0].getElementsByTagName('p')[0].innerHTML
    url = elt.getElementsByClassName("image-wrapper")[0].href
    info = {
      name: name,
      position: position,
      url: url
    }
    first_page_people.push(info)
  }

  if (number_of_employees <= 25) {
    for (i in first_page_people) {
      if (first_page_people[i].position == 'CEO' || first_page_people[i].position == 'CTO') {
        target = first_page_people[i]
        console.log(target)
        // return target;
      }
    }
    console.log("No CEO found")
  }
}

setTimeout(lists, 2000);


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
