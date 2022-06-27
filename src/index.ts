import express from 'express';
import cors from 'cors';
import { router as tasksRouter } from './controllers/task.controller';
import { router as usersRouter } from './controllers/user.controller';
import { appDataSource } from './shared/data-source';

appDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
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

const PORT = process.env.PORT || 3000;
try {
    app.listen(PORT, () => {
        console.log(`Server running successfully on port ${PORT}`);
    });
} catch (err) {
    console.log(err);
}
