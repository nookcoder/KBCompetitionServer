const express = require('express');
const { Merchant, Personal, Product } = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
    let personal = await Personal.findOne({
        where: {
            userId: req.body.userId
        }
    });

    // 등록되지 않은 아이디 일때 db에 추가하기 
    if (personal == null) {
        await Personal.create({
            userId: req.body.userId,
            userName: "",
            nickName: "",
            userPhoneNumber: "",
            firstLocation: "",
            secondLocation: "",
            isRegister: false,
        })
    }

    // 개인 정보 등록하기 
    if (personal.isRegister) {
        console.log("반가워요 개인 유저님");
    }

    console.log(personal.isRegister);
    res.json({
        isRegister: personal.isRegister,
    });
});

router.post('/register', (req, res, next) => {
    console.log(req.body);

    Personal.update({
        userName: req.body.userName,
        nickName: req.body.nickName,
        userPhoneNumber: req.body.userPhoneNumber,
        firstLocation: req.body.firstLocation,
        secondLocation: req.body.secondLocation,
        isRegister: true
    }, {
        where: {
            userId: req.body.userId,
        }
    });

    res.json({
        "code": 200,
        "message": "Register Success",
    });
    next();
});


// 사용자 지역에 맞는 목록 띄우기
router.post('/product', async (req, res, next) => {
    console.log(req.body);
    try {
        //클라이언트쪽에서는 사용자 고유번호, 지역정보
        let product = await Product.findAll({
            where: {
                town: req.body.town,
            }
        });

        console.log(product);

        res.json({
            "products": product,
            "code": 200,
        });

    } catch (err) {
        console.log(err);
        next(err);
    }
});


module.exports = router;