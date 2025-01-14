import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Api-tasks-nodejs-typescript',
        description: "Api test Nodejs con TypeScript",
        version: '1.0.0',
      }
    },
    apis: ['./src/routers/*.ts'],
  }

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;