export function age (time) {
  const diff = now() - time
  return Math.floor(diff / 60000)
}

export function now () {
  return (new Date()).getTime()
}

export function ordinalise (i) {
  const j = i % 10
  const k = i % 100
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
}

export function isWorkingDay (date) {
  const day = date.getUTCDay()
  return day !== 0 && day !== 6 && !isBankHoliday(date)
}

export function isBankHoliday (d) {
  const bankHolidays = [
    // [yyyy, mm, dd]
    [2017, 9, 4],
    [2017, 10, 9],
    [2017, 11, 23],
    [2017, 11, 24],
    [2017, 12, 25],
    [2018, 1, 1],
    [2018, 1, 15],
    [2018, 2, 19],
    [2018, 5, 28],
    [2018, 7, 4],
    [2018, 9, 3],
    [2018, 10, 8],
    [2018, 11, 22],
    [2018, 11, 23],
    [2018, 12, 25]
  ]

  return bankHolidays.some(b => {
    const [year, month, date] = b
    return d.getUTCDate() === date && d.getUTCMonth() === (month - 1) && d.getUTCFullYear() === year
  })
}
