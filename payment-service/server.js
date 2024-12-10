const express= require('express');
const app= express();
require('dotenv').config();
const cors = require('cors');


const port= process.env.PORT || 6000

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send("Jai Shree Ram");
})

require('./db/DB');

app.use('/api/payments', require('./routes/payment'));

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
})
