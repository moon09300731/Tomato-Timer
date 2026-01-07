const { app, BrowserWindow, ipcMain, nativeTheme, Notification } = require('electron');
const path = require('path');

let mainWindow;
let settingsWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
    resizable: false,
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#2e2e2e' : '#ffffff',
  });

  mainWindow.loadFile('src/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Window finished loading, sending welcome notification');
    setTimeout(() => {
      try {
        const welcomeNotification = new Notification({
          title: '番茄钟',
          body: '欢迎使用番茄钟！应用已就绪。',
        });
        welcomeNotification.show();
        console.log('Welcome notification sent');
      } catch (error) {
        console.error('Failed to send welcome notification:', error);
      }
    }, 1000);
  });

  nativeTheme.on('updated', () => {
    if (mainWindow) {
      mainWindow.webContents.send('theme-changed', nativeTheme.shouldUseDarkColors);
    }
  });
}

function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
    width: 550,
    height: 520,
    parent: mainWindow,
    modal: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#2e2e2e' : '#ffffff',
  });

  settingsWindow.loadFile('src/settings.html');

  settingsWindow.on('close', (event) => {
    event.preventDefault();
    settingsWindow.hide();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('show-settings', () => {
  if (!mainWindow) {
    console.warn('mainWindow is not available');
    return;
  }
  if (!settingsWindow) {
    createSettingsWindow();
  }
  settingsWindow.show();
});

ipcMain.on('close-settings', () => {
  if (settingsWindow) {
    settingsWindow.hide();
  }
});

ipcMain.on('notify-work-end', () => {
  console.log('Sending work end notification');
  const notification = new Notification({
    title: '番茄钟',
    body: '工作时间结束！该休息了。',
  });
  notification.on('show', () => console.log('Work notification shown'));
  notification.on('click', () => console.log('Work notification clicked'));
  notification.on('close', () => console.log('Work notification closed'));
  notification.on('failed', (error) => console.error('Work notification failed:', error));
  notification.show();
});

ipcMain.on('notify-break-end', () => {
  console.log('Sending break end notification');
  const notification = new Notification({
    title: '番茄钟',
    body: '休息时间结束！该工作了。',
  });
  notification.on('show', () => console.log('Break notification shown'));
  notification.on('click', () => console.log('Break notification clicked'));
  notification.on('close', () => console.log('Break notification closed'));
  notification.on('failed', (error) => console.error('Break notification failed:', error));
  notification.show();
});

ipcMain.on('get-theme', (event) => {
  event.returnValue = nativeTheme.shouldUseDarkColors;
});

ipcMain.on('settings-saved', () => {
  if (mainWindow) {
    mainWindow.webContents.send('settings-saved');
  }
});