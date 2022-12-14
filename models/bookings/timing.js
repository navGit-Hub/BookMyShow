export default (sequelize,{DataTypes})=>{
    return sequelize.define('Timing',({
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            unique:true,
            allowNull:false,
             primaryKey:true,
             validate:{
                notEmpty:true,
             }
          },

          //movie_name theater_name
movie_name:{
  type:DataTypes.STRING,
  allowNull:false
},
date:{
  type:DataTypes.DATEONLY,
  allowNull:false
},
    theater_id:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    screen_no:{
      type:DataTypes.INTEGER,
      allowNull:false
    }  
    ,
      time_slot:{
        type:DataTypes.TIME,
        allowNull:false
      }
    
    }))
    
    
    }


//seat table - one screen has many seats and many screens can as well
// have many seats how to maintain the seat tables??!


// many to many screen and theater

//create a temp table with screen and theater associate with new table aka seat_table with seat_no











//user table

// theater table

//screen table

//seats table

//timings table





