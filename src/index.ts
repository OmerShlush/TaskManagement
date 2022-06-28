import express from 'express';
import cors from 'cors';
import { router as tasksRouter } from './controllers/task.controller';
import { router as usersRouter } from './controllers/user.controller';
import { appDataSource } from './database/data-source';
import { config } from './config/app.config';

appDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.log({status: 'DATA_SOURCE_ERROR'});
        console.log(err);
    });

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
)


app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);


try {
    app.listen(config.port, () => {
        console.log(`Server running successfully on port ${config.port}`);
    });
} catch (err) {
    console.log(err);
}
