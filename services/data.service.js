const db = require('./db');

let accountDetails = {
  1000: { acno: 1000, name: "userone", balance: 5000, password: "user1" },
  1001: { acno: 1001, name: "usertwo", balance: 6000, password: "user2" },
  1002: { acno: 1002, name: "userthree", balance: 15000, password: "user3" },
  1003: { acno: 1003, name: "userfour", balance: 45000, password: "user4" },
  1004: { acno: 1004, name: "userfive", balance: 2300, password: "user5" },
}
let currentuser;

const register = (acno, username, password) => {

  return db.User.findOne({
    acno
  }).then(user => {
    console.log(user)
    if (user) {
      return {
        status: false,
        statusCode: 422,
        message: "User alredy exist. pleas log in"
      }
    }
    else {
      const newUser = new db.User({
        acno,
        balance: 0,
        username,
        password
      });
      newUser.save();
      return {
        status: true,
        statusCode: 200,
        message: "registration successfull"
      }
    }
  })
}
//console.log("register called")
//return;
//   if (acno in accountDetails) {

//     return {

//       status: false,
//       message: "user already exist."

//     }
//   }

//   accountDetails[acno] = {
//     acno,
//     username,
//     balance: 0,
//     password
//   }
//   //this.saveDetails();
//   return {
//     status: true,
//     message: "registration successfully"
//   }
//   // console.log(accountDetails)
//   // return true;

// }


const login = (req, accno, pswd) => {
  var acno = parseInt(accno);
  return db.User.findOne({
    acno,
    password: pswd
  }).then(user => {
    if (user) {
      req.session.currentuser = user.acno;
      //console.log(req.session.currentuser);
      return {
        status: true,
        statusCode: 200,
        message: "login successfull",
        name:user.username,
        acno:user.acno
      }
    }
    return {
      status: true,
      statusCode: 422,
      message: "invalid credential"
    }
  })
}



const deposit = (acno, pwd, amount) => {

  var amt = parseInt(amount);
  return db.User.findOne({
    acno,
    password: pwd
  }).then(user => {
    if (!user) {
      return {
        status: false,
        statusCode: 422,
        message: "no user exist with provide Account number"
      }
    }
    user.balance += amt;
    user.save();
    return {
      status: true,
      statusCode: 200,
      message: "Account has been credited",
      balance: user.balance
    }


  })
  
}



const withdraw = (req,acno, pwd, amount) => {
  var amt = parseInt(amount);
  return db.User.findOne({
    acno,
    password: pwd
  }).then(user => {
    if (!user) {
      return {
        status: false,
        statusCode: 422,
        message: "no user exist with provide Account number"
      }
    }
    if(req.session.currentuser!=acno){
      return{
        statusCode:false,
        statusCode:422,
        message:"transaction denied"
      }
    }
    if (user.balance < amt) {
      return {
        status: false,
        statusCode: 422,
        message: "insufficient balance"
      }
    }
    user.balance -= amt;
    user.save();
    return {
      status: true,
      statusCode: 200,
      message: "Account has been debited",
      balance: user.balance
    }


  })
}
const deletAccDetails =(acno)=>{
  return db.User.deleteOne({
    acno:acno
  }).then(user=>{
    if(!user){
      return{
        statusCode:false,
        statusCode:422,
        message:"operation failed"

      }
    }
    return{
      status: true,
      statusCode: 200,
      message: "Account number "+ acno+ "deleted successfully"

    }
  })
}

module.exports = {
  register,
  login,
  deposit,
  withdraw,
  deletAccDetails
}
//console.log(accno+"haii")
//   if (accno in accountDetails) {
//     var psw1 = accountDetails[accno].password

//     if (pswd == psw1) {
//       currentuser = accountDetails[accno].name;
//             return {
//         status: true,
//         message: "login success"
//       }


//     }
//     else {
//       return {
//         status: false,
//         message: "invalid password"
//       }

//     }

//   }
//   else {
//     return {

//       status: false,
//       message: "invalid account number"

//     }
//   }
// }