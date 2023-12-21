const {Router} = require('express')
const {exec} = require('child_process')
const fs = require('fs')
const path = require('path')

const upload = require('../middleware/multerConfig')
const downloadFileRouter = require('./downloadFile')


const router = Router()

router.use('/download', downloadFileRouter)
router.get('/', (req, res) => {
    res.render('fileUpload', {type : "compression"})
})

router.post('/upload', upload.single('textFile'), (req, res) => {

    let originalFileName = req.file.filename
    let tempFileName = originalFileName.split('.')
    let outputFileName = tempFileName[0] + "-compressed.bin"
    let outputFilePath =  `./public/my-uploads/${outputFileName}`
    let inputFilePath =  `./public/my-uploads/${originalFileName}`

    fs.closeSync(fs.openSync(outputFilePath, 'w'))

    let command = `huffmanCodingCompression ${inputFilePath} ${outputFilePath}`
    exec(command, (error, stdout, stderr) => {
        
    })
    res.render('download', {fileName : originalFileName})
})


module.exports = router