require("dotenv").config()
const express = require('express')
const sequilize = require('./db') // сопоставление таблиц БД и отношение между ними и классами
const models = require('./models/models')
const cors = require('cors') // роли, доступ
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path') // для работы с путями в файловой системе

const PORT = process.env.PORT || 5000


const app = express()
app.use(cors())
app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.use('/api', router)

app.use(errorHandler)


// подключение к БД
const start = async() => {
    try {
        await sequilize.authenticate() // подключение к БД
        await sequilize.sync() // сверяет состояние БД со схемой БД
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) // callback при успешном запуске сервера
    } catch (e) {
        console.log(e)
    }
}

start()