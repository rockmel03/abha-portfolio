animateNavLogo();

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

megneticEffect();
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

marqueeEffect();
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

displayRecentWork();
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
