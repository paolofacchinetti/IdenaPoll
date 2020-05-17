const express = require('express')
const app = express()

app.listen(8000, () => {
  console.log('Server started!')
})

app.route('/api/helloworld').get((req, res) => {
  res.send({
    response: 'Hello World!'
  })
})
