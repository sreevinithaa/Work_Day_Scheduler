var currentDay = $("#currentDay");
var dayplannertable = $("#dayplaner");
var today = moment();
const starthour = 9;
const endhour = 17;
var currenthour = 0;

function CurrentDayUpdate() {
  currenthour = today.format("HH");
  loadTable();
  setInterval(function () {
    currentDay.text(today.format("MMM Do, YYYY"));
    if (today.format("HH") != currenthour) {
      currenthour = today.format("HH");
      loadTable();
    }
  }, 1000);

  return;
}
function CreatRow(i) {
  var calendertime = moment(`${i}:00`, "HH:mm");
  var plan = GetData(calendertime.format("h:mm a"));

  var tr = $("<tr>");
  var td1 = $("<td>").addClass("column-1").text(calendertime.format("h:mm a"));

  var td2 = $("<td>").addClass("column-2").text(plan);
  console.log("i= " + i);
  console.log("currenthour= " + currenthour);
  if (i == currenthour) {
    td2.addClass("present");
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

  button.text("Save");
  td3.append(button);

  button.attr("disabled", "disabled");
  td3.addClass("column-3");
  tr.append(td1, td2, td3);

  return tr;
}
function loadTable() {
  $("#dayplaner tr").remove();

  for (var i = starthour; i <= endhour; i++) {
    var tr = CreatRow(i);
    dayplannertable.append(tr);
  }
  return;
}
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
function InputTextChange(event) {
  var plan = $(event.target).val();
  var datetime = $(event.target).parent().siblings(".column-1").text();
  SaveData(datetime, plan);
}
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
function isEmpty(value) {
  return value == undefined || value == null || value.length === 0;
}
function SaveData(datetime, description) {
  console.log("datett : " + datetime);
  var plan = localStorage.getItem(datetime);

  if (isEmpty(plan)) {
    localStorage.setItem(datetime, description);
  } else {
    localStorage.setItem(datetime, plan + " " + description);
  }
  loadTable();
  return;
}
function GetData(datetime) {
  var plan = localStorage.getItem(datetime);
  return plan;
}

CurrentDayUpdate();
