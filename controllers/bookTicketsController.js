import db from '../models/index.js';
import nodemailer from 'nodemailer';


const transporter=nodemailer.createTransport({
   service:"Gmail",
    auth:{
        user:"naveenmuthu05@gmail.com",
        pass:"atqnkbyqaghpcgrc",
}
})


const bookMovieTickets=async (req,res)=>{

    try{

   //get user

   const user=await db.user.findOne({
    where:{
        id:req.body.user_id
    }
   })

console.log(user)


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
           screen_no:req.body.screen
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
date:req.body.date
        })
        console.log(book)
        if(book)
        {

        const mailOptions={
       from:'naveenmuthu05@gmail.com',
        to:user.email, 
        subject:"your tickets have been booked successfully!!",
        html:`
        <p>Enjoy your show!! ${book.number_of_tickets} tickets (${book.seats})
         have been booked for the movie ${book.movie_name} at ${book.theater_name} on ${book.date}.</p>`
        }
         
 transporter.sendMail(mailOptions,(error,info)=>{

if(error)
{
    console.log("Failed to send Mail!!")
}
console.log(`Message ${info.messageId} was sent successfully ${info.response}`)

})

console.log("sending mail.....")

            res.send(book);
        }
} 
catch (error) {
    console.log("Hello")
    res.status(500).send({msg:error.message})
}

}

export {bookMovieTickets}