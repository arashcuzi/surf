var videoPlaying = false;

$(document).ready(function(){
    $('#menu').on('click', 'li', function($evt){
        // handle moving the menu
        var prevIndex = $('.active').index();
        var clickedIndex = $(this).index();
        var translate = 0;

        if ( clickedIndex !== 1 && prevIndex > clickedIndex ) {
            translate = 150;
        } else if ( clickedIndex !== 1 && prevIndex < clickedIndex ) {
            translate = -150;
        }

        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $(this).parent().css({ 'transform': 'translateX(' + translate + 'px)' });
    });

    $('#surf').on('click', function(){
        $('#loading').addClass('loading');
        setTimeout(function(){
            $('#front-page').animate({ 'opacity': 0 }, initialization);
            $('#loading').removeClass('loading');
        }, 6000);
    });

    $('.floating-btn').on('click', function(){
        videoPlaying = false;

        $('#video').animate({ 'opacity': 0 }, function(){
            $(this).html('');
            $('#front-page').animate({ 'opacity': 1 }, function(){
                $('.floating-btn').addClass('no-show');
            });
        });
    });

    $('html').on('mousemove', function(){
        if ( videoPlaying ) {
            $('.floating-btn').removeClass('no-show');

            setTimeout(function(){
                $('.floating-btn').addClass('no-show');
            }, 6000);
        }
    });
});

function initialization() {
    $('.floating-btn').removeClass('no-show');

    init();

    videoPlaying = true;

    $('#video').css({ 'opacity': 1 });

    setTimeout(function(){
        $('.floating-btn').addClass('no-show');
    }, 6000);
}