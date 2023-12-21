const {Router} = require('express')
const path = require('path')
const fs = require('fs')

const router = Router()

router.get('/', (req, res) => {
    const originalFileName = req.query.fileName
    const tempFileName = originalFileName.split('.')
    const outputFileName = tempFileName[0] + "-compressed.bin"
    let outputFilePath =  `./public/my-uploads/${outputFileName}`
    let inputFilePath =  `./public/my-uploads/${originalFileName}`

    res.download(outputFilePath, (err) => {
        if(err) {

        } else {
            console.log("downloaded successfully")
            fs.unlink(inputFilePath, (unlinkErr) => {
                if(unlinkErr) {

                } else {
                    console.log('file deleted successfully')
                }
            })

            fs.unlink(outputFilePath, (unlinkErr) => {
                if(unlinkErr) throw unlinkErr;
                else {
                    console.log('deleted successfully')
                }
            })
        }
    })
})


module.exports = router