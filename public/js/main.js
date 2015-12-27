var videoPlaying = false;
var floatingBtnVisible = false;

$(document).ready(function(){
    $('#menu').on('click', 'li', function($evt){
        // handle moving the menu
        var prevIndex = $('.active').index();
        var clickedIndex = $(this).index();
        var translate = 0;

        if ( clickedIndex === prevIndex ) {
            $('.active').addClass('pressed');

            setTimeout(function(){
                $('.active').removeClass('pressed');
            }, 100);

            if ( this === $('#surf')[0] ) {
                $('#loading').addClass('loading');
                $('#front-page').animate({ 'opacity': 0 }, playVid);
            }

            return;
        }

        if ( clickedIndex !== 1 && prevIndex > clickedIndex ) {
            translate = 150;
        } else if ( clickedIndex !== 1 && prevIndex < clickedIndex ) {
            translate = -150;
        }

        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $(this).parent().css({ 'transform': 'translateX(' + translate + 'px)' });
    });

    // $('#surf').on('click', function(){
    //     $('#loading').addClass('loading');
    //     setTimeout(function(){
    //         $('#front-page').animate({ 'opacity': 0 }, playVid);
    //         $('#loading').removeClass('loading');
    //     }, 6000);
    // });

    $('.floating-btn').on('click', function(){
        videoPlaying = false;

        $('#video').animate({ 'opacity': 0 }, function(){
            $(this).html('');
            $('#front-page').animate({ 'opacity': 1 }, function(){
                $('.floating-btn').addClass('no-show');
            });
        });
    });

    var showNavBtn = true;

    $('html').on('mousemove', function(){

        if ( videoPlaying ) {
            $('.floating-btn').removeClass('no-show');
            $('#video').css({ 'transform': 'scale(0.75) translateY(-100px)' });

            setTimeout(function(){
                $('.floating-btn').addClass('no-show');
                $('#video').css({ 'transform': 'scale(1) translateY(0px)' });
            }, 2000);
        }
    });
});

function playVid() {
    $('.floating-btn').removeClass('no-show');

    getFromDb();

    videoPlaying = true;

    $('#video').css({ 'opacity': 1 });
    $('#loading').removeClass('loading');
}