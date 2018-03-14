var location_of_person = [];
var seniority = [];
var first_page_people = [];
var result = [];

var dalits = ['Customer', 'Human', 'Affairs', 'Tax', 'Finance', 'Accounting',
'Marketing', 'Software Engineer', 'Developer', 'Quality', 'Communications'];

function lists(){
  console.log("start");
  
  // Number of people in the company
  string_of_employees = document.getElementsByClassName('page-heading')[0].innerHTML;
  number = string_of_employees.indexOf("(");
  number_of_employees = Number(string_of_employees.slice(number + 1, string_of_employees.length - 1));

  // pulling first page of people
  let list_of_results = document.getElementById('results-list').getElementsByClassName("result");

  for (elt of list_of_results) {
    name = elt.getElementsByClassName("name-link")[0].innerHTML
    position = elt.getElementsByClassName("info")[0].getElementsByTagName('p')[0].innerHTML
    position = position.replace('+', "");
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
    console.log(i, i.cool)
    // console.log(i)
    position = i.position.toLowerCase();
    if (position.includes("cto") ||
        position.includes("ceo") ||
        (position.includes("president") && !position.includes("vice"))|| // && !i.position.includes("Vice")
        position.includes("founder")) {
          if (number_of_employees < 50) {
            i.cool += 6
          } else if (number_of_employees >= 50 && number_of_employees < 1000) {
            i.cool += 4
          } else if (number_of_employees >= 1000) {
            i.cool -= 5
          }
          // i.cool = (number_of_employees < 50) ? (i.cool + 6) : (i.cool + 4);
        if (position.includes("cto")) {
          i.cool += 2;
        }
    }

    console.log(i, i.cool)

    if (position.includes("iot")) {
          i.cool += 3;
    }

    console.log(i, i.cool)

    if (i.name.includes("Rane Gridley"))
      i.cool += 100;

    console.log(i, i.cool)

    if (position.includes("director") ||
        position.includes("vice president") ||
        position.includes("vp") ||
        position.includes("v.p.")) {
          i.cool += 4;
          if (position.includes("senior") ||
              position.includes("sr.")) {
            i.cool += .5;
          }
    }

    console.log(i, i.cool)

    // Get Rid of those Filthy Street Cleaners
    dalits.forEach(function(entry) {
      if (position.includes(entry)){
        i.cool -= 3;
      }
    });

    console.log(i, i.cool)

    if (position.includes("app") ||
        position.includes("business development") ||
        position.includes("sales")) {
          i.cool -= 2;
    }
    console.log(i, i.cool)
    console.log("---------------------------")
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

  console.log(first_page_people)

  console.log(result);
  console.log("done");
}

lists();
