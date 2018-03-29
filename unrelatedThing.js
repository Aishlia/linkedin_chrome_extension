var people = []

let this_thingzzz = document.getElementsByClassName("new-speaker-text");
for (elt of this_thingzzz) {
  new_person = {
    name: '',
    company: '',
    position: ''
  }
  for (elt_a of elt.getElementsByTagName("p")) {
    if (elt_a.classList.contains("new-speaker-employer")) {
      new_person.company = elt_a.innerHTML.slice(7, -7)
    } else if (elt_a.classList.contains("new-speaker-occupation")) {
      new_person.position = elt_a.innerHTML
    } else if (elt_a.classList.contains("new-speaker-name")) {
      new_person.name = elt_a.innerHTML.slice(5, -3)
    }
  }
  people.push(new_person);
}

console.log(people)
