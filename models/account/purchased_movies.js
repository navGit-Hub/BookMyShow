export default (sequelize,{DataTypes})=>{
    return sequelize.define(
    "PurchasedMovies",
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
        allowNull:false,
      },
      owned:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
      }

      ,
      rentedDate:{
        type:DataTypes.DATE,
        defaultValue:0
     },
      movie_id:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false,
         

      }
    }
    )
    }