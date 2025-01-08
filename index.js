const express = require('express');
const tasksRouter = require('./src/Routers/tasks');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const port = 3000;
app.use(cors('*'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api/tasks', tasksRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});