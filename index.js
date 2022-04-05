const express = require('express')
const routerApi = require('./routes')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000;

const whitelist = ['http://locahost:8080', "https://myapp.co"];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin)
    callback(null,true)
else
callback(new Error('nope'))
  }
}

// app.use(cors(options))

const { errorHandler,logErrors , boomErrorHandler} = require('./middlewares/error.handler')

app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log("My port: " + port);
});
