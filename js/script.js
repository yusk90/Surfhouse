/* Preloader */
$(window).load(function() {
    $('.preloader__status').fadeOut();
    $('.preloader').delay(350).fadeOut('slow');
    $('body').delay(350).removeClass('body');
});

$(function() {
    swapWidgets();

    function debounce(func, wait, immediate) {
        var timeout, args, context, timestamp, result, now;

        now = Date.now || function() {
            return new Date().getTime();
        };

        var later = function() {
            var last = now() - timestamp;

            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };

        return function() {
            context = this;
            args = arguments;
            timestamp = now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    }

    /* Reorder sidebar blocks and change banner on mobile */
    function swapWidgets() {
        var displayWidth = $(this).width();
        if (displayWidth <= 930) {
            $('.content').append($('.tags, .expert-articles'));
        } else {
            $('.sidebar').append($('.tags, .expert-articles'));
        }
    }

    var onResize = debounce(swapWidgets, 300);

    $(window).on('resize', onResize);

    /* Main slider */
    $('.home-slider').slick({
        dots: true,
        prevArrow: '.slider-control--prev-main',
        nextArrow: '.slider-control--next-main',
        customPaging: function() {
            return '<button class="home-slider__thumb" type="button"></button>'
        },
        draggable: false
    });


    var responsiveOptionsProduct = [
        {
            breakpoint: 680,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ];
    /* New products slider */
    $('.category--new-products .category__grid--first-row').slick({
        asNavFor: '.category__grid--second-row',
        prevArrow: '.category__control-prev--new',
        nextArrow: '.category__control-next--new',
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: false,
        responsive: responsiveOptionsProduct
    });
    $('.category--new-products .category__grid--second-row').slick({
        asNavFor: '.category__grid--first-row',
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: false,
        responsive: responsiveOptionsProduct
    });

    /* Top products slider */
    $('.category--top-products .category__grid').slick({
        prevArrow: '.category__control-prev--top',
        nextArrow: '.category__control-next--top',
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: false,
        responsive: responsiveOptionsProduct
    });

    /* Sale products slider */
    $('.category--sale-products .category__grid').slick({
        prevArrow: '.category__control-prev--sale',
        nextArrow: '.category__control-next--sale',
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: false,
        responsive: responsiveOptionsProduct
    });

    /* Instagram feed slider */
    $('.instagram-feed__slider').slick({
        appendArrows: '.instagram-feed__slider .slick-list',
        prevArrow: '<button class="slider-control slider-control--prev-instagram" type="button"><i class="fa fa-chevron-left"></i></button>',
        nextArrow: '<button class="slider-control slider-control--next-instagram" type="button"><i class="fa fa-chevron-right"></i></button>',
        slidesToShow: 6,
        slidesToScroll: 1,
        draggable: false,
        responsive: [
            {
                breakpoint: 840,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 440,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    /* Disable all default actions on links and submit buttons
       DELETE ON PRODUCTION  */
    $('a[href="#"], button[type="submit"]').on('click', function () {
        return false;
    });

    /* Language picker */
    $('.language-picker__current').on('click', function () {
        $(this).siblings('.language-picker__list').toggle();
        $('.language-picker').toggleClass('language-picker--opened');
    });
    $('.language-picker__item').on('click', function () {
        $('.language-picker__current').html($(this).html());
        $('.language-picker__list').hide();
        $('.language-picker').removeClass('language-picker--opened');
    });

    /* Forms search input reset */
    $('.search__reset').on('click', function () {
        $(this).parent().find('.search__input').val('').focus();
    });

    /* Mobile menu */
    $('.main-menu__toggle').on('click', function () {
        $(this).toggleClass('main-menu__toggle--opened');
        $(this).siblings('.main-menu__list').slideToggle();
    });

});