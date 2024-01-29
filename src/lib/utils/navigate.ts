const DOWN_Y_OFFSET = 500
const UP_Y_OFFSET = -900

function customSmoothScroll(targetY: number, duration = 800) {
  const startingY = window.scrollY
  const startTime =
    'now' in window.performance ? performance.now() : new Date().getTime()

  function easeInOutQuad(
    time: number,
    start: number,
    change: number,
    duration: number
  ) {
    time /= duration / 2
    if (time < 1) return (change / 2) * time * time + start
    time--
    return (-change / 2) * (time * (time - 2) - 1) + start
  }

  function scroll() {
    const currentTime =
      'now' in window.performance ? performance.now() : new Date().getTime()
    const timeElapsed = currentTime - startTime

    window.scrollTo(
      0,
      easeInOutQuad(timeElapsed, startingY, targetY - startingY, duration)
    )

    if (timeElapsed < duration) {
      requestAnimationFrame(scroll)
    }
  }

  scroll()
}

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

  customSmoothScroll(y)
}

export default navigateToElementId
