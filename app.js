const express = require ('express')
const cors = require ('cors')

const app = express ();



// middleware

app.use(express.json())

app.use(express.urlencoded({extended: true}))

// router
const router = require ('./routes/routes.js')
app.use('/api/company', router)


//testing api
app.get('/', (req, res) => {
    res.json({ message: 'hello from api' })
})

// port
const PORT = process.env.PORT || 8080

// server
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})