import { BrowserWindow, app } from "electron"
import * as settings from "electron-settings"
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
        minimizable: true,
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
    const address = settings.get("address")
    if (address) 
        window.loadURL("http://10.8.0.1:8096")
    else
        //Todo
        console.log("Landing page")
    window.setMenuBarVisibility(false)
    window.show()
})

app.on("window-all-closed", allWindowsClosed)