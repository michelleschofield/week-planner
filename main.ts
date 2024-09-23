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

const data: plannerData = {};

function writeData(): void {
  const jsonPlannerData = JSON.stringify;
}
