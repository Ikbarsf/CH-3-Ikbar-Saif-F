const express = require("express")
const carController = require("../controllers/carController")
const router = express.Router()

router.param("id", carController.checkId)

router.route("/").get(carController.getTest)

router
    .route("/cars")
    .get(carController.getAllCars)
    .post(carController.createCar)

router
    .route("/cars/:id")
    .get(carController.getDataById)
    .put(carController.updateCar)
    .delete(carController.deleteCar)

module.exports = router
