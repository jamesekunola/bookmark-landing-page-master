// functions
const displayMobileNav = () => {
  const mobileNav = document.querySelector(".hambuger-menu__cancle-btn");
  const hambugerIcon = mobileNav.querySelector(".hambuger-menu");
  const cancleIcon = mobileNav.querySelector(".close-btn");
  const linksContainer = document.querySelector(".navlinks-container");
  const navSection = document.querySelector(".nav-section");

  // event listeners
  mobileNav.addEventListener("click", shownav);

  // function
  function shownav() {
    navSection.classList.toggle("active");
    linksContainer.classList.toggle("visible");
    // show and hide icon
    cancleIcon.classList.toggle("visible");
    hambugerIcon.classList.toggle("hidden");

    // disable the body scrollbar if mobile nav is active
    const navSectionClass = navSection.classList.contains("active");
    if (navSectionClass) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
  }
};

const featuresDisplay = () => {
  const featuresList = [
    {
      category: "Simple Bookmarking",
      img: "/images/illustration-features-tab-1.svg",
      heading: "Bookmark in one click",
      "title sub":
        "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites.",
    },
    {
      category: "Speedy Searching",
      img: "/images/illustration-features-tab-2.svg",
      heading: "intelligent search",
      "title sub":
        "Our powerful search will help you find saved sites in no time at all. no need to trawl through all of your bookmarks",
    },
    {
      category: "Easy Sharing",
      img: "/images/illustration-features-tab-3.svg",
      heading: "Share your bookmarks",
      "title sub":
        "Easily share your bookmarks and collections with others. Create a shareable link that you send at the click of a button",
    },
  ];
  const middleCard = document.querySelector(".middle-card");
  const featuresBtn = document.querySelectorAll(".mid-btn");

  featuresBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const lines = document.querySelectorAll(".mid-btn span");

      lines.forEach((line) => line.classList.remove("selected"));
      featuresBtn.forEach((btn) => btn.classList.remove("active"));

      btn.classList.add("active");
      const addLine = btn.querySelector("span");
      addLine.classList.add("selected");

      addLine.addEventListener("animationend", () => {
        // get button dataset
        const btnDataset = btn.dataset.id;

        // check if button clicked matches the item category
        const btnFilter = featuresList.filter((item) => {
          if (item.category == btnDataset) {
            return item;
          }
        });

        const bookmarksList = btnFilter.map((item) => {
          return `<div class="middle-img">
            <img src=${item.img} alt="a web page illustraction showing a website layout">
            <div class="img-bg"></div>
          </div>
          <div class="text-style middle-text__info">
            <h1>${item.heading}</h1>
            <p>
            ${item["title sub"]}
            </p>
            <a href="#" class="btns blue-bg__btn">More info</a>
          </div>`;
        });

        middleCard.innerHTML = bookmarksList;
      });
    });
  });
};

const showFAQAnswer = () => {
  const questionBtns = document.querySelectorAll(".qus");
  const qusAnswer = document.querySelectorAll(".question-answer");
  const svgIconBtn = document.querySelectorAll(".down");

  questionBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      // restore question answer div height to default when button is clicked
      qusAnswer.forEach((qus) => (qus.style.height = 0));
      // remove the class active from previously selected question
      const activeClass = document.querySelector(".qus.active");
      if (activeClass) {
        activeClass.classList.remove("active");
        svgIconBtn.forEach((icon) => icon.classList.remove("active"));
      }

      const icon = btn.querySelector(".down");
      const questionContainer = event.currentTarget.parentElement;
      const questionAns = questionContainer.querySelector(".question-answer");
      const questionwrapper = questionAns.children[0];
      // add the class active to the current selected question
      btn.classList.add("active");
      icon.classList.add("active");
      // get height of the answer wrapper
      const questionAnsHeight = questionAns.getBoundingClientRect().height;
      const questionwrapperHeight =
        questionwrapper.getBoundingClientRect().height;

      if (questionAnsHeight == 0) {
        questionAns.style.height = `${questionwrapperHeight}px`;
      } else {
        questionAns.style.height = 0;
        icon.classList.remove("active");
        activeClass.classList.remove("active");
      }
    });
  });
};

const validateEmail = () => {
  const submitEmail = document.querySelector("input[type='submit']");
  const emailInput = document.querySelector("#email");
  const errorMsg = document.querySelector(".error-message");
  const errorIcon = document.querySelector(".error-icon");
  const emailBox = document.querySelector(".email-input");
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  submitEmail.addEventListener("click", (event) => {
    event.preventDefault();
    console.log(emailInput.value);
    // check if email is authentic else show error
    if (emailFormat.test(emailInput.value)) {
      emailInput.value = "";
    } else {
      alertError();
    }
  });

  function alertError() {
    errorMsg.classList.add("active");
    errorMsg.setAttribute("aria-hidden", "false");
    emailInput.classList.add("error");
    emailBox.classList.add("error");
    errorIcon.classList.add("visible");
    errorIcon.setAttribute("aria-hidden", "false");

    setTimeout(() => {
      errorMsg.classList.remove("active");
      errorMsg.setAttribute("aria-hidden", "true");
      emailInput.classList.remove("error");
      emailBox.classList.remove("error");
      errorIcon.classList.remove("visible");
      errorIcon.setAttribute("aria-hidden", "true");
    }, 1500);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  displayMobileNav();
  featuresDisplay();
  showFAQAnswer();
  validateEmail();
});
