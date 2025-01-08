import express from 'express';
import { tasksRouter } from './routers/tasks';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from '../swagger';

const app = express();
const port = 3000;
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api/tasks', tasksRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});