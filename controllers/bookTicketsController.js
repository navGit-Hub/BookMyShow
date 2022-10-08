import db from '../models/index.js';
import nodemailer from 'nodemailer';


const transporter=nodemailer.createTransport({
   service:"Gmail",
    auth:{
        user:"naveenmuthu05@gmail.com",
        pass:"atqnkbyqaghpcgrc",
}
})


const paymentProcessed=true;




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

       
   //verify theater

   const theater=await db.theater.findOne({
    where:{
        theater_name:req.body.theater_name,
        movie_name:req.body.movie_name
    }
   })

//verify screen

const screen=await db.theater.findOne({
    where:{
        theater_id:theater.id,
        screen_no:req.body.screen_no
    }
})

   //verify seats

   const timing=await db.timing.findOne({
    where:{
          theater_id:theater.id,
          movie_name:req.body.movie_name,
          time_slots:req.body.time_slot
    }
})
if(!timing)
   throw new Error("The timings are not available!!")




const seats=req.body.seats.split(" ");

const seat_ids=[];


seats.forEach(async seat=>{

const single_seat=await db.seats.findOne({
    where:{
        theater_id:theater.id,
        screen_id:screen.id
    }
})
    seat_ids.push(single_seat.id);
db.seats.update({isBooked:true},{
    where:{
        id:single_seat.id
    }
})
})



// const seats=await db.theater.findOne({
//     where:{
//            seat_no:"1A",
//            theater_id:theater.id,
//            screen_id:screen.id
//     }
// })
   //verify timing





   if(!screen.isFree || !theater || !screen || !timing)
{
    throw Error('Sorry the Booking cannot be processed!!')
}


const book_id="";

setTimeout(async ()=>{


const payment=await db.payment.findOne({
    where:{
        book_id
    }
})



if(!payment.payment_status)
       {

           seat_ids.forEach(async seat_id=>{

             await db.seats.update({isBooked:false},{
                where:{
                      id:seat_id
                }
              })

           })
         

  await  db.payment.destroy({
    where:{
        book_id
    }
   })
   await db.book.destroy({
    where:{
        id:book_id
    }
   })


       }
},50000)
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

       db.payment.create({ book_id:book.id,})
        
book_id=book.id;


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