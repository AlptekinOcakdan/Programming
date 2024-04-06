import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import {API_PREFIX, API_URL, NODE_ENV, PORT, PRODUCTION_SERVER_URL} from "../constants/environmet.js";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Course Project',
            version: '1.0.0',
            description: 'API for a Course Project',
        },
        components:{
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        servers: [
            {
                url: `${API_URL}:${PORT}${API_PREFIX}`,
                description: 'Development server',
            },
            {
                url: `${PRODUCTION_SERVER_URL}${API_PREFIX}`,
                description: 'Production server',
            }
        ],
    },
    apis: ['./src/routes/*.js','./src/models/*.js'],
};

const specs = swaggerJsdoc(options);

async function configureSwagger(app) {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
    
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(specs);
    });
    
    if (NODE_ENV === 'production') {
        console.log(`Docs Available at ${PRODUCTION_SERVER_URL}/api-docs`);
    }else {
        console.log(`Docs Available at ${API_URL}:${PORT}/api-docs`)
    }
}

export default configureSwagger;