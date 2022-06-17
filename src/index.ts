import express from 'express';
import { router as tasksRouter } from './controllers/task-controller';
const app = express();


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    return next();
})

app.use('/tasks', tasksRouter);


try {
    app.listen(3000, () => {
        console.log('Server running successfully.');
    });
} catch (err) {
    console.log(err);
}
