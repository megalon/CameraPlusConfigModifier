const WebSocket = require("ws");
const cameraplus = require("./cameraplusHandler");

let fullCombo = true;

let wsHTTPStatusSocket;

function connectWS() {
  wsHTTPStatusSocket = new WebSocket("ws://localhost:6557/socket");
}

connectWS();

// HTTP Status
wsHTTPStatusSocket.addEventListener("open", () => {
  console.log("HTTP Status WS opened");
});

wsHTTPStatusSocket.addEventListener("message", message => {
  var data = JSON.parse(message.data);
  //console.log(data);

  if (data.event === "songStart") {
    fullCombo = true;
    cameraplus.setCameraSong();
  }

  if (data.event === "songEnd") {
  }

  if (data.event === "failed") {
  }

  if (data.event === "pause") {
  }

  if (data.event === "resume") {
  }

  if (data.event === "menu") {
    cameraplus.setCameraMenu();
  }

  if (data.event === "noteCut") {
  }

  if (data.event === "noteFullyCut") {
  }

  if (data.event === "noteMissed") {
    fullCombo = false;
  }

  if (data.event === "bombCut") {
    fullCombo = false;
  }

  if (data.event === "bombMissed") {
  }

  if (data.event === "obstacleEnter") {
    fullCombo = false;
  }

  if (data.event === "obstacleExit") {
  }

  if (data.event === "beatmapEvent") {
  }
});

wsHTTPStatusSocket.onclose = () => {
  setTimeout(connectWS, 5000);
};
