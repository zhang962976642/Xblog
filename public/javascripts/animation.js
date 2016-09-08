/*
* @Author: tianxing
* @Date:   2016-09-03 09:55:29
* @Last Modified by:   tianxing
* @Last Modified time: 2016-09-03 10:13:14
*/
$(function(){
	var sidebar = $('#sidebar'),
		wrapContent = $('#wrapContent'),
		header = $('#header'),
		toggleSidebar = $('#toggleSidebar'),
		iClass = toggleSidebar.find('.fa');
	toggleSidebar.ToggleSidebar({
		WrapLeft: wrapContent,
		Sidebar: sidebar,
		HeaderLeft: header,
		ToggleClass: iClass
	});

});