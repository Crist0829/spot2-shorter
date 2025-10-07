const TIME_DIFF_BREAK = {
  "seconds": -60,
  "minutes": -80,
  "hours": -48
}


export function getFormatDate({ date, dateStyle = "long", timeStyle }) {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle,
    timeStyle,
  }).format(new Date(date))
}

export function getFormatDateFromISO(date) {
  const dateParts = date.split("-");
  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
}


export function getDiffInDays(end_date) {
  const endDate = new Date(end_date)
  const now = new Date()
  const diffInMs = endDate.getTime() - now.getTime()
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

  return Math.round(diffInDays)
}


export function getTimeDifference(end_date, unit) {
  const endDate = new Date(end_date);
  const now = new Date();

  const diffInMs = endDate.getTime() - now.getTime();

  switch (unit) {
    case "days":
      return Math.round(diffInMs / (1000 * 60 * 60 * 24));
    case "weeks":
      return Math.round(diffInMs / (1000 * 60 * 60 * 24 * 7));
    case "hours":
      return Math.round(diffInMs / (1000 * 60 * 60));
    case "minutes":
      return Math.round(diffInMs / (1000 * 60));
    case "seconds":
      return Math.round(diffInMs / 1000)
    default:
      throw new Error("Unidad de tiempo no soportada");
  }
}

export function getFormattedTimeDifference(value, unit = "days") {
  const formatter = new Intl.RelativeTimeFormat("es-AR", {});
  return formatter.format(value, unit);
}


export function getTimeAgo({ created_at, unit }) {

  const diffInSeconds = getTimeDifference(created_at, "seconds")
  if (diffInSeconds > TIME_DIFF_BREAK['seconds']) {
    return getFormattedTimeDifference(diffInSeconds, "seconds")
  }

  const diffInMinutes = getTimeDifference(created_at, "minutes")

  const timeAgo =
    diffInMinutes > TIME_DIFF_BREAK['minutes']
      ? getFormattedTimeDifference(diffInMinutes, "minutes")
      :
      getTimeDifference(created_at, "hours") < TIME_DIFF_BREAK['hours']
        ? getFormattedTimeDifference(
          getTimeDifference(created_at, "days"),
          "days"
        )
        : getFormattedTimeDifference(
          getTimeDifference(created_at, "hours"),
          "hours"
        )

  return timeAgo

}

export function calculateDateDayFromWeekAndDailyAndMonthStartDay({
  weekNumber,
  dailyNumber,
  monthStartDay,
  planDate,
}) {
  const number1To28 = (weekNumber - 1) * MAX_QUANTITY_DAYS + (dailyNumber ?? 0)
  const dateDay = number1To28 + monthStartDay
  const daysMonth = daysOfMonth(planDate)
  return dateDay > daysMonth ? dateDay - daysMonth : dateDay
}

export function daysOfMonth(date) {
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return nextMonth.getDate()
}