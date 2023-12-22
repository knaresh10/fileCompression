const {Router} = require('express')
const fs = require('fs')
const { exec } = require('child_process')


const upload = require('../middleware/multerConfig')
const downloadFileRouter = require('./downloadFile')

const router = Router()

router.use('/downloadFile', downloadFileRouter)

router.get('/', (req, res) => {
    res.render('fileUpload', {type : "decompression"})
})

router.get('/download', (req, res) => {
    res.render('downloadFile.ejs', {type : 'decompression'})
})

router.post('/upload', upload.single('textFile'), (req, res) => {

    let originalFileName = req.file.filename
    let tempFileName = originalFileName.split('.')
    let outputFileName = tempFileName[0] + "-decompressed.txt"
    let outputFilePath =  `./public/my-uploads/${outputFileName}`
    let inputFilePath =  `./public/my-uploads/${originalFileName}`

    req.session.inputFilePath = inputFilePath
    req.session.outputFilePath = outputFilePath

    fs.closeSync(fs.openSync(outputFilePath, 'w'))

    let command = `huffmanCodingDecompression ${inputFilePath} ${outputFilePath}`
    exec(command, (error, stdout, stderr) => {
        
    })
    res.redirect('/decompression/download')
})

module.exports = router