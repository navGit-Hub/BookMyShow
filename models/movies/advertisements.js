import es from '../../config/es.js'



const saveDocument= async (instance)=>{

  return await es.create({
   index:"advertisement",
   id:instance.dataValues.id,
   body:{
   image:instance.dataValues.image,
   date:instance.dataValues.date
   }
  })
}

const deleteDocument= async (instance)=>{
 return es.delete({
   index:"advertisement",
   id:instance.dataValues.id
 })

}

export default (sequelize,{DataTypes})=>{
    return sequelize.define('Advertisement',{
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
         image:{
            type:DataTypes.STRING(1000)
         },
      date:{
        type:DataTypes.DATE
      },
    },
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