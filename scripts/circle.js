$(document).ready(function(){

    var getFirstDiv = function(first){
        //console.log (first.attr('class'));
        //$(first).css('background-color', 'brown');
        },
        getLastDiv = function(last){
            //console.log (last.attr('class'));
            //$(last).css('background-color', '#c6e747');
        },
        getAllPosition = function(all){
            console.log(all);
        }





    var objectForMyPlugin={};
    objectForMyPlugin.speedOfAnimation=700;             //швидкість анімації
    objectForMyPlugin.countFluidElements=6;               //кількість рухомих елементів в блоці
    objectForMyPlugin.defaultClassName='move';          //назва класу за замочуванням, рухомі обєкти повинні мати класи типу defaultClassName1, defaultClassName2...defaultClassName(n)
    objectForMyPlugin.leftButtonClass='left-scroll';    //класс елемента DOM при кліку на якому "карусель" буде рухатись вліво
    objectForMyPlugin.rightButtonClass='right-scroll';  //класс елемента DOM при кліку на якому "карусель" буде рухатись вправо
    objectForMyPlugin.verticalShift=4;                  //крок, з яким рухомі елементи зміщуються по вертикалі
    objectForMyPlugin.first = getFirstDiv; //link to first element
    objectForMyPlugin.last= getLastDiv;
    objectForMyPlugin.allThatMoved= getAllPosition;

    //console.log(objectForMyPlugin);

    $('.lang-menu').flagsAnimate(objectForMyPlugin);



    var objectForMyPluginAtBottom={};
    objectForMyPluginAtBottom.speedOfAnimation=600;             //швидкість анімації
    objectForMyPluginAtBottom.countFluidElements=7;               //кількість рухомих елементів в блоці
    objectForMyPluginAtBottom.defaultClassName='ex';          //назва класу за замочуванням, рухомі обєкти повинні мати класи типу defaultClassName1, defaultClassName2...defaultClassName(n)
    objectForMyPluginAtBottom.leftButtonClass='go-left';    //класс елемента DOM при кліку на якому "карусель" буде рухатись вліво
    objectForMyPluginAtBottom.rightButtonClass='go-right';  //класс елемента DOM при кліку на якому "карусель" буде рухатись вправо
    objectForMyPluginAtBottom.verticalShift=8;                  //крок, з яким рухомі елементи зміщуються по вертикалі

    $('.carousel-for-example').flagsAnimate(objectForMyPluginAtBottom);
})

