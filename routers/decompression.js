const {Router} = require('express')

const upload = require('../middleware/multerConfig')
const router = Router()

router.get('/', (req, res) => {
    res.render('fileUpload', {type : "decompression"})
})


router.post('/upload', upload.single('textFile'), (req, res) => {

    let originalFileName = req.file.filename
    let tempFileName = originalFileName.split('.')
    let outputFileName = tempFileName[0] + "-decompressed.txt"
    let outputFilePath =  `./public/my-uploads/${outputFileName}`
    let inputFilePath =  `./public/my-uploads/${originalFileName}`

    fs.closeSync(fs.openSync(outputFilePath, 'w'))

    let command = `huffmanCodingCompression ${inputFilePath} ${outputFilePath}`
    exec(command, (error, stdout, stderr) => {
        
    })
    res.render('download', {fileName : originalFileName})
})

module.exports = router