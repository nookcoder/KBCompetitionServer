const express = require('express');
const fs = require('fs');

const merchantRouter = require('./routes/merchant2');
const productRouter = require('./routes/product');
const personalRouter = require('./routes/personal');
const pickUpRouter = require('./routes/pickUp');

const { sequelize, PickUp } = require('./models');

const app = express();

app.set('port', process.env.PORT || 3000);

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터 베이스 연결 성공');
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.json({ limit: 50000000 }));
app.use(express.urlencoded({ extended: false }));

app.use('/merchant', merchantRouter);
app.use('/product', productRouter);
app.use('/personal', personalRouter);
app.use('/pickUp',pickUpRouter);

app.get('/daum', (req, res, next) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile(__dirname + '/views/daum_address.html', (error, data) => {

        res.end(data, 'utf-8');

    });
    next();
});

// 포트 연결 
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});













