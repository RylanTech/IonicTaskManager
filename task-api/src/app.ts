import express from 'express'
import morgan from 'morgan';
import { db } from './models';
import taskRoutes from './taskRouter/tasksRoutes'

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use("/tasks", taskRoutes);
app.use("/", (req, res, next) => {
    console.log(`
    __________REQUEST INFO__________
    ${new Date().toISOString()}] ${req.ip} ${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`);

    console.dir(req.body)
    res.status(403).send("Try '/tasks'")
})

app.use((req, res, next) => {
    res.status(404).end();
});
// Syncing our database
db.sync().then(() => {
    console.info("connected to the database!")
});

// Syncing our database
// db.sync().then(() => {
//     console.info("connected to the database!")
// });

app.listen(3001);