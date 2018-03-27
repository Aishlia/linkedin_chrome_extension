// Access Info in Background
back = chrome.extension.getBackgroundPage();

// Set Initial Info
function setInfo(info) {
  for (var data in info) {
    if (info[data]){
      document.getElementById('ed_' + String(data)).value = info[data];
    }
  }
}

// Triggers Function to Get Url From Company Page
function get_user_url(){
  chrome.tabs.executeScript({
    file: 'get_url.js'
  });

  function timer(){
    contact = back.display_info();
    setInfo(contact);
  }

  setTimeout(timer, 3000);
}

function get_user_info() {
  execute_info = chrome.tabs.executeScript({
    file: 'get_user_info.js'
  });

  function timer(){
    contact = back.display_info();
    return setInfo(contact);
  }

  setTimeout(timer, 1000);
  // return false;
}

// Might Use this Code to Detect Current Page and Act Accordingly

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
  var url = tabs[0].url;
  // back.display(url);
  contact = back.display_info();
  return setInfo(contact);
});

function searchUserInfo(){
  chrome.tabs.executeScript({
    file: 'search_company.js'
  });
};

function filterUserInfo(){
  chrome.tabs.executeScript({
    file: 'filter_people.js'
  });
};


document.getElementById('ed_saveContact').addEventListener('click', get_user_info);
document.getElementById('ed_findContact').addEventListener('click', get_user_url);
document.getElementById('ed_searchContact').addEventListener('click', searchUserInfo);
document.getElementById('ed_filterContact').addEventListener('click', filterUserInfo);
