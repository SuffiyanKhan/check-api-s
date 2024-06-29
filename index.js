import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import { serverConfig } from './src/configs/server.config.js';
// import UserRoutes from './src/routes/user.rotes.js';
// import todoRoutes from './src/routes/todos.routes.js'
import { DB_RETRY_LIMIT, DB_RETRY_TIMEOUT } from './src/constants/constants.js';
import route from './src/routes/index.js';

let connnectionRetries = 0
const connectionDB = async () => {
    try {
        console.log("Establishing DB connection....")
        await mongoose.connect(serverConfig.dbUri);
        console.log('Db connected')

    } catch (error) {
        if (connnectionRetries < DB_RETRY_LIMIT) {
            connnectionRetries++
            console.log(`Reconnecting to DB ${connnectionRetries}/${DB_RETRY_LIMIT}`)
            await new Promise(resolve => setTimeout(resolve, DB_RETRY_TIMEOUT))
            await connectionDB()
        } else {
            process.exit()
        }
    }
}
const PORT = serverConfig.appPort
const app = express();
connectionDB()
.then(res=>console.log('Db are connected'))
.catch(err=>console.log('Db are not connected'))

app.use(cors())
app.use(express.json())
app.use('/', route)

app.listen(PORT, () => {
    console.log(`server is running on port  ${PORT}`)
})

// export default app
