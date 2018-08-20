import menubar from 'menubar'

const mb = menubar({
  index: `file://${process.cwd()}/app/app.html`,
  tooltip: 'click me!!',
  alwaysOnTop: true
})
mb.on('ready', () => {
  console.log('app is ready')
})
