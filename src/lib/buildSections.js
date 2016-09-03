import {
  capitalise,
  ordinalise,
  objectSome,
  createElement,
  classnames,
  isWorkingDay,
  openTab
} from './util'
import { minDays } from '../config'

export default function buildSections (sections, cses) {
  let currentDate = new Date()
  currentDate.setUTCDate(currentDate.getUTCDate() - 1)

  const $wrapper = createElement('<div class="Wrapper"></div>')
  enrichSections(sections, cses).forEach(section => {
    const $section = buildSection(section, cses)
    $wrapper.appendChild($section)
  })

  return $wrapper
}

function buildSection ({ title, cses }) {
  let html = ''
  html += '<div class="Section">'
  html += `<h3 class="Section-title">${title}</h3>`
  html += '<div class="Section-innerWrapper"></div>'
  html += '</div>'
  const $section = createElement(html)

  const $innerWrapper = $section.querySelector('.Section-innerWrapper')

  cses.forEach(cse => {
    const $cse = buildCse(cse)
    $innerWrapper.appendChild($cse)
  })

  return $section
}

function buildCse ({ full, free, tasks }) {
  const className = classnames({
    Cse: true,
    isFull: full,
    isFree: free
  })

  const $cse = createElement(`<div class="${className}"></div>`)
  tasks.forEach(task => {
    const $task = createElement(`<div class="Task isClickable">${task.name}</div>`)
    $task.addEventListener('click', () => openTab(task.url))
    $cse.appendChild($task)
  })
  return $cse
}

function enrichSections (sections, cses) {
  const output = []
  let foundFree = false

  let currentDate = new Date()
  currentDate.setUTCDate(currentDate.getUTCDate() - 1)

  // Get Date sections
  while (output.length < minDays || !foundFree) {
    currentDate = getNextDay(currentDate)
    const targetSection = sections[dateToKey(currentDate)] || {}
    const newSection = {
      title: capitalise(dateToTitle(currentDate)),
      cses: cses.map(cse => {
        if (targetSection[cse]) return targetSection[cse]
        return cse === 'Tommy'
          ? {
            free: false,
            full: true,
            tasks: []
          }
          : {
            free: true,
            full: false,
            tasks: []
          }
      })
    }
    output.push(newSection)
    foundFree = objectSome(newSection.cses, k => k.free) ? true : foundFree
  }

  const emptyBlock = {
    free: false,
    full: false,
    tasks: []
  }

  if (sections.qa) {
    output.push({
      title: 'QA',
      cses: cses.map(cse => sections.qa[cse] || emptyBlock)
    })
  }

  if (sections.xb) {
    output.push({
      title: 'XB',
      cses: cses.map(cse => sections.xb[cse] || emptyBlock)
    })
  }

  output.unshift({
    title: 'New',
    cses: cses.map(cse => sections.newtasks[cse] || emptyBlock)
  })

  return output
}

function getNextDay (base) {
  const next = new Date(base.getTime())
  do {
    next.setUTCDate(next.getUTCDate() + 1)
  } while (!isWorkingDay(next))
  return next
}

function dateToKey (date) {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return days[date.getUTCDay()] + date.getUTCDate()
}

function dateToTitle (date) {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return days[date.getUTCDay()] + ' ' + ordinalise(date.getUTCDate())
}
