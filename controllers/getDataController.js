import db from "../models/index.js";

const getMoviesByGenre=async (req,res)=>{
try {
    
const movie=await db.movies.findAll({
    where:{
        genre:req.query["genre"]
    }
})


if(movie)
res.send(movie)

} catch (error) {
    res.status(500).send({msg:error.message})
}

}

const getGeneralEventsByOutline=async (req,res)=>{
    try {
     
        const general_events=await db.general_events.findAll({
            where:{
                event_outline:req.query["event_outline"]
            }
        })
        if(general_events)
        res.send(general_events)
        
        } catch (error) {
            res.status(500).send({message:error.message})
        }
}

const getAllGeneralEvents=async (req,res)=>{
  
    try {
         const allEvents=await db.general_events.findAll({});

              res.status(200).send(allEvents);

    } catch (error) {
       res.status(500).send({message:error.message});
    }

}

const getAllMovies=async (req,res)=>{

try {
     
    const allMovies=await db.movies.findAll({
        where:{
            isStreaming:false
        }
    });




   res.status(200).send(allMovies);

} catch (error) {

    res.status(500).send({message:error})

}

}


//const getReviews=async ()







export {getMoviesByGenre,getGeneralEventsByOutline,getAllGeneralEvents,getAllMovies}

