import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.p88y7.mongodb.net/ecomm?retryWrites=true&w=majority`
    try {
        mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Error connecting: ', error.message)
    }
}

export default Connection;