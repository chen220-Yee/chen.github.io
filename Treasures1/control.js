// 保存玩家信息
  function savePlayerInfo(player) {
    localStorage.setItem(`playerId-${player.id}`, player.id);
    localStorage.setItem(`playerName-${player.id}`, player.name);
    localStorage.setItem(`playerHistory-${player.id}`, JSON.stringify(player.history));
    localStorage.setItem('currentPlayerId', player.id);
    localStorage.setItem('currentPlayerName', player.name);
}

// 加载玩家信息
function loadPlayerInfo() {
    const players = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('playerId-')) {
            const playerId = localStorage.getItem(key);
            const playerName = localStorage.getItem(`playerName-${playerId}`);
            const playerHistory = JSON.parse(localStorage.getItem(`playerHistory-${playerId}`)) || [];
            players.push({ id: playerId, name: playerName, history: playerHistory });
            
        }
    }
    return players;
}

function displayPlayerInfo1(player) {
    const tableBody = document.querySelector("#player-info-table tbody");
    tableBody.innerHTML = `
        <tr>
            <td>${player.id}</td>
            <td>${player.name}</td>
            <td>${player.history.map(h => `${h.date}: ${h.result}`).join('<br>')}</td>
            <td><button onclick="deletePlayer('${player.id}')">删除</button></td>
        </tr>
    `;
}

function displayPlayerInfo(player) {
    const tableBody = document.querySelector("#player-info-table tbody");
    tableBody.innerHTML += `
        <tr>
            <td>${player.id}</td>
            <td>${player.name}</td>
            <td>${player.history.map(h => `${h.date}: ${h.result}`).join('<br>')}</td>
            <td><button onclick="deletePlayer('${player.id}')">删除</button></td>
        </tr>
    `;
}
function displayAllPlayers(players) {
    const playerTable = document.querySelector("#player-info-table tbody");
    playerTable.innerHTML = ''; // 清空表格
    players.forEach(player => {
        displayPlayerInfo(player);
    });
}

function addPlayer(){
    const playerId=document.getElementById('new-player-id').value;
    const playerName=document.getElementById('new-player-name').value;
    if(playerId&&playerName){
        const players=loadPlayerInfo();
        players.push({id:playerId,name:playerName,history:[]});
        const player={id:playerId,name:playerName,history:[]};
        displayAllPlayers(players);
        savePlayerInfo(player);
    }
}

// 删除玩家
function deletePlayer(playerId) {
    const players = loadPlayerInfo();
    const updatedPlayers = players.filter(player => player.id !== playerId);
    displayAllPlayers(updatedPlayers);
    localStorage.removeItem(`playerId-${playerId}`);
    localStorage.removeItem(`playerName-${playerId}`);
    localStorage.removeItem(`playerHistory-${playerId}`);
    updatedPlayers.forEach(player => {
        savePlayerInfo(player); // 更新 localStorage
    });
}

function selectPlayer() {
    const selectedPlayerId = document.getElementById('new-player-id').value;
    const players = loadPlayerInfo();
    const selectedPlayer = players.find(player => player.id === selectedPlayerId);
    if (selectedPlayer) {
        localStorage.setItem('currentPlayerId', selectedPlayer.id);
        localStorage.setItem('currentPlayerName', selectedPlayer.name);
        displayPlayerInfo1(selectedPlayer);
    }
    else {
        alert('玩家不存在');
    }
}
// 更新玩家历史记录
function updatePlayerHistory(result) {
  const players = loadPlayerInfo();
  const currentPlayerId = localStorage.getItem('currentPlayerId');
  const player = players.find(player => player.id === currentPlayerId);
  if (player) {
      const date = new Date().toLocaleString();
      player.history.push({ date, result });
      savePlayerInfo(player);
      displayPlayerInfo(player);
  }
}
// 加载并显示玩家信息
const players = loadPlayerInfo();
if (players==null||players.length==0) {
// 设置默认玩家信息
    loadedPlayer = {
      id: '12345',
      name: 'TreasureHunter',
      history: []
};
    savePlayerInfo(loadedPlayer);
}
displayAllPlayers(players);

 