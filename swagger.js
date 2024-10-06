const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv")
dotenv.config();

const port = process.env.PORT || 5000

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0", // Sử dụng phiên bản OpenAPI 3.0
        info: {
            title: "API Documentation",
            description: "API Information",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://localhost:${port}`, // URL API của bạn
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        }
    },
    apis: ["./routers/*.js"], // Chỉ định nơi Swagger sẽ tìm kiếm các định nghĩa API
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;

