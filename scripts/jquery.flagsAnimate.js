/**
 * Created by nazar on 25.11.14.
 */
(function($){
    jQuery.fn.flagsAnimate = function(Options){
        var defaultOptions = {
            speedOfAnimation: 700
            ,countFluidElements: 6
            ,defaultClassName: 'move'
            ,leftButtonClass: 'left-scroll'
            ,rightButtonClass: 'right-scroll'
            ,verticalShift: 8
            }
        $.extend(false, Options, defaultOptions );

        for (var i = 1; i<= Options.countFluidElements; i++){
            $('.'+Options.defaultClassName+':eq('+(i-1)+')').addClass(Options.defaultClassName+i);
            //debugger;
        }

        var $thisDomElement = $(this),
            firstElementShift,
            firstElementMarginLeft,
            otherElementMarginLeft,
            lastElementMarginRight = 150,//відстань в пікселях, на яку зміщується клон першого елемента добавлений в кінець, перед тим як зявитись.
            lastElementShift,//відстань на яку має зміститись останній елемент, щоб стати на своє місце
            $leftButton = $('.'+Options.leftButtonClass),
            $rightButton = $('.'+Options.rightButtonClass);
        firstElementMarginLeft = 2 + parseInt( $('.'+Options.defaultClassName+1).css('margin-left').replace('px', '') );
        otherElementMarginLeft = parseInt($('.'+Options.defaultClassName+2).css('margin-left').replace('px', ''));

        firstElementShift= otherElementMarginLeft-firstElementMarginLeft;
        lastElementShift=firstElementMarginLeft+lastElementMarginRight-otherElementMarginLeft;

        var nextToOutsider = 2;//

        $leftButton.one('click', goToLeft);
        function goToLeft(){
            for(var i = 1; i<= Options.countFluidElements; i++){
                var index;
                index = getLeftIndex(i);
                if (i > nextToOutsider){ // Move to const
                    $('.'+Options.defaultClassName + i).animate({'margin-top': '-='+(index*Options.verticalShift)+'px'}, Options.speedOfAnimation);
                continue;
                }
                if(i == nextToOutsider){ // Move to const
                    $('.'+Options.defaultClassName + i).animate({'margin-left':'-='+firstElementShift+'px', 'margin-top': '-='+(index*Options.verticalShift)+'px'}, Options.speedOfAnimation);
                    continue;

                }
                var $cloneOfFirstFlag = $('.'+Options.defaultClassName + i).clone(),
                    $originalFirstFlag = $('.'+Options.defaultClassName + i);
                $cloneOfFirstFlag.appendTo($thisDomElement).css('margin-left', '+='+lastElementMarginRight+'px').animate({'margin-left': '-='+lastElementShift+'px'}, Options.speedOfAnimation);

                $originalFirstFlag.animate({'margin-left': '-='+lastElementMarginRight}, {
                    duration: Options.speedOfAnimation, complete: function () {
                        $originalFirstFlag.remove();
                        $leftButton.one('click', function(){
                            goToLeft();
                        });
                    }
                });
                
            }
            shiftClassesLeft();
            //======================================================
            if(typeof(Options.i)=='function'){
                var first = $('.'+Options.defaultClassName+1);
                Options.first(first);
            }
            if(typeof(Options.last) == 'function'){
                var last = $('.'+Options.defaultClassName+Options.countFluidElements);
                Options.last(last);
            }
            if(typeof(Options.allThatMoved) == 'function'){
                var all = []; //Rename
                for(i = 1; i <= Options.countFluidElements; i++){
                    all[i] = $('.'+Options.defaultClassName+i);
                }
                Options.allThatMoved(all);
            }
            //    =======================================================
        }

        $rightButton.one('click', goToRight);
        function goToRight(){
            $rightButton.unbind('click');
            for(var i = Options.countFluidElements; i >= 1; i--){
                var index;
                index=getRightIndex(i);
                var isLastElement = i == Options.countFluidElements;
                if (isLastElement){
                    var $cloneOfLastFlag = $('.'+Options.defaultClassName + i).clone(),
                        $originalLastFlag = $('.'+Options.defaultClassName + i);
                    $cloneOfLastFlag.prependTo($thisDomElement).css('margin-left', '-='+lastElementMarginRight+'px').animate({'margin-left': '+='+lastElementShift+'px'}, Options.speedOfAnimation);
                    $originalLastFlag.animate({'margin-left': '+='+lastElementMarginRight}, {
                        duration: Options.speedOfAnimation, complete: function () {
                            $originalLastFlag.remove();
                            $rightButton.one('click', goToRight);
                        }
                    });
                    continue;
                }
                if(i == 1){
                    $('.'+Options.defaultClassName + i).animate({'margin-left':'+='+firstElementShift+'px', 'margin-top': '-='+(index*Options.verticalShift)+'px'}, Options.speedOfAnimation);
                    continue;
                }
                $('.'+Options.defaultClassName + i).animate({'margin-top': '-='+(index*Options.verticalShift)+'px'}, Options.speedOfAnimation);

            }
            shiftClassesRight();
        }

        function getLeftIndex(i){
            var a = (i == 1)||(i == (Options.countFluidElements/2+1))
            if(a){
                return 0;
            }
            var b = i < (Options.countFluidElements/2+1)
            if(b){
                return(-1);
            }

            return 1;
        }

        //The same as getLeftIndex
        function getRightIndex(i){
            if(i<(Options.countFluidElements/2)){
                return 1;
            }else{
                if ((i == (Options.countFluidElements/2))||(i == Options.countFluidElements)){
                    return 0;
                }else{
                    return -1;
                }
            }
        }

        function shiftClassesLeft(){//змщення класів рухомих обєктів по колу
            addTempClasses();
            for (i = 1; i <= Options.countFluidElements; i++){
                var isFirstElement = i == 1;
                if(isFirstElement){
                    $('.temp'+i).addClass(Options.defaultClassName+Options.countFluidElements).removeClass('temp'+i).removeClass(Options.defaultClassName+i);
                }else {
                    $('.temp' + i).addClass(Options.defaultClassName +(i-1)).removeClass('temp'+i).removeClass(Options.defaultClassName+i);
                }
            }
        }

        function shiftClassesRight(){//змщення класів рухомих обєктів по колу
            addTempClasses();
            for (i = 1; i <= Options.countFluidElements; i++){
                if(i == Options.countFluidElements){ // Move
                    $('.temp'+i).addClass(Options.defaultClassName+'1').removeClass('temp'+i).removeClass(Options.defaultClassName+i);
                }else {
                    $('.temp' + i).addClass(Options.defaultClassName +(i+1)).removeClass('temp'+i).removeClass(Options.defaultClassName+i);
                }
            }
        }
        function addTempClasses(){
            for (i = 1; i <= Options.countFluidElements; i++){
                $('.'+Options.defaultClassName+i).addClass('temp'+i);
            }
        }
        return this;
    };
})(jQuery);