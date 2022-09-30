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
          }   ,
          position:{
            type:DataTypes.STRING,
          },
          isBooked:{
            type:DataTypes.BOOLEAN
          }

    }))
    
    
    }