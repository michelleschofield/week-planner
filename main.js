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
