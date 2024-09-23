var data = readData();
var $newEventButton = document.querySelector('#new-event');
var $eventCreator = document.querySelector('#event-creator');
var $form = document.querySelector('#form-modal');
var $tbody = document.querySelector('tbody');
var $cancelButton = document.querySelector('#cancel');
var $changeDay = document.querySelector('#change-day');
var $day = document.querySelector('#day-of-week');
var $info = document.querySelector('#event-info');
var $time = document.querySelector('#event-time');
if (!$day)
    throw new Error('$day query failed');
if (!$info)
    throw new Error('info  query failed');
if (!$time)
    throw new Error('$time  query failed');
if (!$form)
    throw new Error('$form query failed');
if (!$newEventButton)
    throw new Error('$newEventButton query failed');
if (!$eventCreator)
    throw new Error('$eventCreator query failed');
if (!$tbody)
    throw new Error('$tbody query failed!');
if (!$cancelButton)
    throw new Error('$cancelButton failed');
if (!$changeDay)
    throw new Error('$$changeDay query failed');
$newEventButton.addEventListener('click', function () {
    $eventCreator.showModal();
});
function writeData() {
    var jsonPlannerData = JSON.stringify(data);
    localStorage.setItem('plannerData', jsonPlannerData);
}
function readData() {
    var jsonPlannerData = localStorage.getItem('plannerData');
    if (!jsonPlannerData) {
        return {
            nextRowId: 0,
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
            Sunday: [],
        };
    }
    return JSON.parse(jsonPlannerData);
}
$form.addEventListener('submit', function (event) {
    event.preventDefault();
    var $formElements = $form.elements;
    var formData = {
        day: $formElements['day-of-week'].value,
        time: $formElements['event-time'].value,
        info: $formElements['event-info'].value,
    };
    var dayInfo = {
        rowId: data.nextRowId,
        info: formData.info,
        time: formData.time,
    };
    var $tr = renderRow(dayInfo);
    $tbody.prepend($tr);
    data.nextRowId++;
    data[formData.day].push(dayInfo);
    $eventCreator.close();
    writeData();
    $form.reset();
});
function renderRow(formData) {
    var $tr = document.createElement('tr');
    $tr.setAttribute('id', "".concat(formData.rowId));
    var $tdTime = document.createElement('td');
    var $tdEvent = document.createElement('td');
    var $tdActions = document.createElement('td');
    var $editButton = document.createElement('button');
    var $deleteButton = document.createElement('button');
    $tdActions.setAttribute('class', 'action-buttons');
    $editButton.setAttribute('class', 'button edit-button');
    $editButton.textContent = 'Edit';
    $deleteButton.setAttribute('class', 'button delete-button');
    $deleteButton.textContent = 'Delete';
    $tr.append($tdTime, $tdEvent, $tdActions);
    if (formData.time !== undefined) {
        $tdActions.append($editButton, $deleteButton);
        $tdTime.textContent = formData.time.toString();
        $tdEvent.textContent = formData.info;
    }
    return $tr;
}
$cancelButton.addEventListener('click', function () {
    $eventCreator.close();
    $form.reset();
});
$changeDay.addEventListener('change', function () {
    var daySelected = $changeDay.value;
    var eventsForDay = data[daySelected];
    var empty = { time: undefined, info: undefined, rowId: undefined };
    $tbody.replaceChildren();
    for (var i = 0; i < 9; i++) {
        if (eventsForDay[i]) {
            var prependRow = renderRow(eventsForDay[i]);
            $tbody.prepend(prependRow);
        }
        else {
            renderRow(empty);
            $tbody.append(renderRow(empty));
        }
    }
});
$tbody.addEventListener('click', function (event) {
    var $eventTarget = event.target;
    if ($eventTarget.matches('.edit-button')) {
        $eventCreator.showModal();
        var $row = $eventTarget.closest('tr');
        var id = $row.getAttribute('id');
        var changeDay = $changeDay.value;
        var editDay = void 0;
        for (var i = 0; i < data[changeDay].length; i++) {
            if (id === data[changeDay][i].id) {
                editDay = data[changeDay][i];
            }
        }
        var dayChildren = $day.children;
        for (var i = 0; i < $day.children.length; i++) {
            $day.setAttribute('selected', changeDay);
            if (dayChildren[i].value === changeDay) {
                console.log('yay');
            }
        }
    }
});
