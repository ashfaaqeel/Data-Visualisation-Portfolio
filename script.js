// grab references
const mapFrame = document.getElementById("map-frame");
const steps = document.querySelectorAll(".step");

// initialize scrollama
const scroller = scrollama();

// setup scrollama
scroller
  .setup({
    step: ".step",
    offset: 0.5,      // triggers when step crosses middle of viewport
    debug: false
  })
  .onStepEnter(response => {
    // remove highlight from all
    steps.forEach(s => s.classList.remove("is-active"));
    // highlight the active step
    response.element.classList.add("is-active");

    // change map in iframe
    const newMap = response.element.getAttribute("data-map");
    mapFrame.src = newMap;
  });
