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


const blockSeats=async (seats,theater_id,screen_no,seat_ids,timing_id)=>{

console.log("hi");

    // seats.forEach(async seat_no=>{})








for(const seat_no of seats)
{

    console.log(theater_id,screen_no,seat_no,timing_id)

    const single_seat=await db.seats.findOne({
        where:{
            theater_id,
            screen_no,
            seat_no,
            timing_id
        }
    })

    console.log(single_seat)
    console.log(single_seat.dataValues.isBooked)
        const seat_id=single_seat.dataValues.seat_id;
        console.log(seat_id);
        
        //console.log(seat_ids)
    if(single_seat.dataValues.isBooked)
         continue;
    
          seat_ids.push(seat_id)
    await db.seats.update({isBooked:true},{
        where:{
            seat_id,
            timing_id,
            theater_id,
            screen_no
        }
    })


}



console.log(seat_ids)


}







const bookMovieTickets=async (req,res)=>{

    try{

   //get user

   const user=await db.user.findOne({
    where:{
        id:req.body.user_id,
        email:"naveenmuthu05@gmail.com"
    }
   })

console.log(user.email)



 
       
   //verify theater

   const theater=await db.theater.findOne({
where:{
    theater_name:req.body.theater_name,
    location:req.body.location
}
   })

   //console.log(theater.dataValues.id)
//verify screen


const theater_id=theater.dataValues.id;
//console.log(theater_id)

const screen=await db.screens.findOne({
    where:{
        theater_id,
        screen_no:req.body.screen_no,
        movie_name:req.body.movie_name
    }
})
//console.log(screen.dataValues.id)
const screen_id=screen.dataValues.id;

const screen_no=screen.dataValues.screen_no;

   //verify seats

console.log(theater_id,screen_id)


   const timing=await db.timing.findOne({
    where:{
          theater_id,
          screen_no,
          movie_name:req.body.movie_name,
          time_slot:req.body.time_slot,
          date:req.body.date
    }
})


console.log(timing)


//console.log(timing.dataValues.time_slot)


if(!timing)
   throw new Error("The timings are not available!!")


   const timing_id=timing.dataValues.id;
   console.log(timing_id)


const seats=req.body.seats.split(" ");

const seat_ids=[];

await blockSeats(seats,theater_id,screen_no,seat_ids,timing_id);


console.log(seat_ids);






//different slot booking same screen


//same screen same seat but different time slot

if(seat_ids.length===0)
    throw new Error("The seats are already taken :(")


  if(screen.dataValues.isFree || !theater || !screen || !timing)
{
    throw Error('Sorry the Booking cannot be processed!!')
}
        const book=await db.book.create({
           user_id:req.body.user_id,
           movie_name:req.body.movie_name,
           theater_name:req.body.theater_name,
        time:req.body.time_slot,
        number_of_tickets:req.body.number_of_tickets,
        mode_of_payment:req.body.mode_of_payment,       
        seats:req.body.seats,
date:req.body.date
        })

        //console.log(book);
        res.send(book)
const book_id=book.dataValues.id;
        const payment=await db.payment.create({ book_id})
        
//console.log(payment);





console.log(seat_ids)


setTimeout(async ()=>{

console.log(seat_ids)
    const payment=await db.payment.findOne({
        where:{
            book_id
        }
    })
    console.log(payment)
    
    
    if(!payment.dataValues.payment_status)
           {
            console.log("hello")
    
try {
    seat_ids.forEach(async seat_id=>{
    
        await db.seats.update({isBooked:false},{
           where:{
                 seat_id,
                 theater_id,
                 screen_no,
                 timing_id,
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
    
} catch (error) {
    console.log(error.message)
}
    
    
           }
    },10000)

        if(book)
        {

        const mailOptions={
       from:'naveenmuthu05@gmail.com',
        to:user.email, 
        subject:"your tickets have been booked successfully!!",
        html:`
        <p>Enjoy your show!! ${book.number_of_tickets} tickets (${book.seats})
         have been booked for the movie ${book.movie_name} at ${book.theater_name} on ${book.date} ${book.time}PM .</p>`
        }
         
 transporter.sendMail(mailOptions,(error,info)=>{

if(error)
{
    console.log("Failed to send Mail!!")
}
console.log(`Message ${info.messageId} was sent successfully ${info.response}`)

})

console.log("sending mail.....")
        }
} 
catch (error) {
    console.log(error)
    res.status(500).send({msg:error.message})
}

}

export {bookMovieTickets}