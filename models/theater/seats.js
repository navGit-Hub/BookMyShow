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
screen_id:{
  type:DataTypes.INTEGER,

},
//try many to many


      seat_no:{
            type:DataTypes.STRING,
          },
          isBooked:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
          }

    }))
    
    
    }