const STAT_NAMES = ['STR', 'CON', 'POW', 'DEX', 'APP', 'SIZ', 'INT', 'EDU', '幸運'];
let tableCount = 0;

// ロール結果を表示する
function displayStats(stats, hp, db) {
  let outputDiv = document.getElementById("output");

  // Add a number for the new table
  let numberDiv = document.createElement('div');
  numberDiv.classList.add('number');
  numberDiv.innerText = '結果... ' + (tableCount + 1);
  outputDiv.appendChild(numberDiv);

  // Create a table
  let table = document.createElement('table');

  let nameRow = document.createElement('tr');
  let valueRow = document.createElement('tr');

  // Add HP and DB to stat names and values
  let allNames = STAT_NAMES.concat(['HP', 'DB']);
  let allValues = stats.concat([hp, db]);

  for (let i = 0; i < allValues.length; i++) {
    let nameCell = document.createElement('td');
    nameCell.innerText = allNames[i];
    nameRow.appendChild(nameCell);

    let valueCell = document.createElement('td');
    valueCell.innerText = allValues[i];
    valueCell.style.cursor = 'pointer';
    valueCell.title = 'Click to copy';
    valueCell.onclick = function () {
      copyToClipboard(allValues[i]);
    };
    valueRow.appendChild(valueCell);
  }

  table.appendChild(nameRow);
  table.appendChild(valueRow);
  outputDiv.appendChild(table);

  // Increment the table count
  tableCount++;
}

// ロール結果を取得する
function calculateStats() {
  let input = document.getElementById("diceInput").value;

  // Split the input by # to handle multiple roll results
  let rollInputs = input.split('#');

  for (let j = 0; j < rollInputs.length; j++) {
    if (rollInputs[j].trim() === '') continue;  // skip empty sections

    let diceRolls = rollInputs[j].split(' ＞ ')[1].split('+'); // ロール結果を取得

    diceRolls = diceRolls.map(roll => {
      let rollParts = roll.split('[');
      let rollValue = parseInt(rollParts[0]);
      let diceCount = rollParts[1].split(',').length;

      // もしダイスが2つなら、ダイスの目を6倍する
      if (diceCount === 2) {
        rollValue += 6;
      }
      return rollValue * 5; // ５倍する
    });

    // HPを計算する
    let hp = calculateHP(diceRolls[1], diceRolls[5]);

    // DBを計算する
    let db = calculateDB(diceRolls[0], diceRolls[5]);

    displayStats(diceRolls, hp, db);
  }

  // ボタンが押された後、入力エリアを空にする
  document.getElementById("diceInput").value = '';
}



// HPを計算する
function calculateHP(con, siz) {
  return Math.floor((con + siz) / 10);
}

// DBを計算する
function calculateDB(str, siz) {
  let total = str + siz;
  if (total >= 2 && total <= 6) {
    return "-2";
  } else if (total >= 65 && total <= 84) {
    return "-1";
  } else if (total >= 85 && total <= 124) {
    return "0";
  } else if (total >= 125 && total <= 164) {
    return "+1d4";
  } else if (total >= 165 && total <= 204) {
    return "+1D6";
  } else if (total >= 205 && total <= 284) {
    return "+2d6";
  } else if (total >= 285 && total <= 364) {
    return "+3d6";
  } else if (total >= 365 && total <= 444) {
    return "+4d6";
  } else if (total >= 445 && total <= 524) {
    return "+5d6";
  } else {
    return "Invalid";
  }
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