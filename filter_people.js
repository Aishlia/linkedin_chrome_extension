var result = [];
var repeat_big = 0;
var repeat_medium = 0;

//Goes off Indian caste System, If you don't know it, pick up a fucking book
const untouchable = [
  'affairs', 'tax', 'finance', 'accounting', 'marketing', 'software', 'communications', 'intern', 'investor',
  'assistant', 'taxes', 'relations', 'creative', 'fp&a', 'safety', 'hr', 'recruiter', 'pr', 'talent', 'sales', 'business',
  'supply', 'estate', 'legal', 'payroll', 'risk', 'fellow', 'sourcing', 'human', 'treasurer', 'compliance', 'technician', 'packaging'
]; // investor, assistant

// Slighty Touchable - You still shouldn't touch them though
const sudra = [
  'app'
];

// Desireables get a +2 Boost
const kshatriyas = [
  'engineering', 'electronics', 'product', 'development'
];

// StopGap Words Found in Title - Adding to This List will Remove the Word From Titles
const stopgap_words = ['of', 'and', 'for', 'at', 'to', 'the'];

// hierarchy of fish
const big_fish = ['cto','ceo','founder','owner','president', 'director'];

const medium_fish = ['vice','v.p.','vp','senior','sr.'];
// const medium_fish = [];

const custom_scores = [
  {
    'position': 'cto',
    'less_than_50': 8,
    'greater_than_50_less_than_1000': 6,
    'greater_than_1000_employees': 3
  },
  {
    'position': 'iot',
    'less_than_50': 5,
    'greater_than_50_less_than_1000': 5,
    'greater_than_1000_employees': 5
  },
  {
    'position': 'ceo',
    'less_than_50': 6,
    'greater_than_50_less_than_1000': 4,
    'greater_than_1000_employees': 1
  },
  {
    'position': 'coo',
    'less_than_50': 5,
    'greater_than_50_less_than_1000': 3,
    'greater_than_1000_employees': 2
  },
  {
    'position': 'founder',
    'less_than_50': 6,
    'greater_than_50_less_than_1000': 4,
    'greater_than_1000_employees': -5
  },
  {
    'position': 'owner',
    'less_than_50': 6,
    'greater_than_50_less_than_1000': 3,
    'greater_than_1000_employees': -8
  },
  {
    'position': 'director',
    'less_than_50': 4,
    'greater_than_50_less_than_1000': 4,
    'greater_than_1000_employees': 4
  },
  {
    'position': 'president',
    'less_than_50': 6,
    'greater_than_50_less_than_1000': 4,
    'greater_than_1000_employees': -5
  },
  {
    'position': 'vice',
    'less_than_50': -2,
    'greater_than_50_less_than_1000': 0,
    'greater_than_1000_employees': 9
  },
  {
    'position': 'chairman',
    'less_than_50': -5,
    'greater_than_50_less_than_1000': -5,
    'greater_than_1000_employees': -5
  },
  {
    'position': 'v.p.',
    'less_than_50': 4,
    'greater_than_50_less_than_1000': 4,
    'greater_than_1000_employees': 4
  },
  {
    'position': 'vp',
    'less_than_50': 4,
    'greater_than_50_less_than_1000': 4,
    'greater_than_1000_employees': 4
  },
  {
    'position': 'senior',
    'less_than_50': 0.5,
    'greater_than_50_less_than_1000': 0.5,
    'greater_than_1000_employees': 0.5
  },
  {
    'position': 'sr.',
    'less_than_50': 0.5,
    'greater_than_50_less_than_1000': 0.5,
    'greater_than_1000_employees': 0.5
  },
  {
    'position': 'manager',
    'less_than_50': .5,
    'greater_than_50_less_than_1000': 0.5,
    'greater_than_1000_employees': 0.5
  }
]

function rid_of_amp(name) {
  new_name = name
  if (name.includes("&amp;")) {
    new_name = name.replace(/&amp;/g, "&");
  }
  return new_name
}

// Pulls List of Potential Leads From the Page
function save_potential_leads(){
  //Setup Vars
  var potential_leads = [];
  // Access Dom and Pull List of Potential Leads
  let initial_data = document.getElementById('results-list').getElementsByClassName("result");

  for (elt of initial_data){
    //Scrape Variables off Page
    name = rid_of_amp(elt.getElementsByClassName("name-link")[0].innerHTML);
    position = rid_of_amp(elt.getElementsByClassName("info")[0].getElementsByTagName('p')[0].innerHTML);
    url = elt.getElementsByClassName("image-wrapper")[0].href;

    info = {
      name: name,
      position: position,
      url: url,
      cool: 0
    };

    potential_leads.push(info);
  }
  return potential_leads;
}

// Takes Position, Cleans it, and Returns and Array of Keywords
function clean_position_array(position){
  position = position.toLowerCase();
  position = position.replace(/[-\/\\^$*+?,()|[\]{}]/g, ' ').replace(/&amp;/g,' ');
  //Remove Extra Spaces
  let clean_position = position.replace(/\s+/g,' ').trim();

  //Convert to Array
  var initial_array = clean_position.split(" ").map(String);

  //Remove Stop Gap Words and Return New Array
  Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
  };

  diff = initial_array.diff(stopgap_words);

  repeat_big = 0;
  repeat_medium = 0;

  for (var i = 0; i < diff.length; i++) {
    if (is_in_array(diff[i], big_fish)) {
      // console.log(diff[i])
      repeat_big += 1;
    } else if (is_in_array(diff[i], medium_fish)) {
      repeat_medium += 1;
    }
    if (repeat_big > 1 || repeat_medium > 1) {
      diff[i] = '---';
    }
  }

  return diff;
}

function calculate_cool_score(data, company_employee_count){
  // Call Function to Turn Title Into Keywords
  position = clean_position_array(data.position);

  // Get Rid of those Filthy Street Cleaners
  untouchable.forEach(function(entry) {
    // Looks For Overlap Between Untouchables and Title Keywords
    if (is_in_array(entry, position)){
      data.cool -= 5;
    }
  });

  // Get Rid of the Commoners
  sudra.forEach(function(entry){
    // Looks For Overlap Between Sudra and Title Keywords
    if (is_in_array(entry, position)){
      data.cool -= 2;
    }
  });

  // Boost Some Keywords
  kshatriyas.forEach(function(entry){
    // Looks For Overlap Between Sudra and Title Keywords
    if (is_in_array(entry, position)){
      data.cool += 2;
    }
  });

  // Under Employee Special Logic
  for(var a = 0; a < custom_scores.length; a++){
    // See if Position in Array Matches Keyword in Title
    if (is_in_array(custom_scores[a].position, position)){
      // Special Logic for <= 50 Employees
      if (company_employee_count <= 50){
        data.cool += custom_scores[a].less_than_50;
      }
      // Special Logic for > 50 and < 1000 Employees
      else if (company_employee_count > 50 && company_employee_count <= 1000){
        data.cool += custom_scores[a].greater_than_50_less_than_1000;
      }
      // Special Logic for > 1000 Employees
      else if(company_employee_count > 1000){
        data.cool += custom_scores[a].greater_than_1000_employees;
      }
    }
  }
  return data;
}

// Checks Whether a Value is in a Given Array and Returns True or False
function is_in_array(s,your_array) {
  // console.log(s, your_array, "Thing");
  for (var i = 0; i < your_array.length; i++) {
      if (your_array[i].toLowerCase() === s.toLowerCase()) return true;
  }
  return false;
}

function lists(){
  // Number of people in the company (A Better Way)
  string_of_employees = document.getElementsByClassName('page-heading')[0].innerHTML;
  var number = string_of_employees.substring(string_of_employees.length - 10).match(/\d/g);
  number_of_employees = number.join("");

  console.log(number_of_employees);

  // pulling first page of people
  let potential_leads = save_potential_leads();

  for (i of potential_leads) {
    i = calculate_cool_score(i, number_of_employees);
    // console.log(i, i.cool);
    // console.log("---------------------------")
  }

  // Show Only Relevant Results
  for (i of potential_leads) {
    if (i.cool > 1) {
      result.push(i);
    }
  }

  if (result.length == 0) {
    alert("none cool enough")
  } else if (result.length > 1) {
    // sort
    len = result.length - 1;
    for (i=0; i<1000000; i++) {
      if (result[i%len].cool < result[i%len+1].cool) {
        temp = result[i%len];
        result[i%len] = result[i%len+1];
        result[i%len+1] = temp;
      }
    }
  }

  console.log(potential_leads);
  console.log(result);
  console.log("done");
}

lists();
