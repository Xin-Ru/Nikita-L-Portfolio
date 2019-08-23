$(document).ready(function () {
    $(".header__downButton").click(function (e) {
        e.preventDefault();
        $("body,html").animate({
                scrollTop: $(".works").offset().top
            },
            800 //speed
        );
    });

    // CANVAS SKY
    function drawing() {
        let c = document.getElementById('sky');
        let ctx = c.getContext('2d');
        let xMax = c.width = window.screen.width;
        let yMax = c.height = window.screen.height;
        console.log(xMax, yMax);

        let hmTimes = Math.round(xMax + yMax);

        for (let i = 0; i <= hmTimes; i++) {
            let randomX = Math.floor((Math.random() * xMax) + 1);
            let randomY = Math.floor((Math.random() * yMax) + 1);
            let randomSize = Math.floor((Math.random() * 2) + 1);
            let randomOpacityOne = Math.floor((Math.random() * 9) + 1);
            let randomOpacityTwo = Math.floor((Math.random() * 9) + 1);
            let randomHue = Math.floor((Math.random() * 360) + 1);
            if (randomSize > 1) {
                ctx.shadowBlur = Math.floor((Math.random() * 15) + 5);
                ctx.shadowColor = "white";
            }
            ctx.fillStyle = "hsla(" + randomHue + ", 30%, 80%, ." + randomOpacityOne + randomOpacityTwo + ")";
            ctx.fillRect(randomX, randomY, randomSize, randomSize);
        }

    }
    drawing();

});