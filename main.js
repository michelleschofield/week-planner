var data = readData();
var $newEventButton = document.querySelector('#new-event');
var $eventCreator = document.querySelector('#event-creator');
var $form = document.querySelector('#form-modal');
var $tbody = document.querySelector('tbody');
var $cancelButton = document.querySelector('#cancel');
var $changeDay = document.querySelector('#change-day');
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
    var $tr = renderRow(formData);
    $tbody.prepend($tr);
    var dayInfo = {
        info: formData.info,
        time: formData.time,
    };
    data[formData.day].push(dayInfo);
    $eventCreator.close();
    writeData();
    $form.reset();
});
function renderRow(formData) {
    var $tr = document.createElement('tr');
    var $tdTime = document.createElement('td');
    var $tdEvent = document.createElement('td');
    var $tdActions = document.createElement('td');
    var $editButton = document.createElement('button');
    var $deleteButton = document.createElement('button');
    $tdTime.textContent = formData.time;
    $tdEvent.textContent = formData.info;
    $tdActions.setAttribute('class', 'action-buttons');
    $editButton.setAttribute('class', 'button edit-button');
    $editButton.textContent = 'Edit';
    $deleteButton.setAttribute('class', 'button delete-button');
    $deleteButton.textContent = 'Delete';
    $tr.append($tdTime, $tdEvent, $tdActions);
    $tdActions.append($editButton, $deleteButton);
    return $tr;
}
$cancelButton.addEventListener('click', function () {
    $eventCreator.close();
    $form.reset();
});
$changeDay.addEventListener('change', function () {
    var daySelected = $changeDay.value;
    var eventsForDay = data[daySelected];
    $tbody.replaceChildren();
    for (var i = 0; i < 9; i++) {
        if (eventsForDay[i]) {
            var prependRow = renderRow(eventsForDay[i]);
            $tbody.prepend(prependRow);
        }
        else {
        }
    }
});
