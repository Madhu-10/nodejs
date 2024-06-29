const express=require("express")
const router = express.Router()

const UserController = require("../controllers/UserController")

router.post("/user/insert", UserController.insert)
router.get("/user/list", UserController.list)
router.post("/user/login", UserController.login)
router.post("/user/update/:id", UserController.update)
router.delete("/user/delete/:id", UserController.delete)
router.post("/user/insertWithAddress", UserController.insertUserWithAddress)
router.post("/user/insertWithAddressAndContacts", UserController.insertUserWithAddressAndContacts)

module.exports = router
