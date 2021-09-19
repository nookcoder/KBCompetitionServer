const express = require('express');
const multer = require('multer');
const path = require('path');
const { Product } = require('../models');

const router = express.Router();
// 단위 5MB
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf + path.extname(file.originalname));
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },

});

// 폼데이터 속성명이 img 이거나 폼태크
router.post('/register', upload.array('img', 5), async (req, res, next) => {
    try {
        const product = await Product.create({
            userId: req.body.userId,
            name: req.body.name,
            category: req.body.category,
            stock: req.body.stock,
            price: req.body.price,
            dateYear: req.body.dateYear,
            dateMonth: req.body.dateMonth,
            dateDay: req.body.dateDay,
            dateType: req.body.dateType,
            origin: req.body.origin,
            details: req.body.details
        });
        console.log(req, files);
        console.log(product);
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
            stock: req.body.stock,
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

        console.log(updatedProduct);
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