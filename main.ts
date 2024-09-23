interface dayOfWeek {
  rowId: number;
  time: number;
  info: string;
}

interface plannerData {
  nextRowId: number;
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

const $day = document.querySelector('#day-of-week') as HTMLSelectElement;
const $info = document.querySelector('#event-info') as HTMLSelectElement;
const $time = document.querySelector('#event-time') as HTMLSelectElement;

if (!$day) throw new Error('$day query failed');
if (!$info) throw new Error('info  query failed');
if (!$time) throw new Error('$time  query failed');
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

$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements as FormElements;
  const formData = {
    day: $formElements['day-of-week'].value,
    time: $formElements['event-time'].value,
    info: $formElements['event-info'].value,
  };
  const dayInfo: dayOfWeek = {
    rowId: data.nextRowId,
    info: formData.info,
    time: formData.time,
  };

  const $tr = renderRow(dayInfo);
  $tbody.prepend($tr);

  data.nextRowId++;
  data[formData.day].push(dayInfo);
  $eventCreator.close();
  writeData();
  $form.reset();
});

function renderRow(formData?: dayOfWeek): HTMLTableRowElement {
  const $tr = document.createElement('tr');
  $tr.setAttribute('id', `${formData.rowId}`);
  const $tdTime = document.createElement('td');
  const $tdEvent = document.createElement('td');
  const $tdActions = document.createElement('td');
  const $editButton = document.createElement('button');
  const $deleteButton = document.createElement('button');

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

$cancelButton.addEventListener('click', () => {
  $eventCreator.close();
  $form.reset();
});

$changeDay.addEventListener('change', () => {
  const daySelected = $changeDay.value;
  const eventsForDay = data[daySelected];
  const empty = { time: undefined, info: undefined, rowId: undefined };
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

$tbody.addEventListener('click', (event: Event) => {
  const $eventTarget = event.target as HTMLElement;
  if ($eventTarget.matches('.edit-button')) {
    $eventCreator.showModal();
    const $row = $eventTarget.closest('tr');

    const id = $row.getAttribute('id');
    const changeDay = $changeDay.value;
    let editDay;
    for (let i = 0; i < data[changeDay].length; i++) {
      if (id === data[changeDay][i].id) {
        editDay = data[changeDay][i];
      }
    }

    const dayChildren = $day.children as HTMLOptionsCollection;
    for (let i = 0; i < $day.children.length; i++) {
      $day.setAttribute('selected', changeDay);
      if (dayChildren[i].value === changeDay) {
        console.log('yay');
      }
    }
  }
});
