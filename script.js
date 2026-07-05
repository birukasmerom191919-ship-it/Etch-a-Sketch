// 7. OBJECT CONSTRUCTORS
function Cell(index, color = "#ffffff") {
  this.index = index;
  this.color = color;
}

// 8 & 5. FACTORY FUNCTIONS & ORGANIZING CODE
const createEtchASketch = (containerId, resetBtnId, sizeInputId) => {
  // 4 & 6. OBJECT BASICS & OBJECTS
  const config = {
    defaultSize: 16,
    maxSize: 64,
    paintColor: "#2d3748",
  };

  // 3. DOM MANIPULATION
  const container = document.getElementById(containerId);
  const resetBtn = document.getElementById(resetBtnId);
  const sizeInput = document.getElementById(sizeInputId); // Grab the new input

  // 2. LOOPS AND ARRAYS
  let gridState = [];
  let currentSize = config.defaultSize;

  const init = () => {
    loadState();
    renderGrid();
    setupEvents();
  };

  // --- PERSISTENCE MANAGEMENT ---
  const loadState = () => {
    const savedState = localStorage.getItem("etchState");
    const savedSize = localStorage.getItem("etchSize");

    if (savedState && savedSize) {
      gridState = JSON.parse(savedState);
      currentSize = parseInt(savedSize, 10);
      sizeInput.value = currentSize; // Update the UI input to match saved data
    } else {
      buildNewState(currentSize);
    }
  };

  const buildNewState = (size) => {
    gridState = [];
    const totalCells = size * size;

    for (let i = 0; i < totalCells; i++) {
      gridState.push(new Cell(i));
    }
    saveState();
  };

  const saveState = () => {
    localStorage.setItem("etchState", JSON.stringify(gridState));
    localStorage.setItem("etchSize", currentSize.toString());
  };

  // --- UI RENDERING ---
  const renderGrid = () => {
    container.innerHTML = "";

    // Instead of hardcoding 500 pixels, we use 100% divided by the grid size.
    // E.g., if size is 10, each square takes exactly 10% of the flexible width/height.
    const squareSizePercent = 100 / currentSize;

    gridState.forEach((cell) => {
      const square = document.createElement("div");
      square.classList.add("grid-square");

      // Apply fluid percentage sizes
      square.style.width = `${squareSizePercent}%`;
      square.style.height = `${squareSizePercent}%`;
      square.style.backgroundColor = cell.color;

      square.dataset.index = cell.index;

      // Adding both mouseover (for desktop) and touchmove (for mobile devices)
      square.addEventListener("mouseover", draw);

      // Optional enhancement: Allow touch dragging on mobile
      square.addEventListener("touchmove", (e) => {
        e.preventDefault(); // Prevent page scrolling while drawing
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.classList.contains("grid-square")) {
          // Manually trigger the draw function for the touched element
          element.style.backgroundColor = config.paintColor;
          gridState[element.dataset.index].color = config.paintColor;
          saveState();
        }
      });

      container.appendChild(square);
    });
  };

  // --- INTERACTION CONTROLLERS ---
  const draw = (e) => {
    const index = e.target.dataset.index;

    e.target.style.backgroundColor = config.paintColor;
    gridState[index].color = config.paintColor;

    saveState();
  };

  // THE UPDATED RESET LOGIC (NO MORE POPUPS!)
  const resetGrid = () => {
    // Read directly from the DOM input element
    let newSize = parseInt(sizeInput.value, 10);

    // Validate the user's input
    if (newSize > config.maxSize) newSize = config.maxSize;
    if (newSize < 10 || isNaN(newSize)) newSize = config.defaultSize;

    // Enforce the validated number back into the input box
    currentSize = newSize;
    sizeInput.value = currentSize;

    buildNewState(currentSize);
    renderGrid();
  };

  const setupEvents = () => {
    resetBtn.addEventListener("click", resetGrid);
  };

  // 1. CLEAN CODE
  return {
    init,
  };
};

// Start the app (passing the new input ID)
const myApp = createEtchASketch(
  "grid-container",
  "reset-btn",
  "grid-size-input",
);
myApp.init();
