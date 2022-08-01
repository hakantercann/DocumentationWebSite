module.exports = (sequelize, Sequelize) => {
    const Document = sequelize.define("documents",{
        documentID:{
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
        pdfLink:{
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
    return Document;
}