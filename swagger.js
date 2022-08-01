//swagger code 

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: "Medya Betek API",
        version: '1.0.0',
      },
      
    },
    apis: ["index.js"],
  };
/**
 * @swagger
 * /api/login:
 *   post:
 *     description: Login Page
 *     parameters:
*      - name: username
 *        description: Username
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: Password
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Loginned
 * 
 */
/**
 * @swagger
 * /api/forget/pass:
 *   post:
 *     description: Login Page
 *     parameters:
*      - name: mail
 *        description: Mail
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Loginned
 * 
 */
/**
 * @swagger
 * /api/reset/pass/{id}:
 *   put:
 *     description: Login Page
 *     parameters:
 *      - name: password
 *        description: new password
 *        in: formData
 *        required: true
 *        type: string
 *      - name: id
 *        description: kullanıcı id
 *        in: path
 *        required: true
 *        type: integer
 *     responses:
 *       201:
 *         description: Created
 * 
 */
/**
 * @swagger
 * /api/betek/dosya/video:
 *   post:
 *     description: Insert Video Page
 *     parameters:
 *      - name: videoHeader
 *        description: Video Başlığı
 *        in: formData
 *        required: true
 *        type: string
 *      - name: videoDescription
 *        description: Video Açıklaması
 *        in: fromData
 *        required: true
 *        type: string
 *      - name: videoDate
 *        description: Yükleme Tarihi
 *        in: formData
 *        required: true
 *        type: string
 *      - name: companyID
 *        description: Şirket ID
 *        in: fromData
 *        required: true
 *        type: string
 *      - name: videoLink
 *        description: Video Link
 *        in: fromData
 *        required: true
 *        type: string
 *      - name: imageLink
 *        description: Resim 
 *        in: fromData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Inserted
 * 
 */
const swaggerDocs = swaggerJsDoc(swaggerOptions);



module.exports={
    swaggerUI: swaggerUI,
    swaggerJsDoc: swaggerJsDoc
}