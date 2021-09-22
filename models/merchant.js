const Sequelize = require('sequelize');

module.exports = class Merchant extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.STRING(45),
                allowNull: false,
                primaryKey: true
            },
            storeName: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            storePhoneNumber: {
                type: Sequelize.STRING(25),
                allowNull: false
            },
            representativeName: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            openingDate: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            location: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            businessNumber: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            isRegister: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            town1: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            town2: {
                type: Sequelize.STRING(45),
                allowNull: false
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
    static associate(db) {
        db.Merchant.hasMany(db.Product, { foreignKey: 'userId', sourceKey: 'id' });
    }
};