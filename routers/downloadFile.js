const {Router} = require('express')
const path = require('path')
const fs = require('fs')

const router = Router()

router.get('/', (req, res) => {
    const outputFilePath = req.session.outputFilePath
    const inputFilePath = req.session.inputFilePath
    
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