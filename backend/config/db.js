import mongoose from 'mongoose';

export const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb+srv://shalini:1234@cluster0.blymepd.mongodb.net/food-del')
        console.log("DB Connected")
    } catch (error) {
        console.log("DB connection error:", error.message);
    }
}