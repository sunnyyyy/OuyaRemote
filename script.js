let ws = new WebSocket('wss://ouya-d5d9c4a079ca.herokuapp.com:443');

let controllTD = document.querySelector('.controllTD') ;
let textTD = document.querySelector('.sendTD') ;
let videoTD = document.querySelector('.controlvideo') ;
let videospeedTD = document.querySelector('.videospeed') ;

const value = document.querySelector("#value");
const input = document.querySelector("#speed_input");
value.textContent = input.value;
input.addEventListener("input", (event) => {
  value.textContent = event.target.value;
});

let state = { 
  "sliderOne": 0,
  "juliaSays": "hello!",
  "sliderTwo": 0,
  "sliderThree":0,
}

const sendToTd = () => { 
  const string = JSON.stringify(state)
  ws.send(string)
}

controllTD.addEventListener('input', (event) => {
  state.sliderOne = controllTD.value / 100
  sendToTd()
}, false);

videoTD.addEventListener('input', (event) => {
  state.sliderTwo = videoTD.value / 100
  sendToTd()
}, false);

videospeedTD.addEventListener('input', (event) => {
  state.sliderThree = videospeedTD.value / 100
  sendToTd()
}, false);

textTD.addEventListener('change', (event) => {
  state.juliaSays = textTD.value
  sendToTd()
});

let controlledByTD = document.querySelector('.controlledByTD');

ws.addEventListener('open', (event) => {
  console.log('Socket connection open');
  // alert('Successfully connected to socket server 🎉');
  ws.send('pong');
});

ws.addEventListener('message', (message) => {
  if (message && message.data) {
    if (message.data === "ping") {
      console.log("got ping");
      ws.send("pong");
      return;
    }
    let data = JSON.parse(message.data);
    if (data) {
      if ("slider1" in data) {
        controlledByTD.value = data["slider1"] * 100;
      }
      console.log("got data", data);
    }
  }
  console.log("message", message)
});

ws.addEventListener('error', (error) => {
    console.error('Error in the connection', error);
    alert('error connecting socket server', error);
});

ws.addEventListener('close', (event) => {
    console.log('Socket connection closed');
    alert('closing socket server');
});
