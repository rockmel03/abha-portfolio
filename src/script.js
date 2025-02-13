initHomePageAnime();
function initHomePageAnime() {
  const tl = gsap.timeline();

  tl.from("nav", {
    y: "-100",
    duration: 0.5,
    ease: Power4,
  });

  tl.from(".hero-top-heading > div> span", {
    y: "100%",
    stagger: 0.1,
    duration: 0.5,
    ease: Power4,
  });
  tl.from(".hero-top p", {
    opacity: 0,
    duration: 0.5,
    ease: Power4,
  });
  tl.from(".hero-btns", {
    opacity: 0,
    duration: 0.5,
    ease: Power4,
  });
}

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

initGallaryAnime();
function initGallaryAnime() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#gallary",
      scroller: "body",
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
        left: clientX - divBoundings.left,
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

initParaTypoEffect();
function initParaTypoEffect() {
  document.querySelectorAll(".typo").forEach((elem) => {
    const textContent = elem.textContent;

    let innerHTML = "";

    textContent
      .split("")
      .forEach((item) => (innerHTML += `<span>${item}</span>`));

    elem.innerHTML = innerHTML;
  });

  gsap.from(".typo > span", {
    opacity: 0,
    stagger: 0.002,
    scrollTrigger: {
      trigger: ".typo ",
      scroller: "body",
      start: "50% 90%",
      end: "50%, 50%",
    },
  });
}

displayTools();
function displayTools() {
  const tools = [
    {
      name: "illustrator",
      imgURL: "./assets/images/adobe-illustrator.png",
    },
    {
      name: "procreate",
      imgURL: "./assets/images/procreate.png",
    },
    {
      name: "figma",
      imgURL: "./assets/images/figma.png",
    },
    {
      name: "photoshop",
      imgURL: "./assets/images/adobe-photoshop.png",
    },
    {
      name: "autocad  ",
      imgURL: "./assets/images/autocad.png",
    },
  ];

  let toolsContainer = document.querySelector("#tools-container");

  tools.forEach((tool) => {
    const toolItem = document.createElement("div");
    toolItem.innerHTML = `
          <div class="flex gap-1 items-center">
            <div class="w-14 bg-gray-900 p-2   aspect-square rounded-xl ">
              <img
                src="${tool.imgURL}"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
           
          </div>
`;

    toolsContainer.appendChild(toolItem);
  });
}
