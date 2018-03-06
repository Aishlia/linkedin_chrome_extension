info = {
  'name':'',
  'title':'',
  'location_of_company':'',
  'company_name':'',
  'linkedin': '',
  'company_url':'',
  'email':''
}

function addInfo(type, information) {
  info.type = information;
  alert(JSON.stringify(info))
}

function display_info() {
  return info.name + info.company_url;
}

