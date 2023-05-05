const { app, BrowserWindow, Menu } = require("electron");
//const { selectSQL } = require("./main.js");

const isMac = process.platform === "darwin";

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }

  {
    label: "Home",
    click: async () => {
      const { mainWindow } = require("./index.js");
      mainWindow.loadFile("./index.html");
    },
  },
  {
    label: "Login",
    submenu: [
      {
        label: "Login",
        click: async () => {
          const { mainWindow } = require("./index.js");
          mainWindow.loadFile("./html/login.html");
        },
      },
      {
        label: "Register",
        click: async () => {
          const { mainWindow } = require("./index.js");
          mainWindow.loadFile("./html/create.html");
        },
      },
    ],
  },
  {
    label: "Dormir",
    click: async () => {
      const { mainWindow } = require("./index.js");
      mainWindow.loadFile("./html/sleep.html");
    },
  },
];

const menu = Menu.buildFromTemplate(template);
module.exports.menu = menu;
Menu.setApplicationMenu(menu);
