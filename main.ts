interface dayOfWeek {
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
const $cancelButton = document.querySelector('#cancel') as HTMLButtonElement;
const $changeDay = document.querySelector('#change-day') as HTMLSelectElement;

if (!$form) throw new Error('$form query failed');
if (!$newEventButton) throw new Error('$newEventButton query failed');
if (!$eventCreator) throw new Error('$eventCreator query failed');
if (!$tbody) throw new Error('$tbody query failed!');
if (!$cancelButton) throw new Error('$cancelButton failed');
if (!$changeDay) throw new Error('$$changeDay query failed');

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

$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements as FormElements;
  const formData = {
    day: $formElements['day-of-week'].value,
    time: $formElements['event-time'].value,
    info: $formElements['event-info'].value,
  };

  const $tr = renderRow(formData);
  $tbody.prepend($tr);
  const dayInfo = {
    info: formData.info,
    time: formData.time,
  };
  data[formData.day].push(dayInfo);
  $eventCreator.close();
  writeData();
  $form.reset();
});

function renderRow(formData?: {
  time: string;
  info: string;
}): HTMLTableRowElement {
  const $tr = document.createElement('tr');
  const $tdTime = document.createElement('td');
  const $tdEvent = document.createElement('td');
  const $tdActions = document.createElement('td');
  const $editButton = document.createElement('button');
  const $deleteButton = document.createElement('button');

  $tdTime.textContent = formData.time;
  $tdEvent.textContent = formData.info;

  $tdActions.setAttribute('class', 'action-buttons');

  $editButton.setAttribute('class', 'button edit-button');
  $editButton.textContent = 'Edit';
  $deleteButton.setAttribute('class', 'button delete-button');
  $deleteButton.textContent = 'Delete';

  $tr.append($tdTime, $tdEvent, $tdActions);

  if (formData.time !== undefined) {
    $tdActions.append($editButton, $deleteButton);
  }

  return $tr;
}

$cancelButton.addEventListener('click', () => {
  $eventCreator.close();
  $form.reset();
});

$changeDay.addEventListener('change', () => {
  const daySelected = $changeDay.value;
  const eventsForDay = data[daySelected];
  const empty = { time: undefined, info: undefined };
  $tbody.replaceChildren();
  for (let i = 0; i < 9; i++) {
    if (eventsForDay[i]) {
      const prependRow = renderRow(eventsForDay[i]);
      $tbody.prepend(prependRow);
    } else {
      renderRow(empty);
      $tbody.append(renderRow(empty));
    }
  }
});
