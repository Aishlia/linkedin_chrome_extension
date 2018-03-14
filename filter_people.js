var location_of_person = [];
var seniority = [];
var first_page_people = [];
var result = [];

var dalits = ['Customer', 'Human', 'Affairs', 'Tax', 'Finance', 'Accounting',
'Marketing', 'Software Engineer', 'Developer', 'Quality', 'Communications'];

function cleanName(name) {
  var position = name.indexOf("(");
  name = name.slice(0, (position-1))
  return name;
}

function lists(){
  console.log("start"); 
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
  number = string_of_employees.indexOf("(");
  number_of_employees = Number(string_of_employees.slice(number + 1, string_of_employees.length - 1));

  // pulling first page of people
  let list_of_results = document.getElementById('results-list').getElementsByClassName("result");

  for (elt of list_of_results) {
    name = elt.getElementsByClassName("name-link")[0].innerHTML
    position = elt.getElementsByClassName("info")[0].getElementsByTagName('p')[0].innerHTML
    url = elt.getElementsByClassName("image-wrapper")[0].href
    info = {
      name: name,
      position: position,
      url: url,
      cool: 0
    }
    first_page_people.push(info)
  }

  for (i of first_page_people) {
    if (i.position.includes("CTO") ||
        i.position.includes("CEO") ||
        (i.position.includes("President") && !i.position.includes("Vice"))|| // && !i.position.includes("Vice")
        i.position.includes("Founder")) {
          if (number_of_employees < 50) {
            i.cool += 6
          } else if (number_of_employees >= 50 && number_of_employees < 1000) {
            i.cool += 4
          } else if (number_of_employees >= 1000) {
            i.cool -= 5
          }
          // i.cool = (number_of_employees < 50) ? (i.cool + 6) : (i.cool + 4);
        if (i.position.includes("CTO")) {
          i.cool += 2;
        }
    }

    if (i.position.includes("IoT") ||
        i.position.includes("iot")) {
          i.cool += 3;
    }

    if (i.position.includes("Director") ||
        i.position.includes("Vice President") ||
        i.position.includes("V.P.")) {
          i.cool += 4;
          if (i.position.includes("Senior") ||
              i.position.includes("Sr.")) {
            i.cool += .5;
          }
    }

    // Get Rid of those Filthy Street Cleaners
    dalits.forEach(function(entry) {
      if (i.position.includes(entry)){
        i.cool -= 3;
      }
    });

    if (i.position.includes("App") ||
        i.position.includes("Business Development") ||
        i.position.includes("Sales")) {
          i.cool -= 2;
    }
  }

  for (i of first_page_people) {
    if (i.cool > 1) {
      result.push(i);
    }
  }

  // sort
  len = result.length - 1;
  for (i=0; i<1000; i++) {
    if (result[i%len].cool < result[i%len+1].cool) {
      temp = result[i%len];
      result[i%len] = result[i%len+1];
      result[i%len+1] = temp;
    }
  }

  console.log(result);
  console.log("done");
}

lists();
