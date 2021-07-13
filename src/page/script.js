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

function setInputs() {
  if (window.ServerUrl) {
    const url = window.ServerUrl.split(":");
    urlInput.value = "http://" + url[1].slice(2,url[1].length);
    portInput.value = url[2];
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
