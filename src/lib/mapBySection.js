import objectEach from 'slapdash/src/objectEach'

export default function mapBySection (cses) {
  const newSections = {}
  objectEach(cses, (sections, cseKey) => {
    objectEach(sections, (tasks, sectionKey) => {
      newSections[sectionKey] = newSections[sectionKey] || {}
      newSections[sectionKey][cseKey] = tasks
    })
  })
  return newSections
}
