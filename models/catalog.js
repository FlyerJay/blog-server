"user strict";
module.exports = (sequelize,DataTypes)=>{
	const Catalog = sequelize.define("Catalog",{
		catalogId:{
			type:DataTypes.INTEGER,
			primaryKey: true,
      		autoIncrement: true
		},
		catalogName:{
			type:DataTypes.STRING(20),
			allowNull:false,
			comment:"分类名称",
		}
	},{
		freezeTabName:true,
		tableName:"catalog",
		timestamps:true
	})
	return Catalog;
}