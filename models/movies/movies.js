import es from '../../config/es.js';

// add custom indices 
const saveDocument= async (instance)=>{
  
   await es.indices.putMapping({
    index:"movie",
    body:{
      properties:{
         title:{
            type:"text",
            fields:{
               keyword:{
                  type:"keyword",
               },
            },
         },
         genre:{
           type:"text",
           fields:{
            keyword:{
               type:"keyword"
            }
           }
         },
         language:{
            type:"text",
            fields:{
               keyword:{
                  type:"keyword"
               }
            }
         },
         rating:{
            type:"integer",
            fields:{
               keyword:{
                  type:"keyword"
               }
            }
         }

      }
    }
   })


    return await es.create({
      index:"movie",
      id:instance.dataValues.id,
      body:{
           review_id:instance.dataValues.review_id,
           title:instance.dataValue.title,
         genre:instance.dataValues.genre,
         duration:instance.dataValues.duration,
         rating:instance.dataValues.rating,
         isStreaming:instance.dataValues.isStreaming,
         language:instance.dataValues.language,
         certificate:instance.dataValues.certificate,
         BuyRent:instance.dataValues.BuyRent,
         price:instance.dataValues.price,
         image:instance.dataValues.image
      }
    })


}


const deleteDocument= async (instance)=>{
  
   return  es.delete({
   index:'movie',
   id:instance.dataValues.id
   })

   
}



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
        type:DataTypes.BOOLEAN,
        defaultValue:false
     },
     language:{
       type:DataTypes.STRING
     },
     certificate:{
        type:DataTypes.STRING,
        dafaultValue:"Not-Mentioned"
     },
   BuyRent:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
   },
     price:{
      type:DataTypes.INTEGER,
      defaultValue:0
     },

     image:{
      type:DataTypes.STRING(1000),
      defaultValue:"Default.jpeg",
      allowNull:false,
      validate:{
         len:{
            args:[0,1000]
         }
      }
     }
    }),{
      timestamps: true,

      hooks: {
        afterCreate: saveDocument,
        afterUpdate: saveDocument,
        afterDestroy: deleteDocument,
      },
    })
    }