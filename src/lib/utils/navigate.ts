const DOWN_Y_OFFSET = 300
const UP_Y_OFFSET = -600

// https://stackoverflow.com/questions/24665602/scrollintoview-scrolls-just-too-far
function navigateToElementId(id: string) {
  // Scrolls to target section
  const end = document.getElementById(id)
  if (end === null) return

  let y = end.getBoundingClientRect().top + window.scrollY

  if (y > window.scrollY) {
    y += DOWN_Y_OFFSET
  } else {
    y += UP_Y_OFFSET
  }

  window.scrollTo({ top: y, behavior: 'smooth' })
}

export default navigateToElementId
