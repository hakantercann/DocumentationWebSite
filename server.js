const express = require('express');
const app = express();
const cors = require("cors");
const swagger=require('./swagger');
const listenPort = process.env.PORT || 5000;
const db = require("./models/index.js");
/*
db.sequelize.sync({force: false}).then(() =>{
    console.log('Drop and resync Db');
    init();
});*/
db.sequelize.sync();




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res)=>{
    res.send('Hello');
})
const userRouter = require('./routes/user.routes');
app.use('/api', userRouter);
const videoRouter = require('./routes/video.routes');
app.use('/api/dosya', videoRouter);
const documentRouter = require('./routes/document.router');
const { role } = require('./models/index.js');
app.use('/api/docs', documentRouter);
app.listen(listenPort, (req, res) => {
    console.log('Server is running at ', listenPort);
});


const testRouter = require('./routes/auth.routes');
app.use('/test', testRouter);


//app.use('/api-docs',swagger.swaggerUI.serve, swagger.swaggerUI.setup(swagger.swaggerJsDoc));