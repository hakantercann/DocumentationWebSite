const { reset } = require('nodemon');
const db = require('../models');

const {Op} = require('sequelize');
const Video = db.videos;
const searchVideo = async(req, res) =>{
    await Video.findAll({
        where: {
            [Op.or]: [
               {
                    header: 
                    {
                        [Op.like]: ('%' + req.body.searchField + '%')
                    }
                },  
                {
                    description:
                    {
                        [Op.like]: ('%' + req.body.searchField + '%')
                    }
                },   
                {
                    company:
                    {
                        [Op.like]: ('%' + req.body.searchField + '%')
                    }
                },   
            ]
         }
    })
    .then(data =>{
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving videos."
        });
    });
}
const updateVideo = async(req, res) =>{
    let videoID = req.params.videoID;
    let info = {
        header: req.body.header,
        uploadDate: req.body.uploadDate,
        description: req.body.description,
        company: req.body.company,
        videoLink: req.body.videoLink,
        imageLink: req.body.imageLink
    }
    await Video.update(req.body, 
        {where: {videoID: videoID}}
    )
    .then(num => {
        if (num == 1) {
          res.send({
            message: "Video was updated successfully."
          });
        } 
        else {
          res.send({
            message: `Cannot update Video with id=${videoID}. `
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating video with id=", videoID, err
        });
      });
}
const getAllVideo = async(req, res) =>{
    await Video.findAll({})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving videos."
        });
    });
}
const deleteVideo = async(req, res) =>{
    let videoID = req.params.videoID;
    var video = await Video.destroy({
        where:{videoID: videoID}
    })
    .then(num => {
        if(num ==1){
            res.status(200).send({
                message: "Video got deleted"
            })
        }
        else{
            res.send({
                message: "Connot delete Video"
            });
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: err
        });
    });
    
}

const addVideo = async (req, res) =>{
    let date = new Date();
    let info = {
        header: req.body.header,
        uploadDate: date.getTime(),
        description: req.body.description,
        company: req.body.company,
        videoLink: req.body.videoLink,
        imageLink: req.body.imageLink
    }
    var video = await Video.create(info);
    if(video){
        res.send(video);
    }
    else{
        res.send("unsuccess");
    }
    
}


module.exports = {
    addVideo,
    deleteVideo,
    getAllVideo,
    updateVideo,
    searchVideo
}

