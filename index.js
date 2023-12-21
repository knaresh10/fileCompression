const express = require('express')
const compressionRouter = require('./routers/compression')
const decompressionRouter = require('./routers/decompression')

const app = express();
app.set('view engine', 'ejs')


app.use('/compression', compressionRouter)
app.use('/decompression', decompressionRouter)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('*', (req, res) => {
    res.redirect('/');
});


app.listen(8080, () => {
    console.log(`app is listening on http://localhost:${8080}`)
})