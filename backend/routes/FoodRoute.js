import express from "express";
import { addFood, listfood, removeFood} from "../controller/foodController.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads"),  // absolute path
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage });

foodRouter.post("/add", (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            console.log("Multer error:", err);
            return res.json({ success: false, message: err.message });
        }
        console.log("req.file:", req.file);
        console.log("req.body:", req.body);
        next();
    });
}, addFood);
foodRouter.get("/list",listfood)
foodRouter.post("/remove", removeFood)

export default foodRouter;