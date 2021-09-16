const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const connection = mysql.createConnection({
    host:"database-1.clp9clf7du8s.ap-northeast-2.rds.amazonaws.com",
    user:"admin",
    database:"kb",
    password:"11111111",
    port:3306,

});

router.post('/register',(req,res,next)=>{
    console.log(req.body);
    let userName = req.body.userName;
    let userPhoneNumber = req.body.userPhoneNumber;

    const sql = 'INSERT INTO user(name,phoneNumber) VALUES(?,?)';
    let params = [userName,userPhoneNumber];

    connection.query(sql,params,(err,result)=>{
        let resultCode = 404;
        let message = '에러가 발생했습니다.'

        if(err){
            console.log(err);
        } else{
            resultCode = 200;
            message = '회원가입에 성공했습니다.';
        }
    });
    next();
});

router.post('/login',(req,res,next)=>{
	console.log(req.body);
    let userName = req.body.userName;
    let userPhoneNumber = req.body.userPhoneNumber;
        console.log(userName + " : " + userPhoneNumber);

    let sql = 'SELECT *  from user where name=?';
    let message = '두둥탁'

    connection.query(sql,userName,(err,row,field)=>{
	    if(err){
		    throw err;
	    } else{
		   if(row.length){
			   console.log("true입니다!");
		  	console.log(row.length);
		   }
		   else{
			   console.log('false입니다');
		   }
	    }
    });
    next();
});

module.exports = router;
