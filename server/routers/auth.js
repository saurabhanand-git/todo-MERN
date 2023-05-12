const express = require('express');
const routers = express.Router();


require('../db/conn');
const Name = require("../model/userSchema");


//GET request
routers.get('/', async(req, res) => {
    try {
        const names = await Name.find();
        res.json(names);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    // res.send(`Hello from express server auth.js`);
});

//POST request
routers.post('/register', async (req, res) => {

    const { name } = req.body;

    if (!name) {
        return res.status(422).json({ error: "please fill the field properly" })
    }

    try {
        const NameExist = await Name.findOne({ name: name });

        // if (NameExist) {
        //     return res.status(422).json({ error: "Name already exist" })
        // }
        const names = new Name({ name });

        const userRegister = await names.save();

        if (userRegister) {
            res.status(201).json({ message: "Name successfully added" });
        } else {
            res.status(500).json({ error: "failed to add" })
        }

    } catch (err) {
        console.log(err);
    }


});

routers.post('/delete/:id', async (req, res) => {
    try {
      const name = await Name.findByIdAndDelete(req.params.id);
   
      res.json({ message: 'Name deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


module.exports = routers;



//using promises
// routers.post('/register',(req,res)=>{

//     const {name} = req.body; 

//     if(!name){
//         return res.status(422).json({error:"please fill the field properly"})
//     }

//     Name.findOne({name:name})
//     .then((NameExist) => {
//             if(NameExist){
//                 return res.status(422).json({error:"Name already exist"})
//             }
//             const names = new Name({name});

//             names.save().then(() => {
//                 res.status(201).json({message:"Name successfully added"});
//             }).catch((err) => res.status(500).json({error:"failed to add"}));

//         }).catch(err => {console.log(err);});

// });

//using await async