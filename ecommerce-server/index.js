require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8800

app.listen(PORT, () => {
    console.log(`¡Servidor en ejecución! PORT: ${PORT}`)
})