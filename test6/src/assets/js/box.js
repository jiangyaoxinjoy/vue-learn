!(function(){
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.bindEvent(obj,args);
			})();
		},
		addEvent: function(box) {
			return (function(){
				box.css('cursor','pointer');
				box.on('click',ms.clikcEvent);
			})();
		},
		removeEvent: function(box) {
			return (function(){
				box.css('cursor','default');
				box.off('click',ms.clikcEvent);
			})();
		},
		clikcEvent: function(){
			var text = $(this).text();
			var changeWrap;
			var $parent = $(this).parent();
			var prentClass = $parent.attr('class').split('-');
			var tr = prentClass[0];
			var len = $parent.children().length;
			var index = $(this).index()+1;
			var computeLen = $('.right-1').children().length/2 -prentClass[1];
			var id = $(this).attr('data-id');
			var oldId;
			if(tr === 'right') {
				var allNext = $parent.nextAll();
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
						$tempTag.on('click',ms.clikcEvent);
					}
					else{
						if($tempTag.text().trim() !== '') {
							if($tempTag.attr('data-id') == oldId){
								$tempTag.text(text);
								$tempTag.css('cursor','pointer');
								$tempTag.attr('data-id',id);
								$tempTag.on('click',ms.clikcEvent);
							}


						}
					}
				}
			}else if(tr === 'left') {
				var allNext = $parent.prevAll();
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
						$tempTag.on('click',ms.clikcEvent);
					}
					else{
						if($tempTag.text().trim() !== '') {
							if($tempTag.attr('data-id') == oldId){
								$tempTag.text(text);
								$tempTag.css('cursor','pointer');
								$tempTag.attr('data-id',id);
								$tempTag.on('click',ms.clikcEvent);
							}


						}
					}
				}
			}
		},
		bindEvent:function(obj,args){
			return (function(){
				for(let i=0,len=obj.length;i<len;i++){
					var $box = obj.eq(i);
					if( $box.text().trim() !== '') {
						ms.addEvent($box);
					}else{
						ms.removeEvent($box);
					}
				}
			})();
		}
	};
	$.fn.createBox = function(options){
		var args = $.extend({
			backFn : function(){}
		},options);
		ms.init(this,args);
	}
})()
