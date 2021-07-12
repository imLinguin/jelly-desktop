import { BrowserWindow, app } from "electron"
import * as settings from "electron-settings"
import * as path from "path"
let window: BrowserWindow;

const isWindows = process.platform === "win32"
const isLinux = process.platform === "linux"
const isMac = process.platform === "darwin"


function allWindowsClosed() {
    if(!isMac) {
        app.quit()
    }
}

function createMainWindow() {
    window = new BrowserWindow({
        title: "Jellyfin Desktop",
        width: 1000,
        height: 600,
        resizable: true,
        minimizable: true,
        frame: true,
        icon: "../images/favicon.png",
        webPreferences: {
            nodeIntegration: false,
            devTools: true,
            contextIsolation: true,
            backgroundThrottling: false
        }
    })
}


app.whenReady().then(()=>{
    createMainWindow()
    const address = settings.getSync("address")
    if (address) {
        window.loadURL(address.toString())
    }
    else {
        let fpath = path.join(__dirname,"..","src","page","index.html")
        console.log(fpath);
        window.loadFile(fpath)
    }
    window.setMenuBarVisibility(false)
    window.show()
})

app.on("window-all-closed", allWindowsClosed)