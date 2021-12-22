import nc from "next-connect";
import Product from "../../models/Products";
import db from "../../utils/Database/db";
import data from "../../utils/Data"


const handler = nc();

handler.get(async(req,res)=>{
    await db.connect();
    await Product.deleteMany();
    await Product.insertMany(data.products);
    await db.disconnect();
    res.status(200).json({msg:"successfully saved data"});
});

export default handler;