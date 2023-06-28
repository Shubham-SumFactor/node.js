
import { executeQuery } from '../Database/ConnectDatabase'
import { generateAccessToken, refreshAccessToken } from '../util/service'
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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
            let resulset: any = await executeQuery(getRecord);

            if (resulset.length > 0) return res.status(400).send({ message: "User already registered please login" });
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

// ===================================JWT Token====================================================

             let user: any = { email: email as string, password: password as string }

            let accessToken = generateAccessToken(user)

            console.log("🚀 ~ file: userController.ts:60 ~ returnnewPromise ~ accessToken:", accessToken)

            let refreshToken = refreshAccessToken({ user: user })

            console.log("🚀 ~ file: userController.ts:64 ~ returnnewPromise ~ refreshToken:", refreshToken)

            return resolve({ message: "User Sucessfully Logged in", data: resulset, accessToken: accessToken, refreshToken: refreshToken });
            //===



            return resolve(resulset)
        }catch(error){
            console.log("new Promise error", error)
        }
    })}

    //=========================== GET ALL USER ===========================
export const getAllUser = async (req: any, res: any) => {
    return new Promise(async (resolve, reject) => {
        try {

            const getRecord = `select * from user_table;`

            let resulset: any = await executeQuery(getRecord)

            return resolve(resulset)

        } catch (error) {
            console.log("🚀 ~ file: userController.ts:89 ~ returnnewPromise ~ error:", error)

        }
    })
}
//=======================================================================

export const refreshToken = async (req: any, res: any) => {

    return new Promise(async (resolve, reject) => {
        try {

            let { token, email } = req.body

            if (token == null) return res.sendStatus(401)

            const getRecord = `select * from user_table where email='${email}';`

            let resulset: any = await executeQuery(getRecord)
            console.log("🚀 ~ file: userController.ts:109 ~ returnnewPromise ~ resulset:", resulset)

            if (resulset.length == 0) return res.sendStatus(403)

            jwt.verify(token, process.env.REFRESH_ACCESS_KEY as string, (error: unknown, response: unknown) => {

                if (error) return res.sendStatus(403)

                const accessToken: string = generateAccessToken({ email: resulset[0].email, password: resulset[0].password })

                // res.json({ token: `Bearer ${acessToken}` })

                return resolve({ token: `Bearer ${accessToken}` })
            })

        } catch (error) {
            console.log("🚀 ~ file: userController.ts:103 ~ returnnewPromise ~ error:", error)
            res.json({ error: error })
        }
    })

}
