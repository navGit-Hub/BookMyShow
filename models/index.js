import {Sequelize} from "sequelize";
import dotenv from 'dotenv';
import {account_settings,profile,purchase_history,stream_libraries,user} from './account/index.js';
import {book,payment,ticket,timing} from './bookings/index.js'
import {general_events,movies,stream_movies,theater_movies,recommended_movies} from './movies/index.js';
import {review} from './reviews/index.js';
import {screens,seats,theater} from './theater/index.js';



dotenv.config();


const sequelize=new Sequelize(process.env.DB, process.env.USER_NAME,process.env.PASSWORD,{
host:process.env.HOST,
dialect:process.env.dialect,
logging:false
});

const db_connect= async ()=>{
  
    try {

        await sequelize.authenticate();
        console.log("connected to the dataBase!!")
        
    } catch (error) {
         
        console.log("Error:",error);
    }
}


db_connect();


(async () => {
    try{
    await sequelize.sync({ force: true });
    console.log("Drop and Resync DB");
    }
    catch(ex){
        console.log("here", ex.message)
    }
  })();


const db={}

db.Sequelize=Sequelize;
db.sequelize=sequelize;

//account
db.account_settings=account_settings(sequelize,Sequelize);
db.profile=profile(sequelize,Sequelize);
db.purchase_history=purchase_history(sequelize,Sequelize);
db.stream_libraries=stream_libraries(sequelize,Sequelize);
db.user=user(sequelize,Sequelize);


//booking
db.book=book(sequelize,Sequelize);
db.payment=payment(sequelize,Sequelize);
db.ticket=ticket(sequelize,Sequelize);
db.timing=timing(sequelize,Sequelize);


//movies_events
db.general_events=general_events(sequelize,Sequelize);
db.movies=movies(sequelize,Sequelize);
db.stream_movies=stream_movies(sequelize,Sequelize);
db.theater_movies=theater_movies(sequelize,Sequelize);
db.recommended_movies=recommended_movies(sequelize,Sequelize);

//reviews
db.reviews=review(sequelize,Sequelize);


//theater
db.theater=theater(sequelize,Sequelize);
db.screens=screens(sequelize,Sequelize);
db.seats=seats(sequelize,Sequelize);


//relations

//account_settings
db.account_settings.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user.belongsTo(db.account_settings,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})
db.account_settings.hasMany(db.purchase_history,{
  foreignKey:"pur_id",
  onDelete:"CASCADE",
  onUpdate:"CASCADE"
})

db.purchase_history.belongsTo(db.account_settings,{
    foreignKey:"pur_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})



//book_tickets

db.book.hasMany(db.ticket,{
    foreignKey:"ticket_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  
  db.ticket.belongsTo(db.book,{
      foreignKey:"ticket_id",
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
  })
  db.book.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  
  db.user.belongsTo(db.book,{
      foreignKey:"user_id",
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
  })


  db.book.hasMany(db.theater,{
    foreignKey:"theater_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  
  db.theater.belongsTo(db.book,{
      foreignKey:"theater_id",
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
  })


//theater_movies



db.theater_movies.hasMany(db.theater,{
    foreignKey:"theater_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  
  db.theater.belongsTo(db.theater_movies,{
      foreignKey:"theater_id",
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
  })
  db.theater_movies.hasOne(db.movies,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  
  db.movies.belongsTo(db.theater_movies,{
      foreignKey:"movie_id",
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
  })

//profile

db.profile.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  
  db.user.belongsTo(db.profile,{
      foreignKey:"user_id",
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
  })


  db.profile.hasOne(db.account_settings,{
    foreignKey:"account_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  
  db.account_settings.belongsTo(db.profile,{
      foreignKey:"account_id",
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
  })

  //stream_movies

  db.stream_movies.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })

  db.user.belongsTo(db.stream_movies,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })

  db.stream_movies.hasOne(db.movies,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })
  db.movies.belongsTo(db.stream_movies,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })

//movies

db.movies.hasOne(db.reviews,{
    foreignKey:"review_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })

  db.reviews.belongsTo(db.movies,{
    foreignKey:"review_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
  })

//stream_libraries
db.stream_libraries.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user.belongsTo(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


db.stream_libraries.hasMany(db.stream_movies,{
    foreignKey:"lib_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.stream_movies.belongsTo(db.stream_libraries,{
    foreignKey:"lib_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.stream_libraries.hasMany(db.movies,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.movies.belongsTo(db.stream_libraries,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

//reviews

db.reviews.hasOne(db.user,{
    foreignKey:"review_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user.belongsTo(db.reviews,{
    foreignKey:"review_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

//timings


db.timing.hasMany(db.screens,{
    foreignKey:"screen_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


db.screens.belongsTo(db.timing,{
    foreignKey:"screen_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.timing.hasMany(db.movies,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.movies.belongsTo(db.timing,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


//theater

db.theater.hasMany(db.screens,{
    foreignKey:"screen_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.screens.belongsTo(db.theater,{
    foreignKey:"screen_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.theater.hasMany(db.seats,{
    foreignKey:"seat_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


db.seats.belongsTo(db.theater,{
    foreignKey:"seat_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.theater.hasMany(db.screens,{
    foreignKey:"screen_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.screens.belongsTo(db.theater,{
    foreignKey:"screen_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.theater.hasMany(db.theater_movies,{
    foreignKey:"theatrical_movies_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


db.theater_movies.belongsTo(db.theater,{
    foreignKey:"theatrical_movies_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.theater.hasMany(db.timing,{
    foreignKey:"timing_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.timing.belongsTo(db.theater,{
    foreignKey:"timing_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


//general_events

db.general_events.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


db.user.belongsTo(db.general_events,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


db.general_events.hasMany(db.book,{
    foreignKey:"book_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


db.book.belongsTo(db.general_events,{
    foreignKey:"book_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

//purchase_history

db.purchase_history.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


db.user.belongsTo(db.purchase_history,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


//recommended_movies


db.recommended_movies.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


db.user.belongsTo(db.recommended_movies,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.recommended_movies.hasMany(db.movies,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.movies.belongsTo(db.recommended_movies,{
    foreignKey:"movie_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

//payment

db.payment.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user.belongsTo(db.payment,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})


//ticket

db.ticket.hasMany(db.user,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.user.belongsTo(db.ticket,{
    foreignKey:"user_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.ticket.hasMany(db.screens,{
    foreignKey:"screen_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.screens.belongsTo(db.ticket,{
    foreignKey:"screen_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.ticket.hasMany(db.seats,{
    foreignKey:"seat_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})

db.seats.belongsTo(db.ticket,{
    foreignKey:"seat_id",
    onDelete:"CASCADE",
    onUpdate:"CASCADE"
})



export  default db;











































