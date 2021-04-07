accountDetails = {
  1000: { acno: 1000, name: "userone", balance: 5000, password: "user1" },
  1001: { acno: 1001, name: "usertwo", balance: 6000, password: "user2" },
  1002: { acno: 1002, name: "userthree", balance: 15000, password: "user3" },
  1003: { acno: 1003, name: "userfour", balance: 45000, password: "user4" },
  1004: { acno: 1004, name: "userfive", balance: 2300, password: "user5" },
}


const register = (acno, username, password) => {
  console.log("register called")
  //return;
  if (acno in accountDetails) {

    return {

      status: false,
      message: "user already exist."

    }
  }

  accountDetails[acno] = {
    acno,
    username,
    balance: 0,
    password
  }
  //this.saveDetails();
  return {
    status: true,
    message: "registration successfully"
  }
  // console.log(accountDetails)
  // return true;

}


const login = (accno, pswd) => {

  //console.log(accno+"haii")
  if (accno in accountDetails) {
    var psw1 = accountDetails[accno].password

    if (pswd == psw1) {
      currentuser = accountDetails[accno].name;
            return {
        status: true,
        message: "login success"
      }


    }
    else {
      return {
        status: false,
        message: "invalid password"
      }

    }

  }
  else {
    return {

      status: false,
      message: "invalid account number"

    }
  }
}

// const deposit =(acno,pwd,amount)=>{
//     var amt = parseInt(amount);
//     let dataset=accountDetails;
//     if(acno in dataset){
//         var psw1=dataset[acno].password;
//     }
// }



//const login=(accno,pwd)=>{

//}
module.exports = {
  register,login
}