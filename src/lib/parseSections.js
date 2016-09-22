import objectMap from 'slapdash/src/objectMap'

export default function parseSections (cses) {
  return objectMap(cses, function (sections, cse) {
    const newSections = {}
    Object.keys(sections).forEach(function (oldSectionName) {
      const newSectionName = matchOtherSections(oldSectionName) || matchDateSection(oldSectionName)
      if (newSectionName) {
        newSections[newSectionName] = {
          tasks: sections[oldSectionName],
          full: !sectionAvailabile(newSectionName, oldSectionName),
          free: sectionAvailabile(newSectionName, oldSectionName)
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

function sectionAvailabile (newTitle, origTitle) {
  const isDateSection = !/(newtasks|qa|xb|urgent)/i.test(newTitle)
  if (isDateSection) {
    return !/ooo|bank|leave|full/i.test(origTitle)
  } else {
    return !/urgent/i.test(origTitle)
  }
}
