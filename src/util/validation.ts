// everyday is '1234567',
// somedays of a week is eg: weekends's17',
// times per period is eg: 3times per week '3w', per month '3m',
// repeat eg: every 10 days is 'e10'

export const isToDoItemToday = (obj: any) => {
  // if task required === true, task date is <= today and task isCompleted === false, return true
  // else if task required === false, task date is today and task isCompleted === false, return true
  // else return false
  // TODO:
  // ---
  // if routine startdate is <= today and endate is >= today, continue checking
  // // if schedule start with 'e', then if days between start of today and start of startdate equal to 0 or %days equal to 0, return true, else false.
  // // if schedule end with 'w', then check current week record, if sum of completion is less than target, return true, else false.
  // // if schedule end with 'm', then check current month record, if sum of completion is less than target, return true, else false.
  // // if schedule start with 's', then check if schedule contains the today's day, true if it is,
  // // else if schedule ===  '1234567', return true
  // // else return false.
};
