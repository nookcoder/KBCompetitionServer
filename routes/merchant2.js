const express = require('express');
const { Merchant, Product } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
    let userId = req.body.userId;
    let userName = req.body.userName;

    // 가게 정보를 등록한 소상공인지 확인 
    let merchant = await Merchant.findOne({
        where: {
            id: userId,
        }
    });

    if (merchant == null) {
        await Merchant.create({
            id: userId,
            storeName: '',
            storePhoneNumber: '',
            representativeName: '',
            openingDate: '',
            location: '',
            name: userName,
            businessNumber: '',
            isRegister: false,
            town1: '',
            town2: '',
        });
    }

    if (merchant.isRegister) {
        console.log('반가워요');
    }
    // 가게 등록 여부 전송 
    res.send(merchant.isRegister);

    next();
});

router.post('/register', async (req, res, next) => {
    console.log(req.body);
    let id = req.body.id;
    let storeName = req.body.storeName;
    let storePhoneNumber = req.body.storePhoneNumber;
    let representativeName = req.body.representativeName;
    let openingDate = req.body.openingDate;
    let location = req.body.location;
    let businessNumber = req.body.businessNumber;

    Merchant.update({
        // 첫번째 인수는 수정할 내용
        storeName: storeName,
        storePhoneNumber: storePhoneNumber,
        representativeName: representativeName,
        openingDate: openingDate,
        location: location,
        businessNumber: businessNumber,
        isRegister: true,
        town1: req.body.town1,
        town2: req.body.town2,
    }, {
        // 어떤 로우를 수정할 건지 
        where: {
            id: req.body.id,
        }
    });
    next();
});

router.get('/:id/products', async (req, res, next) => {
    console.log(req.params);

    try {
        const products = await Product.findAll({
            include: {
                model: Merchant,
                where: {
                    id: req.params.id
                },
            }
        });

        res.json({
            "products": products,
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
    next();
})

module.exports = router;