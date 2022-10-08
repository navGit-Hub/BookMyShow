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
      movie_id:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false,
         

      }
    }
    )
    }