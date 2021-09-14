// everyday is '1234567',
// somedays of a week is eg: weekends's17',
// times per period is eg: 3times per week '3w', per month '3m',
// repeat eg: every 10 days is 'e10'

import dayjs, { Dayjs } from "dayjs";

type ProgressRecord = {
  createdAt: Dayjs;
  isCompleted: boolean;
};

export const isToDoItemToday = (obj: any) => {
  const today = dayjs().startOf("date");
  if (obj.hasOwnProperty("date")) {
    // tasks
    if (
      obj.isRequired &&
      dayjs(obj.date).startOf("date").valueOf() <= today.valueOf() &&
      !obj.isCompleted
    ) {
      return true;
    } else if (
      !obj.isRequired &&
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
      // is num of times per week || month
      let goal = parseInt(obj.schedule.slice(0, -1));
      let checkDateLimit: Dayjs;
      if (obj.schedule[obj.schedule.length - 1] === "w") {
        checkDateLimit = today.startOf("week");
      } else {
        checkDateLimit = today.startOf("month");
      }

      const recordGoal = obj.records
        .filter(
          (record: ProgressRecord) =>
            record.createdAt.valueOf() > checkDateLimit.valueOf()
        )
        .reduce(
          (initial: number, record: ProgressRecord) =>
            record.isCompleted ? initial + 1 : initial,
          0
        );

      if (recordGoal < goal) return true;
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
            record.createdAt.valueOf() > checkDateLimit.valueOf()
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
