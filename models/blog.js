"user strict";
module.exports = (sequelize,DataTypes)=>{
	const Banner = sequelize.define("Blog",{
		blogId:{
			type:DataTypes.INTEGER,
			primaryKey: true,
      		autoIncrement: true
		},
		catalogId:{
			type:DataTypes.INTEGER,
			allowNull:false,
			comment:"文章分类"
		},
		title:{
			type:DataTypes.STRING(30),
			allowNull:false,
			comment:"文章题目"
		},
		tags:{
			type:DataTypes.STRING(100),
			allowNull:true,
			comment:"文章搜索标签"
		},
		love:{
			type:DataTypes.INTEGER,
			allowNull:true,
			defaultValue:0,
			comment:"喜好人数"
		},
		hit:{
			type:DataTypes.INTEGER,
			allowNull:false,
			defaultValue:0,
			comment:"点击数",
		},
		cover:{
			type:DataTypes.STRING(100),
			allowNull:true,
			comment:"封面图片"
		},
		article:{
			type:DataTypes.STRING(10000),
			allowNull:false,
			comment:"文章内容",
		},
		summary:{
			type:DataTypes.STRING(100),
			allowNull:true,
			comment:"",
		}
	},{
		freezeTabName:true,
		tableName:"blog",
		timestamps:true
	})
	return Banner;
}