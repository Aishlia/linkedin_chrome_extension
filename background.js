info = {};

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

// Display Whatever Data You Want
function display_info(data) {
  alert(data);
}
