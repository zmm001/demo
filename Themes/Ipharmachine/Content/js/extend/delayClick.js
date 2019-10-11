;(function($){
	$.fn.delayClick = function(options){
		var options = $.extend({
			time : 1000
		},options);
		var self = $(this);
		self.click(function(){
			self.attr({"disabled":"disabled"});
			setTimeout(function(){
				self.removeAttr("disabled");
			},options.time);
		});
	}
})(jQuery);