// everyday is '1234567',
// somedays of a week is eg: weekends's17',
// times per period is eg: 3times per week '3w', per month '3m',
// repeat eg: every 10 days is 'e10'

import dayjs, { Dayjs } from "dayjs";
import { ProgressRecord } from "./types";

export const isToDoItemToday = (obj: any) => {
  const today = dayjs().startOf("date");
  if (obj.hasOwnProperty("date")) {
    // tasks
    if (
      obj.required &&
      dayjs(obj.date).startOf("date").valueOf() <= today.valueOf() &&
      (!obj.isCompleted ||
        (obj.isCompleted &&
          dayjs(obj.completionDate).startOf("date").valueOf() ===
            today.valueOf()))
    ) {
      return true;
    } else if (
      !obj.required &&
      dayjs(obj.date).startOf("date").valueOf() === today.valueOf()
    ) {
      return true;
    } else {
      return false;
    }
  } else if (
    obj.hasOwnProperty("records") &&
    isTodayBetweenStartAndEndDate(obj.startdate, obj.enddate)
  ) {
    //routines
    if (obj.schedule === "1234567") return true;
    else if (obj.schedule[0] === "s") {
      // is some days in a week
      let day = today.get("day"); // number from 0-6
      if (obj.schedule.includes(day + 1)) return true;
      else return false;
    } else if (
      obj.schedule[obj.schedule.length - 1] === "w" ||
      obj.schedule[obj.schedule.length - 1] === "m"
    ) {
      // is num of days of completion per week || month
      let targetDays = parseInt(obj.schedule.slice(0, -1));
      let checkDateLimit: Dayjs;
      if (obj.schedule[obj.schedule.length - 1] === "w") {
        checkDateLimit = today.startOf("week");
      } else {
        checkDateLimit = today.startOf("month");
      }

      // exclude record not within the period,
      // and exclude today (we want to show the completion status today)
      const completedDays = obj.records
        .filter(
          (record: ProgressRecord) =>
            record.date.valueOf() >= checkDateLimit.valueOf() &&
            record.date.valueOf() < today.valueOf()
        )
        .reduce(
          (initial: number, record: ProgressRecord) =>
            record.isCompleted ? initial + 1 : initial,
          0
        );

      if (completedDays < targetDays) return true;
      else return false;
    } else if (obj.schedule[0] === "e") {
      // one completion every period
      let period = parseInt(obj.schedule.slice(1));
      let dayDiff = today.diff(dayjs(obj.startdate).startOf("date"), "day");
      let dayOffset = dayDiff > period ? dayDiff % period : dayDiff;
      let checkDateLimit = today.subtract(dayOffset, "day");

      // exclude today's record for displaying status
      const completed = obj.records
        .filter(
          (record: ProgressRecord) =>
            record.date.valueOf() >= checkDateLimit.valueOf() &&
            record.date.valueOf() < today.valueOf()
        )
        .some((record: ProgressRecord) => record.isCompleted);

      if (!completed) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log("validation did not catch");
      throw Error("validation error");
    }
  } else {
    console.log("error, this is neither task or routine");
    return false;
  }
};

const isTodayBetweenStartAndEndDate = (startdate: any, enddate: any) => {
  const today = dayjs().startOf("date");
  if (
    dayjs(startdate).startOf("date").valueOf() <= today.valueOf() &&
    (enddate
      ? dayjs(enddate).startOf("date").valueOf() > today.valueOf()
      : true)
  ) {
    return true;
  } else {
    return false;
  }
};

export const getToDoItemToday = (tasks: any[], routines: any[]) => {
  let combinedArr = [...tasks, ...routines];
  let todos = combinedArr.filter((obj: any) => isToDoItemToday(obj));
  return todos;
};

// return value is numeric
// current progress is only for display of current date
export const getCurrentProgressValue = (routineObj: any) => {
  const currentRecord: ProgressRecord | undefined = getTodayRecord(
    routineObj.records
  );

  if (!currentRecord) {
    // indicate no record
    return -1;
  }

  if (routineObj.goal === undefined) {
    // this routine is boolean based
    return currentRecord.isCompleted ? 1 : 0;
  } else {
    // this routine is numeric based
    return currentRecord.value;
  }
};

// return value is 0: not yet started | 0.5: started | 1: completed
// this is only numeric based routine and calculate after having record.
export const checkCurrentCompletion = (routineObj: any) => {
  const currentProgressValue = getCurrentProgressValue(routineObj);
  if (routineObj.goal === undefined) {
    // this routine is boolean based
    return currentProgressValue;
  }

  const condition = routineObj.goal[0];
  const goal = parseFloat(routineObj.goal.slice(1));

  if (currentProgressValue === -1) {
    // indicate no record
    return 0;
  }

  switch (condition) {
    case ">":
      return currentProgressValue >= goal ? 1 : 0.5;
    case "<":
      return currentProgressValue < goal ? 1 : 0.5;
    case "=":
      return currentProgressValue === goal ? 1 : 0.5;
  }
};

export const getConditionString = (goal: string) => {
  if (!goal) {
    return "";
  }
  switch (goal[0]) {
    case ">":
      return `at least ${goal.slice(1)}`;
    case "<":
      return `less than ${goal.slice(1)}`;
    case "=":
      return `exactly ${goal.slice(1)}`;
  }
};

export const getTodayRecord = (records: ProgressRecord[]) => {
  const todayStart = dayjs().startOf("date");
  const todayEnd = dayjs().endOf("date");

  const todayRecord = records.find(
    (record: ProgressRecord) =>
      record.date.valueOf() >= todayStart.valueOf() &&
      record.date.valueOf() < todayEnd.valueOf()
  );

  return todayRecord;
};

// this calculate completion at time the value has been given
export const evaluateCompletionValue = (goal: string, value: number) => {
  const condition = goal[0];
  const targetGoal = parseFloat(goal.slice(1));

  switch (condition) {
    case ">":
      return value >= targetGoal;
    case "<":
      return value < targetGoal;
    case "=":
      return value === targetGoal;
    default:
      return false;
  }
};
