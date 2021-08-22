import { BrowserWindow, app, ipcMain, dialog } from "electron"
import * as settings from "electron-settings"
import * as path from "path"
import discovery from "./discovery"
import { exec } from "child_process"
import { checkForUpdates } from "./updater"
let window: BrowserWindow;
let openingMediaPlayerWindow: BrowserWindow;
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
        title: "Jelly Desktop",
        width: 1000,
        height: 600,
        minWidth: 500,
        minHeight: 54,
        resizable: true,
        minimizable: true,
        frame: true,
        icon: path.join(__dirname, "../images/icon.png"),
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

function createopeningMediaPlayerWindow(): void {
    openingMediaPlayerWindow = new BrowserWindow({
        title: "Jelly Desktop",
        width: 600,
        height: 350,
        resizable: false,
        minimizable: false,
        frame: true,
        icon: path.join(__dirname, "../images/icon.png"),
        autoHideMenuBar: true,
        backgroundColor: "#101010",
        webPreferences: {
            nodeIntegration: true,
            devTools: true,
            contextIsolation: false,
            backgroundThrottling: false
        }
    })
    openingMediaPlayerWindow.loadFile(path.join(__dirname, "..", "src", "openingMediaPlayer", "mediaPlayer.html"));
    openingMediaPlayerWindow.setMenuBarVisibility(false);
}

function clipboardCatcher() {
    execJS("document.addEventListener('copy', function(e){ require('electron').ipcRenderer.send('openplayer',window.getSelection().toString()) })")
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
    checkForUpdates()
    window.removeMenu()
    window.once('ready-to-show', async () => {
        window.show()
        window.webContents.openDevTools({ mode: "detach" })
        await discovery(3000).then(val=>{
            if (window.webContents.getURL().startsWith('file'))
                execJS(`createDiscovery(${val})`)
        })
    })
    window.on("close", allWindowsClosed)
})

ipcMain.on("connect", (e, url: string) => {
    if (window && !window.webContents.isLoading()) {
        window.loadURL(url).then(() => {
            clipboardCatcher()
            settings.setSync("address", url);
        }).catch(e => {
            dialog.showMessageBox(window, {
                message: "Error loading URL, check your connection",
                buttons: ["Ok"],
            }).then(()=>{
                loadLandingPage()
            })
        })
    }
})

ipcMain.on("openplayer", (e, cmd: string) => {
    if (cmd.match(/Download\?api_key=/)) {
        createopeningMediaPlayerWindow()
    }
})