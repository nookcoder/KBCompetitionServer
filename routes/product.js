const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const { Merchant, Product } = require('../models');

const router = express.Router();
// 단위 5MB
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, done) => {
            done(null, __dirname + '/uploads/');
        },
        filename: (req, file, done) => {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + req.body.registerTime + ext);
        },
    }),
    limits: { fileSize: 100 * 1024 * 1024 },
});

router.post('/img', upload.single('uploads'), (req, res) => {
    console.log("이미지 업로드");
    console.log(req.file);
});

// 폼데이터 속성명이 img 이거나 폼태크
router.post('/register', async (req, res, next) => {
    console.log(req.body);
    try {
        const merchant = await Merchant.findOne({
            where: {
                id: req.body.userId,
            }
        });

        const product = await Product.create({
            userId: req.body.userId,
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            dateYear: req.body.dateYear,
            dateMonth: req.body.dateMonth,
            dateDay: req.body.dateDay,
            dateType: req.body.dateType,
            origin: req.body.origin,
            details: req.body.details,
            town: merchant.town2,
            location: merchant.location
        });

        res.json(product);
    } catch (err) {
        console.log(err);
    }
    next();
});

router.post('/update', async (req, res, next) => {
    try {
        const updatedProduct = await Product.update({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            dateYear: req.body.dateYear,
            dateMonth: req.body.dateMonth,
            dateDay: req.body.dateDay,
            dateType: req.body.dateType,
            origin: req.body.origin,
            details: req.body.details
        }, {
            where: {
                userId: req.body.userId,
                registerTime: req.body.registerTime
            }
        });

        res.json({
            "code": 200,
            "message": "변경 완료",
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.post('/delete', async (req, res, next) => {
    try {
        console.log(req.body);
        const result = await Product.destroy({
            where: {
                userId: req.body.userId,
                registerTime: req.body.registerTime
            }
        });
        console.log("삭제 중");
    } catch (err) {
        console.log(err);
        next(err);
    }
});


module.exports = router;