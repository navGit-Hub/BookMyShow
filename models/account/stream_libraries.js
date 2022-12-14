export default (sequelize,{DataTypes})=>{
    return sequelize.define(
    "StreamLibraries",
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
movie_id:{
    type:DataTypes.INTEGER,
    unique:true,
    allowNull:false,
  

  },
  lib_id:{
      type:DataTypes.INTEGER,
      unique:true,
      allowNull:false,
    
  
    }
    }
    )
}