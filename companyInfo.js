let a = document.getElementsByTagName("a");

for (elt of a) {
    if (elt.innerHTML.includes("employees on LinkedIn")) {
        employee_count = elt.innerHTML
        employee_link = elt.href
        break;
    }
}

company_website = ''
for (elt of a) {
    if (elt.innerHTML.includes("Website")) {
        company_website = elt.href
        break;
    }
}

company_discription = ''
for (elt of a) {
    if (elt.classList.contains("topcard-see-more-link")) {
        elt.click();
        let p = document.getElementsByTagName("p");
            for (elt_p of p) {
                if (elt_p.classList.contains("topcard-extended-description-modal-content-text")) {
                    company_discription = String(elt_p.innerHTML)
                }
            }
    }
}

console.log(employee_count)
console.log(employee_link)
console.log(company_website)
console.log(company_discription)
alert(employee_count)
alert(employee_link)
alert(company_website)
alert(company_discription)
