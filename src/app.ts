import express ,{Request,Response,NextFunction} from 'express';
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

app.get('/', (req:Request, res:Response) => {
    res.send('Api test Nodejs con TypeScript!');
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api/tasks', tasksRouter);

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    console.error(err.stack);
    res.status(500).send(err.message);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});