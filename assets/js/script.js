var currentDay = $("#currentDay");
var dayplannertable = $("#dayplaner");
var today = moment();
const starthour = 9;
const endhour = 17;
var currenthour = 0;


//Set current date and update every 10 min if hour increase then table will get re-load again.
function CurrentDayUpdate() {
  currenthour = today.format("HH");
  loadTable();
  currentDay.text(today.format("MMM Do, YYYY"));
  setInterval(function () {
    currentDay.text(today.format("MMM Do, YYYY"));
    if (today.format("HH") != currenthour) {
      currenthour = today.format("HH");
      loadTable();
    }
  }, 600000);

  return;
}

//creating a row every hour
function CreatRow(i) {
  var calendertime = moment(`${i}:00`, "HH:mm");

  //retrieve data from local storage
  var plan = GetData(calendertime.format("h:mm a"));

  var tr = $("<tr>");
  var td1 = $("<td>").addClass("column-1").text(calendertime.format("h:mm a"));

  var td2 = $("<td>").addClass("column-2").text(plan);
 

  //Check the row is future,past or present.Only can add plan through present and future
  if (i == currenthour) {
    td2.addClass("present");
    td2.on("click", ColumnClick);
  } else if (i < currenthour) {
    td2.addClass("past");
  } else {
    td2.addClass("future");
    td2.on("click", ColumnClick);
  }

  var td3 = $("<td>");
  var button = $("<button>");
  button.addClass("btnsave").attr("data-time", calendertime.format("h:mm a"));
  button.on("click", SaveButtonClick);

  //adding save icon to the button
  var icon = $("<i>").attr("class", "fas fa-save fa-lg");
  
  button.append(icon);
  td3.append(button);

  button.attr("disabled", "disabled");
  td3.addClass("column-3");
  tr.append(td1, td2, td3);
  
  return tr;
}

//Generate table
function loadTable() {
  $("#dayplaner tr").remove();

  for (var i = starthour; i <= endhour; i++) {
    var tr = CreatRow(i);
    dayplannertable.append(tr);
  }
  return;
}

//this function will get call when column is clicked to add plan
function ColumnClick(event) {
  var nexttd = $(event.target).siblings(".column-3");
  var tds = $(event.target).children();

  if (tds.length == 0) {
    var input = $("<input>").attr("type", "text").attr("class", "form-control");
    var button = nexttd.children();
    button.removeAttr("disabled");
    $(event.target).append(input);
    input.on("change", InputTextChange);
    input.focus();
  }
}

//when text change is triggered this method will get called
function InputTextChange(event) {
  var plan = $(event.target).val();
  var datetime = $(event.target).parent().siblings(".column-1").text();
  SaveData(datetime, plan);
}
//this method will get call when save button click
function SaveButtonClick(event) {
  var button = $(event.target);
  var datetime = button.attr("data-time");
  var nexttd = $(event.target).parent().prev();
  var textinput = nexttd.children();
  if (isEmpty(textinput.val())) {
  } else {
    SaveData(datetime, textinput.val());
  }

  return;
}

//helper method to check empty
function isEmpty(value) {
  return value == undefined || value == null || value.length === 0;
}

//Save data into local storage
function SaveData(datetime, description) {
 
  var plan = localStorage.getItem(datetime);

  if (isEmpty(plan)) {
    localStorage.setItem(datetime, description);
  } else {
    localStorage.setItem(datetime, plan + " " + description);
  }
  loadTable();
  return;
}

//get data from local storage
function GetData(datetime) {
  var plan = localStorage.getItem(datetime);
  return plan;
}

CurrentDayUpdate();
