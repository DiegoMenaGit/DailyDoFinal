const {
  app,
  BrowserWindow,
  webContents,
  session,
  Menu,
  ipcMain,
} = require("electron");
//const { holdReady, data } = require("jquery");
//const { menu } = require("./menu.js");

let mainWindow;

function createWindow() {
  menubar = true;
  //let customSes = session.fromPartition("part1");

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 300,
    minHeight: 150,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");
  // const { menu } = require("./menu");
  module.exports.mainWindow = mainWindow;
  mainWindow.webContents.openDevTools();
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
