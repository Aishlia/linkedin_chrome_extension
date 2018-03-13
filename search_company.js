function switch_page() {
  console.log(location)
  url = location.href
  // new_location = url.replace("&count=25", "&count=300")
  new_location = location.href + "&count=300"
  // url.slice(url.indexOf("&count"), url.indexOf("&count")+9)
  location = new_location;
  // location = location + '&count=300'
  // location = location'&jobTitleEntities=iot'+'&facet.SE=8&facet.SE=7&facet.SE=6'; // 6-Director 8-CXO 7-VP
  // setTimeout(lists, 3000);
}

switch_page();
