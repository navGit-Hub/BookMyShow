export default (sequelize,{DataTypes})=>{
    return sequelize.define(
    "User",
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
      user_name:{
        type:DataTypes.STRING,
        allowNull:false
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
      },
      verified:{
        type:DataTypes.BOOLEAN,
      }
      
})}