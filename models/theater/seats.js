export default (sequelize,{DataTypes})=>{
    return sequelize.define('Seat',({
        seat_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
          },
//try many to many

   theater_id:{
    type:DataTypes.INTEGER,
    allowNull:false
   },
   screen_no:{
    type:DataTypes.INTEGER,
    allowNull:false
   },
      seat_no:{
            type:DataTypes.STRING,
          },
          isBooked:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
          },
      timing_id:{
         type:DataTypes.INTEGER,
         allowNull:false
      }

    }))
    
    
    }