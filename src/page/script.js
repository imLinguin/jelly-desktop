function openWebsite() {
    require("electron").shell.openExternal("https://jellyfin.org");
}

if(navigator.language == "pl") {
    document.getElementById("heading-text").innerHTML = "Połącz z serwerem";
    document.getElementById("url").title = "Wypełnij to pole.";
    document.getElementById("port").title = "Wypełnij to pole.";
    document.getElementById("button-text").innerHTML = "Połącz";
}

else {
    document.getElementById("heading-text").innerHTML = `Connect to Server`;
    document.getElementById("url").title = "Fill in this field."
    document.getElementById("port").title = "Fill in this field.";
    document.getElementById("button-text").innerHTML = "Connect";
}

function connectToServer() {
    let ip = document.getElementById("url").value;
    let port = document.getElementById("port").value;
}