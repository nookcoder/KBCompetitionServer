const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fs = require('fs');

const connection = mysql.createConnection({
	    host:"database-1.clp9clf7du8s.ap-northeast-2.rds.amazonaws.com",
	    user:"admin",
	    database:"kb",
	    password:"11111111",
	    port:3306,

});

const userRouter = require('./routes/user');
const merchantRouter = require('./routes/merchant');

const app = express();

app.set('port', 3000);
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/user',userRouter);
app.use('/merchant',merchantRouter);

app.get('/daum',(req,res,next)=>{
	        res.writeHead(200,{'Content-Type':'text/html'});
	        fs.readFile(__dirname + '/views/daum_address.html',(error,data)=>{

			                res.end(data,'utf-8');

			        });
	        next();
});

app.post('/',(req,res,next)=>{
	        res.send("hi");
	        next();
});

app.listen(app.get('port'),()=>{
	    console.log(app.get('port'), '번 포트에서 대기 중');
});
                  












