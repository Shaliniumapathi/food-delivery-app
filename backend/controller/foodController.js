import foodModel from "../models/foodmodel.js";
import fs from "fs";

const addFood = async (req, res) => {
    if (!req.file) {
        return res.json({ success: false, message: "Image upload failed" });
    }

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price:req.body.price,
        image: req.file.filename,
        category: req.body.category
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error saving food" });
    }
};

//all food list
const listfood = async(req,res) => {
     try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
     }catch(error){
        console.log(error);
        res.json({successs:false,message:"Error"})
     }
}

//removefood item
const removeFood = async (req,res) =>{
       try{
        const foods = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${foods.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food Removed"});

       }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
       }
}

export { addFood, listfood, removeFood};