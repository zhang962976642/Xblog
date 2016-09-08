/*
* @Author: tianxing
* @Date:   2016-09-01 16:55:30
* @Last Modified by:   tianxing
* @Last Modified time: 2016-09-03 10:08:59
*/
// ToggleSidebar组件效果为sidebar左右滑动动画
$.fn.ToggleSidebar = function(options){
	// 获取当前jquery dom元素对象翻遍添加jq的点击事件
	// 此$(this)为当前绑定ToggleSidebar方法的DOM元素
	var element = $(this);
	// 默认配置的参数
	var defaults = {
		HeaderLeft: 'header',			//小于768px设备的header元素
		WrapLeft: 'wrapContent', 	//小于768px设备的wrapContent元素
		Sidebar: 'sidebar',				//动画的载体sidebar
		ToggleClass: 'iClass',		//header元素上的menu矢量图标载体元素
		menuOpen: 'fa fa-bars',		//menu矢量图标
		menuClose: 'fa fa-close',
		clickMark: true,					//点击状态
		setClass: 'phone'					//需要添加的className
	};
	// 获取用户设置的参数
	var settings = $.extend(defaults,options);
	// 点击事件开始
	element.bind('click',function(event){
		// 阻止事件冒泡
		event.stopPropagation();
		if(settings.clickMark == true){
			// 添加className
			settings.Sidebar.addClass(settings.setClass);
			settings.WrapLeft.addClass(settings.setClass);
			settings.HeaderLeft.addClass(settings.setClass);
			// 改变menu的矢量图标
			settings.ToggleClass.attr('class',settings.menuClose);
			settings.clickMark = false;
		}else{
			// 移除className
			settings.Sidebar.removeClass(settings.setClass);
			settings.WrapLeft.removeClass(settings.setClass);
			settings.HeaderLeft.removeClass(settings.setClass);
			// 改变menu的矢量图标
			settings.ToggleClass.attr('class',settings.menuOpen);
			settings.clickMark = true;
		};
	});

};