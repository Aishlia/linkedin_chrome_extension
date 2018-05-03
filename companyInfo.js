employee_countz = ' '
employee_linkz = ' '
company_websitez = ' '
company_discriptionz = ' '

let a = document.getElementsByTagName("a");

for (elt of a) {
    if (elt.innerHTML.includes("employees on LinkedIn")) {
        employee_countz = elt.innerHTML;
        employee_linkz = elt.href;
        break;
    }
}

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
