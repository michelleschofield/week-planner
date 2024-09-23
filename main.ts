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

interface FormElements extends HTMLFormControlsCollection {
  day: string;
  time: string;
  info: string;
}

const data: plannerData = readData();
const $newEventButton = document.querySelector('#new-event');
const $eventCreator = document.querySelector(
  '#event-creator',
) as HTMLDialogElement;
const $form = document.querySelector('#form-modal') as HTMLFormElement;
const $tbody = document.querySelector('tbody') as HTMLTableSectionElement;

if (!$form) throw new Error('$form query failed');
if (!$newEventButton) throw new Error('$newEventButton query failed');
if (!$eventCreator) throw new Error('$eventCreator query failed');
if (!$tbody) throw new Error('$tbody query failed!');

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

// form

$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements as FormElements;
  const formData = {
    day: $formElements['day-of-week'].value,
    time: $formElements['event-time'].value,
    info: $formElements['event-info'].value,
  };

  $eventCreator.close();
  console.log(formData);
});

function renderTable(formData): HTMLTableRowElement {
  const $tr = document.createElement('tr');
  $tbody.prepend($tr);

  const $tdTime = document.createElement('td');
  $tdTime.textContent = formData.time;
  const $tdEvent = document.createElement('td');
  $tdEvent.textContent = formData.info;
  const $tdActions = document.createElement('td');
  $c;
}
