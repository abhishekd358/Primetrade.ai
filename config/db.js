import mongoose  from 'mongoose'

const dbConnect = async()=>{

    try {
        await mongoose.connect(process.env.MONGODB_URI, {dbName: 'Primetrade'})
        
        console.log('Database connected....')
    } catch (error) {
        console.log('Database Failed to Connnect')
        console.log(error)
        process.exit(1)
        
    }

}


export default dbConnect;
