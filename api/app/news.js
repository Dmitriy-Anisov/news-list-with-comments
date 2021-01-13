const express = require('express');
const multer = require('multer');
const router = express.Router();
const {nanoid} = require('nanoid');
const path = require('path');
const config = require('./config');
const nowDate=new Date();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});


const upload = multer({storage});

const createRouter=(db)=>{

    router.get('/', async (req, res) => {
        
        const responce =await db.getItems('news');
        let result=[];
        for(let i=0;i<responce.length;i++){
            delete responce[i].description;
            result.push(responce[i]);
        }
        res.send(result);
    });
    
    router.post('/',upload.single('image'), async (req, res) => {
        
        const newItem = {...req.body,date:nowDate};
        
        if(!newItem.title || !newItem.description || newItem.title==='' || newItem.description===''){
            res.status(400).send({error:'Title and description must be present in request'});
        }
        else{
            if(req.file){
                newItem.image = req.file.filename;
            }
            const result=await db.addItem('news',newItem);
            res.send(result);
        }
    });
    
    router.get('/:id', async(req, res) => {
        
        const newItem= await db.getItem('news',req.params.id);
        res.send(newItem);
    });
    router.delete('/:id',async(req,res)=>{
        const newItem= await db.deleteItem('news',req.params.id);
        res.send(newItem);
    });
   
    return router;
}


module.exports = createRouter;