const express = require('express')
const app = express()
const cors = require("cors")
const port = 5000
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use("/api/v1", require("./route/Data"));
app.use("/ap2/v2", require("./route/User"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})