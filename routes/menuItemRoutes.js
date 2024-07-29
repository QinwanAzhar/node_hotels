import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = req.body; // req body containing the menu item data
        const newMenuItem = new MenuItem(data); // create a new menu item using mongoose model
        const response = await newMenuItem.save();
        console.log('Data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('Data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/:tasteType', async (req, res) => {
    try {
        const tasteType = req.params.tasteType; 
        if (['sweet', 'spicy', 'sour'].includes(tasteType)) {
            const response = await MenuItem.find({ taste: tasteType });
            console.log('Response received');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid tasteType' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.put('/:id',async(req,res)=>{
    try{    
        const menuId=req.params.id; //extract the id from url parameter
        const updatedMenuData= req.body //updated data for the person

        const response= await MenuItem.findByIdAndUpdate(menuId,updatedMenuData,{
            new:true,
            runValidators: true,
        })
        if(!response){
            return res.status(404).json({error: 'menu not found'});
        }
        console.log('data updated ')
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})

    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const menuId=req.params.id; //extract id from the url

        const response= await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error: 'item not found'});
        }
        console.log('data deleted ')
        res.status(200).json({message:'item deleted succesfully'});


    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})

    }
})

export default router;
