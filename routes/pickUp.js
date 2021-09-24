const express = require('express');
const Op = require('sequelize').Op;
const { Merchant, Personal, PickUp, Product } = require('../models');

const router = express.Router();

// 구매 버튼 눌렀을 때 
router.post('/', async (req, res, next) => {
    console.log(req.body);

    try {
        let merchant = await Merchant.findOne({
            where: {
                id: req.body.merchantId,
            }
        });

        let personal = await Personal.findOne({
            where: {
                userId: req.body.personalId,
            }
        });

        await Product.destroy({
            where: {
                registerTime: req.body.registerTime,
            }
        });

        let pickUpItem = await PickUp.create({
            merchantId: req.body.merchantId,
            merchantName: merchant.storeName,
            personalId: req.body.personalId,
            personalName: personal.nickName,
            pickUpYear: req.body.pickUpYear,
            pickUpMonth: req.body.pickUpMonth,
            pickUpDay: req.body.pickUpDay,
            pickUpNoon: req.body.pickUpNoon,
            pickUpHour: req.body.pickUpHour,
            pickUpMinute: req.body.pickUpMinute,
            location: req.body.location,
            productName: req.body.productName,
            isPickUp: false,
        });

        console.log("생성 완료 : " + pickUpItem);
        res.json({
            "isRegister": "ok",
        });

    } catch (err) {
        console.log(err);
    }


    next();
});

// 픽업 완료 버튼 눌렀을 때 
router.post('/done/:id', async (req, res, next) => {
    console.log(req.body);
    console.log("픽업완료");
    try {
        let pickItem = await PickUp.update({
            isPickUp: true,
        }, {
            where: {
                merchantId: req.params.id,
                personalName: req.body.personalName,
                productName: req.body.productName,
                pickregisterTime: req.body.pickregisterTime,
            }
        });
        console.log(pickItem);
        res.send(pickItem);

    } catch (err) {
        console.log(err);
    }
    next();
});

// 픽업 대기/완료 버튼 눌렀을 때 
router.get('/:id', async (req, res, next) => {
    try {
        let pickUpItem = await PickUp.findAll({
            where: {
                [Op.or]: [
                    { merchantId: req.params.id },
                    { personalId: req.params.id }
                ]
            },
            raw: true,
            nest: true,
        });

        res.send(pickUpItem);
    } catch (err) {
        console.log(err);
    }

    next();
});

module.exports = router;