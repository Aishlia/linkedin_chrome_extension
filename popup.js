// function save_company() {
// 	var request = new XMLHttpRequest();
//
// 	request.open('POST', 'http://127.0.0.1:8000/company/', true);
//
// 	request.onload = function () {
// 		var data = JSON.parse(this.response);
// 		alert(request.status);
// 		console.log(request.status)
// 	}
// 	request.send();
// }

function get_user_info() {
  back = chrome.extension.getBackgroundPage()
  back.addInfo('name', 'Eduardo Morales')
  chrome.tabs.executeScript({
    file: 'get_user_info.js'
  });
}



document.getElementById('saveContact').addEventListener('click', get_user_info);
