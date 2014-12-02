/**
 * Created by Nazar on 25.11.14.
 */
(function ($) {
    $.fn.slider = function (options) {

        var Slider = function(options, wrapper) {
            $.extend(this.options, options);
            this.$wrapper = $(wrapper);
            this.$slides = this.$wrapper.find(this.options.slidesContainer + ' > *').get();
            this.positions = [];

            this.gatherPositions();

            this.addLeftClickHandler();
            this.addRightClickHandler();
        };
        Slider.prototype.options = {
            duration: 300,
            slidesContainer: '.slides',
            navLeftCssSelector: '.left',
            navRightCssSelector: '.right',
            outsideMargin: 200
        };

        Slider.prototype.gatherPositions = function() {
            if (!this.positions.length) {
                var that = this;
                $(this.$slides).each(function() {
                    var marginTop = $(this).css('margin-top'),
                        marginLeft = $(this).css('margin-left'),
                        number = $(this).index();
                    that.positions.push([number, marginTop, marginLeft]);
                });
            }
            return this.positions;
        };

        Slider.prototype.addLeftClickHandler = function() {
            $(this.options.navLeftCssSelector).one(
                'click',
                {
                    that: this
                },
                this.animateSliderToLeft
            );
        };

        Slider.prototype.addRightClickHandler = function() {
            $(this.options.navRightCssSelector).one(
                'click',
                {
                    that: this
                },
                this.animateSliderToRight
            );
        };

        Slider.prototype.animateSliderToLeft = function(event) {
            var that = event.data.that;
            $.each(that.$slides, function (i, element) {
                if (i > 0) {
                    $(element).animate({'margin-top': that.positions[i - 1][1], 'margin-left': that.positions[i - 1][2]}, that.duration);
                } else {
                    var $firstSliderOriginal = $(element),
                        $firstSliderClone = $(element).clone();
                    $firstSliderClone.css({
                            'margin-left' : that.options.outsideMargin + 'px',
                            'margin-top' : that.positions[that.positions.length - 1][1]
                        })
                        .appendTo($(that.options.slidesContainer))
                        .animate({'margin-left': that.positions[(that.$slides.length - 1)][2]}, that.duration);
                    $firstSliderOriginal.animate({'margin-left': (-1 * that.options.outsideMargin) + 'px'}, {
                        duration: that.duration,
                        complete: function () {
                            $firstSliderOriginal.remove();
                            that.$slides.shift();
                            that.$slides.push($($firstSliderClone));
                            that.addLeftClickHandler();
                        }
                    });
                }
            });
        };

        Slider.prototype.animateSliderToRight = function(event) {
            var that = event.data.that;

            $.each(that.$slides, function(i, element) {
                if (i < (that.$slides.length - 1)) {
                    $(element).animate({'margin-top': that.positions[i + 1][1], 'margin-left': that.positions[i + 1][2]}, that.duration);
                } else {
                    var $lastSliderOriginal = $(element),
                        $lastSliderClone = $(element).clone();
                    $lastSliderClone.css({
                            'margin-left' : (-1 * that.options.outsideMargin) + 'px',
                            'margin-top' : that.positions[0][1]
                        })
                        .prependTo($(that.options.slidesContainer))
                        .animate({'margin-left': that.positions[0][2]}, that.duration);
                    $lastSliderOriginal.animate({'margin-left': that.options.outsideMargin + 'px'}, {
                        duration: that.duration,
                        complete: function() {
                            $lastSliderOriginal.remove();
                            that.$slides.unshift($($lastSliderClone));
                            that.$slides.pop();
                            that.addRightClickHandler();
                        }
                    });
                }
            });
        };
        $(this).each(function() {
            new Slider(options, this);
        });
    };
    return this;
})(jQuery);