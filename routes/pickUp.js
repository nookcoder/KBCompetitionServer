const express = require('express');

const { Merchant, Personal, PickUp, Product } = require('../models');

const router = express.Router();

// 구매 버튼 눌렀을 때 
router.post('/', async (req, res, next) => {
    console.log(req.body);

    let merchant = await Merchant.findOne({
        attributes: ["storeName"],
        where: {
            id: req.body.merchantId,
        }
    });

    let personal = await Personal.findOne({
        attributes: ["nickName"],
        where: {
            userId: req.body.personalId,
        }
    });

    let product = await Product.destory({
        where: {
            registerTime: req.body.registerTime,
        }
    })

    let pickUpItem = PickUp.create({
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
    })

    next();
});

// 픽업 완료 버튼 눌렀을 때 
router.post('/:id/done', async (req, res, next) => {
    console.log(req.params);
    console.log(req.body);

    let pickItem = await PickUp.update({
        isPickUp: true,
    }, {
        where: {
            merchantId: req.params.id,
            registerTime: req.body.registerTime,
        }
    });

    next();
});

// 픽업 대기/완료 버튼 눌렀을 때 
router.get('/:id', async (req, res, next) => {

    let pickUpItem = await PickUp.findAll({
        where: {
            [Op.or]: [
                { merchantId: req.params.id },
                { personalId: req.params.id }
            ]
        }
    });

    console.log(pickUpItem);
    res.json({
        "pickUpItem": pickUpItem,
    });

    next();
});

module.exports = router;