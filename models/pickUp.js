const Sequelize = require('sequelize');

module.exports = class PickUp extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            merchantId: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            merchantName: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            personalId: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            personalName: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            pickUpYear: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            pickUpMonth: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            pickUpDay: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            pickUpNoon: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            pickUpHour: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            pickUpMinute: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            location: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            productName: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            registerTime: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
                primaryKey: true,
            },
            isPickUp: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Merchant',
            tableName: 'merchants',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_bin'
        });
    }
}