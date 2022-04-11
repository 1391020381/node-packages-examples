var cp = require('child_process');

// cp.spawn('node', ['spawn.js'])

// cp.exec('node ./exec.js', function (err, stdout, stderr) {
//     console.log('exec:', err, stdout, stderr)
// })

cp.execFile('execFile.js', function (err, stdout, stderr) {
    console.log('execFile:', err, stdout, stderr)
})

// cp.fork('./worker.js')