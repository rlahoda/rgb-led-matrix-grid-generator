let columns = 5;
let rows = 5;
let matrixArr = [
  ["0x000000", "0x000000", "0x000000", "0x000000", "0x000000"],
  ["0x000000", "0x000000", "0x000000", "0x000000", "0x000000"],
  ["0x000000", "0x000000", "0x000000", "0x000000", "0x000000"],
  ["0x000000", "0x000000", "0x000000", "0x000000", "0x000000"],
  ["0x000000", "0x000000", "0x000000", "0x000000", "0x000000"],
];

const valueToHex = function (value) {
  const hex = Number(value).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};

const rgbToHex = function (r, g, b) {
  const rHex = valueToHex(r);
  const gHex = valueToHex(g);
  const bHex = valueToHex(b);
  return rHex + gHex + bHex;
};

function generateMatrix() {
  const newArr = [...matrixArr];
  const rowsNum = newArr.length;
  const colsNum = newArr[0].length;

  if (rows > rowsNum) {
    const newRow = [];
    for (let i = 0; i < colsNum; i++) {
      newRow.push("0x000000");
    }
    newArr.push(newRow);
  } else if (rows < rowsNum) {
    newArr.pop();
  }

  if (columns > colsNum) {
    newArr.map(r => {
      r.push("0x000000");
    });
  } else if (columns < colsNum) {
    newArr.map(r => {
      r.pop();
    });
  }
  matrixArr = newArr;
  generateGrid();
}

function setCol(event) {
  columns = event.target.value;
  generateMatrix();
}

function setRows(event) {
  rows = event.target.value;
  generateMatrix();
}

function generateGrid() {
  const gridContainer = document.querySelector("#grid-container");
  gridContainer.setAttribute(
    "style",
    `grid-template-columns: repeat(${columns}, minmax(auto, 100px)); grid-template-rows: repeat(${rows},1fr);`
  );
  const gridArr = [];

  matrixArr.map((row, index) => {
    const rowIndex = index;
    row.map((col, index) => {
      const colIndex = index;

      gridArr.push(
        ` <div class="grid-item" id="${rowIndex}-${colIndex}" style="background-color:#${col.substring(
          2
        )};"></div>`
      );
    });
  });

  for (let i = 0; i < rows; i++) {
    for (let q = 0; q < columns; q++) {}
  }
  gridContainer.innerHTML = gridArr.join("");
}

function initialize() {
  const col = document.querySelector("#columns-input");
  col.addEventListener("change", setCol);
  const rows = document.querySelector("#rows-input");
  rows.addEventListener("change", setRows);
}

initialize();
generateGrid();
