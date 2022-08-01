module.exports = (sequelize, Sequelize) => {
    const Video = sequelize.define("videos",{
        videoID:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        header: {
            type:Sequelize.STRING,
            allowNull:false
        },
        description:{
            type:Sequelize.STRING,
            allowNull:false
        },
        uploadDate:{
            type:Sequelize.DATE,
            allowNull:false

        },
        company:{
            type:Sequelize.STRING,
            allowNull:false
        },
        videoLink:{
            type:Sequelize.STRING,
            allowNull:false
        },
        imageLink:{
            type:Sequelize.STRING,
            allowNull:false
        },
    },
    {
        defaultValue: false,
        initialAutoIncrement: 1000,
        timestamps:false,
    });
    return Video;
}