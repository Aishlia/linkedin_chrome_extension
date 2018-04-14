var total_results;

let span = document.getElementsByTagName("span");
for (elt of span) {
    // console.log(elt)
    if (elt.classList.contains("spotlight-result-count")) {
        total_results = elt.innerHTML
        break
    }
}

current_url = location.toString()

new_url = current_url.replace("&count=25", "&count="+total_results)

location = new_url
