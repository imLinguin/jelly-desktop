if (navigator.language == "pl") {
    document.getElementById("heading-text").innerHTML = "Otwórz odtwarzacz";
    document.getElementById("command-label").innerHTML = "Polecenie startowe:"
    document.getElementById("button-text").innerHTML = "Otwórz";
} else {
    document.getElementById("heading-text").innerHTML = "Open the Media Player";
    document.getElementById("command-label").innerHTML = "Startup command:";
    document.getElementById("button-text").innerHTML = "Open";
}

function openMediaPlayer() {
    console.log("clicked")
}