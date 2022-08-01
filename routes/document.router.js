const router = require('express').Router();
const documentController = require('../controllers/document.controller.js')


router.post('/add/document', documentController.addDocument);

router.delete('/delete/document/:documentID', documentController.deleteDocument);

router.get('/list/documents', documentController.getAllDocuments);

router.put('/update/:documentID', documentController.updateDocument);
router.get('/update/:documentID', documentController.getDocumentById);
module.exports = router;