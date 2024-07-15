import express from 'express';
import mongoose from 'mongoose';
import { Contact } from "./ContactModal.js"
import bodyParser from 'express';
import cors from 'cors'
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin :true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

const port = process.env.PORT || 2000;

mongoose.connect("mongodb+srv://mritunjaysinghm38:f4pvFnJMzUI2OqrZ@cluster0.mwxqvjm.mongodb.net/",
    {
        dbName: "backend"
    }
).then(() => console.log("mongoDb connected successfully...")).catch((err) => console.log(err))

// get all
app.get('/', async (req, res) => {
    try {
        let contact = await Contact.find().sort({createdAt:-1});
        res.json({ massage: "all contact", contact })
    } catch (error) {
        res.json({ massage: "error.message" })
    }




})




// add contacts
app.post('/', async (req, res) => {
    const { name, gmail, phone } = req.body
    console.log(req.body)
    try {
        let contact = await Contact.findOne({gmail})
        if (contact) return res.json({message:"contact already exit..!"});

        contact = await Contact.create({ name, gmail, phone });
        res.json({ massage: "contact save succussfully...!", contact })
    } catch (error) {
        res.json({ massage: error.massage });
    }
})

// Edit contacts
app.put('/:id', async (req, res) => {
    const id = req.params.id
    const updatedData =req.body;
   
    try {
         
         let data = await Contact.findByIdAndUpdate(id,updatedData,{new:true});
         res.json({ message: "user contact has been updated..!",data});
    } catch (error) {
        res.json({ massage: error.massage });
    }
})



// Delete contacts
app.delete('/:id', async (req, res) => {
    const id = req.params.id
   
    try {
         let contact = await Contact.findById(id);
         if(!contact) return res.json({message: "contact do not exits"})
         await contact.deleteOne();
         res.json({message: "contact has been deleted"});
    } catch (error) {
        res.json({ massage: error.massage });
    }
})

















// app.get('/', (req, res) => {
//     res.json({ massage: "this is home route" })
// })



app.listen(2000, () => console.log(`server is running on port ${port}`));
// mritunjaysinghm38
// f4pvFnJMzUI2OqrZ