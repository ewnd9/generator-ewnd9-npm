'use strict';

const fs = require('fs');
const path = require('path');
const electron = require('electron');

let win;

electron.app.on('ready', () => {
  const indexProd = 'file://' + path.resolve(__dirname, '..', 'public', 'index.html');
  const indexDev = 'file://' + path.resolve(__dirname, '..', 'public', 'index-dev.html');
  const indexHtml = process.env.NODE_ENV === 'production' ? indexProd : indexDev;

  win = new electron.BrowserWindow({
    show: true
  });

  win.loadURL(indexHtml);
});
