export default (sequelize,{DataTypes})=>{
    return sequelize.define('Verification',({
          user_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
          },
     otp:{type:DataTypes.STRING},
     created_at:{type:DataTypes.DATE},
     expires_at:{type:DataTypes.DATE}

    }))
    }