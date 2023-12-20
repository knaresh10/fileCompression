const express = require('express')
const multer = require('multer')
const fs = require('fs')
const {exec} = require('child_process');
const { stdout, stderr } = require('process');

const app = express();
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home', {outputPath : ""})
})

//multer code for storage of file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/my-uploads')
    },
    filename: function (req, file, cb) {
        // let fileArray = file.originalname.split('.')
        // let fileName = fileArray[0]
        // let fileExtension = fileArray[1]
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })


app.post('/upload', upload.single('textFile'), (req, res) => {

    let originalFileName = req.file.filename
    let tempFileName = originalFileName.split('.')
    let outputFileName = tempFileName[0] + "-compressed.bin"
    let filePath = `./public/my-uploads/${outputFileName}`
    // console.log(outputFileName)
    fs.closeSync(fs.openSync(filePath, 'w'))

    let command = `huffmanCodingCompression ./public/my-uploads/${originalFileName} ./public/my-uploads/${outputFileName}`
    exec(command, (error, stdout, stderr) => {
        
    })
    res.render('home', {outputPath : filePath})
})

// app.get('/download/file', (req, res) => {

// })
app.listen(8080, () => {
    console.log(`app is listening on http://localhost:${8080}`)
})