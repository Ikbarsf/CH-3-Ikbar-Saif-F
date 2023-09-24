const fs = require("fs")

//baca data dari file JSON
const cars = JSON.parse(
    fs.readFileSync(
        `${__dirname}/../data/cars.json`
    )
)

const checkId = (req, res, next, val) => {
    console.log(val * 1)
    const car = cars.find((el) => el.id === val)

    if (!car) {
        return res.status(404).json({
            status: "failed",
            message: `data with ${val} this not found`,
        })
    }
    next()
}

const getTest = (req, res) => {
    res.status(200).json({
        requestTime: req.requestTime,
        message: `Ping successfully`,
    })
}

const getAllCars = (req, res) => {
    res.status(200).json({
        status: "success",
        requestTime: req.requestTime,
        data: {
            cars,
        },
    })
}

const getDataById = (req, res) => {
    const id = req.params.id
    const car = cars.find((el) => el.id === id)

    res.status(200).json({
        status: `success`,
        requestTime: req.requestTime,
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
                requestTime: req.requestTime,
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
                requestTime: req.requestTime,
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

    cars.splice(carIndex, 1)
    fs.writeFile(
        `${__dirname}/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
            res.status(200).json({
                status: `Success`,
                requestTime: req.requestTime,
                message: `Berhasil menghapus data`,
                data: null,
            })
        }
    )
}

module.exports = {
    getTest,
    getAllCars,
    getDataById,
    createCar,
    updateCar,
    deleteCar,
    checkId,
}
