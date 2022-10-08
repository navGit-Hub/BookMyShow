import db from "../models/index.js";

const getMoviesCustom=async (req,res)=>{
try {
    
        const searchParam=req.query["searchParam"]

        console.log(req.query)
const movie=await db.movies.findAll({
    where:{
        [searchParam]:req.query["searchTerm"]
    }
})


if(movie)
res.send(movie)

} catch (error) {
    res.status(500).send({msg:error.message})
}

}

const getGeneralEventsCustom=async (req,res)=>{
    try {
     
     
        const searchParam=req.query["searchParam"];

        const general_events=await db.general_events.findAll({
            where:{
                [searchParam]:req.query["searchTerm"]
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

    res.status(500).send({msg:error.message})

}

}

const getReviews=async (req,res)=>{

try {
    const reviews=await db.reviews.findAll({
        where:{
            movie_name:req.query['movie_name']
        }
    })

    if(reviews)
        res.send(reviews);

} catch (error) {
       res.status(500).send({msg:error.message});
}

}

const getRecommendedMovies=async (req,res)=>{

    try {
        const recommended_movies=await db.recommended_movies.findAll({}).map(async movie=>{
            return db.movies.findOne({where:{
                id:movie.movie_id
            }})
        });
    
       
      res.send(recommended_movies);
    
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
    
    }
    
const getAdverts=async (req,res)=>{
try {

     const adverts= await db.advertisements.findAll({
        where:{
            date:req.query["date"]
        }
     })
res.send(adverts);

    
} catch (error) {
    res.status(500).send({msg:error.message})
}



}



const getTimings=async (req,res)=>{
try {
    
    const timeSlot=await db.timing.findAll({
     where:{
        movie_name:req.query["movie_name"],
        theater_name:req.query["theater_name"]
     }
    })    
    
    res.send(timeSlot)

} catch (error) {
    
     res.status(500).send({msg:error.message})


}



}
 

//forgot password

// /forgot password

//enter email

//otp to email

// /forgot password/verify


// enter otp mail and new password


//reset password successfully






export {getMoviesCustom,
    getGeneralEventsCustom,
    getAllGeneralEvents,
    getAllMovies,
    getReviews,
    getRecommendedMovies,
    getAdverts,
    getTimings
}
