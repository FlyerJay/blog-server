var express = require('express');
var router = express.Router();
var models = require("../models");
//构造返回对象的实体，code默认为200，当有错误时会返回errorinfo，数据中有list时会返回pageinfo

router.get('/', function(req, res, next) {
  	res.send('can not get detail request!');
});

models.Blog.belongsTo(models.Catalog,{foreignKey:'catalogId',targetKey:'catalogId'});

router.get('/blog', function(req, res, next) {
	models.Blog.findAndCountAll({
		include:[models.Catalog],
		limit:req.query.pageSize - 0,
		offset:(req.query.page - 1) * (req.query.pageSize - 0),
		order:'createdAt desc'
	}).then(function(datas){
		var result = {
			code:200,
			errorinfo:"",
			data:{
				list:[],
			},
			pageinfo:"",
			message:""
		}
		if(datas.rows.length>0){
			result.code = 200;
			result.data.list = datas.rows;
			result.pageinfo = {}
			result.pageinfo.pageSize = req.query.pageSize;
			result.pageinfo.totalCount = datas.count;
			result.pageinfo.page = req.query.page - 0;
		}else{
			result.code = 500;
			result.errorinfo = {
				msg:"查询数据为空",
			}
		}
		res.json(result);
	})
});

router.post('/blog', function(req, res, next) {
	models.Blog.create(req.body.params).then(function(data){
		var result = {
			code:200,
			errorinfo:"",
			data:{
				list:[],
			},
			pageinfo:"",
			message:""
		}
		result.code = 200;
		result.message = "新增成功";
		result.data = data;
		res.json(result);
	})
});

router.get('/blog/:id', function(req, res, next) {
	var id = req.params.id;
	models.Blog.findOne({
		where:{
			blogId:{
				$eq:id,
			},
		}
	}).then(function(datas){
		var result = {
			code:200,
			errorinfo:"",
			data:{
				list:[],
			},
			pageinfo:"",
			message:""
		}
		if(datas){
			result.code = 200;
			result.data = datas.dataValues;
		}else{
			result.code = 500;
			result.data = "";
			result.errorinfo = {
				msg:"查询数据为空",
			}
		}
		res.json(result);
	})
});

router.patch('/blog/:id', function(req, res, next) {
	models.Blog.update(
		req.body.params,
		{
		'where':{
			'blogId':[req.params.id]
		}
	}).then(function(data){
		var result = {
			code:200,
			errorinfo:"",
			data:{
				list:[],
			},
			pageinfo:"",
			message:""
		}
		result.code = 200;
		result.message = "修改成功";
		res.json(result);
	})
});

router.delete('/blog/:id', function(req, res, next) {
	models.Blog.destroy({
		'where':{
			'blogId':[req.params.id]
		}
	}).then(function(data){
		var result = {
			code:200,
			errorinfo:"",
			data:{
				list:[],
			},
			pageinfo:"",
			message:""
		}
		result.code = 200;
		result.message = "删除成功";
		res.json(result);
	})
});

router.get('/catalog', function(req, res, next) {
	models.Catalog.findAndCountAll({
		limit:req.query.pageSize - 0,
		offset:(req.query.page - 1) * (req.query.pageSize - 0),
		order:'createdAt desc'
	}).then(function(datas){
		var result = {
			code:200,
			errorinfo:"",
			data:{
				list:[],
			},
			pageinfo:"",
			message:""
		}
		if(datas.rows.length>0){
			result.code = 200;
			result.data.list = datas.rows;
			result.pageinfo = {}
			result.pageinfo.pageSize = req.query.pageSize - 0;
			result.pageinfo.totalCount = datas.count;
			result.pageinfo.page = req.query.page - 0;
		}else{
			result.code = 500;
			result.errorinfo = {
				msg:"查询数据为空",
			}
		}
		res.json(result);
	})
});

router.get('/catalog/:id', function(req, res, next) {
	models.Catalog.findOne().then(function(datas){
		var result = {
			code:200,
			errorinfo:"",
			data:{
				list:[],
			},
			pageinfo:"",
			message:""
		}
		if(datas.length>0){
			result.code = 200;
			result.data.list = datas;
		}else{
			result.code = 200;
			result.errorinfo = {
				msg:"查询数据为空",
			}
		}
		res.json(result);
	})
});

router.post('/catalog', function(req, res, next) {
	models.Catalog.create(req.body.params).then(function(data){
		var result = {
			code:200,
			errorinfo:"",
			data:{
				list:[],
			},
			pageinfo:"",
			message:""
		}
		result.code = 200;
		result.message = "新增成功";
		res.json(result);
	})
});

router.patch('/catalog/:id', function(req, res, next) {
	models.Catalog.update(
		{
			catalogName:req.body.params.catalogName
		},
		{
		'where':{
			'catalogId':[req.params.id]
		}
	}).then(function(data){
		var result = {
			code:200,
			errorinfo:"",
			data:{
				list:[],
			},
			pageinfo:"",
			message:""
		}
		result.code = 200;
		result.message = "修改成功";
		res.json(result);
	})
});

router.delete('/catalog/:id', function(req, res, next) {
	models.Catalog.destroy({
		'where':{
			'catalogId':[req.params.id]
		}
	}).then(function(data){
		var result = {
			code:200,
			errorinfo:"",
			data:{
				list:[],
			},
			pageinfo:"",
			message:""
		}
		result.code = 200;
		result.message = "新增成功";
		res.json(result);
	})
});

module.exports = router;
