const express = require("express")
const router = express.Router()

router.get("/users", (req, res) => {
  res.send({ data: [] })
})

router.get("/users/:id", (req, res) => {
  const { id } = req.params
})

module.exports = {
  userRouter: router
}
