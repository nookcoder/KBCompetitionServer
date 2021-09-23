const Sequelize = require('sequelize');

module.exports = class Personal extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            userId: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true,
            },
            userName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nickName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userPhoneNumber: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            firstLocation: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            secondLocation: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isRegister: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            townPosition1: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            townPosition2: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Personal',
            tableName: 'personal',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_bin'
        });
    }
    static associate(db) { }
}