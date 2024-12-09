const express= require('express');
const app= express();
require('dotenv').config();

const port= process.env.PORT || 6000

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Jai Shree Ram");
})

require('./db/DB');

app.use('/api/bookings', require('./routes/booking'));

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
})