$(document).ready(function(){
    // Ensure images are loaded before initializing Slick
    let imagesLoaded = 0;
    const totalImages = $('.carousel img').length;
    
    function initializeCarousel() {
        $('.carousel').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 15000,
            arrows: false,
            swipe: true,
            touchThreshold: 5,
            swipeToSlide: true,
            draggable: true,
            waitForAnimate: true,
            cssEase: 'cubic-bezier(0.87, 0.03, 0.41, 0.9)',
        }).on('init', function(event, slick) {
            console.log('Slick initialized'); // Debugging
            setTimeout(function() {
                $('.carousel-container').addClass('loaded');
            }, 100);
        });

        function updateLogoVisibility(slideIndex) {
            const $logo = $('.logo-container');
            if (slideIndex === 0) {
                $logo.addClass('visible');
            } else {
                $logo.removeClass('visible');
            }
        }

        $('.thumbnail').click(function() {
            var index = $(this).index();
            $('.carousel').slick('slickGoTo', index, false);
            $('.thumbnail').removeClass('active');
            $(this).addClass('active');
            updateLogoVisibility(index);
        });

        $('.carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $('.thumbnail').removeClass('active');
            $('.thumbnail').eq(nextSlide).addClass('active');
            updateLogoVisibility(nextSlide);
        });

        $('.click-left, .click-right').click(function(e) {
            e.preventDefault();
            const isNext = $(this).hasClass('click-right');
            if (isNext) {
                $('.carousel').slick('slickNext');
            } else {
                $('.carousel').slick('slickPrev');
            }
        });

        $('.thumbnail').first().addClass('active');
        updateLogoVisibility(0);
    }

    // Initialize immediately and force show after a timeout
    initializeCarousel();
    
    // Fallback to ensure visibility
    setTimeout(function() {
        if (!$('.carousel-container').hasClass('loaded')) {
            console.log('Forcing carousel visibility'); // Debugging
            $('.carousel-container').addClass('loaded');
        }
    }, 1000);

    // Add debug logs
    console.log('Document ready executed');
    console.log('Total images to load:', totalImages);
});