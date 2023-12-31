const express=require('express');
const cors=require('cors');
const port=9000;
const app= express();
const database=require('./Database/db');
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));

app.use(cors());
app.use(express.json())

const server=async ()=>{
    await database();
    app.use('/auth',require('./Routes/auth') );
    app.use('/notes',require('./Routes/notes') );
app.listen(port,()=>{
    console.log('server is running on port http://localhost',port);
})
}

server();