var oSelf;
(function ($) {
    $.tiny = $.tiny || {};
    $.tiny.carousel = {
        options: {
            start: 1,
            display: 1,
            axis: 'x',
            controls: true,
            pager: true,
            interval: false,
            intervaltime: 3000,
            rewind: false,
            animation: true,
            duration: 1000,
            callback: null,
            singleSlide: false,
            pause: true
        }
    };
    $.fn.tinycarousel = function (options) {
        var options = $.extend({}, $.tiny.carousel.options, options);
        this.each(function () {
            $(this).data('tcl', new Carousel($(this), options));
        });
        return this;
    };
    $.fn.tinycarousel_start = function () {
        $(this).data('tcl').start();
    };
    $.fn.tinycarousel_stop = function () {
        $(this).data('tcl').stop();
    };
    $.fn.tinycarousel_move = function (iNum) {
        $(this).data('tcl').move(iNum - 1, true);
    };

    function Carousel(root, options) {
        var oSelf = this;
        var oViewport = $('.viewport:first', root);
        var oContent = $('.overview:first', root);
        var oPages = oContent.children();
        var oBtnNext = $('.next:first', root);
        var oBtnPrev = $('.prev:first', root);
        var oPager = $('.pager:first', root);
        // video or swf focus
        var oSwf = $('#carousel object, #carousel video', root);
        var first = true;
        var iPageSize, iSteps, iStepWidth, iCurrent, leftPos, oTimer, bPause, bForward = true,
            bAxis = options.axis == 'x',
            remainder;

        function initialize() {
            iPageSize = bAxis ? $(oPages[0]).outerWidth(true) : $(oPages[0]).outerHeight(true);
            iStepWidth = (iPageSize * options.display);
            
            var iLeftover = Math.ceil(((bAxis ? oViewport.outerWidth() : oViewport.outerHeight()) / (iPageSize * options.display)) - 1);
            
            iSteps = Math.max(1, Math.ceil(oPages.length / options.display) - iLeftover);
            iCurrent = 1;
            oContent.css(bAxis ? 'width' : 'height', (iPageSize * oPages.length)).css('left', '0px');
            remainder = oPages.length % options.display;
            // If the total amount of img is not divisible  
            // by display amount, slide 1 img width 
            if (remainder >= 1) {
                options.singleSlide = 1;
            }
            setEvents();
            setButtons(iCurrent);
            return oSelf;
        };

        function setEvents() {
            if (options.controls && oBtnPrev.length > 0 && oBtnNext.length > 0) {
                oBtnPrev.click(function (e) {
                    e.preventDefault();
                    if (!$(this).hasClass('disabled')) {
                        oSelf.move(-1);
                    }
                    return false;
                });
                oBtnNext.click(function (e) {
                    e.preventDefault();
                    if (!$(this).hasClass('disabled')) {
                        oSelf.move(1);
                    }
                    return false;
                });
            }
            if (options.interval) {
                root.hover(oSelf.stop, oSelf.start);
            }
            if (options.pager && oPager.length > 0) {
                $('a', oPager).click(setPager);
            }
            if (options.pause) {
                oSwf.focus(function () {
                    options.interval = false;
                    oSelf.stop;
                    return false;
                }).blur(function () {
                    options.interval = true;
                    oSelf.start;
                    return false;
                });
            }
        };

        function setButtons(activeCurrent) {
            if (options.pager) {
                var oNumbers = $('.pagenum', oPager);
                
                oNumbers.removeClass('active');
                $(oNumbers[activeCurrent - 1]).addClass('active');
            }
        };

        function setPager(oEvent) {
            if ($(this).hasClass('pagenum') && !oPager.hasClass('disabled')) {
                iDirection = parseInt(this.rel) - iCurrent;
                oSelf.move(iDirection);
            }
            return false;
        };

        function setTimer() {
            if (options.interval && !bPause) {
                clearTimeout(oTimer);
                oTimer = setTimeout(function () {
                    bForward = true; //set from option
                    oSelf.move(bForward ? 1 : -1);
                }, options.intervaltime);
            }
        };
        this.stop = function () {
            clearTimeout(oTimer);
            bPause = true;
        };
        this.start = function () {
            bPause = false;
            setTimer();
        };
        this.move = function (iDirection) {
        	// TODO: let's do something with all the prepend/append statements
            var oPosition = {};
            var iTarget = parseInt(iCurrent) + parseInt(iDirection);
            var moveAmount = Math.abs(iDirection);
            var iLt = (iSteps * options.display) - options.display;
            var iGt = (options.display - 1);
            var leftPos;
            
            oBtnPrev.addClass('disabled');
            oBtnNext.addClass('disabled');
            oPager.addClass('disabled');
            
            if (iTarget > iSteps) {
                iTarget = 1;
            } else if (iTarget < 1) {
                iTarget = iSteps;
            }
            if (iCurrent == iTarget) {
                return false;
            }
            leftPos = -iStepWidth * (iTarget - 1);
            // if singleSlide, move by width of a single image
            // else, width of carousel)
            if (options.singleSlide) {
                iStepWidth = iPageSize;
                iSteps = (oPages.length);
                leftPos = -iStepWidth;
                if (iDirection == -1) {
                    oContent.prepend($('.overview li:gt(' + (oPages.length - 2) + ')')).css({
                        left: (-iStepWidth) + 'px'
                    });
                    leftPos = 0;
                }
            } else {
                if (iTarget == iSteps && iDirection == -1) {
                    oContent.prepend($('.overview li:gt(' + iGt + ')')).css({
                        left: (leftPos) + 'px'
                    });
                    leftPos = (-iStepWidth * (iSteps - 2));
                }
                if (iTarget == 1 && iDirection == 1) {
                    oContent.append($('.overview li:lt(' + iLt + ')')).css({
                        left: (leftPos) + 'px'
                    });
                    leftPos = -iStepWidth;
                }
            }
            oPosition[bAxis ? 'left' : 'top'] = leftPos;
            oContent.animate(
            oPosition, {
                queue: false,
                duration: options.duration,
                complete: function () {
                    if (options.singleSlide) {
                        if (iDirection == 1) {
                            oContent.append($('.overview li:lt(' + (1) + ')')).css({
                                left: 0 + 'px'
                            });
                        }
                    } else {
                        if (iTarget == 1 && iDirection == 1) {
                            oContent.append($('.overview li:lt(' + (iGt + 1) + ')')).css({
                                left: 0 + 'px'
                            });
                        }
                        if (iTarget == iSteps && iDirection == -1) {
                            oContent.prepend($('.overview li:gt(' + (iLt - 1) + ')')).css({
                                left: (-iStepWidth * (iTarget - 1)) + 'px'
                            });
                        }
                    }
                    iCurrent = iTarget;
                    oBtnPrev.removeClass('disabled');
                    oBtnNext.removeClass('disabled');
                    oPager.removeClass('disabled');
                    setButtons(iTarget);
                    setTimer();
                }
            });
        };
        return initialize();
    };
})(jQuery);