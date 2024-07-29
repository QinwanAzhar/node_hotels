import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import personRoutes from './routes/personRoutes.js';
import menuItemRoutes from './routes/menuItemRoutes.js'; // Corrected import statement

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'helloworld'
    });
});

app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(3000, () => {
    console.log('server is live on port 3000');
});
