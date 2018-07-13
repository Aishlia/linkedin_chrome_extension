employee_countz = ' '
employee_linkz = ' '
company_websitez = ' '
company_discriptionz = ' '

const website_url_selector = '#content-main > div.header-wrapper > header > div.entity-card.company.banner > div.right.actions-container > div.meta-links > div:nth-child(1)'

let a = document.getElementsByTagName("a");

for (elt of a) {
    if (elt.innerHTML.includes("employees on LinkedIn")) {
        employee_countz = elt.innerHTML;
        employee_linkz = elt.href;
        break;
    }
}

// console.log("oasdjflkjsd")
// console.log("blarhhh", document.querySelector(website_url_selector).childNode[0].href)

for (elt of a) {
    if (elt.innerHTML.includes("Website")) {
        company_websitez = elt.href;
        break;
    }
}

for (elt of a) {
    if (elt.classList.contains("topcard-see-more-link")) {
        elt.click();
        let p = document.getElementsByTagName("p");
            for (elt_p of p) {
                if (elt_p.classList.contains("topcard-extended-description-modal-content-text")) {
                    company_discriptionz = String(elt_p.innerHTML);
                }
            }
    }
}

console.log(employee_countz)
console.log(employee_linkz)
console.log(company_websitez)
console.log(company_discriptionz)
// alert(employee_countz)
// alert(employee_linkz)
// alert(company_websitez)
// alert(company_discriptionz)
