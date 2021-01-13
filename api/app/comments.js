const express = require('express');
const router = express.Router();

const createRouter=(db)=>{

    router.get('/', async (req, res) => {
        const responce =await db.getItems('comments');
        const newsId=req.query.news_id;
        if(newsId){
            let result=[];
            for(let i=0;i<responce.length;i++){
                if(responce[i].news_id==newsId){
                    result.push(responce[i]);
                }
            }
            res.send(result);
        }      
        else{
            res.send(responce);
        }
    });
    
    
    router.post('/', async (req, res) => {
        const comment = req.body;
       
        if(!comment.news_id  || !comment.message || comment.message===''){
            res.status(400).send({error:'News ID and message must be present in request'});
        }
        else{
            const news=await db.getItem('news',req.body.news_id);
            if(!news.length) return res.status(404).send({error:'News not found'});

            const result=await db.addItem('comments',comment);
            res.send(result);
        }
        
        
    });
    
    router.get('/:id', async(req, res) => {
        
        const comment= await db.getItem('comments',req.params.id);
        res.send(comment);
    });
    router.delete('/:id',async(req,res)=>{
        const comment= await db.deleteItem('comments',req.params.id);
        res.send(comment);
    });
   
    return router;
}


module.exports = createRouter;