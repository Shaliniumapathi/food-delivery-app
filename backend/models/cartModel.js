import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  items: [{
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'food', required: true },
    quantity: { type: Number, default: 1 },
  }],
});

const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;