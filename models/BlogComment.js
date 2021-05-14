const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// Creates a BlogComment model
class BlogComment extends Model { }
// Creates fields/columns for BlogComment model
BlogComment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        body: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Blog Comment',
    }
);

module.exports = BlogComment;