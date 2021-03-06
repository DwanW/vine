// everyday is '1234567',
// somedays of a week is eg: weekends's17',
// times per period is eg: 3times per week '3w', per month '3m',
// repeat eg: every 10 days is 'e10'

import dayjs, { Dayjs } from "dayjs";
import { LightData, ProgressRecord } from "./types";

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
            dayjs(record.date).valueOf() >= checkDateLimit.valueOf() &&
            dayjs(record.date).valueOf() < today.valueOf()
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
            dayjs(record.date).valueOf() >= checkDateLimit.valueOf() &&
            dayjs(record.date).valueOf() < today.valueOf()
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
    console.log({
      message: "this routine is outside the date range, or not valid",
      obj,
    });
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
// current progress is only for goal value of current date
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
      dayjs(record.date).valueOf() >= todayStart.valueOf() &&
      dayjs(record.date).valueOf() < todayEnd.valueOf()
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

// convert to schedule to string
export const scheduleToString = (schedule: string) => {
  if (!schedule) {
    return "";
  }

  const len = schedule.length;
  if (schedule === "1234567" || schedule === "s1234567") {
    return "every day";
  } else if (schedule[0] === "s") {
    let days = schedule.slice(1);
    let newString = days
      .split("")
      .map((day) =>
        dayjs()
          .day(parseInt(day) - 1)
          .format("ddd")
      )
      .join(" - ");
    return newString;
  } else if (schedule[len - 1] === "w" || schedule[len - 1] === "m") {
    let period = schedule[len - 1];

    return `${schedule.slice(0, -1)} ${
      schedule.slice(0, -1) === "1" ? "time" : "times"
    } per ${period === "w" ? "week" : "month"}`;
  } else if (schedule[0] === "e") {
    return `every ${schedule.slice(1)} ${
      schedule.slice(1) === "1" ? "day" : "days"
    }`;
  } else {
    return "date parsing error";
  }
};

// calculate completion streak from record
export const calculateStreak = (
  records: ProgressRecord[],
  schedule: string,
  startDate: Dayjs
) => {
  let currentStreak = 0;
  let maxStreak = 0;
  let anchorDate: Dayjs | undefined; // date that is used to compare with the record date.
  let unit = "day";
  let compRecords = records.filter((record) => record.isCompleted); // only have completed records.
  const len = schedule.length;

  if (schedule === "1234567" || schedule === "s1234567") {
    compRecords.forEach((record) => {
      if (!anchorDate) {
        anchorDate = record.date;
        currentStreak = 1;
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
        return;
      } else {
        let isConsecutive =
          dayjs(anchorDate).add(1, "day").startOf("date").valueOf() ===
          dayjs(record.date).startOf("date").valueOf();

        anchorDate = record.date;

        if (isConsecutive) {
          currentStreak += 1;
        } else {
          currentStreak = 1;
        }

        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      }
    });
  } else if (schedule[0] === "s") {
    compRecords.forEach((record) => {
      if (!anchorDate) {
        anchorDate = record.date;
        currentStreak = 1;
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
        return;
      } else {
        let anchorIdx = schedule.indexOf(
          (dayjs(anchorDate).get("day") + 1).toString()
        );
        let nextIdx = anchorIdx === schedule.length - 1 ? 1 : anchorIdx + 1;
        // days till next work day
        let dayDiff =
          nextIdx > anchorIdx
            ? parseInt(schedule[nextIdx]) - parseInt(schedule[anchorIdx])
            : 7 - parseInt(schedule[anchorIdx]) + parseInt(schedule[nextIdx]);
        let isConsecutive =
          dayjs(anchorDate).add(dayDiff, "day").startOf("date").valueOf() ===
          dayjs(record.date).startOf("date").valueOf();

        anchorDate = record.date;

        if (isConsecutive) {
          currentStreak += 1;
        } else {
          currentStreak = 1;
        }

        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      }
    });
  } else if (schedule[len - 1] === "w") {
    unit = "week";
    const target = parseInt(schedule.slice(0, -1));
    let count = 0;
    compRecords.forEach((record) => {
      if (!anchorDate) {
        anchorDate = record.date;
        count = 1;
        if (count === target) {
          currentStreak = 1;
        }
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
        return;
      } else {
        let isSamePeriod =
          dayjs(record.date).startOf("week").valueOf() ===
          dayjs(anchorDate).startOf("week").valueOf();

        anchorDate = record.date;

        if (isSamePeriod) {
          count += 1;
        } else {
          count = 1;
          let isConsecutive =
            dayjs(anchorDate).add(1, "week").startOf("week").valueOf() ===
            dayjs(record.date).startOf("week").valueOf();

          if (!isConsecutive) {
            currentStreak = 0;
          }
        }

        if (count === target) {
          currentStreak += 1;
        }

        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      }
    });
  } else if (schedule[len - 1] === "m") {
    unit = "month";
    const target = parseInt(schedule.slice(0, -1));
    let count = 0;
    compRecords.forEach((record) => {
      if (!anchorDate) {
        anchorDate = record.date;
        count = 1;
        if (count === target) {
          currentStreak = 1;
        }
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
        return;
      } else {
        let isSamePeriod =
          dayjs(record.date).startOf("month").valueOf() ===
          dayjs(anchorDate).startOf("month").valueOf();

        anchorDate = record.date;

        if (isSamePeriod) {
          count += 1;
        } else {
          count = 1;
          let isConsecutive =
            dayjs(anchorDate).add(1, "month").startOf("month").valueOf() ===
            dayjs(record.date).startOf("month").valueOf();

          if (!isConsecutive) {
            currentStreak = 0;
          }
        }

        if (count === target) {
          currentStreak += 1;
        }

        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      }
    });
  } else if (schedule[0] === "e") {
    const period = parseInt(schedule.slice(1)); // days of a period
    compRecords.forEach((record) => {
      if (!anchorDate) {
        anchorDate = record.date;
        currentStreak = 1;
        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
        return;
      } else {
        let anchorDiff = dayjs(anchorDate).diff(dayjs(startDate), "day"); //this will floor the decimals
        let recordDiff = dayjs(record.date).diff(dayjs(startDate), "day");

        let isConsecutive =
          Math.floor(anchorDiff / period) + 1 ===
          Math.floor(recordDiff / period);

        anchorDate = record.date;

        if (isConsecutive) {
          currentStreak += 1;
        } else {
          currentStreak = 1;
        }

        if (currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      }
    });
  }
  return { maxStreak, currentStreak, unit };
};

// calculate percentage completion from record
export const calculateCompletion = (
  records: ProgressRecord[],
  schedule: string,
  startDate: Dayjs
) => {
  const today = dayjs().endOf("date");
  const len = schedule.length;
  const compRecords = records.filter((record) => record.isCompleted);

  if (compRecords.length === 0) {
    return 0;
  }

  let totalDays = Math.ceil(dayjs(today).diff(startDate, "day", true));
  let completedDays = compRecords.length;

  if (schedule === "1234567" || schedule === "s1234567") {
    return completedDays / totalDays;
  } else if (schedule[0] === "s") {
    let totalWeeks = Math.floor(totalDays / 7);
    let remainderDays = totalDays % 7;
    let startingDay = (dayjs(startDate).get("day") + 1).toString();
    const week = "1234567";
    let remainderString = "";
    let dayIdx = week.indexOf(startingDay); // initial is the same as starting day
    for (let i = 0; i < remainderDays; i++) {
      remainderString += week[dayIdx];
      dayIdx++;
      if (dayIdx > 6) {
        dayIdx = 0;
      }
    }
    let workDays = totalWeeks * ((schedule.length - 1) / 7);
    remainderString.split("").forEach((stringNum) => {
      if (schedule.includes(stringNum)) {
        workDays++;
      }
    });

    return completedDays / workDays;
  } else if (schedule[len - 1] === "w") {
    let totalWeeks = Math.ceil(dayjs(today).diff(startDate, "week", true));
    const target = parseInt(schedule.slice(0, -1));
    let count = 0;
    let anchorDate: Dayjs | undefined;
    let completedWeek = 0;
    compRecords.forEach((record) => {
      if (!anchorDate) {
        anchorDate = record.date;
        count = 1;
        if (count === target) {
          completedWeek = 1;
        }
        return;
      } else {
        let isSamePeriod =
          dayjs(record.date).startOf("week").valueOf() ===
          dayjs(anchorDate).startOf("week").valueOf();

        anchorDate = record.date;

        if (isSamePeriod) {
          count += 1;
        } else {
          count = 1;
        }

        if (count === target) {
          completedWeek += 1;
        }
      }
    });

    return completedWeek / totalWeeks;
  } else if (schedule[len - 1] === "m") {
    let totalMonths = Math.ceil(dayjs(today).diff(startDate, "month", true));
    const target = parseInt(schedule.slice(0, -1));
    let count = 0;
    let anchorDate: Dayjs | undefined;
    let completedMonth = 0;
    compRecords.forEach((record) => {
      if (!anchorDate) {
        anchorDate = record.date;
        count = 1;
        if (count === target) {
          completedMonth = 1;
        }
        return;
      } else {
        let isSamePeriod =
          dayjs(record.date).startOf("month").valueOf() ===
          dayjs(anchorDate).startOf("month").valueOf();

        anchorDate = record.date;

        if (isSamePeriod) {
          count += 1;
        } else {
          count = 1;
        }

        if (count === target) {
          completedMonth += 1;
        }
      }
    });

    return completedMonth / totalMonths;
  } else if (schedule[0] === "e") {
    let period = parseInt(schedule.slice(1));
    let numOfPeriods = Math.ceil(totalDays / period);
    return completedDays / numOfPeriods;
  } else {
    return 0;
  }
};

export const isLeapYear = (date: Dayjs) => {
  const year = date.get("year");
  return year % 4 === 0;
};

export const composeLightGraphData = (records: ProgressRecord[]) => {
  let now = dayjs();
  let currentYearRecords = records.filter(
    (record) =>
      dayjs(record.date).valueOf() >= now.startOf("year").valueOf() &&
      dayjs(record.date).valueOf() <= now.endOf("year").valueOf() &&
      record.isCompleted
  );

  // initial data
  let data: LightData = [
    { name: "Jan", records: [], lightString: "", days: 31 },
    {
      name: "Feb",
      records: [],
      lightString: "",
      days: isLeapYear(now) ? 29 : 28,
    },
    { name: "Mar", records: [], lightString: "", days: 31 },
    { name: "Apr", records: [], lightString: "", days: 30 },
    { name: "May", records: [], lightString: "", days: 31 },
    { name: "Jun", records: [], lightString: "", days: 30 },
    { name: "Jul", records: [], lightString: "", days: 31 },
    { name: "Aug", records: [], lightString: "", days: 31 },
    { name: "Sep", records: [], lightString: "", days: 30 },
    { name: "Oct", records: [], lightString: "", days: 31 },
    { name: "Nov", records: [], lightString: "", days: 30 },
    { name: "Dec", records: [], lightString: "", days: 31 },
  ];

  currentYearRecords.forEach((record) => {
    let recordDate = dayjs(record.date);
    let monthIdx = recordDate.get("month");
    let dateNum = recordDate.get("date");
    data[monthIdx].records.push(dateNum);
  });

  for (let i = 0; i < 12; i++) {
    for (let j = 1; j <= data[i].days; j++) {
      // for each day, check if there's record in that day.
      let exist = data[i].records.includes(j);

      // if record exist, push "1" to lightString, else, push "0"
      if (exist) {
        data[i].lightString += "1";
      } else {
        data[i].lightString += "0";
      }
    }
  }

  return data;
};

export const composeLineGraphData = (
  records: ProgressRecord[],
  startDate: Dayjs
) => {
  let lineGraphData: any[] = [];
  let cumulativeValue = 0;
  const startTime = dayjs(startDate).startOf("date");

  records.forEach((record) => {
    cumulativeValue += record.value;
    let newRecord = {
      ...record,
      value: cumulativeValue,
      date: dayjs(record.date).diff(startTime, "day"),
    };
    lineGraphData.push(newRecord);
  });

  return lineGraphData;
};

export const composePieGraphData = (
  records: ProgressRecord[],
  schedule: string,
  startDate: Dayjs
) => {
  const completionDecimal = calculateCompletion(records, schedule, startDate);
  return [
    { name: "completed", percentage: completionDecimal * 100 },
    { name: "uncompleted", percentage: (1 - completionDecimal) * 100 },
  ];
};
