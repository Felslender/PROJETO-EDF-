const app = require('../src/app');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))


    const PORT = process.env.PORT || 3000;


    app.listen(PORT, () => console.log(`Lisening on port ${PORT}`));



