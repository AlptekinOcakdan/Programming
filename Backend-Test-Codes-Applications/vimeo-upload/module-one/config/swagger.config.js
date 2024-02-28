import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import {
    API_PREFIX,
    PORT,
    PRODUCTION_SERVER_URL,
} from '../constants/environment.js';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce-API',
            version: '1.0.0',
            description: 'Ecommerce API for the shop App',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        servers: [
            {
                url: `http://localhost:${PORT}${API_PREFIX}`,
                description: 'Development server',
            },
            {
                url: `${PRODUCTION_SERVER_URL}${API_PREFIX}`,
                description: 'Production server',
            },
        ],
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [`./routes/*.js`, './schemas/*.js', './models/*.model.js'],
};

const specs = swaggerJsDoc(options);

async function configureSwagger(app) {
    // Swagger UI on backend
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

    // Docs in JSON for frontend
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(specs);
    });

    console.log(`Docs available at http://localhost:${PORT}/api-docs`);
}

export default configureSwagger;
