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
		this.valueNodeName = nodeName;
		this.$valueContainer = $elem;

		this.$prev = $elem.prev();
		this.$parent = $elem.parent();

		this.config = {
			zindex:10000,
			printLog:false,
			menuFixed:0,
			jsFilter:true,
			legalTags:'p,h1,h2,h3,h4,h5,h6,blockquote,table,ul,ol,pre',
			menus:[
				'source',
				'|',
				'bold',
				'underline',
				'italic',
				'strikethrough',
				'eraser',
				'forecolor',
				'bgcolor',
				'|',
				'quote',
				'fontfamily',
				'fontsize',
				'head',
				'unorderlist',
				'orderlist',
				'alignleft',
				'aligncenter',
				'alignright',
				'|',
				'link',
				'unlink',
				'table',
				'emotion',
				'|',
				'img',
				'video',
				'location',
				'insertcode',
				'|',
				'undo',
				'redo',
				'fullscreen'
			],
			color:{
				'#880000': '暗红色',
				'#800080': '紫色',
				'#ff0000': '红色',
				'#ff00ff': '鲜粉色',
				'#000080': '深蓝色',
				'#0000ff': '蓝色',
				'#00ffff': '湖蓝色',
				'#008080': '蓝绿色',
				'#008000': '绿色',
				'#808000': '橄榄色',
				'#00ff00': '浅绿色',
				'#ffcc00': '橙黄色',
				'#808080': '灰色',
				'#c0c0c0': '银色',
				'#000000': '黑色',
				'#ffffff': '白色'
			},
			fonts:[
				'宋体', '黑体', '楷体', '微软雅黑',
				'Arial', 'Verdana', 'Georgia',
				'Times New Roman', 'Microsoft JhengHei',
				'Trebuchet MS', 'Courier New', 'Impact', 'Comic Sans MS', 'Consolas'
			],
			fontsizes:{
				1: '12px',
				2: '13px',
				3: '16px',
				4: '18px',
				5: '24px',
				6: '32px',
				7: '48px'
			}
		}

		this.UI = {
			menus:{
				'default': {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-command"></i></a>',
				    selected: '.selected'
				},
				bold: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-bold"></i></a>',
				    selected: '.selected'
				},
				underline: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-underline"></i></a>',
				    selected: '.selected'
				},
				italic: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-italic"></i></a>',
				    selected: '.selected'
				},
				forecolor: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-pencil"></i></a>',
				    selected: '.selected'
				},
				bgcolor: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-brush"></i></a>',
				    selected: '.selected'
				},
				strikethrough: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-strikethrough"></i></a>',
				    selected: '.selected'
				},
				eraser: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-eraser"></i></a>',
				    selected: '.selected'
				},
				quote: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-quotes-left"></i></a>',
				    selected: '.selected'
				},
				source: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-code"></i></a>',
				    selected: '.selected'
				},
				fontfamily: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-font2"></i></a>',
				    selected: '.selected'
				},
				fontsize: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-text-height"></i></a>',
				    selected: '.selected'
				},
				head: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-header"></i></a>',
				    selected: '.selected'
				},
				orderlist: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-list-numbered"></i></a>',
				    selected: '.selected'
				},
				unorderlist: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-list-bullet"></i></a>',
				    selected: '.selected'
				},
				alignleft: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-left"></i></a>',
				    selected: '.selected'
				},
				aligncenter: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-center"></i></a>',
				    selected: '.selected'
				},
				alignright: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-align-right"></i></a>',
				    selected: '.selected'
				},
				link: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-link"></i></a>',
				    selected: '.selected'
				},
				unlink: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-unlink"></i></a>',
				    selected: '.selected'
				},
				table: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-table"></i></a>',
				    selected: '.selected'
				},
				emotion: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-happy"></i></a>',
				    selected: '.selected'
				},
				img: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-picture"></i></a>',
				    selected: '.selected'
				},
				video: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-play"></i></a>',
				    selected: '.selected'
				},
				location: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-location"></i></a>',
				    selected: '.selected'
				},
				insertcode: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-terminal"></i></a>',
				    selected: '.selected'
				},
				undo: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-ccw"></i></a>',
				    selected: '.selected'
				},
				redo: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-cw"></i></a>',
				    selected: '.selected'
				},
				fullscreen: {
				    normal: '<a href="#" tabindex="-1"><i class="wangeditor-menu-img-enlarge2"></i></a>',
				    selected: '<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-shrink2"></i></a>'
				}
			}
		}

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

	E.fn.initDefaultConfig = function(){
		var editor = this;
		editor.config = $.extend({},editor.config);
		editor.UI = $.extend({},editor.UI);
	}

	E.fn.addEditorContainer = function(){
		this.$editorContainer = $("<div class='pureEditor-container'></div>");
	}

	E.fn.addTxt = function(){
		var editor = this;
		var txt = new E.Txt(editor);
		editor.txt = txt;
	}

	E.fn.addMenuContainer = function(){
		var editor = this;
		editor.menuContainer = new E.MenuContainer(editor);
	}

	E.fn.create = function () {
		var editor = this;

		editor.addMenus();
		editor.renderMenus();
		editor.renderMenuContainer();
		editor.renderTxt();
		editor.renderEditorContainer();

		//editor.eventMenus();
		//editor.eventMenuContainer();
		//editor.eventTxt();

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

	E.fn.renderTxt = function(){
		var editor = this;
		var txt = editor.txt;

		txt.render();
	}

	E.fn.renderMenuContainer = function(){
		var editor = this;
		var menuContainer = editor.menuContainer;
		var $editorContainer = editor.$editorContainer;

		menuContainer.render();
	}

	E.fn.renderEditorContainer = function () {

	    var editor = this;
	    var $valueContainer = editor.$valueContainer;
	    var $editorContainer = editor.$editorContainer;
	    var $txt = editor.txt.$txt;
	    var $prev, $parent;

	    // 将编辑器渲染到页面中
	    if ($valueContainer === $txt) {
	        $prev = editor.$prev;
	        $parent = editor.$parent;

	        if ($prev && $prev.length) {
	            // 有前置节点，就插入到前置节点的后面
	            $prev.after($editorContainer);
	        } else {
	            // 没有前置节点，就直接插入到父元素
	            $parent.prepend($editorContainer);
	        }

	    } else {
	        $valueContainer.after($editorContainer);
	        $valueContainer.hide();
	    }

	    // 设置宽度（这样设置宽度有问题）
	    // $editorContainer.css('width', $valueContainer.css('width'));
	};

	E.Txt = function (editor){
		this.editor = editor;

		this.init();
	}

	E.Txt.fn = E.Txt.prototype;

	E.Txt.fn.init = function(){
		var self = this;
		var editor = self.editor;
		var $valueContainer = editor.$valueContainer;
		//var currentValue = editor.getInitValue();

		var $txt;
		$txt = $valueContainer;
		$txt.addClass("pureEditor-txt");
		$txt.attr("contentEditable","true");

		// editor.ready(function(){
		// 	self.insertEmptyP();
		// });

		self.$txt = $txt;
	}

	E.Txt.fn.render = function(){
		var $txt = this.$txt;
		var $editorContainer = this.editor.$editorContainer;
		$editorContainer.append($txt);
	}

	E.Txt.fn.insertEmptyP = function(){
		var $txt = this.$txt;
		var $children = $txt.children();

		if ($children.length === 0){
			$txt.append($('<p><br></p>'));
			return;
		}
		if ($.trim($children.last().html()).toLowerCase() !== '<br>'){//检测到最后一行如果不是<br>的话就加上一个空标签。
			$txt.append($('<p><br></p>'));
		}
	}

	E.MenuContainer = function(editor){
		this.editor = editor;
		this.init();
	}

	E.MenuContainer.fn = E.MenuContainer.prototype;

	E.MenuContainer.fn.init = function(){
		var self = this;
		var $menuContainer = $("<div class='pureEditor-menu-container'></div>");
		self.$menuContainer = $menuContainer;
	} 

	E.MenuContainer.fn.render = function(){
		var $menuContainer = this.$menuContainer;
		var $editorContainer = this.editor.$editorContainer;

		$editorContainer.append($menuContainer);
	}

	E.Menu = function(opt){
		this.editor = opt.editor;
		this.id = opt.id;
		this.title = opt.title;
		this.$domNormal = opt.$domNormal;
		this.$domSelected = opt.$domSelected || opt.$domNormal;

		this.commandName = opt.commandName;
		this.commandValue = opt.commandValue;
		this.commandNameSelected = opt.commandNameSelected || opt.commandName;
		this.commandValueSelected = opt.commandValueSelected || opt.commandValue;
	}

	E.Menu.fn = E.Menu.prototype;

	E.Menu.fn.initUI = function(){
		var editor = this.editor;
		var uiConfig = editor.UI.menus;
		var menuId = this.id;
		var menuUI = uiConfig[menuId];

		if (this.$domNormal && this.$domSelected) {
			return;
		}

		if(menuUI == null){
			menuUI = uiConfig['default'];
		}

		this.$domNormal = $(menuUI.normal);

		if(/^\./.test(menuUI.selected)){
			this.$domSelected = this.$domNormal.clone().addClass(menuUI.selected.slice(1))
		}else{
			this.$domSelected = $(menuUI.selected);
		}
	}

	E.Menu.fn.render = function(){
		this.initUI();

		var editor = this.editor;
		var menuContainer = editor.menuContainer;
		var $menuItem = menuContainer.appendMenu(groupIdx, this);
		var onRender = this.onRender;

		// 渲染tip
		this._renderTip($menuItem);

		// 执行 onRender 函数
		if (onRender && typeof onRender === 'function') {
		    onRender.call(this);
		}
	}

	E.createMenuFns = [];
	E.createMenu = function (fn) {
		this.createMenuFns.push[fn];
	}
	E.fn.addMenus = function(){
		var editor = this;
		var menuIds = editor.config.menus;

		function check(menuId){
			if (menuIds.indexOf(menuId) >= 0) {
				return true;
			}
			return false;
		}

		$.each(E.createMenuFns,function (k,createMenuFn) {
			createMenuFn.call(editor,check);
		})
	}

	E.createMenu(function(check){
		var menuId = 'bold';
		if(!check(menuId)){
			return;
		}
		var editor = this;
	})

	window.pureEditor = E;
}($)