export default (sequelize,{DataTypes})=>{
    return sequelize.define('Movie',({
        id:{
            type:DataTypes.INTEGER,
            unique:true,
            allowNull:false,
             primaryKey:true,
             validate:{
                noEmpty:true,
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
     certificate:{
        type:DataTypes.STRING
     }
    }))
    }