/*! mPopup - v1.0.7 - 2015-02-24
* https://github.com/mIRUmd/mPopup/
* Copyright (c) 2015 Balan Miroslav; */

!function($) {
    function _triggerCloseOnOverlay($this, settings, overlay) {
        settings.closeOnOverlayClick && overlay.on("click", function(e) {
            e.preventDefault(), $this.mPopup("close"), overlay.off("click");
        });
    }
    function _triggerButtonClose($this, settings) {
        $this.on("click", "." + settings.closeClass, function(e) {
            e.preventDefault(), $this.mPopup("close"), $this.off("click");
        });
    }
    function _closeOpenedPopup() {
        var popup = $(".mPopup:visible");
        if (popup.length > 0) {
            var settings = popup.data("mPopup"), oldSettings = settings;
            settings.animationType = !1, settings.overlayFade = !1, popup.mPopup("close"), popup.data("mPopup", oldSettings);
        }
    }
    var _positionPopup = function(elem, type) {
        var settings = elem.data("mPopup"), posModify = settings.modifyPosition, _window = $(window), $document = $(document), $window = {}, $elem = {};
        if ($window.width = _window.width(), $window.height = _window.height(), $elem.width = elem.outerWidth(), 
        $elem.height = elem.outerHeight(), null == settings.positionElement) {
            var posTop = ($window.height - $elem.height) / 2, posLeft = ($window.width - $elem.width) / 2;
            "absolute" == type && (posTop = posTop >= 20 ? posTop : 20, posTop = $document.scrollTop() + posTop);
        } else {
            var posElement = "offset" == settings.typePositionObject ? settings.positionElement.offset() : settings.positionElement.position();
            posTop = posElement.top, posLeft = posElement.left;
        }
        if ("undefined" != typeof posModify.top && (posTop += posModify.top), "undefined" != typeof posModify.left && (posLeft += posModify.left), 
        posLeft + $elem.width > $window.width) {
            var spaceLeft = posLeft + $elem.width - $window.width;
            posLeft = posLeft - spaceLeft - 10, elem.addClass("pos-changed");
        }
        elem.css("top", posTop), elem.css("left", posLeft);
    }, methods = {
        init: function(options) {
            return this.each(function() {
                var $this = $(this), settings = $this.data("mPopup");
                if (0 != $this.length) {
                    if ("undefined" == typeof settings) {
                        var defaults = {
                            type: "fixed",
                            closeClass: "mPopup-close",
                            showOverlay: !0,
                            closeOnOverlayClick: !0,
                            overlayClass: "mPopup-overlay",
                            overlayFade: !0,
                            animationType: "fade",
                            animationSpeed: 400,
                            positionElement: null,
                            typePositionObject: "offset",
                            modifyPosition: {
                                top: 0,
                                left: 0
                            },
                            onOpen: function() {},
                            onClose: function() {}
                        };
                        settings = $.extend({}, defaults, options), $this.data("mPopup", settings);
                    } else settings = $.extend({}, settings, options);
                    if (settings.id) {
                        var el = $("[data-id=" + settings.id + "]");
                        el.length > 0 ? el.replaceWith($this) : $this.appendTo("body"), $this.attr("data-id", settings.id);
                    } else $this.appendTo("body");
                    $this.css("position", "absolute" == settings.type ? "absolute" : "fixed");
                }
            });
        },
        open: function() {
            _closeOpenedPopup();
            var $this = $(this), settings = $this.data("mPopup"), overlay = $("." + settings.overlayClass);
            return 0 == overlay.length && (overlay = $("<div></div>", {
                "class": settings.overlayClass
            }).appendTo("body")), 0 == $this.length ? (console.error("Cannot find element  !"), 
            !1) : (_positionPopup($this, settings.type), settings.showOverlay && (settings.overlayFade ? overlay.fadeIn("fast") : overlay.show()), 
            "slide" == settings.animationType ? $this.slideDown(settings.animationSpeed) : "fade" == settings.animationType ? $this.fadeIn(settings.animationSpeed) : $this.show(), 
            settings.onOpen && settings.onOpen(), _triggerCloseOnOverlay($this, settings, overlay), 
            _triggerButtonClose($this, settings), void $(window).resize(function() {
                _positionPopup($this, settings.type);
            }));
        },
        close: function() {
            var $this = $(this), settings = $this.data("mPopup"), overlay = $("." + settings.overlayClass), hideOverlay = function() {
                settings.showOverlay && (settings.overlayFade ? overlay.fadeOut("fast", function() {
                    overlay.removeClass(settings.overlayClass);
                }) : overlay.hide().removeClass(settings.overlayClass)), settings.onClose && settings.onClose();
            };
            "slide" == settings.animationType ? $this.slideUp(settings.animationSpeed, hideOverlay) : "fade" == settings.animationType ? $this.fadeOut(settings.animationSpeed, hideOverlay) : ($this.hide(), 
            hideOverlay()), $(window).off("resize");
        },
        "recalculate-position": function() {
            var $this = $(this), settings = $this.data("mPopup");
            0 != $this.length && settings && _positionPopup($this, settings.type);
        },
        destroy: function() {
            var $this = $(this);
            if ($this.data("mPopup")) {
                var settings = $this.data("mPopup"), overlay = $("." + settings.overlayClass);
                overlay.remove(), $(window).off("resize"), $this.css({
                    position: "",
                    top: "",
                    left: ""
                }), $this.removeData("mPopup");
            }
        }
    };
    $.fn.mPopup = function() {
        var method = arguments[0];
        if (methods[method]) method = methods[method], arguments = Array.prototype.slice.call(arguments, 1); else {
            if ("object" != typeof method && method) return $.error("Method " + method + " does not exist on jQuery.mPopup"), 
            this;
            method = methods.init;
        }
        return method.apply(this, arguments);
    };
}(jQuery);