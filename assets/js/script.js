var currentDay = $('#currentDay');
var dayplannertable = $('#dayplaner');
var today=moment();
const starthour=9;
const endhour=17;
var currenthour=0;
function CurrentDayUpdate()
{
    currenthour=today.format("hh");
    currentDay.text(today.format("MMM Do, YYYY"))
    console.log(currenthour);
    loadTable();
    return;
}
function loadTable()
{
for(var i=starthour;i<=endhour;i++)
{

    // /moment('09:00','h:mm a').format('h:mm a');
    var calendertime=moment(`${i}:00`,'hh:mm');
    console.log(calendertime.format('MMMM Do YYYY, h:mm:ss a'))
    var tr=$('<tr>');
    var td1=$('<td>');
    td1.addClass('column-1');
    var td2=$('<td>');
    td2.addClass('column-2');
    if(i==currenthour)
    {
        td2.addClass('present');
    }
    else if(i<currenthour)
    {
        td2.addClass('past');
    }
    else{
        td2.addClass('future');
    }
    td1.text(calendertime.format('h:mm a'));
    var td3=$('<td>');
    var button=$('<button>');
    button.addClass('btnsave');
    var svg=$('<svg>');
    svg.attr('xmlns', 'http://www.w3.org/2000/svg');
    svg.attr('width', '16');
    svg.attr('height', '16');
    svg.attr('fill', 'currentColor');
    svg.attr('class', 'bi bi-save');
    svg.attr('viewBox', '0 0 16 16');
    var path=$('<path>');
    path.attr('d', 'M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z');
    svg.append(path);
    //button.append(svg);
    button.text("Save")
    td3.append(button);
    tr.append(td1,td2,td3);
    dayplannertable.append(tr);
}
    return;
}
CurrentDayUpdate();