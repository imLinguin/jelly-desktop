if (navigator.language == "pl") {
    document.getElementById("heading-text").innerHTML = "Otwórz odtwarzacz";
    document.getElementById("command-label").innerHTML = "Polecenie startowe:"
    document.getElementById("command").placeholder = "np. vlc"
    document.getElementById("command").title = "Wypełnij to pole."
    document.getElementById("url").title = "Wypełnij to pole."
    document.getElementById("button-text").innerHTML = "Otwórz";
} else {
    document.getElementById("heading-text").innerHTML = "Open the Media Player";
    document.getElementById("command-label").innerHTML = "Startup command:";
    document.getElementById("command").placeholder = "e.g. vlc"
    document.getElementById("command").title = "Fill in this field."
    document.getElementById("url").title = "Fill in this field."
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

commandInput.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("open-button").click();
    }
})