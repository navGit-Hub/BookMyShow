export default (sequelize,{DataTypes})=>{
    return sequelize.define('Seat',({
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
//try many to many

   theater_id:{
    type:DataTypes.INTEGER,
    allowNull:false
   },
   screen_id:{
    type:DataTypes.INTEGER,
    allowNull:false
   },
      seat_no:{
            type:DataTypes.STRING,
          },
          isBooked:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
          }

    }))
    
    
    }