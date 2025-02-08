function init() {
  initLocomotiveScroll();
  animateNavLogo();
  megneticEffect();
  marqueeEffect();
  displayRecentWork();
  animateGallary();
}

window.addEventListener("DOMContentLoaded", () => {
  init();
});

function initLocomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function animateNavLogo() {
  const logo = document.querySelector("#logo");
  const logoOuter = logo.querySelector("#outer");

  const width1 =
    logoOuter.querySelector("span:nth-child(1)").getBoundingClientRect().width +
    "px";

  gsap.set(logoOuter, {
    width: width1,
  });

  logo.addEventListener("mouseenter", function (e) {
    gsap.to("#logo>span", {
      rotate: 360,
      duration: 0.5,
    });
    gsap.to("#inner", {
      translate: "-" + width1,
      duration: 0.5,
    });
  });

  logo.addEventListener("mouseleave", function (e) {
    gsap.to("#logo>span", {
      rotate: 0,
      duration: 0.5,
    });
    gsap.to("#inner", {
      translate: 0,
      duration: 0.5,
    });
  });
}

function megneticEffect() {
  const megnets = document.querySelectorAll(".megnetic");
  if (window.innerWidth > 560) {
    megnets.forEach((megnets) => {
      megnets.addEventListener("mousemove", moveMegnet);
      megnets.addEventListener("mouseleave", (event) => {
        gsap.to(event.target, {
          x: 0,
          y: 0,
          ease: Elastic.easeOut,
        });
      });
    });

    function moveMegnet(event) {
      const { left, top, width, height } = event.target.getBoundingClientRect();
      const x = event.clientX - (left + width / 2); // mouseposition at axis - center of axis
      const y = event.clientY - (top + height / 2);

      gsap.to(event.target, {
        x: x * 1,
        y: y * 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }
}

function marqueeEffect() {
  const morquees = document.querySelectorAll(".marquee");

  morquees.forEach((marquee) => {
    const text = marquee.textContent;

    marquee.innerHTML = "";
    marquee.style.overflow = "hidden  ";

    for (let i = 0; i < 4; i++) {
      const div = document.createElement("div");
      div.style.display = "inline-block";
      div.innerHTML = text;
      marquee.append(div);
    }
  });

  gsap.to(".marquee div", {
    translate: "-100%",
    repeat: -1,
    duration: 10,
    ease: "linear",
  });
}

function displayRecentWork() {
  const recentWorks = [
    {
      title: "SHEFLARE",
      type: "UI/UX design",
      image: "",
    },
    {
      title: "BUS BUDDY",
      type: "UI/UX design",
      image: "",
    },
    {
      title: "ZOUK",
      type: "UI/UX design",
      image: "",
    },
    {
      title: "PYRE",
      type: "UI/UX design",
      image: "",
    },
  ];

  const rowContainer = document.querySelector(".recent-work .row-container");

  recentWorks.forEach((work) => {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    rowDiv.innerHTML = `<h3>
                            ${work.title}
                        </h3>
                        <div></div>
                        <p>${work.type}</p>`;

    rowContainer.appendChild(rowDiv);
  });
}

function animateGallary() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".gallary-container",
      scroller: "main",
      start: "50% 90%",
      end: "50% 10%",
      scrub: 4,
      // markers: true,
    },
  });

  tl.to(
    ".gallary-container .gallary-row.row-1",
    {
      translateX: "5%",
    },
    "flag"
  ).to(
    ".gallary-container .gallary-row.row-2",
    {
      translateX: "-5%",
    },
    "flag"
  );
}
