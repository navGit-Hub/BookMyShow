import db from "../models/index.js";




const addMovie=async (req,res)=>{
try {
    
    const movie=await db.movies.create({

        id:req.body.id,
        review_id:req.body.review_id,
        title:req.body.title,
        genre:req.body.genre,
        duration:req.body.duration,
        rating:req.body.rating,
        isStreaming:req.body.isStreaming,
        certificate:req.body.certificate
        
        })
if(movie)
res.send({message:"Movie added"})


} catch (error) {
    res.send({err:error.message})
}

}
const addGeneralEvent=async (req,res)=>{

try {
     const general_events=await db.general_events.create({
       id:req.body.id,
       user_id:req.body.user_id,
       book_id:req.body.book_id,
       online_outdoor:req.body.online_outdoor,
       event_outline:req.body.event_outline,
       location:req.body.location
     })
if(general_events)
res.send({message:"The event was added successfully!!"})


} catch (error) {
    res.status(500).send({message:error.message})
}




}


export {addMovie,addGeneralEvent};