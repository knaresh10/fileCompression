const express = require('express')
const session = require('express-session')

const compressionRouter = require('./routers/compression')
const decompressionRouter = require('./routers/decompression')

const app = express();
app.set('view engine', 'ejs')

app.use(session({
    secret: "thisismysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge : 1000 * 60 * 60} // session timeout of 60 min
}))

app.use('/compression', compressionRouter)
app.use('/decompression', decompressionRouter)

app.get('/', (req, res) => {
    const sessionData = req.session
    // console.log(sessionData)
    res.render('home')
})

app.get('*', (req, res) => {
    res.redirect('/');
});


app.listen(8080, () => {
    console.log(`app is listening on http://localhost:${8080}`)
})