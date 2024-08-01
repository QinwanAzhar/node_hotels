import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import personRoutes from './routes/personRoutes.js';
import menuItemRoutes from './routes/menuItemRoutes.js'; 
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT=process.env.PORT || 3000;

app.use(bodyParser.json());
//middleware function
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}]request made to: ${req.orignialUrl}`);
    next();// move to the next phase
};

app.get('/',logRequest, (req, res) => {
    res.status(200).send({
        success: true,
        message: 'helloworld'
    });
});

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);



app.listen(PORT, () => {
    console.log('server is live on port 3000');
});