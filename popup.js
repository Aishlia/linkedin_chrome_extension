function save_company() {
	var request = new XMLHttpRequest();

	request.open('POST', 'http://127.0.0.1:8000/company/', true);

	request.onload = function () {
		var data = JSON.parse(this.response);
		alert(request.status);
		console.log(request.status)
	}
	request.send();
}

document.getElementById('JuliaSucks').addEventListener('click', save_company);
