const STAT_NAMES = ['STR', 'CON', 'POW', 'DEX', 'APP', 'SIZ', 'INT', 'EDU', '幸運'];

function calculateStats() {
  let input = document.getElementById("diceInput").value;
  let diceRolls = input.split(' ＞ ')[1].split('+'); // Separate the dice rolls

  diceRolls = diceRolls.map(roll => {
    let rollParts = roll.split('[');
    let rollValue = parseInt(rollParts[0]);
    let diceCount = rollParts[1].split(',').length;

    // If dice count is 2, add 6 to the roll value
    if (diceCount === 2) {
      rollValue += 6;
    }
    return rollValue * 5; // Multiply the roll value by 5
  });

  displayStats(diceRolls);
}

function displayStats(stats) {
  let outputDiv = document.getElementById("output");
  outputDiv.innerHTML = '';

  // Create a table
  let table = document.createElement('table');

  let nameRow = document.createElement('tr');
  let valueRow = document.createElement('tr');
  for (let i = 0; i < stats.length; i++) {
    let nameCell = document.createElement('td');
    nameCell.innerText = STAT_NAMES[i];
    nameRow.appendChild(nameCell);

    let valueCell = document.createElement('td');
    valueCell.innerText = stats[i];
    valueCell.style.cursor = 'pointer';
    valueCell.title = 'Click to copy';
    valueCell.onclick = function () {
      copyToClipboard(stats[i]);
    };
    valueRow.appendChild(valueCell);
  }

  table.appendChild(nameRow);
  table.appendChild(valueRow);
  outputDiv.appendChild(table);
}

function copyToClipboard(text) {
  // Create a dummy input to hold the text for copying
  let dummy = document.createElement('input');
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);

  let copiedMessage = document.getElementById("copiedMessage");
  copiedMessage.style.opacity = '0';

  // Wait for 200ms for the message to fade out, then change the message and fade it back in.
  setTimeout(function () {
    copiedMessage.innerText = text + 'をコピーしました！';
    copiedMessage.style.opacity = '1';
  }, 200);
}


function copyToClipboard2() {
  var textToCopy = "x3 3d6+3d6+3d6+3d6+3d6+2d6+2d6+2d6+3d6";
  navigator.clipboard.writeText(textToCopy);

  var notification = document.getElementById("clipboard__notification");
  notification.textContent = "コードをコピーしました！";
  notification.classList.add("clipboard__notification--visible");

  setTimeout(function () {
    notification.textContent = "";
    notification.classList.remove("clipboard__notification--visible");
  }, 3000);
}