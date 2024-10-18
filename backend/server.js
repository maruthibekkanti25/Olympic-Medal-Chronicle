const express= require('express');
const app = express();
const PORT = 8080;
const routes = require('./routes/routes');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});
