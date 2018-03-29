info = {};

// function send_info(name, company, email) {
//   var request = new XMLHttpRequest();
//
//   name = "name=" + name;
//   company = "&company=" + company;
//   // location = "&location=" + location;
//   // title = "&title=" + title;
//   // website = "&website=" + website;
//   email = "&email=" + email;
//
//   request.open(
//     "POST", "http://127.0.0.1:8000/contacts/?" + name + company + email, true
//   );
//
//   request.setRequestHeader('Content-Type', 'application/javascript')
//   request.send();
// }
//
// send_info("Edyarbsdfgds", "ZZZresdfgdsa", "asdf@adfgdfgsdf.com");


// Adds Properties and Keys to Info Object
function addInfo(type, information) {
  info[type] = information;
}

// Listener Allows For Communication Between Content and Background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  // Use addInfo to Populate Object
  for (var property in request) {
    addInfo(property, request[property]);
  }

  // Returns Current Object
  sendResponse({ response: info });

});

// Display Object of Details
function display_info() {
  return info;
}

function display(data){
  alert(data);
}

chrome.browserAction.onClicked.addListener(function(tab) { alert('icon clicked')});
