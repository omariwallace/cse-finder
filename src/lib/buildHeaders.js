import { createElement, openTab } from './util'

export default function buildHeaders (cses) {
  const $section = createElement('<div class="Section Section--header"></div>')
  const $innerWrapper = createElement('<div class="Section-innerWrapper"></div>')
  cses.forEach(cse => {
    const $header = createElement(`<div class="Cse"><span class="isClickable">${cse.name}</span></div>`)
    $header.addEventListener('click', () => openTab(`https://app.asana.com/0/${cse.listId}`))
    $innerWrapper.appendChild($header)
  })
  $section.appendChild($innerWrapper)
  return $section
}
