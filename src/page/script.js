function openWebsite() {
  require("electron").shell.openExternal("https://jellyfin.org");
}

if (navigator.language == "pl") {
  document.getElementById("heading-text").innerHTML = "Połącz z serwerem";
  document.getElementById("url").title = "Wypełnij to pole.";
  document.getElementById("port").title = "Wypełnij to pole.";
  document.getElementById("button-text").innerHTML = "Połącz";
} else {
  document.getElementById("heading-text").innerHTML = `Connect to Server`;
  document.getElementById("url").title = "Fill in this field.";
  document.getElementById("port").title = "Fill in this field.";
  document.getElementById("button-text").innerHTML = "Connect";
}

const urlInput = document.getElementById("url");
const portInput = document.getElementById("port");

function setInputs(url, port) {
  console.log(url,port);
  if (url) {
    urlInput.value = url;
    portInput.value = port || 8096;
  }
  else {
    portInput.value = 8096
  }
}
function connectToServer() {
  let ip = urlInput.value;
  let port = portInput.value;

  if(!ip.match(/http[s]?:\/\//) || !ip || !port) {
    alert(navigator.language == "pl" ? "Podaj poprawne dane" : "Please provide valid data")  
    return
  }

  const tmpurl = `${ip}:${port}`;

  require("electron").ipcRenderer.send("connect",tmpurl)
}

function createDiscovery(servers) {
  const div = document.getElementById("discovery-container")
  for (server of servers) {
    console.log(server);
    let button = document.createElement("button")
    button.innerText = server.EndpointAddress
    button.id = "button-text"
    button.title = `${server.Address}\n${server.Name}`
    button.onclick = (e)=>{
      let text = server.Address;
      const arr = text.split(":")
      setInputs(arr[0]+":"+arr[1],arr[2])
    }
    div.appendChild(button)
  }
}