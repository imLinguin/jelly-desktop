function openWebsite() {
  require("electron").shell.openExternal("https://github.com/imLinguin/jelly-desktop");
}

if (navigator.language == "pl") {
  document.getElementById("heading-text").innerHTML = "Połącz z serwerem";
  document.getElementById("url").title = "Wypełnij to pole.";
  document.getElementById("port").title = "Wypełnij to pole.";
  document.getElementById("button-text").innerHTML = "Połącz";
  var errorTextLang = "Coś poszło nie tak, spróbuj ponownie";
} else {
  document.getElementById("heading-text").innerHTML = `Connect to Server`;
  document.getElementById("url").title = "Fill in this field.";
  document.getElementById("port").title = "Fill in this field.";
  document.getElementById("button-text").innerHTML = "Connect";
  var errorTextLang = "Something went wrong, please try again";
}

const urlInput = document.getElementById("url");
const portInput = document.getElementById("port");
const httpRegex = /http[s]?:\/\//

urlInput.addEventListener("input", (e)=>{
  if(!e.inputType == 'input')
    return
  if(urlInput.value.match(/https:\/\//)) {
    portInput.value = '443'
  }
})

function setInputs(ip, port) {
  console.log(ip, port);
  if (url) {
    urlInput.value = ip;
    portInput.value = port || 8096;
  } else {
    portInput.value = 8096;
  }
}

function connectToServer() {
  let ip = urlInput.value;
  let port = portInput.value;

  if (!ip.match(httpRegex) || !ip || !port) {
    urlInput.style.border = "solid 2px #FF6969";
    portInput.style.border = "solid 2px #FF6969";
    document.querySelector(".url-label").style.color = "#FF6969";
    document.querySelector(".port-label").style.color = "#FF6969";

    let errorText = document.createElement("p");
    errorText.id = "error-text";
    errorText.innerHTML = errorTextLang;
    document.getElementById("error-container").appendChild(errorText);

    document.getElementById("connect-button").disabled = true;

    setTimeout(() => {
      clearError()
    }, 2700);
    return;
  }
  url = craftURL(ip, port)
  require("electron").ipcRenderer.send("connect", url, ip, port);
}

function craftURL(ip, port) {
  // Allows to use ports in domain names
  let url = ""
  let slashPos = ip.indexOf("/", 8)
  if (slashPos > 0){
    url = ip.slice(0, slashPos) + `:${port}` + ip.slice(slashPos)
  }
  else{
    url = `${ip}:${port}`
  }
  return url
}

function clearError() {
  urlInput.style.border = "";
  portInput.style.border = "";
  document.querySelector(".url-label").style.color = "";
  document.querySelector(".port-label").style.color = "";

  document.getElementById("error-text").remove();
  document.getElementById("connect-button").disabled = false;
}

function createDiscovery(servers) {
  const div = document.getElementById("discovery-container");
  const div2 = document.getElementById("discovery-text");
  for (server of servers) {
    console.log(server);
    let button = document.createElement("button");
    let text = document.createElement("h2");
    button.id = "discovery-button";
    button.onclick = (e) => {
      let text = server.Address;
      const arr = text.split(":");
      setInputs(arr[0] + ":" + arr[1], arr[2]);
    };
    div.appendChild(button);
    div2.appendChild(text);

    let pIP = document.createElement("p");
    pIP.id = "discovery-button-text";
    pIP.innerHTML = server.Address.replace(/http(s)?\:\/\//, "");
    document.getElementById("discovery-button").appendChild(pIP);

    if (navigator.language == "pl") {
      document.querySelector("h2").innerHTML = "Wybierz z listy:";
      button.title = `Nazwa: ${server.Name}`;
    } else {
      document.querySelector("h2").innerHTML = "Choose from the list:";
      button.title = `Name: ${server.Name}`;
    }
  }
}
