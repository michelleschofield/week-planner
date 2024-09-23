interface dayOfWeek {
  name: string;
  time: number;
  info: string;
}

interface plannerData {
  Monday: dayOfWeek[];
  Tuesday: dayOfWeek[];
  Wednesday: dayOfWeek[];
  Thursday: dayOfWeek[];
  Friday: dayOfWeek[];
  Saturday: dayOfWeek[];
  Sunday: dayOfWeek[];
}

const data: plannerData = readData();
const $newEventButton = document.querySelector('#new-event');
const $eventCreator = document.querySelector('#event-creator');

if (!$newEventButton) throw new Error('$newEventButton query failed');
if (!$eventCreator) throw new Error('$eventCreator query failed');

$newEventButton.addEventListener('click', () => {
  $eventCreator.showModal();
});

function writeData(): void {
  const jsonPlannerData = JSON.stringify(data);
  localStorage.setItem('plannerData', jsonPlannerData);
}

function readData(): plannerData {
  const jsonPlannerData = localStorage.getItem('plannerData');
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
