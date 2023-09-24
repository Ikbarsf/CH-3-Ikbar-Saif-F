const app = require("./app")

const port = process.env.port || 3000 //standart code node js

app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})
