var result = [];

//Goes off Indian Cast System, If you don't know it, pick up a fucking book 
const untouchable = [
'customer', 'human', 'affairs', 'tax', 'finance', 'accounting', 'marketing', 'software', 'engineer',
 'developer', 'quality', 'communications', 'intern'
];

// Slighty Touchable - You still shouldn't touch them though
const sudra = [
'app', 'development', 'sales'
];

// StopGap Words Found in Title - Adding to This List will Remove the Word From Titles
const stopgap_words = ['of', 'and', 'for', 'at', 'to', 'the'];

const custom_scores = [
  {
    'position': 'cto',
    'less_than_50': 8,
    'greater_than_50_less_than_1000': 6,
    'greater_than_1000_employees': -3
  },
  {
    'position': 'iot',
    'less_than_50': 3,
    'greater_than_50_less_than_1000': 3,
    'greater_than_1000_employees': 3
  },
  {
    'position': 'ceo',
    'less_than_50': 6,
    'greater_than_50_less_than_1000': 4,
    'greater_than_1000_employees': -5
  },
  {
    'position': 'founder',
    'less_than_50': 6,
    'greater_than_50_less_than_1000': 4,
    'greater_than_1000_employees': -5
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
  }
]

// Pulls List of Potential Leads From the Page
function save_potential_leads(){
  //Setup Vars
  var potential_leads = [];
  // Access Dom and Pull List of Potential Leads
  let initial_data = document.getElementById('results-list').getElementsByClassName("result");

  for (elt of initial_data){
    //Scrape Variables off Page
    name = elt.getElementsByClassName("name-link")[0].innerHTML;
    position = elt.getElementsByClassName("info")[0].getElementsByTagName('p')[0].innerHTML;
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
  console.log(diff);
  return diff;
}

function calculate_cool_score(data, company_employee_count){
  // Call Function to Turn Title Into Keywords
  position = clean_position_array(data.position);

  // Get Rid of those Filthy Street Cleaners
  untouchable.forEach(function(entry) {
    // Looks For Overlap Between Untouchables and Title Keywords
    if (is_in_array(entry, position)){
      data.cool -= 3;
    }
  });

  // Get Rid of the Commoners
  sudra.forEach(function(entry){
    // Looks For Overlap Between Sudra and Title Keywords
    if (is_in_array(entry, position)){
      data.cool -= 2;
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

  // pulling first page of people
  let potential_leads = save_potential_leads();

  for (i of potential_leads) {
    i = calculate_cool_score(i, number_of_employees);
    console.log(i, i.cool);
    console.log("---------------------------")
  }

  // Show Only Relevant Results
  for (i of potential_leads) {
    if (i.cool > 1) {
      result.push(i);
    }
  }

  // sort
  len = result.length - 1;
  for (i=0; i<1000; i++) {
    if (result[i%len].cool < result[i%len+1].cool) {
      temp = result[i%len];
      result[i%len] = result[i%len+1];
      result[i%len+1] = temp;
    }
  }

  console.log(potential_leads);
  console.log(result);
  console.log("done");
}

lists();
