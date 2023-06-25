 import { executeQuery } from '../Database/ConnectDatabase'
// 
// 
 export const userRegistration = async (req: any, res: any) => {
    return new Promise(async (resolve, reject) => {
        try {
          
            let { f_name, l_name, email, password, token } = req.body
            console.log(req.body, "in body")
 //=========================== INSERT QUERY ===========================
            const sqlQuery = `insert into user_table (f_name, l_name, email, password, token)  values ('${f_name}', '${l_name}', '${email}', '${password}', '${token}')`;
            // const sqlQuery = `insert into user_bankdetails (f_name, email, ifsc, account_number)values('Shubham', 'shubham.sumfactor@gmail.com', 'PUNB000', '123456789')`

//=========================== Data-Retrieval QUERY ===========================
            //   const sqlQuery = `select * from user_table`

//=========================== Update QUERY ===========================
            //  const sqlQuery = `update  user_table set f_name='Shub' where token='1234'`

//=========================== Delete QUERY ===========================
            //  const sqlQuery = `delete  from user_table  where token='1234'`

//=========================== Join QUERY ===========================
            // const sqlQuery = `SELECT * FROM user_table as a join user_bankdetails as b  on a.email= b.email;`

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