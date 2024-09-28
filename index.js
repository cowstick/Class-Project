/*  Abbreviations Used:
    BMR   Basal Metabolic Rate                    PAL   Physical Activity Level
    TDEE  Total Daily Energy Expenditure          TDCI  Total Daily Caloric Intake
    DEBD  Daily Energy Balance Delta
*/

let energyBalanceArray = [];  // array of objects
let selectedGender = "not selected";
let selectedPal = "not selected";

// define energy balance object constructor
let EnergyBalanceObject = function (pentryDate, pgender, page, pheight, pweight, pbmr, ppal, ptdee, pproteinCalories, pcarboCalories, pfatCalories, ptdci, pdebd) {
    this.entryDate = pentryDate;
    this.gender = pgender;
    this.age = page; 
    this.height = pheight;
    this.weight = pweight;
    this.bmr = pbmr;
    this.pal = ppal;
    this.tdee = ptdee;
    this.proteinCalories = pproteinCalories;
    this.carboCalories = pcarboCalories;
    this.fatCalories = pfatCalories;
    this.tdci = ptdci;
    this.debd = pdebd;
    this.ID = Math.floor(Math.random()*500) + 1;
}

// wait for "DOMContentLoaded" event **************************************************** START
document.addEventListener("DOMContentLoaded", function () {

  // on "save-entry" click, store app data (user input & calculated) ******************** START
  document.getElementById("save-entry").addEventListener("click", function () {

    // selected entry date (col 1|row 1) converted to mm/dd/yyyy format
    let convertedEntryDate = convertDatemmddyyyy(new Date(document.getElementById("selected-entry-date").value));
    
    // selected PAL (col 2|row 1)
    selectedPal = document.getElementById("selected-pal").value;

    // calories consumed on entry date; categorized and entered by user; protein (col 1|row 2), carbohydrates (col 2|row 2), fat (col 3|row 2)
    let enteredProteinCalories = parseInt(document.getElementById("entered-protein-calories").value);
    let enteredCarboCalories = parseInt(document.getElementById("entered-carbo-calories").value);
    let enteredFatCalories = parseInt(document.getElementById("entered-fat-calories").value);
    
    // selected gender (col 1|row 3)
    selectedGender = document.getElementById("selected-gender").value;
    
    // entered age (col 1|row 4), height (col 2|row 4), & weight (col 3|row 4)
    let enteredAge = document.getElementById("entered-age").value;
    let enteredHeight = document.getElementById("entered-height").value;
    let enteredWeight = document.getElementById("entered-weight").value;

    // calculated "energy balance" components (BMR,TDEE, TDCI, DEBD) ********** START
    
    // calculate BMR
    let calculatedBmr = calculateBmr(selectedGender, enteredAge, enteredHeight, enteredWeight);
    
    // calculate TDEE as BMR x PAL
    let calculatedTdee = calculateTdee(calculatedBmr, selectedPal);
    
    // calculate TDCI as protein calories + carbohydrate calories + fat calories
    let calculatedTdci = calculateTdci(enteredProteinCalories, enteredCarboCalories, enteredFatCalories);
console.log("after function call to calculateTdci; before return: calculatedTdci = ", calculatedTdci);

    // calculate DEBD as TDCI - TDEE
    let calculatedDebd = calculateDebd(calculatedTdci, calculatedTdee);
    
    // calculated "energy balance" components (BMR,TDEE, TDCI, DEBD) ********** END

    // push data from user into object **************************************** START 
    energyBalanceArray.push(new EnergyBalanceObject(
      convertedEntryDate,                                   // converted
      selectedGender,                                       // selected
      enteredAge,                                           // entered
      enteredHeight,                                        // entered
      enteredWeight,                                        // entered
      calculatedBmr,                                        // calculated
      selectedPal,                                          // selected
      calculatedTdee,                                       // calculated
      enteredProteinCalories,                               // entered
      enteredCarboCalories,                                 // entered
      enteredFatCalories,                                   // entered
      calculatedTdci,                                       // calculated
      calculatedDebd                                        // calculated    
    ));
    // push data from user into object **************************************** END

    alert(`Your entry has been saved in your log.
To view your entry, click \"Display Log\".
To add another entry, update your information and click \"Save Log Entry\".`);

console.log("eBA: inside 'save-entry' click; after alert()", energyBalanceArray);

  });
  // on "save-entry" click, store app data (user input & calculated) ******************** END

console.log("eBA: outside 'save-entry' click", energyBalanceArray);
  
  // detect link click event via "class"; when detected dynamic grid build starts ******* START
  let elementsWithTheClass = document.querySelectorAll(".display-log-link");
  elementsWithTheClass.forEach(function(element) {
    element.addEventListener("click", function(event) {
      
      console.log("link with class of 'display-log-link' clicked");
      
      displayLogContent();
      
    });
  });
  // detect link click event via "class"; when detected dynamic grid build starts ******* END

});  
// wait for "DOMContentLoaded" event **************************************************** END


console.log("hey I am outside 'wait for DOM load'");
console.log("eBA after DOM loaded (line ??):", energyBalanceArray);

// function displayLogContent *********************************************************** START
function displayLogContent() {

  document.getElementById("log-grid").innerHTML = "";
  let logGrid = document.getElementById("log-grid");
  
  // create column header row (grid row 1 | col 1-4)
  let headerRow = document.createElement('div');
  headerRow.className = 'ui-grid-c';
  headerRow.innerHTML = '<div class="ui-block-a"><strong>Entry Date</strong></div>' +
  '<div class="ui-block-b"><strong>TDEE</strong></div>' +
  '<div class="ui-block-c"><strong>TDCI</strong></div>' +
  '<div class="ui-block-d"><strong>DEBD</strong></div>';
  
  // append newly created header row to element with id="log-grid"
  logGrid.appendChild(headerRow);

console.log("eBA after header row appended & before 'energyBalanceArray.forEach' : ", energyBalanceArray);

  // Iterate through energyBalanceArray; create new row & append ************** START
  energyBalanceArray.forEach(function(ebaObject) {
    let dataRow = document.createElement('div');
   
    dataRow.className = 'ui-grid-c';


console.log("inside'energyBalanceArray.forEach'; before objects of ebaObject are used: energyBalanceArray[0].tdee = ", energyBalanceArray[0].tdee);
console.log("inside'energyBalanceArray.forEach'; before objects of ebaObject are used: energyBalanceArray[0].tdee.value = ", energyBalanceArray[0].tdee.value);

console.log("inside'energyBalanceArray.forEach'; before objects of ebaObject are used: energyBalanceArray[0].tdci = ", energyBalanceArray[0].tdci);
console.log("inside'energyBalanceArray.forEach'; before objects of ebaObject are used: energyBalanceArray[0].tdci.value = ", energyBalanceArray[0].tdci.value);

console.log("inside'energyBalanceArray.forEach'; before objects of ebaObject are used: ebaObject = ", ebaObject);
console.log("inside'energyBalanceArray.forEach'; before objects of ebaObject are used: ebaObject.tdic = ", ebaObject.tdic);
console.log("inside'energyBalanceArray.forEach'; before objects of ebaObject are used: ebaObject.tdee = ", ebaObject.tdee);

  
    // Create a link with entryDate as parameter
    let link = document.createElement('a');
    link.href = '#display-entry';
    link.className = 'entry-date';
    link.setAttribute('data-entrydate', ebaObject.entryDate);
    link.textContent = ebaObject.entryDate;

console.log("inside'energyBalanceArray.forEach'; after link created before link appended: link = ", link);

    // create column cell for entryDate; object value & link to #display-entry
    let cellA = document.createElement('div');
    cellA.className = 'ui-block-a';
    cellA.appendChild(link);
    
    // create column cell for tdee; object value
    let cellB = document.createElement('div');
    cellB.className = 'ui-block-b';
    cellB.textContent = ebaObject.tdee;
    
    // create column cell for tdic; object value
    let cellC = document.createElement('div');
    cellC.className = 'ui-block-c';
    
console.log("inside'energyBalanceArray.forEach'; inside create tdic cell: ebaObject.tdic = ", ebaObject.tdic);

    cellC.textContent = ebaObject.tdic;

    // create column cell for debd; object value
    let cellD = document.createElement('div');
    cellD.className = 'ui-block-d';
    cellD.textContent = ebaObject.debd;

    // put cells together to form row
    dataRow.appendChild(cellA);
    dataRow.appendChild(cellB);
    dataRow.appendChild(cellC);
    dataRow.appendChild(cellD);
    
    // append data row
    logGrid.appendChild(dataRow);
    
    console.log("inside but bottom of 'energyBalanceArray.forEach': link = ", link);

    
  });
  // Iterate through energyBalanceArray; create new row & append ************** END




/*
  // trap "entryDate" click on Display Log page ******************************* START
  link.addEventListener('click', function(event) {
    
console.log("eBA after header row appended & before 'energyBalanceArray.forEach' : ", energyBalanceArray);

    localStorage.setItem("entryDate", ebaObject.entryDate);
    displayEntryDetails(); // redirect to the "Display Specified Log Entry" page 
  });
  // trap "entryDate" click on Display Log page ******************************* END
 */
 
}
// function displayLogContent *********************************************************** END

// displayEntryDetails: redirect to "Display Specified Log Entry" page ****************** START
function displayEntryDetails() {
  // Redirect to Display Detailed Data Page
  location.hash = "display-entry";
}
// displayEntryDetails: redirect to "Display Specified Log Entry" page ****************** END

// function convertDatemmddyyyy ********************************************************* START
// convert date format; from native system date format to mm/dd/yyyy format
function convertDatemmddyyyy(dateObjToConvert) {
  yyyy = dateObjToConvert.getFullYear();
  let mm = dateObjToConvert.getMonth() + 1;
  let dd = dateObjToConvert.getDate() + 1;
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return (mm + '/' + dd + '/' + yyyy);
}
// function convertDatemmddyyyy ********************************************************* END

// function calculateBmr **************************************************************** START
/* BMR equations
   for woman:  665.00 + (4.35 × weight) + (4.7 × height) - (4.70 × age)			
   for man:    66.47 + (6.24 × weight) + (12.7 × height) - (6.75 × age)
*/
function calculateBmr(gender, age, height, weight) {
  let bmr = 0;
  if (gender === "woman") {
    bmr = 665.00 + (4.35 * weight) + (4.70 * height) - (4.70 * age);
  } else if (gender === "man") {
    bmr = 66.47 + (6.24 * weight) + (12.70 * height) - (6.75 * age);
  } else {
    bmr = "unable to calculate";
  }
  return bmr;
}
// function calculateBmr **************************************************************** END

// function calculateTdci *************************************************************** START
// calculate TDCI as protein calories + carbohydrate calories + fat calories
function calculateTdci(proteinCalories, carboCalories, fatCalories) {
  
  let tdci = proteinCalories + carboCalories + fatCalories;
console.log("inside calculateTdci function; before return: tdci = ", tdci);

  // let tdci = parseInt(proteinCalories) + parseInt(carboCalories) + parseInt(fatCalories);
  return tdci;
}
// function calculateTdci *************************************************************** END

// function calculateTdee *************************************************************** START
// calculate TDEE as BMR x PAL
function calculateTdee(bmr, pal) {
  let tdee = bmr * pal;
  return tdee;
}
// function calculateTdee *************************************************************** END

// function calculateDebd *************************************************************** START
// calculate DEBD as TDCI - TDEE
function calculateDebd(tdci, tdee) {
  let debd = tdci - tdee;
  return debd;
}
// function calculateDebd *************************************************************** END