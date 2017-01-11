+function($){
	if (window.pureEditor) {
		alert("不能重复引用 pureEditor.js")
		return;
	}

	var E = function(elem){
		//传入jquery能处理的selector
		var $elem = $(elem);
		if ($elem.length !== 1) {
			return;
		}
		var nodeName = $elem[0].nodeName;
		if (nodeName !== "DIV"){
			return;
		}
		this.$valueNodeName = nodeName;
		this.$vulueContainer = $elem;

		this.$prev = $elem.prev();
		this.$parent = $elem.parent();

		this.init();
	}

	E.fn = E.prototype;
	E.fn.init = function () {
		//加载默认配置
		this.initDefaultConfig();
		//添加编辑器容器;
		this.addEditorContainer();
		//添加编辑区
		this.addTxt();
		//添加菜单栏容器
		this.addMenuContainer();
		//初始化菜单项
		this.menus = {}
		//this.commandHooks();
	}

	E.fn.create = function () {
		var editor = this;

		editor.addMenus();
		editor.renderMenus();
		editor.renderMenuContainer();
		editor.renderTxt();
		editor.renderEditorContainer();

		editor.eventMenus();
		editor.eventMenuContainer();
		editor.eventTxt();

		editor.$txt = editor.txt.$txt;
	}

	E.fn.renderMenus = function(){
		var editor = this;
		var menus = editor.menus;
		var menuIds = editor.config.menus;

		var menu;
		var groupIdx = 0;
		$.each(menuIds,function(k,v){
			if (v === "|"){
				groupIdx++;
				return;
			}

			menu = menus[v];
			if (menu) {
				menu.render(groupIdx);
			}
		})
	}

	window.pureEditor = E;
}($)