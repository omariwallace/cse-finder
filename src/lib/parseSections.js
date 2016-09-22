import objectMap from 'slapdash/src/objectMap'

export default function parseSections (cses) {
  return objectMap(cses, function (sections, cse) {
    const newSections = {}
    Object.keys(sections).forEach(function (oldSectionName) {
      const newSectionName = matchOtherSections(oldSectionName) || matchDateSection(oldSectionName)
      if (newSectionName) {
        const isDateSection = newSectionName !== 'qa' && newSectionName !== 'xb' && newSectionName !== 'newtasks'
        newSections[newSectionName] = {
          tasks: sections[oldSectionName],
          full: isDateSection ? /ooo|bank|leave|full/i.test(oldSectionName) : false,
          free: isDateSection ? !/ooo|bank|leave|full/i.test(oldSectionName) : false
        }
      }
    })
    return newSections
  })
}

function matchDateSection (title) {
  const regex = /(monday|tuesday|wednesday|thursday|friday)[^0-9]*(\d*)(?:st|nd|rd|th)/i
  const matches = regex.exec(title)
  if (!matches || matches.length < 3) return false
  return (matches[1] + matches[2]).toLowerCase()
}

function matchOtherSections (title) {
  const matches = /(newtasks|qa|xb|urgent)/i.exec(title)
  if (!matches || matches.length < 2) return false
  return matches[1].toLowerCase()
}
