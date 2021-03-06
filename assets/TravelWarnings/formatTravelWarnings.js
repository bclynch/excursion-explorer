//Taking raw array of JSON objs and format into obj for easier search/return

var fs = require('fs');
var date = 'Oct_16';
var fileName = `./travelWarnings${date}.json`;
var file = require(fileName);

//Clean strings of leftover html
function stripHTML(str) {
  var HTMLRegex = /(<([^>]+)>)/ig;
  var nbspRegex = /&nbsp;/g;
  var spacesRegex = /\s\s+/g;
  //Would like to make use of the p (paragraph) tags that are in the html to distinguish break needs
  //Will be replacing both the p and /p with stars to split our strings into manageable parts
  var pRegex = /(<p>|<\/p>)/g;
  return str.replace(pRegex, '*****').replace(HTMLRegex, ' ').replace(nbspRegex, ' ').replace(spacesRegex, ' ').split('*****').filter(function(item) {return item !== ''}).map(function(item){return item.trim()});
}

var warningsObj = {};

for(var i =0; i < file.length; i++) {
  warningsObj[file[i].iso_code] = {
    name: stripHTML(file[i].geopoliticalarea),
    transport: stripHTML(file[i].travel_transportation),
    health: stripHTML(file[i].health),
    law: stripHTML(file[i].local_laws_and_special_circumstances),
    safety: stripHTML(file[i].safety_and_security),
    entry: stripHTML(file[i].entry_exit_requirements),
    description: stripHTML(file[i].destination_description),
    embassy: stripHTML(file[i].travel_embassyAndConsulate),
    updated: stripHTML(file[i].last_update_date)
  }
}

fs.writeFile(`./assets/travelWarnings/formattedTravelWarnings${date}.json`, JSON.stringify(warningsObj, null, 2) , 'utf-8', function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
