import db from '../models/index.js';

const bookMovieTickets=async (req,res)=>{

    try{
   //verify movie

   const movie=await db.movies.findOne({
    where:{
        movie_name:req.body.movie_name
    }
})
   //verify theater

   const theater=await db.theater.findOne({
    where:{
        theater_name:req.body.theater_name
    }
   })

//verify screen

const screen=await db.theater.findOne({
    where:{
        theater_id:theater.id
    }
})

   //verify seats
const seats=await db.theater.findOne({
    where:{
           id:screen.seat_id
    }
})
   //verify timing

const timing=await db.timing.findOne({
    where:{
          id:screen.timings_id,
    }
})
if(!screen.isFree || !movie || !theater || !screen || !seats || !timing)
{
    throw Error('Sorry the Booking cannot be processed!!')
}

        const book=await db.book.create({
           user_id:req.body.user_id,
           movie_name:req.body.movie_name,
           theater_name:req.body.theater_name,
        time:req.body.time,
        number_of_tickets:req.body.number_of_tickets,
        mode_of_payment:req.body.mode_of_payment,       
        seats:req.body.seats,
        })
        if(book)
        {
            res.send(book);
        }
} 
catch (error) {
    res.status(500).send({msg:error.message})
}

}

export {bookMovieTickets}