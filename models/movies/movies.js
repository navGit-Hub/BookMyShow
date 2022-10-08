export default (sequelize,{DataTypes})=>{
    return sequelize.define('Movie',({
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
          review_id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
    
          },
        title:{
            type:DataTypes.STRING
        },
        genre:{
            type:DataTypes.STRING
        },
        duration:{
            type:DataTypes.INTEGER
        },
     rating:{
        type:DataTypes.INTEGER
     },
     isStreaming:{
        type:DataTypes.BOOLEAN
     },
     language:{
       type:DataTypes.STRING
     },
     certificate:{
        type:DataTypes.STRING
     },
     image:{
      type:DataTypes.STRING,
      allowNull:false
     }
    }))
    }