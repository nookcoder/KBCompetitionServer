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

router.post('/', async(req,res,next)=>{
        let userId = req.body.userId;
        let userName = req.body.userName;
        let userInfo = [userId,userName];
        let checkInfo = {'isRegister':true};

        const checkQuery = 'select *  from merchant where id=?';
        const insertQuery = 'insert into merchant(id,name) values(?,?)';
        const isRegisterQuery = 'select businessNumber from merchant where id=?';

        connection.query(checkQuery,userId,(err,row,field)=>{
            // 등록하지 않는 아이디일 때
            if(row.length == 0){
                      connection.query(insertQuery,userInfo,(err,row,field)=>{
                            if(err){
                                    throw err;
                            }
                            else{
                                    console.log(userInfo + " 등록 완료!!");
                            }
                    });
            }

            connection.query(isRegisterQuery,userId,(err,row,field)=>{
                    console.log(row[0].businessNumber.length);
                    if(row[0].businessNumber.length == 0 ){
                            checkInfo.isRegister  = false;
                    }
            });
        });
        console.log(checkInfo);
        res.send(checkInfo);
        next();
});

router.post('/register',(req,res,next)=>{
        console.log(req.body);
        let id = req.body.id;
        let storeName = req.body.storeName;
        let storePhoneNumber= req.body.storePhoneNumber;
        let representativeName = req.body.representativeName;
        let openingDate = req.body.openingDate;
        let location = req.body.location;
        let businessNumber = req.body.businessNumber;

        let storeInfo = [storeName,storePhoneNumber,representativeName,openingDate,location,businessNumber,id];
        const insertQuery = 'UPDATE merchant SET storeName=?, storePhoneNumber=?,representativeName=?,openingDate=?,location=?,businessNumber=? WHERE id=?';
        connection.query(insertQuery,storeInfo,(err,row,field)=>{
                if(err){
                        throw err;
                }

                else{
                        console.log("입력성공");
                }
        });

        next();
});

module.exports = router;

