const fs = require("fs")
const express = require("express")
const app = express()

app.use(express.json())

const port = process.env.port || 3000 //standart code node js

//baca data dari file JSON
const cars = JSON.parse(
    fs.readFileSync(`${__dirname}/data/cars.json`)
)

const getTest = (req, res) => {
    res.status(200).json({
        message: `Ping successfully`,
    })
}

const getAllCars = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            cars,
        },
    })
}

const getDataById = (req, res) => {
    const id = req.params.id
    const car = cars.find((el) => el.id === id)

    if (!car) {
        return res.status(404).json({
            status: `Failed`,
            message: `Data with ${id} rhis not found`,
        })
    }
    res.status(200).json({
        status: `success`,
        data: {
            car,
        },
    })
}

const createCar = (req, res) => {
    const newId = cars[cars.length - 1].id + 1
    const newData = Object.assign(
        {
            id: newId,
        },
        req.body
    )
    cars.push(newData)
    fs.writeFile(
        `${__dirname}/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
            res.status(201).json({
                status: `Success`,
                data: {
                    car: newData,
                },
            })
        }
    )
}

const updateCar = (req, res) => {
    const id = req.params.id
    const carIndex = cars.findIndex(
        (el) => el.id === id
    )
    if (carIndex === -1) {
        return res.status(404).json({
            status: `Failed`,
            message: `Data with ${id} this not found`,
        })
    }
    cars[carIndex] = {
        ...cars[carIndex],
        ...req.body,
    }
    fs.writeFile(
        `${__dirname}/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
            res.status(200).json({
                status: `Success`,
                message: `car with this id ${id} UPDATED!!!`,
                data: {
                    car: cars[carIndex],
                },
            })
        }
    )
}

const deleteCar = (req, res) => {
    const id = req.params.id
    const carIndex = cars.findIndex(
        (el) => el.id === id
    )
    if (carIndex === -1) {
        return res.status(404).json({
            status: `Failed`,
            massage: `Data not found`,
        })
    }
    cars.splice(carIndex, 1)
    fs.writeFile(
        `${__dirname}/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
            res.status(200).json({
                status: `Success`,
                message: `Berhasil menghapus data`,
                data: null,
            })
        }
    )
}

app.route("/api/v1/").get(getTest)

app.route("/api/v1/cars")
    .get(getAllCars)
    .post(createCar)

app.route("/api/v1/cars/:id")
    .get(getDataById)
    .put(updateCar)
    .delete(deleteCar)

app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})
