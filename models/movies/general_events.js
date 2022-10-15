import es from '../../config/es.js'



const saveDocument= async (instance)=>{

  return await es.create({
   index:"general_event",
   id:instance.dataValues.id,
   body:{
   image:instance.dataValues.image,
   date:instance.dataValues.date,
   location:instance.dataValues.location,
   event_outline:instance.dataValues.event_outline,
   online_outdoor:instance.dataValues.online_outdoor
   }
  })
}

const deleteDocument= async (instance)=>{
 return es.delete({
   index:"general_event",
   id:instance.dataValues.id
 })

}


export default (sequelize,{DataTypes})=>{
    return sequelize.define('Event',{
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
          date:{
          type:DataTypes.DATEONLY,
          allowNull:false
          }
          
          ,
         online_outdoor:{
            type:DataTypes.BOOLEAN
         },
         event_outline:{
            type:DataTypes.STRING
         },
         location:{
            type:DataTypes.STRING
         },
         image:{
            type:DataTypes.STRING
         },
      } , 
         {
            timestamps: true,
      
            hooks: {
              afterCreate: saveDocument,
              afterUpdate: saveDocument,
              afterDestroy: deleteDocument,
            },
          }

    )


   }
    
    

    
    