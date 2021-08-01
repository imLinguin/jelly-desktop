import { BrowserWindow, app, ipcMain, dialog } from "electron"
import * as settings from "electron-settings"
import * as path from "path"
import discovery from "./discovery"
import { exec } from "child_process"
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

function createMainWindow(): void {
    window = new BrowserWindow({
        title: "Jellyfin Desktop",
        width: 1000,
        height: 600,
        resizable: true,
        minimizable: true,
        frame: true,
        icon: path.join('images','favicon.png'),
        autoHideMenuBar: true,
        backgroundColor: "#101010",
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


function execJS(cmd: string): void {
    if (window) {
        window.webContents.executeJavaScript(cmd)
    }
}

function loadLandingPage() {
    let fpath = path.join(__dirname, "..", "src", "page", "index.html")
    window.loadFile(fpath)
    const ServerUrl = settings.hasSync("address") ? settings.getSync("address") : ""
    const urlarr = ServerUrl.toString().split(":");
    let port = urlarr[2];
    let url = urlarr[1] ? "http://" + urlarr[1].slice(2, urlarr[1].length): "";
    let cmd = `window.ServerUrl = "${ServerUrl}"; setInputs("${url.toString()}", ${port});`
    execJS(cmd)
}

app.whenReady().then(() => {
    createMainWindow()
    loadLandingPage()
    window.removeMenu()
    window.once('ready-to-show', async () => {
        window.show()
        //window.webContents.openDevTools({ mode: "detach" })
        await discovery(3000).then(val=>{
            execJS(`createDiscovery(${val})`)
        })
    })
})

app.on("window-all-closed", allWindowsClosed)

ipcMain.on("connect", (e, url: string) => {
    require("electron-settings").setSync("address", url);
    if (window) {
        window.loadURL(url).then(() => {
            clipboardCatcher()
        }).catch(e => {
            dialog.showMessageBox(window, {
                message: "Error loading URL, check your connection",
                buttons: ["Ok"],
            })
            loadLandingPage()
        })
    }
})
ipcMain.on("openplayer", (e, cmd: string) => {
    if (cmd.match(/Download\?api_key=/))
        child_processes.push(exec(`vlc ${cmd}`))
})