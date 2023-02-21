const express = require('express');
const app = express();
const dotenv = require('dotenv');
//import route
const users = require('./routes/user');
const blogs = require('./routes/blog');
const messages = require('./routes/message');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');


app.use(cors());
app.use(express.json());
dotenv.config();
//connect db
mongoose.set('strictQuery', false);

mongoose.connect(
process.env.DB_CONNECT,
{ useNewUrlParser: true },
() => console.log('connected to db!'));


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My-brand APIs',
            description: 'My-brand APIs documentation',
            version: '1.0.0',
        },
        servers:[
             {
                url:  '/'
            }
        ]
    
    },
    apis: ["./app.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


// routes

/**
 * @swagger
 * tags:
 *   name: 
 *   description: all APIs
 */

/**
 * @swagger
 *   components:
 *      schemas:
 *         user:
 *           type: object
 *           properties:
 *                 firstname:
 *                          type: string
 *                 lastname:
 *                         type: string
 *                 email:
 *                      type: string
 *                 password: 
 *                     type: string
 */



/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Request all users
 *      tags: [users]
 *      description: This will display all users in the database
 *      responses:
 *          200:
 *              description: users retrieved successfully 
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/user'
 */



/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      summary: Request user by Id
 *      tags: [users]
 *      description: This will display an ID of a selected user in the database
 *      parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Numeric ID required
 *             schema:
 *                 type: string
 *      responses:
 *          200:
 *              description: user retrieved successfully!
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: array
 *                          items:
 *                               $ref: '#components/schemas/user'
 */


/**
 * @swagger
 * /api/edit-user/{id}:
 *  patch:
 *      summary: Edit user by Id 
 *      tags: [users]
 *      description: This will edit an ID of a selected user in the database
 *      parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Numeric ID required
 *             schema:
 *                 type: string
 *      requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                       schema:
 *                             $ref: '#components/schemas/user'
 *      responses:
 *          200:
 *              description: user edited successfully 
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/user'
 */


/**
 * @swagger
 * /api/user-register:
 *  post:
 *      summary: Register a user 
 *      tags: [users]
 *      description: This will add a user in the database
 *      requestBody: 
 *            required: true
 *            content:
 *                  application/json:
 *                       schema:
 *                            $ref: '#components/schemas/user'
 *      responses:
 *          200:
 *              description: user added successfully!
 */



/**
 * @swagger
 * /api/user-login:
 *  post:
 *      summary: User login
 *      tags: [users]
 *      description: This will all a user to log in the database
 *      requestBody: 
 *            required: true
 *            content:
 *                  application/json:
 *                       schema:
 *                              properties:
 *                                    email:
 *                                         type: string
 *                                    password: 
 *                                        type: string
 *      responses:
 *          200:
 *              description: user login successfully!
 */



/**
 * @swagger
 * /api/del-user/{id}:
 *  delete:
 *      summary: Delete user by Id
 *      tags: [users]
 *      description: This will delete an ID of a selected user in the database
 *      parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Numeric ID required
 *             schema:
 *                 type: string
 *      responses:
 *          200:
 *              description: user deleted successfully!
 */

app.use('/api', users);

/**
 * @swagger
 * tags:
 *   name: blogs
 */

/**
 * @swagger
 *   components:
 *      schemas:
 *         blog:
 *           type: object
 *           properties:
 *                 tittle:
 *                          type: string
 *                 description:
 *                         type: string
 */

/**
 * @swagger
 * /api/blogs:
 *  get:
 *      summary: Request all blogs
 *      tags: [blogs]
 *      description: This will display all blogs in the database
 *      responses:
 *          200:
 *              description: blogs retrieved successfully 
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/blog'
 */


/**
 * @swagger
 * /api/blog/{id}:
 *  get:
 *      summary: Get blog by Id
 *      tags: [blogs]
 *      description: This will display an ID of a selected blog in the database
 *      parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Numeric ID required
 *             schema:
 *                 type: string
 *      responses:
 *          200:
 *              description: blog retrieved successfully!
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: array
 *                          items:
 *                               $ref: '#components/schemas/blog'
 */


/**
 * @swagger
 * /api/blog-like-get/{id}:
 *  get:
 *      summary: Add blog like 
 *      tags: [blogs]
 *      description: This will add a like on the blog in the database
 *      parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Numeric ID required
 *             schema:
 *                 type: string
 *      responses:
 *          200:
 *              description: comments retieved successfully!
 *              content:
 *                  application/json:
 *                       schema:
 *                              properties:
 *                                    author: 
 *                                        type: string
 *                                    blogId:
 *                                         type: string
 */


/**
 * @swagger
 * /api/blog-comment-get/{id}:
 *  get:
 *      summary: Get blog comments
 *      tags: [blogs]
 *      description: This will add a comment on the blog in the database
 *      parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Numeric ID required
 *             schema:
 *                 type: string
 *      responses:
 *          200:
 *              description: comments retieved successfully!
 *              content:
 *                  application/json:
 *                       schema:
 *                              properties:
 *                                    comment:
 *                                         type: string
 *                                    blogId:
 *                                         type: string
 */


/**
 * @swagger
 * /api/edit-blog/{id}:
 *  patch:
 *      summary: Edit blog by Id 
 *      tags: [blogs]
 *      description: This will edit an ID of a selected blog in the database
 *      parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Numeric ID required
 *             schema:
 *                 type: string
 *      requestBody: 
 *              required: true
 *              content:
 *                  application/json:
 *                       schema:
 *                             $ref: '#components/schemas/blog'
 *      responses:
 *          200:
 *              description: blog edited successfully 
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/blog'
 */


/**
 * @swagger
 * /api/add-blog/{id}:
 *  post:
 *      summary: Add a blog 
 *      tags: [blogs]
 *      description: This will add a blog in the database
 *      parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Numeric ID required
 *             schema:
 *                 type: string
 *      requestBody: 
 *            required: true
 *            content:
 *                  application/json:
 *                       schema:
 *                            $ref: '#components/schemas/blog'
 *      responses:
 *          200:
 *              description: blog added successfully!
 */


/**
 * @swagger
 * /api/blog-like/{id}:
 *  post:
 *      summary: Add blog like 
 *      tags: [blogs]
 *      description: This will add a like on the blog in the database
 *      parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Numeric ID required
 *             schema:
 *                 type: string
 *      requestBody: 
 *            required: true
 *            content:
 *                  application/json:
 *                       schema:
 *                              properties:
 *                                    blogId:
 *                                         type: string
 *      responses:
 *          200:
 *              description: like added successfully!
 */


/**
 * @swagger
 * /api/blog-comment/{id}:
 *  post:
 *      summary: Add blog comment 
 *      tags: [blogs]
 *      description: This will add a comment on the blog in the database
 *      parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Numeric ID required
 *             schema:
 *                 type: string
 *      requestBody: 
 *            required: true
 *            content:
 *                  application/json:
 *                       schema:
 *                              properties:
 *                                    comment:
 *                                         type: string
 *                                    blogId:
 *                                         type: string
 *      responses:
 *          200:
 *              description: comment added successfully!
 */


/**
 * @swagger
 * /api/del-blog/{id}:
 *  delete:
 *      summary: Delete blog by Id
 *      tags: [blogs]
 *      description: This will delete an ID of a selected blog in the database
 *      parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Numeric ID required
 *             schema:
 *                 type: string
 *      responses:
 *          200:
 *              description: blog deleted successfully!
 */
app.use('/api', blogs);


/**
 * @swagger
 * tags:
 *   name: messages
 */

/**
 * @swagger
 *   components:
 *      schemas:
 *         message:
 *           type: object
 *           properties:
 *                 firstname:
 *                        type: string
 *                 lastname:
 *                         type: string
 *                 email:
 *                     type: string
 *                 message:
 *                     type: type
 */

/**
 * @swagger
 * /api/messages:
 *  get:
 *      summary: Request all messages
 *      tags: [messages]
 *      description: This will display all messages in the database
 *      responses:
 *          200:
 *              description: messages retrieved successfully 
 *              content:
 *                  application/json:
 *                       schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/message'
 */



/**
 * @swagger
 * /api/add-message:
 *  post:
 *      summary: Add a message 
 *      tags: [messages]
 *      description: This will add a message in the database
 *      requestBody: 
 *            required: true
 *            content:
 *                  application/json:
 *                       schema:
 *                            $ref: '#components/schemas/message'
 *      responses:
 *          200:
 *              description: message added successfully!
 */



/**
 * @swagger
 * /api/del-message/{id}:
 *  delete:
 *      summary: Delete message by Id
 *      tags: [messages]
 *      description: This will delete an ID of a selected message in the database
 *      parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Numeric ID required
 *             schema:
 *                 type: string
 *      responses:
 *          200:
 *              description: message deleted successfully!
 */
app.use('/api', messages)


module.exports = app;
