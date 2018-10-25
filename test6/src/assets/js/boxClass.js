var Ms = (function(){
	var _bindEvent = function(obj,args) {
		return (function(){
			for(let i=0,len=obj.length;i<len;i++){
				var $box = obj.eq(i);
				if( $box.text().trim() !== '') {
					_addEvent($box,args);
				}else{
					_removeEvent($box,args);
				}
			}
		})();
	};
	var _addEvent = function(box,args) {
		return (function(){
			box.css('cursor','pointer');
			box.on('click',_clikcEvent);
		})();
	};
	var _removeEvent = function(box,args) {
		return (function(){
			box.css('cursor','default');
			box.off('click',_clikcEvent);
		})();
	};
	var _changeView = function(allNext,$parent,computeLen,id,index){
		var text = $(this).text();
		var oldId;
		for(let j=1; j<=computeLen; j++) {
			var changeIndex = Math.ceil(index/Math.pow(2,j));
			var $tempTag = allNext.eq(j-1).children().eq(changeIndex -1);
			if(j == 1) {
				if($tempTag.text().trim() !== ''){
					oldId = $tempTag.attr('data-id');
				}
				$tempTag.text(text);
				$tempTag.css('cursor','pointer');
				$tempTag.attr('data-id',id);
				$tempTag.on('click',_clikcEvent);
			}
			else{
				if($tempTag.text().trim() !== '') {
					if($tempTag.attr('data-id') == oldId){
						$tempTag.text(text);
						$tempTag.css('cursor','pointer');
						$tempTag.attr('data-id',id);
						$tempTag.on('click',_clikcEvent);
					}
				}
			}
		}
	};
	var _clikcEvent = function(){
		var text = $(this).text();
		var $parent = $(this).parent();
		var tr = $parent.attr('data-tr');
		var len = $parent.children().length;
		var index = $(this).index()+1;
		var sblingTag;
		var computeLen = $('.right-1').children().length/2 -$parent.attr('data-num');
		var id = $(this).attr('data-id');
		var allNext;
		if(index%2 === 0){
			sblingTag = $(this).prev();
		}else{
			sblingTag = $(this).next();
		}
		if(sblingTag.text().trim() != ''){
			if(tr === 'right') {
				allNext = $parent.nextAll();
			}else if(tr === 'left') {
				allNext = $parent.prevAll();
			};
			if($parent.next().children().length === 1 || $parent.prev().children().length === 1) {
				var flag = true;
				var cstag = [];
				var cenNexttag = $('.center').next().children();
				var cenPrevtag = $('.center').prev().children();
				for(var i=0;i<cenNexttag.length;i++){
					if(cenNexttag.eq(i).text().trim() == '' || cenPrevtag.eq(i).text().trim() == '') {
						flag = false;
						break;
					}
				}
				if(flag) {
					_changeView.apply(this,[allNext,$parent,computeLen,id,index])
				}
			}else{
				_changeView.apply(this,[allNext,$parent,computeLen,id,index])
			}
		}
	};
	var MsFun = function(obj,args){};
	MsFun.prototype = {
		init: function(obj,args){
			return _bindEvent(obj,args);
		}
	}
	return MsFun;
})();
$.fn.createBox = function(options){
	var obj = this;
	var args = $.extend(options)
	return new Ms().init(obj,args);
};
