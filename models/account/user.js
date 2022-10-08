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

      email:{
          type:DataTypes.STRING,
          allowNull:false
      },
      password:{
          type:DataTypes.STRING,
          allowNull:false
      },
      phone_number:{
           type:DataTypes.STRING,
           validate:{
            len:10
           },
           defaultValue:"Phone Number not provided!!"
      },
      isCritic:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
       allowNull:false
      },
      profile_picture:{
        type:DataTypes.STRING,
        defaultValue:"Default.jpeg"
      },
      verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
      },
  superStar:{
    type:DataTypes.BOOLEAN,
    defaultValue:false,
    allowNull:false
  }
       
})}