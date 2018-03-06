// Access Info in Background
back = chrome.extension.getBackgroundPage();

// Triggers Function to Get Url From Company Page
function get_user_url(){
  chrome.tabs.executeScript({
    file: 'get_url.js'
  });
}

// Triggers Function to Get Info From Contact Page
function get_user_info() {
  execute_info = chrome.tabs.executeScript({
    file: 'get_user_info.js'
  });
}

// Might Use this Code to Detect Current Page and Act Accordingly

// chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//   var url = tabs[0].url;
//   back.display_info(url);
// });

document.getElementById('saveContact').addEventListener('click', get_user_info);
document.getElementById('findContact').addEventListener('click', get_user_url);
