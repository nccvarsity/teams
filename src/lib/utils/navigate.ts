const Y_OFFSET = 300

// https://stackoverflow.com/questions/24665602/scrollintoview-scrolls-just-too-far
function navigateToElementId(id: string) {
  // Scrolls to target section
  const end = document.getElementById(id)
  if (end === null) return

  const y = end.getBoundingClientRect().top + window.scrollY + Y_OFFSET
  window.scrollTo({ top: y, behavior: 'smooth' })
}

export default navigateToElementId
