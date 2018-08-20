import "./stylesheets/main.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

import "xel/xel.min.js";

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { remote } from "electron";
import jetpack from "fs-jetpack";
import { greet } from "./hello_world/hello_world";
import env from "env";

import { ipcRenderer as ipc } from 'electron';

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read("package.json", "json");

const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};

document.querySelector("#app").style.display = "block";
document.querySelector("#greet").innerHTML = greet();
document.querySelector("#os").innerHTML = osMap[process.platform];
document.querySelector("#author").innerHTML = manifest.author;
document.querySelector("#env").innerHTML = env.name;
document.querySelector("#electron-version").innerHTML =
  process.versions.electron;

const drs = document.querySelectorAll('[draggable]')

function handleDragStart(e) {
  this.style.opacity = '0.4'
  ipc.send('create-new-window', {
    x: e.screenX,
    y: e.screenY
  })
}

[].forEach.call(drs, col => {
  col.addEventListener('dragend', handleDragStart, false)
})

const s = location.hash
document.querySelector('#pageTitle').innerHTML = s
