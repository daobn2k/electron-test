"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
let win = null;
const createWindow = () => {
    win = new electron_1.BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path_1.default.join(__dirname, "preload.cjs"),
            webSecurity: false, // Tắt web security để tránh CORS issues
            nodeIntegration: false,
            contextIsolation: true,
        },
    });
    electron_1.session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders["Origin"] = "*";
        callback({ cancel: false, requestHeaders: details.requestHeaders });
    });
    electron_1.session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                "Access-Control-Allow-Origin": ["*"],
                "Access-Control-Allow-Headers": ["*"],
            },
        });
    });
    if (process.env.VITE_DEV_SERVER_URL) {
        win.loadURL(process.env.VITE_DEV_SERVER_URL);
        win.webContents.openDevTools();
    }
    else {
        win.loadFile(path_1.default.join(__dirname, "../dist/index.html"));
    }
    win.on("closed", () => (win = null));
};
electron_1.app.whenReady().then(createWindow);
