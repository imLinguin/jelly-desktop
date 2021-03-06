import { BrowserWindow, app, ipcMain, dialog } from "electron"
import * as settings from "electron-settings"
import * as path from "path"
import discovery from "./discovery"
import { exec } from "child_process"
import { checkForUpdates } from "./updater"
let window: BrowserWindow;
let openingMediaPlayerWindow: BrowserWindow;
const isWindows = process.platform === "win32"
const isLinux = process.platform === "linux"
const isMac = process.platform === "darwin"

function allWindowsClosed():void {
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

function createopeningMediaPlayerWindow(playerCommand:string, url:string): void {
    openingMediaPlayerWindow = new BrowserWindow({
        title: "Open Player",
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
    openingMediaPlayerWindow.webContents.once('did-finish-load', ()=>{
        openingMediaPlayerWindow.webContents.executeJavaScript(
            `window.plrCommand="${playerCommand}";window.mediaURL="${url}";updateInputData()`
            )
    })
}

function clipboardCatcher():void {
    console.debug("Injecting clipboard event catcher")
    execJS("document.addEventListener('copy', function(e){ require('electron').ipcRenderer.send('openplayer',window.getSelection().toString()) })")
}

function serverChooseButton():void{
    console.debug('Adding Change Server button to login page')
    const loginSelector = '#loginPage > div > div.readOnlyContent > button.raised.block.btnSelectServer.emby-button.hide'
    const loggedSelector = '#myPreferencesMenuPage > div > div > div.userSection.verticalSection.verticalSection-extrabottompadding > a.selectServer.hide.listItem-border.emby-button'
    // This basicly creates a interval for updating a login page
    // That recreates Change Server button
    execJS(`let timeout = setInterval(() => {const chooseServerButtonLogin = document.querySelector("${loginSelector}");const chooseServerButtonLogged = document.querySelector("${loggedSelector}");if (chooseServerButtonLogin) {const newButton = chooseServerButtonLogin.cloneNode(true);newButton.classList.remove("hide");newButton.addEventListener("click", (e) => {require("electron").ipcRenderer.send("loadLandingPage");});chooseServerButtonLogin.parentNode.replaceChild(newButton,chooseServerButtonLogin);}else if (chooseServerButtonLogged) {const newButton = chooseServerButtonLogged.cloneNode(true);newButton.classList.remove("hide");newButton.addEventListener("click", (e) => {require("electron").ipcRenderer.send("loadLandingPage");});chooseServerButtonLogged.parentNode.replaceChild(newButton,chooseServerButtonLogged);}}, 2000);`)
}

function execJS(cmd: string): void {
    if (window) {
        window.webContents.executeJavaScript(cmd)
    }
}

function loadLandingPage() {
    let fpath = path.join(__dirname, "..", "src", "page", "index.html")
    window.loadFile(fpath)
    const IP = settings.hasSync("address.ip") ? settings.getSync("address.ip") : ""
    const Port = settings.hasSync("address.port") ? settings.getSync("address.port") : ""
    let cmd = `setInputs("${IP}", ${Port});`
    execJS(cmd)
    startDiscovery()
}

app.whenReady().then(() => {
    createMainWindow()
    loadLandingPage()
    checkForUpdates()
    window.removeMenu()
    window.once('ready-to-show', async () => {
        window.show()
        //window.webContents.openDevTools({ mode: "detach" })
    })
    window.on("close", allWindowsClosed)
})

async function startDiscovery() {
    await discovery(3000).then(val=>{
        if (window.webContents.getURL().startsWith('file'))
            execJS(`createDiscovery(${val})`)
    })
}

ipcMain.on("connect", (e, url: string, ip:string, port:string) => {
    if (window && !window.webContents.isLoading()) {
        window.loadURL(url).finally(() => {
            clipboardCatcher()
            serverChooseButton()
            settings.setSync("address.ip", ip);
            settings.setSync("address.port", port)
        }).catch(e => {
            dialog.showMessageBox(window, {
                message: "Error loading URL, check your connection",
                buttons: ["Ok"],
            }).then(()=>{
                loadLandingPage()
                startDiscovery()
            })
        })
    }
})

ipcMain.on("loadLandingPage",(e)=>{
    loadLandingPage()
})

ipcMain.on("openplayer", (e, url: string) => {
    if (url.match(/Download\?api_key=/)) {
        let savedCommand = settings.hasSync("playerCommand") ? settings.getSync("playerCommand") : ""
        createopeningMediaPlayerWindow(savedCommand.toString(), url)
    }
})

ipcMain.on("executePlayer", (e, args) => {
    const command = `${args[0]} ${args[1]}`
    exec(command, (error, stdout, stderr)=>{
        if (error) {
            console.error(`exec error: ${error}`);
            dialog.showErrorBox("Execution Error", error.message)
            openingMediaPlayerWindow.show()
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    })
    settings.setSync("playerCommand", args[0])
    openingMediaPlayerWindow.hide()
})