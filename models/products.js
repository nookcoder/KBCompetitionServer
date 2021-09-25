const { trimEnd } = require('lodash');
const Sequelize = require('sequelize');

module.exports = class Product extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            category: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            price: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            dateYear: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            dateMonth: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            dateDay: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            dateType: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            origin: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            details: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            registerTime: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
                primaryKey: true,
            },
            town: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            location: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            storeName: {
                type: Sequelize.STRING(45),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: "Product",
            tableName: 'products',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_0900_ai_ci'
        });
    }

    static associate(db) {
        db.Product.belongsTo(db.Merchant, { foreignKey: 'userId', targetKey: 'id' });
    }
};