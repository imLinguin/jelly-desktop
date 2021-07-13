import { BrowserWindow, app, ipcMain } from "electron"
import * as settings from "electron-settings"
import * as path from "path"
import {exec} from "child_process"
let window: BrowserWindow;
let child_processes = []
const isWindows = process.platform === "win32"
const isLinux = process.platform === "linux"
const isMac = process.platform === "darwin"


function allWindowsClosed() {
    if (!isMac) {
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
            nodeIntegration: true,
            devTools: true,
            contextIsolation: false,
            backgroundThrottling: false
        }
    })
}

function clipboardCatcher() {
    window.webContents.executeJavaScript("document.addEventListener('copy', function(e){ require('electron').ipcRenderer.send('openplayer',window.getSelection().toString()) })")
}

app.whenReady().then(() => {
    createMainWindow()
    let fpath = path.join(__dirname, "..", "src", "page", "index.html")
    window.loadFile(fpath)
    const ServerUrl = settings.hasSync("address") ? settings.getSync("address") : ""
    window.webContents.executeJavaScript(`window.ServerUrl = "${ServerUrl}"; setInputs()`)
    window.setMenuBarVisibility(false)
    window.show()
})

app.on("window-all-closed", allWindowsClosed)

ipcMain.on("connect", (event, url: string) => {
    require("electron-settings").setSync("address", url);
    if (window) {
        window.loadURL(url)
        clipboardCatcher()
    }
})
ipcMain.on("openplayer",(e,cmd:string)=>{
    child_processes.push(exec(`vlc ${cmd}`))
})