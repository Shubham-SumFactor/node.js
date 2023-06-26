
import { executeQuery } from '../Database/ConnectDatabase'

import bcrypt from 'bcrypt';

 export const userRegistration = async (req: any, res: any) => {
    return new Promise(async (resolve, reject) => {
        try {
          
            let { f_name, l_name, email, password, token } = req.body
            console.log(req.body, "in body")
 //=========================== INSERT QUERY ===========================
            // const sqlQuery = `insert into user_table (f_name, l_name, email, password, token)  values ('${f_name}', '${l_name}', '${email}', '${password}', '${token}')`;
            // const sqlQuery = `insert into user_bankdetails (f_name, email, ifsc, account_number)values('Shubham', 'shubham.sumfactor@gmail.com', 'PUNB000', '123456789')`

//=========================== Data-Retrieval QUERY ===========================
            //   const sqlQuery = `select * from user_table`

//=========================== Update QUERY ===========================
            //  const sqlQuery = `update  user_table set f_name='Shub' where token='1234'`

//=========================== Delete QUERY ===========================
            //  const sqlQuery = `delete  from user_table  where token='1234'`

//=========================== Join QUERY ===========================
            // const sqlQuery = `SELECT * FROM user_table as a join user_bankdetails as b  on a.email= b.email;`

//====================================Validation for duplicacy============

            const getRecord = `SELECT * from user_table where email='${email}'`
            let resultset: any = await executeQuery(getRecord);

            if (resultset.length > 0) return res.status(400).send({ message: "User already registered please login" });
// =====================================================

            // Encrypting the Password========================
            const  salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password,salt);
            //================================================================ 
            
            const sqlQuery = `insert into user_table (f_name,l_name,email,password,token)values('${f_name}', '${l_name}', '${email}', '${hashedPassword}', '${token}')`
            let response = await executeQuery(sqlQuery)
 
             console.log("🚀 ~ file: userController.ts:13 ~ returnnewPromise ~ response:", response)

             return resolve(response)

        } catch (error) {
            console.log("🚀 ~ file: userController.ts:19 ~ returnnewPromise ~ error:", error)
            return reject(error)
        }
    })
}


//=========================== USER LOGIN ===========================
export const userlogin = async (req: any, res: any) => {
    return new Promise(async (resolve, reject) => {
        try {

            let { email, password } = req.body

            const getRecord = `select * from user_table where email='${email}'`

            let resulset: any = await executeQuery(getRecord)

            if (resulset.length == 0) return res.status(404).send({ message: "user Not Found Please Register and try again to login" })

            const match: boolean = await bcrypt.compare(password, resulset[0].password)

            if (match == false) return res.status(400).send("Entered Password is Incorrect")

            return resolve(resulset)
        }catch(error){
            console.log("new Promise error", error)
        }
    })}
