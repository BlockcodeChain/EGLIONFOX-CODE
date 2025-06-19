var circleElement = document.querySelector(".circle");
var hero = document.querySelector(".hero");
var main = document.querySelector(".main");
var c1 = document.querySelector(".c1");
var circles = document.querySelector(".circles");
var c2 = document.querySelector(".c2");
var timeout;

function animate() {
    var tl = gsap.timeline();
    tl.from(".nav", {
        y: "-10",
        duration: 1.5,
        opacity: 0,
        ease: Expo.easeInOut,
    });
    tl.to(".boundingel", {
        y: "0",
        duration: 1.5,
        delay: -0.5,
        stagger: 0.3,
        ease: Expo.easeInOut,
    });
}
animate();

function circlechapta() {
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (e) {
        clearTimeout(timeout);
        var xdiff = e.x - xprev;
        var ydiff = e.y - yprev;

        console.log(xdiff, ydiff);
        xscale = gsap.utils.clamp(.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(.8, 1.2, ydiff);
        xprev = e.x;
        yprev = e.y;

        gsap.to(".circle", {
            x: e.x,
            y: e.y,
            scaleX: xscale,
            scaleY: yscale,
            ease: "power2.out",
        });

        timeout = setTimeout(() => {
            document.querySelector(".circle").style.transform = 'translate(' + e.x + 'px,' + e.y + 'px) scale(1,1)';
        }, 100);
    });
}
circlechapta();

const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

document.querySelectorAll(".elem").forEach(function (elem) {
    let lastX = 0;
    elem.addEventListener("mousemove", function (e) {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate horizontal movement for rotation
        const diffX = x - lastX;
        lastX = x;

        // Clamp rotation between -15 and 15 degrees
        const rotation = gsap.utils.clamp(-15, 15, diffX);

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: "power2.out",
            top: y,
            left: x,
            rotate: rotation,
            duration: 0.3
        });
    });

    elem.addEventListener("mouseleave", function () {
        var img = elem.querySelector("img");
        gsap.to(img, {
            opacity: 0,
            rotate: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});


