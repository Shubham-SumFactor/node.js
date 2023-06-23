import mysql from 'mysql';

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "shubham123",
    database: "nodetutorialdb"
})


export const connectNodeDatabase = () => {
    return new Promise((resolve, reject) => {
        try {

            connection.connect((error) => {
                if (error) return reject(error);
                return resolve("Database connected Successfully")
            })

        } catch (error) {
            console.log("🚀 ~ file: ConnectDatabase.ts:16 ~ return newPromise ~ error:", error)
        }
    
    })
}
// 


export const executeQuery = (sqlQuery: string) => {
    return new Promise((resolve, reject) => {
        connection.query(sqlQuery, (error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
};

// export const executeQuery = (sqlQuery: string) => {
    // return new Promise((resolve, reject) => {
        // try {
            // connection.connect((error, response) => {
                // console.log("🚀 ~ file: ConnectDatabase.ts:31 ~ connection.query ~ error:", error)
                // if (error) return reject(error)
// 
                // return resolve(response)
            // })
        // } catch (error) {
            // console.log("🚀 ~ file: ConnectDatabase.ts:32 ~ return newPromise ~ error:", error)
// 
        // }
    // })
// }