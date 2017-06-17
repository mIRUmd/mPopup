/*! mPopup
 * https://github.com/mIRUmd/mPopup/
 * Copyright (c) 2015 Balan Miroslav; */
(function($) {
    var _positionPopup = function(elem,type) {
        var settings = elem.data('mPopup'),
            posModify = settings.modifyPosition,
            _window = $(window),
            $document = $(document),
            $window ={},
            $elem = {};

        $window.width = _window.width();
        $window.height = _window.height();
        $elem.width = elem.outerWidth();
        $elem.height = elem.outerHeight();

        if(settings.positionElement === null){
            var posTop = ($window.height - $elem.height) / 2,
                posLeft = ($window.width - $elem.width) / 2;

            if(type === 'absolute'){
                posTop = (posTop >= 20)? posTop : 20;
                posTop =  $document.scrollTop() + posTop ;
            }

        }else{
            var posElement = (settings.typePositionObject == 'offset') ?
                                settings.positionElement.offset() : settings.positionElement.position();

            posTop = posElement.top;
            posLeft = posElement.left;
        }

        if(typeof posModify.top !== 'undefined') posTop = posTop + posModify.top;
        if(typeof posModify.left !== 'undefined') posLeft = posLeft + posModify.left;

        // do not show right side screen
        if((posLeft + $elem.width) > $window.width){
            var spaceLeft = (posLeft + $elem.width) - $window.width;
            posLeft = (posLeft - spaceLeft) - 10;
            elem.addClass('pos-changed');
        }

        elem.css("top", posTop);
        elem.css("left", posLeft);
    };


    function _triggerCloseOnOverlay($this,settings,overlay){

        if(settings.closeOnOverlayClick){
            overlay.on('click',function(e){
                e.preventDefault();
                $this.mPopup('close');
                overlay.off('click');
            });
        }
    }

    function _triggerButtonClose($this,settings){
        $this.on('click','.' + settings.closeClass,function(e){
            e.preventDefault();
            $this.mPopup('close');
            $this.off('click');
        });
    }

    function _closeOpenedPopup(){
        var popup =  $('.mPopup:visible');
        if(popup.length > 0){
            var settings = popup.data('mPopup'),
                oldSettings = settings;
            settings.animationType = false;
            settings.overlayFade = false;
            popup.mPopup('close');
            popup.data('mPopup',oldSettings);
        }
    }

    var methods = {
        init: function(options) {

            return this.each(function() {
                var $this = $(this),
                    settings = $this.data('mPopup');
                if ($this.length === 0) { return; }
                if (typeof(settings) === 'undefined') {
                    var defaults = {
                        type : 'fixed',
                        closeClass : 'mPopup-close',
                        showOverlay : true,
                        closeOnOverlayClick : true,
                        overlayClass : 'mPopup-overlay',
                        overlayFade : true,
                        animationType : 'fade',
                        animationSpeed: 400,
                        positionElement : null,
                        typePositionObject: 'offset',
                        modifyPosition : {
                            top : 0,
                            left : 0
                        }
                    };
                    settings = $.extend({}, defaults, options);
                    $this.data('mPopup', settings);
                } else {
                    settings = $.extend({}, settings, options);
                }
                if (settings.id) {
                    var el = $('[data-id=' + settings.id + ']');
                    el.length > 0 ? el.replaceWith($this) : $this.appendTo('body');
                    $this.attr('data-id', settings.id);
                }
                else {
                    //pray
                    $this.appendTo('body');
                }
                $this.css('position',(settings.type == 'absolute') ? 'absolute' : 'fixed');
            });
        },
        open: function() {
            _closeOpenedPopup();
            var $this = $(this),
                settings = $this.data('mPopup'),
                overlay = $('.' + settings.overlayClass);


            if(overlay.length === 0)
                overlay = $('<div></div>',{class : settings.overlayClass}).appendTo('body');

            if($this.length === 0) { console.error('Cannot find element  !');  return false}
            _positionPopup($this, settings.type);
            if(settings.showOverlay){
                if(settings.overlayFade)
                    overlay.fadeIn('fast');
                else
                    overlay.show();
            }

            if(settings.animationType === 'slide'){
                $this.slideDown(settings.animationSpeed);
            }else if(settings.animationType === 'fade'){
                $this.fadeIn(settings.animationSpeed);
            }else{
                $this.show();
            }

            _triggerCloseOnOverlay($this, settings,overlay);
            _triggerButtonClose($this, settings);
            $this.trigger( "mPopup:open");

            $( window ).resize(function() {
                _positionPopup($this,settings.type);
            });
        },
        close: function(){
            var $this = $(this),
                settings = $this.data('mPopup'),
                overlay = $('.' + settings.overlayClass);

            var hideOverlay = function(){
                if(settings.showOverlay){
                    if(settings.overlayFade)
                        overlay.fadeOut('fast',function(){
                            overlay.removeClass(settings.overlayClass);
                        });
                    else{
                        overlay.hide().removeClass(settings.overlayClass);
                    }
                }

                $this.trigger( "mPopup:close");
            };

            if(settings.animationType === 'slide'){
                $this.slideUp(settings.animationSpeed,hideOverlay);
            }else if(settings.animationType === 'fade'){
                $this.fadeOut(settings.animationSpeed,hideOverlay);
            }else{
                $this.hide();
                hideOverlay();
            }

            $(window).off("resize");
        },
        'recalculate-position' : function() {
            var $this = $(this),
                settings = $this.data('mPopup');
            if ($this.length === 0 || !settings) { return; }
            _positionPopup($this,settings.type);
        },
        destroy: function(){
            var $this = $(this);
            if($this.data('mPopup')){
                var settings = $this.data('mPopup'),
                    overlay = $('.' + settings.overlayClass);

                overlay.remove();
                $(window).off("resize");
                $this.css({position : '', top : '' , left : ''});
                $this.removeData('mPopup');
            }

        }
    };

    $.fn.mPopup = function() {
        var method = arguments[0];

        if (methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof(method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.mPopup' );
            return this;
        }

        return method.apply(this, arguments);
    }
})(jQuery);