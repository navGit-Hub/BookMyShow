export default (sequelize,{DataTypes})=>{
return sequelize.define('Account_setting',({
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
      purchase_id:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false,
       
      },
}))


}