import db from "../models/index.js";


//paginate
const getMoviesCustom=async (req,res)=>{
try {
    
        const searchParam=req.query["searchParam"]

        console.log(req.query)
const movie=await db.movies.findAll({
    limit:5,
    offset:req.query.offset*5,
    where:{
        [searchParam]:req.query["searchTerm"]
    }
})

//validate screen with date and free seats periodically before
//opening any movie for booking


if(movie)
res.send(movie)

} catch (error) {
    res.status(500).send({msg:error.message})
}

}


//paginate
const getGeneralEventsCustom=async (req,res)=>{
    try {
     
     
        const searchParam=req.query["searchParam"];

        const general_events=await db.general_events.findAll({
            limit:5,
            offset:req.query.offset*5,
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

//pagination
const getAllGeneralEvents=async (req,res)=>{
  
    try {
         const allEvents=await db.general_events.findAll({
            limit:5,
            offset:req.query.offset*5,
         });

              res.status(200).send(allEvents);

    } catch (error) {
       res.status(500).send({message:error.message});
    }

}


//paginate
const getAllMovies=async (req,res)=>{

try {
     
    const allMovies=await db.movies.findAll({
        limit:5,
        offset:req.query.offset*2,
        where:{
            isStreaming:false
        }
    });


   res.status(200).send(allMovies);

} catch (error) {

    res.status(500).send({msg:error.message})

}

}

//paginate
const getReviews=async (req,res)=>{

try {
    const reviews=await db.reviews.findAll({
        limit:5,
        offset:req.query.offset*5,
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


//pagination
const getRecommendedMovies=async (req,res)=>{

    try {
        const recommended_movies=await db.recommended_movies.findAll({
            limit:5,
            offset:req.query.offset*5,

        }).map(async movie=>{
            return db.movies.findOne({where:{
                id:movie.movie_id
            }})
        });
    
       
      res.send(recommended_movies);
    
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
    
    }
    

   //paginate 
const getAdverts=async (req,res)=>{
try {

     const adverts= await db.advertisements.findAll({
        limit:5,
        offset:req.query.offset*5,
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
 

const getBookings=async (req,res)=>{

       try {

            const bookings=await db.book.findAll({});
            res.send(bookings)


        
       } catch (error) {
           res.status(501).send({msg:error.message});
       }




}




const getSeats=async (req,res)=>{ 
try {
    
    const seats=await  db.seats.findAll({
        where:{
           theater_id:req.query.theater_id,
           screen_no:req.query.screen_no,
           timing_id:req.query.timing_id
        }
       }
        )

res.send(seats);

} catch (error) {
    res.status(500).send({err:error.message});
}



}




//forgot password

// /forgot password

//enter email

//otp to email

// /forgot password/verify


// enter otp mail and new password


//reset password successfully




//book general events





export {getMoviesCustom,
    getGeneralEventsCustom,
    getAllGeneralEvents,
    getAllMovies,
    getReviews,
    getRecommendedMovies,
    getAdverts,
    getTimings,
    getBookings,
    getSeats
}
