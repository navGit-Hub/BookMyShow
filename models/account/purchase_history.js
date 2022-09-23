export default (sequelize,{DataTypes})=>{
    return sequelize.define(
    "Purchase",
    {
      id:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false,
         primaryKey:true,
         validate:{
            noEmpty:true,
         }
      },
      user_id:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false,
         primaryKey:true,

      },
      booked_tickets:{
        type:DataTypes.INTEGER,
        allowNull:false
      }
    }
    )
    }