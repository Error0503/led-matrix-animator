const matrix = new Array(8).fill().map(() => Array(8).fill());
const animation = new Array(0);
const savedFrames = document.createElement("fieldset");

const leftDiv = document.getElementById("left");
const rightDiv = document.getElementById("right");

const init = () => {
  const table = document.createElement("table");
  table.className = "main-table";

  for (let y = 0; y < 8; y++) {
    const tr = document.createElement("tr");
    table.appendChild(tr);
    for (let x = 0; x < 8; x++) {
      const td = document.createElement("td");
      const label = document.createElement("label");
      label.className = "container";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      const span = document.createElement("span");
      span.className = "checkmark";
      label.appendChild(checkbox);
      label.appendChild(span);
      td.appendChild(label);
      tr.appendChild(td);
      matrix[x][y] = checkbox;
    }
  }

  leftDiv.appendChild(table);

  const buttonDiv = document.createElement("div");
  buttonDiv.style.display = "flex";
  buttonDiv.style.marginTop = "1em";

  const clearButton = document.createElement("button");
  clearButton.addEventListener("click", clear);
  clearButton.textContent = "Clear";

  const saveFrameButton = document.createElement("button");
  saveFrameButton.addEventListener("click", saveFrame);
  saveFrameButton.textContent = "Save frame";

  const saveAnimationButton = document.createElement("button");
  saveAnimationButton.addEventListener("click", save);
  saveAnimationButton.textContent = "Save animation";

  const p = document.createElement("p");
  p.innerHTML = "Saved frames:";
  savedFrames.className = "saved-frames";

  buttonDiv.appendChild(clearButton);
  buttonDiv.appendChild(saveFrameButton);
  buttonDiv.appendChild(saveAnimationButton);
  leftDiv.appendChild(buttonDiv);
  leftDiv.appendChild(p);
  leftDiv.appendChild(savedFrames);

  const copyButton = document.createElement("button");
  copyButton.addEventListener("click", copyToClipboard);
  copyButton.textContent = "Save to clipboard";
  rightDiv.appendChild(copyButton);
};

const clear = () => {
  matrix.forEach((row) => row.forEach((cell) => (cell.checked = false)));
};

const saveFrame = () => {
  animation.push(
    matrix.map((row) => {
      return row.map((cell) => {
        return cell.checked;
      });
    })
  );

  const container = document.createElement("label");
  container.className = "mini-container";
  const table = document.createElement("table");
  table.className = "mini-table";
  for (let y = 0; y < 8; y++) {
    const tr = document.createElement("tr");
    table.appendChild(tr);
    for (let x = 0; x < 8; x++) {
      const td = document.createElement("td");
      td.style.borderRadius = "100%";
      td.style.backgroundColor = matrix[x][y].checked ? "red" : "white";
      tr.appendChild(td);
    }
  }
  container.appendChild(table);
  savedFrames.appendChild(container);

  console.log(animation);
};

const save = () => {
  let content = `const byte animation[${animation.length}][8] = \n{\n${animation
    .map((frame) => "\t{" + frame.map((row) => "0b" + row.map((cell) => (cell ? "1" : "0")).join("")) + "}")
    .join(",\n")}\n};`;

  download.textContent = content;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(document.getElementById("download").textContent);
};

init();
