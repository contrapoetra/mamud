gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

let smoother = ScrollSmoother.create({
  wrapper: "#canvass",
  content: "#main",
  smooth: 2,
  effects: true,
  normalizeScroll: true,
});

document.fonts.ready.then(() => {
  let text101 = new SplitText("#text101", {
    type: "chars",
    onSplit: (self) => {
      return gsap.to(self.chars, {
        y: "random([50, -10, -100])",
        rotation: "random(-10, 10)",
        filter: "blur(random(5, 10)px)",
        scrollTrigger: {
          trigger: "#slide1",
          start: "top top",
          end: "bottom center",
          scrub: 0.25,
          // markers: true,
        }
      });
    }
  });

  let text102 = new SplitText("#text102", {
    type: "chars",
    onSplit: (self) => {
      return gsap.to(self.chars, {
        y: "random([-400, -500, -600])",
        rotation: "random(-10, 10)",
        filter: "blur(random(1, 5)px)",
        scrollTrigger: {
          trigger: "#slide1",
          start: "top top",
          end: "bottom center",
          scrub: 0.25,
          // markers: true,
        }
      });
    }
  });

  // SLIDE 2

  let text200_tweens = (chars) => {
    return gsap.from(chars, {
      y: "random(300, 400)",
      x: "random([-100, 100])",
      // y: 200,
      rotation: "random(-360, 360)",
      filter: "blur(random(10, 30)px)",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#slide2",
        start: "top bottom",
        end: "center center",
        scrub: true,
        // markers: true,
      }
    });
  };

  for (let i = 1; i <= 3; i++) {
    new SplitText(`#text20${i}`, {
      type: "chars",
      onSplit: (self) => {
        return text200_tweens(self.chars);
      }
    });
  }


});
