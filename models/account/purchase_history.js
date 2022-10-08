export default (sequelize,{DataTypes})=>{
    return sequelize.define(
    "Purchase",
    {
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
      user_id:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false,
      

      },
      booked_tickets:{
        type:DataTypes.INTEGER,
        allowNull:false
      }
    }
    )
    }