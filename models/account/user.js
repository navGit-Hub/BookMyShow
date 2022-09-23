export default (sequelize,{DataTypes})=>{
    return sequelize.define(
    "User",
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
      email:{
          type:DataTypes.STRING,
          allowNull:false
      },
      location:{
         type:DataTypes.STRING,
         allowNull:false
      },
      password:{
          type:DataTypes.STRING,
          allowNull:false
      },
      phone_number:{
           type:DataTypes.BIGINT,  
      },
      isCritic:{
        type:DataTypes.BOOLEAN,
       allowNull:false
      },
      profile_picture:{
        type:DataTypes.STRING
      }
      
})}