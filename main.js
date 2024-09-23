var data = readData();
var $newEventButton = document.querySelector('#new-event');
var $eventCreator = document.querySelector('#event-creator');
if (!$newEventButton)
    throw new Error('$newEventButton query failed');
if (!$eventCreator)
    throw new Error('$eventCreator query failed');
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
// form
var $form = document.querySelector('#form-modal');
if (!$form)
    throw new Error('$form query failed');
$form.addEventListener('submit', function (event) {
    event.preventDefault();
    var $formElements = $form.elements;
    var formData = {
        day: $formElements['day-of-week'].value,
        time: $formElements['event-time'].value,
        info: $formElements['event-info'].value,
    };
    $eventCreator.close();
    console.log(formData);
});
// function renderTable
