/**
 * This is for simulate dojo.hitch.
 * @param $
 */
(function($) {
    $.hitch = function(context, func) {
        var args = Array.prototype.slice.call(arguments, 
                2/*Remove context, and func*/);
        
        return function() {
            return func.apply(context, 
                    Array.prototype.concat.apply(args, arguments));
        };
    };
})(jQuery);