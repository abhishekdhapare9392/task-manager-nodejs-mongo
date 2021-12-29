const express = require("express")
const tasks = require("./routes/tasks")
const connectDB = require("./db/db")
require("dotenv").config()
const notFound = require("./middleware/not-found")
const errorHandlerMidleware = require("./middleware/error-handler")

const app = express()

const port = process.env.PORT || 9000

// Middleware

app.use(express.static("./public"))
app.use(express.json())

// Routes

app.use("/api/v1/tasks", tasks)

app.use(notFound)
app.use(errorHandlerMidleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(
        `DB server connected successfully and Server is listening on port ${port}.`,
      )
    })
  } catch (error) {
    console.log(error)
  }
}

start()
