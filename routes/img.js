const express = require('express');
const fs = require('fs');

const router = express.Router();

router.use('/:merchantId/:productName', (req, res, next) => {
    console.log(req.params);
    let imgPath = __dirname.substring(0, __dirname.length - 6) + "public/uploads/" + req.params.merchantId + req.params.productName + ".jpg";
    console.log(imgPath);
    fs.exists(imgPath, (exists) => {
        if (exxists) {
            fs.readFile(imgPath, (err, data) => {
                res.writeHead(200, { 'Content-Type': 'image/*' });
                res.write(data);
                res.end();
            });
        }
        else {
            console.log("사진이 없어어");
        }
    });
});

module.exports = router;