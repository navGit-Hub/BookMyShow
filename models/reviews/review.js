export default (sequelize,{DataTypes})=>{
    return sequelize.define('Review',({
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
          review:{
            type:DataTypes.STRING,
            allowNull:false
          }

          ,
          movie_name:{
            type:DataTypes.STRING
          },
          user_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
    
          },

    }))
    
    
    }