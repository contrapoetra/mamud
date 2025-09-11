import * as THREE from 'three';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

let smoother = ScrollSmoother.create({
  wrapper: "#app",
  content: "#main",
  smooth: 2,
  effects: true,
  normalizeScroll: true,
});

document.addEventListener('keydown', (event) => {
  let current = window.pageYOffset;
  let current_section = Math.round(current / window.innerHeight);
  if (event.key === "ArrowDown") {
    event.preventDefault();
    let target = (current_section + 1) * window.innerHeight;
    window.scrollTo(0, target);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    let target = (current_section - 1) * window.innerHeight;
    window.scrollTo(0, target);
  }
});

let videos = document.querySelectorAll('.showcase-video video');
let video_type_label = document.querySelector('#showcase-type > div:nth-child(1)');
let video_types = document.querySelectorAll('.showcase-type-option');
let video_titles = document.querySelectorAll('.showcase-title-option');
let video_credits = document.querySelectorAll('.showcase-credit-option');
let current_video_type = null;
let current_video_title = null;
let current_video_credit = null;
let video_opened = false;
let last_type_enter = null;
let last_type_exit = null;
let last_title_enter = null;
let last_title_exit = null;
let last_credit_enter = null;
let last_credit_exit = null;
let last_label_enter = null;
let last_label_exit = null;
let duration = 0.5;

videos.forEach((video, index) => {
  video.addEventListener('click', (event) => {
    if (video.classList.contains("showcase-video-selected")) {
      video.classList.remove("showcase-video-selected");

      if (last_type_enter && last_type_enter.isActive()) {
        last_type_enter.reverse();
      } else {
        last_type_enter.kill();
        last_type_exit = gsap.to(video_types[index], {
          transform: "translateY(-2lh)",
          duration: duration,
          ease: "circ.in"
        });
      }

      if (last_title_enter && last_title_enter.isActive()) {
        last_title_enter.reverse();
      } else {
        last_title_enter.kill();
        last_title_exit = gsap.to(video_titles[index], {
          transform: "translateY(-1lh)",
          duration: duration,
          ease: "circ.in"
        })
      }

      if (last_credit_enter && last_credit_enter.isActive()) {
        last_credit_enter.reverse();
      } else {
        last_credit_enter.kill();
        last_credit_exit = gsap.to(video_credits[index], {
          transform: "translateY(-1lh)",
          duration: duration,
          ease: "circ.in"
        })
      }

      if (video_opened) {
        if (last_label_enter && last_label_enter.isActive()) {
          last_label_enter.reverse();
        } else {
          last_label_enter.kill();
          last_label_exit = gsap.to(video_type_label, {
            transform: "translateY(-1lh)",
            duration: duration,
            ease: "circ.in"
          });
        }
        video_opened = false;
      }
      if (current_video_type) { current_video_type = null };
      if (current_video_title) { current_video_title = null };
      return;
    };

    if (!video_opened) {
      if (last_label_exit && last_label_exit.isActive()) {
        last_label_exit.reverse();
      } else {
        try { last_label_exit.kill(); } catch { }
        last_label_enter = gsap.fromTo(video_type_label, { transform: "translateY(1lh)" }, {
          transform: "translateY(0lh)",
          duration: duration,
          ease: "circ.out"
        });
      }
      video_opened = true;
    }

    if (last_type_exit && last_type_exit.isActive()) {
      last_type_exit.reverse();
    } else {
      try {
        last_type_enter.reverse();
        last_type_exit.kill()
      } catch { }
      last_type_enter = gsap.fromTo(video_types[index], { transform: "translateY(0lh)" }, {
        transform: "translateY(-1lh)",
        duration: duration,
        ease: "circ.out",
        delay: (current_video_type ? duration : 0),
      });
    }

    if (last_title_exit && last_title_exit.isActive()) {
      last_title_exit.reverse();
    } else {
      try {
        last_title_enter.reverse();
        last_title_exit.kill();
      } catch { }
      last_title_enter = gsap.fromTo(video_titles[index], { transform: "translateY(1lh)" }, {
        transform: "translateY(0lh)",
        duration: duration,
        ease: "circ.out",
        delay: (current_video_type ? duration : 0),
      });
    }

    if (last_credit_exit && last_credit_exit.isActive()) {
      last_credit_exit.reverse();
    } else {
      try {
        last_credit_enter.reverse();
        last_credit_exit.kill();
      } catch { }
      last_credit_enter = gsap.fromTo(video_credits[index], { transform: "translateY(1lh)" }, {
        transform: "translateY(0lh)",
        duration: duration,
        ease: "circ.out",
        delay: (current_video_type ? duration : 0),
      });
    }

    if (current_video_type) {
      gsap.to(current_video_type, {
        transform: "translateY(-2lh)",
        duration: duration,
        ease: "circ.in"
      });
    }
    if (current_video_title) {
      gsap.to(current_video_title, {
        transform: "translateY(-1lh)",
        duration: duration,
        ease: "circ.in"
      })
    }
    if (current_video_credit) {
      gsap.to(current_video_credit, {
        transform: "translateY(-1lh)",
        duration: duration,
        ease: "circ.in"
      })
    }

    current_video_type = video_types[index];
    current_video_title = video_titles[index];
    current_video_credit = video_credits[index];
    let selected = document.querySelector('.showcase-video-selected');
    if (selected) selected.classList.remove("showcase-video-selected");
    video.classList.add("showcase-video-selected")
    video_credits.classList.add("showcase-credit-active")
  });
});

for (let i = 1; i <= 3; i++) {
  gsap.to(
    {},
    {
      scrollTrigger: {
        trigger: "#slide2",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        // markers: true,
        onUpdate: (self) => {
          let p = self.progress * 100;
          document.querySelector(`#video${i} video`).style.objectPosition =
            `50% ${100 - p}%`;
        },
      },
    },
  );
}

gsap.from(
  "#video1",
  {
    x: -500,
    ease: "power2.out",
    autoAlpha: 0,
    scrollTrigger: {
      trigger: "#slide2",
      start: "top bottom",
      end: "center center",
      scrub: true,
    },
  },
);

gsap.to(
  "#video3",
  {
    x: 500,
    ease: "power2.in",
    autoAlpha: 0,
    scrollTrigger: {
      trigger: "#slide2",
      start: "center center",
      end: "bottom top",
      scrub: true,
    },
  },
);

gsap.from("#separator", {
  rotation: 45/2,
  filter: "blur(5pt)",
  scrollTrigger: {
    trigger: "#slide3",
    start: "top bottom",
    end: "center center",
    scrub: true,
  },
});

let slide4_slides = gsap.utils.toArray("#slide4 > div");

gsap.to(slide4_slides, {
  xPercent: -100 * (slide4_slides.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#slide4",
    start: "top top",
    end: "200%",
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

gsap.fromTo("#slide5 div:nth-child(1)", {xPercent: -100}, {
  xPercent: 0,
  scrollTrigger: {
    trigger: "#slide5",
    start: "top",
    end: "bottom%",
    scrub: true,
  },
});

gsap.fromTo("#slide5 div:nth-child(3)", {xPercent: 100}, {
  xPercent: 0,
  scrollTrigger: {
    trigger: "#slide5",
    start: "top",
    end: "bottom%",
    scrub: true,
  },
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
        },
      });
    },
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
        },
      });
    },
  });

  // SLIDE 2

  let text200_tweens = (chars) => {
    gsap.from(chars, {
      y: "random(500, 1000)",
      x: "random(-200, 200)",
      ease: "power2.inOut",
      autoAlpha: 0,
      rotation: "random(-360, 360)",
      filter: "blur(random(10, 30)px)",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#slide2",
        start: "top bottom",
        end: "center center",
        scrub: true,
      },
    });

    gsap.fromTo(chars, {}, {
      y: "random(10, 200)",
      x: "random(-200, 200)",
      ease: "power1.in",
      autoAlpha: 0,
      rotation: "random(-180, 180)",
      filter: "blur(random(5, 10)px)",
      stagger: 0.025,
      scrollTrigger: {
        trigger: "#slide2",
        start: "center center",
        end: "bottom top",
        scrub: true,
      },
    });
  };

  for (let i = 1; i <= 3; i++) {
    new SplitText(`#text20${i}`, {
      type: "chars",
      onSplit: (self) => {
        return text200_tweens(self.chars);
      },
    });
  }

  // SLIDE 3

  let text301 = new SplitText("#text301", {
    type: "chars",
    onSplit: (self) => {
      gsap.from(self.chars, {
        opacity: 0,
        filter: "blur(10px)",
        ease: "power.inOut",
        autoAlpha: 0,
        stagger: 1,
        scrollTrigger: {
          trigger: "#slide3",
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });
    },
  });

  let text303 = new SplitText("#text303", {
    type: "chars",
    onSplit: (self) => {
      gsap.from(self.chars, {
        opacity: 0,
        filter: "blur(10px)",
        ease: "power.inOut",
        autoAlpha: 0,
        stagger: 1,
        scrollTrigger: {
          trigger: "#slide3",
          start: "top bottom",
          end: "center center",
          scrub: 3,
        },
      });
    },
  });

  let text302 = new SplitText("#text302", {
    type: "chars",
    onSplit: (self) => {
      gsap.from(self.chars, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-20, 20)",
        delay: 2,
        opacity: 0,
        filter: "blur(10px)",
        ease: "power.inOut",
        autoAlpha: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#slide3",
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });
    },
  });

  let text304 = new SplitText("#text304", {
    type: "chars",
    onSplit: (self) => {
      gsap.from(self.chars, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-20, 20)",
        delay: 4,
        opacity: 0,
        filter: "blur(10px)",
        ease: "power.inOut",
        autoAlpha: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#slide3",
          start: "top bottom",
          end: "center center",
          scrub: 3,
        },
      });
    },
  });
});


// 3D STUFF

let init3d = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#render'),
    alpha: true
  });
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  const color = 0xFFFFFF;
  const intensity = 10;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(0, 10, 0);
  light.target.position.set(-5, 0, 0);
  scene.add(light);
  scene.add(light.target);

  camera.position.z = 3;

  function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.001;
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate)
};
