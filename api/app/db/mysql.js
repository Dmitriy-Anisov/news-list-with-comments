module.exports=db=>({
    getItems(entity){
        return new Promise((res,rej)=>{
            db.query('SELECT * FROM ??', [entity],(err,result)=>{
                if(err){
                    rej(err)
                }
                res(result);
            })
        })
    },
    getItem(entity,id){
        return new Promise((res,rej)=>{
            db.query('SELECT * FROM ?? WHERE id=?', [entity,id],(err,result)=>{
                if(err){
                    rej(err)
                }
                res(result);
            })
        })
    },
    addItem(entity,data){
        return new Promise((res,rej)=>{
            db.query('INSERT INTO ?? SET ?', [entity,data],(err,result)=>{
                if(err){
                    rej(err);
                }
                data.id=result.insertId;
                res(data);
            })
        })
    },
    deleteItem(entity,id){
        return new Promise((res,rej)=>{
            db.query('DELETE FROM ?? WHERE id=?', [entity,id],(err,result)=>{
                if(err){
                    rej(err)
                }
                res(result);
            })
        })
    }
});