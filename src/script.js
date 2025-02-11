initMarquee();
function initMarquee() {
  document.querySelectorAll(".marquee").forEach((marquee) => {
    const innerHTML = marquee.innerHTML;
    marquee.innerHTML = "";
    marquee.style.display = "flex";
    marquee.style.overflow = "hidden";

    for (let i = 0; i <= 4; i++) {
      const div = document.createElement("div");
      div.innerHTML = innerHTML;
      div.style.flexShrink = 0;

      marquee.appendChild(div);
    }
  });

  gsap.to(".marquee > div", {
    translate: "-100%",
    repeat: -1,
    duration: 8,
    ease: "linear",
  });
}

initSmoothScrolling();
function initSmoothScrolling() {
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

initGallaryAnime();
function initGallaryAnime() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#gallary",
      scroller: "main",
      start: "50% 80%",
      end: "50%, 20%",
      //   markers: true,
      scrub: 3,
    },
  });
  tl.to(
    ".gallary-row:nth-child(1)",
    {
      translateX: "5%",
    },
    "flag1"
  ).to(
    ".gallary-row:nth-child(2)",
    {
      translateX: "-5%",
    },
    "flag1"
  );
}

showRecentWorkAndAnimate();
function showRecentWorkAndAnimate() {
  /*
 <div class="row group/row border-b last:border-b h-[20vh] relative px-10 md:grid grid-cols-6 items-center">
      <h3 class="text-5xl col-span-4">
          SHEFLARE
      </h3>
      <p class="col-span-2">UI/UX design</p>
      <div class="row-img-container absolute z-10 h-full aspect-square bg-red-50  "></div>
  </div>;
*/

  const recentWorks = [
    { title: "SHEFLARE", type: "UI/UX design", imgURL: "" },
    { title: "PYRE", type: "UI/UX design", imgURL: "" },
    { title: "ZOUK", type: "UI/UX design", imgURL: "" },
    { title: "BUS BUDDY", type: "UI/UX design", imgURL: "" },
  ];

  const workContainer = document.querySelector(".row-container");

  recentWorks.forEach((work) => {
    const div = document.createElement("div");
    div.classList.add(
      ..."row group/row border-b last:border-b relative py-10 px-10 md:grid grid-cols-6 items-center".split(
        " "
      )
    );

    div.innerHTML = `
        <h3 class="text-7xl col-span-4">
            ${work.title}
        </h3>
        <div class="row-img-container absolute z-10 -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 h-full aspect-[4/3] bg-red-50 ">
          <img src="${work.imgURL}" alt="${work.title}"/>
        </div>
        <p class="col-span-2">${work.type}</p>
        `;

    workContainer.appendChild(div);

    const imgContainer = div.querySelector(".row-img-container");

    let prevPosX = 0;

    div.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      const divBoundings = div.getBoundingClientRect();

      const diffX = clientX - prevPosX;
      prevPosX = clientX;

      gsap.to(imgContainer, {
        scale: 1,
        opacity: 1,
        left: clientX -divBoundings.left,
        top: clientY - divBoundings.top,
        rotate: gsap.utils.clamp(-20, 20, diffX),
      });
    });

    div.addEventListener("mouseout", (event) => {
      gsap.to(imgContainer, {
        scale: 0,
        opacity: 0,
      });
    });
  });
}
