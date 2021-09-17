// everyday is '1234567',
// somedays of a week is eg: weekends's17',
// times per period is eg: 3times per week '3w', per month '3m',
// repeat eg: every 10 days is 'e10'

import dayjs, { Dayjs } from "dayjs";

type ProgressRecord = {
  date: Dayjs;
  value: number;
  isCompleted: boolean;
};

export const isToDoItemToday = (obj: any) => {
  const today = dayjs().startOf("date");
  if (obj.hasOwnProperty("date")) {
    // tasks
    if (
      obj.required &&
      dayjs(obj.date).startOf("date").valueOf() <= today.valueOf() &&
      !obj.isCompleted
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

      const completedDays = obj.records
        .filter(
          (record: ProgressRecord) =>
            record.date.valueOf() >= checkDateLimit.valueOf()
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
      const completed = obj.records
        .filter(
          (record: ProgressRecord) =>
            record.date.valueOf() >= checkDateLimit.valueOf()
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
  const todayStart = dayjs().startOf("date");
  const todayEnd = dayjs().endOf("date");

  if (routineObj.goal === undefined) {
    // this routine is boolean based
    console.log("no current progress needed for boolean based");
    return -1;
  } else {
    // this routine is numeric based
    const currentRecord: ProgressRecord | undefined = routineObj.records.find(
      (record: ProgressRecord) =>
        record.date.valueOf() >= todayStart.valueOf() &&
        record.date.valueOf() < todayEnd.valueOf()
    );
    if (!currentRecord) {
      return -1;
    } else {
      return currentRecord.value;
    }
  }
};

// return value is 0: not yet started | 0.5: started | 1: completed
// this is only numeric based routine
export const checkCurrentCompletion = (routineObj: any) => {
  if (routineObj.goal === undefined) {
    // this routine is boolean based
    console.log("no current completion check needed for boolean based");
    return -1;
  }
  const currentProgressValue = getCurrentProgressValue(routineObj);
  const condition = routineObj.goal[0];
  const goal = parseFloat(routineObj.goal.slice(1));

  switch (condition) {
    case ">":
      return currentProgressValue === -1
        ? 0
        : currentProgressValue >= goal
        ? 1
        : 0.5;
    case "<":
      return currentProgressValue === -1
        ? 0
        : currentProgressValue < goal
        ? 1
        : 0.5;
    case "=":
      return currentProgressValue === -1
        ? 0
        : currentProgressValue === goal
        ? 1
        : 0.5;
  }
};
