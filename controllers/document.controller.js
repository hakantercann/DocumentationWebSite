const { reset } = require('nodemon');
const db = require('../models');

const {Op} = require('sequelize');
const Document = db.documents;
const updateDocument = async(req, res) =>{
    let documentID = req.params.documentID;
    let info = {
        header: req.body.header,
        uploadDate: req.body.uploadDate,
        description: req.body.description,
        company: req.body.company,
        pdfLink: req.body.pdfLink,
        imageLink: req.body.imageLink
    }
    var document = Document.update(req.body, 
        {where: {documentID: documentID}}
    )
    .then(num => {
        if (num == 1) {
          res.send({
            message: "Document was updated successfully."
          });
        } 
        else {
          res.send({
            message: `Cannot update document with id=${documentID}. `
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating document with id=", documentID, err
        });
      });
}
const getDocumentById = async(req, res) =>{
    var document = await Document.findByPk({
        where: {
            documentID: req.params.documentID
        }
    }).then(data =>{
        res.send(data);
    }).catch(err =>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving documents."
          });
    });
}
const getAllDocuments = async(req, res) =>{
    var document = await Document.findAll({})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving documents."
        });
    });
}
const deleteDocument = async(req, res) =>{
    let documentID = req.params.documentID;
    var document = await Document.destroy({
        where:{documentID: documentID}
    })
    .then(num => {
        if(num ==1){
            res.status(200).send({
                message: "Document got deleted"
            })
        }
        else{
            res.send({
                message: "Connot delete document"
            });
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: err
        });
    });
    
}

const addDocument = async (req, res) =>{
    let date = new Date();
    let info = {
        header: req.body.header,
        uploadDate: date.getTime(),
        description: req.body.description,
        company: req.body.company,
        pdfLink: req.body.pdfLink,
        imageLink: req.body.imageLink
    }
    var document = await Document.create(info);
    if(document){
        res.send(document);
    }
    else{
        res.send("unsuccess");
    }
    
}


module.exports = {
    addDocument,
    deleteDocument,
    getAllDocuments,
    updateDocument,
    getDocumentById
}

