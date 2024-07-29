import express from 'express';
import Person from '../models/person.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = req.body; // req body containing the person data
        const newPerson = new Person(data); // create a new person using mongoose model
        const response = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; 
        if (['chef', 'manager', 'waiter'].includes(workType)) {
            const response = await Person.find({ work: workType });
            console.log('Response received');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid workType' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id',async(req,res)=>{
    try{    
        const personId=req.params.id; //extract the id from url parameter
        const updatedPersonData= req.body //updated data for the person

        const response= await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators: true,
        })
        if(!response){
            return res.status(404).json({error: 'person not found'});
        }
        console.log('data updated ')
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'})

    }
})

export default router;
