if (navigator.language == "pl") {
    document.getElementById("heading-text").innerHTML = "Otwórz odtwarzacz";
    document.getElementById("command-label").innerHTML = "Polecenie startowe:"
    document.getElementById("button-text").innerHTML = "Otwórz";
} else {
    document.getElementById("heading-text").innerHTML = "Open the Media Player";
    document.getElementById("command-label").innerHTML = "Startup command:";
    document.getElementById("button-text").innerHTML = "Open";
}

const commandInput = document.getElementById("command")
const urlInput = document.getElementById("url")

function updateInputData(){
    urlInput.value = window.mediaURL
    commandInput.value = window.plrCommand
}

function openMediaPlayer() {
    if(!commandInput.value) {
        return
    }
    require("electron").ipcRenderer.send("executePlayer", [commandInput.value, urlInput.value])
}