 import { executeQuery } from '../Database/ConnectDatabase'
// 
// 
 export const userRegistration = async (req: any, res: any) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(req.body, "in body")
            //  let { f_name, l_name, email, password, token } = req.body
 
            // const sqlQuery = `insert into user_table (f_name,l_name,email,password,token)values('Shubh', 'Singh', 'shubham@gmail.com', 'shubham1234', '4321')`
            // const sqlQuery = `insert into user_bankdetails (f_name, email, ifsc, account_number)values('Shubham', 'shubham.sumfactor@gmail.com', 'PUNB000', '123456789')`

            //   const sqlQuery = `select * from user_table`
// 
            //  const sqlQuery = `update  user_table set f_name='Shub' where token='1234'`
// 
            //  const sqlQuery = `delete  from user_table  where token='1234'`
// 
            const sqlQuery = `SELECT * FROM user_table as a join user_bankdetails as b  on a.email= b.email;`

            let response = await executeQuery(sqlQuery)
 
             console.log("🚀 ~ file: userController.ts:13 ~ returnnewPromise ~ response:", response)
// 
             return resolve(response)

        } catch (error) {
            console.log("🚀 ~ file: userController.ts:19 ~ returnnewPromise ~ error:", error)
            return reject(error)
        }
    })
}

// export const userRegistration = (req:any, res:any) => {
    // return new Promise((resolve, reject)=>{
        // try{
            // return resolve("Hello World")
        // }catch (error){
            // return reject(error)
        // }
    // }) 
// }