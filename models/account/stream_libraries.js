export default (sequelize,{DataTypes})=>{
    return sequelize.define(
    "StreamLibraries",
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
add_movie:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
     default:0
},
movie_id:{
    type:DataTypes.INTEGER,
    unique:true,
    allowNull:false,
     primaryKey:true,

  },
    }
    )
}