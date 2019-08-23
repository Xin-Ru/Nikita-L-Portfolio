$(document).ready(function () {
    // Hide Loader
    $(".loader").delay(600).fadeOut(600);

    function showContent() {
        $(".loadBox").removeClass("topSpace");
        $("body").removeClass("locked");
    }

    setTimeout(showContent, 700);

    // Mobile Nav Toggle
    $(".menu__mobileButton").click(function (e) {
        e.preventDefault();
        $(".nav__mobile").animate({
            right: "0"
        }, 500);
    });

    $("#closedBtn").click(function (e) {
        e.preventDefault();
        $(".nav__mobile").animate({
            right: "-100vw"
        }, 500);
    });
    // Scroll to Top
    $(".toTopButton").click(function (e) {
        e.preventDefault();
        $("body,html").animate({
                scrollTop: $("body").offset().top
            },
            800 //speed
        );
        $('.toTopButton').removeClass('toTopButton--show');
    });

    // Nav Animation
    let didScroll;
    let delta = 5;
    let lastScrollTop = 0;

    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function isMobile() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }

    }

    function hasScrolled() {
        let st = $(this).scrollTop();

        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > 50) {
            // Page Scroll Down : hide nav
            $('nav').removeClass('nav--slideDown').addClass('nav--hide');
            $('.toTopButton').addClass('toTopButton--show');
        } else {
            // Page Scroll Up : show nav
            if (st + $(window).height() < $(document).height()) {
                $('nav').removeClass('nav--hide').addClass('nav--slideDown');
                if (st > 60) {
                    $("nav").addClass("nav--scrollStyle");
                } else {
                    $("nav").removeClass("nav--scrollStyle");
                    $('.toTopButton').removeClass('toTopButton--show');
                }
            }
        }

        lastScrollTop = st;
    }
});