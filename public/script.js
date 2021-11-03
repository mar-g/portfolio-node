// Mouse Circle
const mouseCircle = document.querySelector(".mouse-circle");
const mouseDot = document.querySelector(".mouse-dot");

const mouseCircleFn = (x, y) => {
  mouseCircle.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
  mouseDot.style.cssText = `top: ${y}px; left: ${x}px; opacity: 1`;
};
// End of Mouse Circle

// Animated Circles
const circles = document.querySelectorAll(".circle");
const mainImg = document.querySelector(".main-circle img");

let mX = 0;
let mY = 0;
const z = 100;

const animateCircles = (e, x, y) => {
  if (x < mX) {
    circles.forEach((circle) => {
      circle.style.left = `${z}px`;
    });
    mainImg.style.left = `${z}px`;
  } else if (x > mX) {
    circles.forEach((circle) => {
      circle.style.left = `-${z}px`;
    });
    mainImg.style.left = `-${z}px`;
  }
  if (y < mY) {
    circles.forEach((circle) => {
      circle.style.top = `${z}px`;
    });
    mainImg.style.top = `${z}px`;
  } else if (y > mY) {
    circles.forEach((circle) => {
      circle.style.top = `-${z}px`;
    });
    mainImg.style.top = `-${z}px`;
  }

  mX = e.clientX;
  mY = e.clientY;
};
// End of Animated Circles

document.body.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  mouseCircleFn(x, y);
  animateCircles(e, x, y);
});

document.body.addEventListener("mouseleave", () => {
  mouseCircle.style.opacity = "0";
  mouseDot.style.opacity = "0";
});

// Main Button
const mainBtns = document.querySelectorAll(".main-btn");

mainBtns.forEach((btn) => {
  let ripple;

  btn.addEventListener("mouseenter", (e) => {
    const left = e.clientX - e.target.getBoundingClientRect().left;
    const top = e.clientY - e.target.getBoundingClientRect().top;
    ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = `${left}px`;
    ripple.style.top = `${top}px`;
    btn.prepend(ripple);
  });

  btn.addEventListener("mouseleave", () => {
    btn.removeChild(ripple);
  });
});
// End of Main Button

// Progres Bar
const sections = document.querySelectorAll("section");
const progressBar = document.querySelector(".progress-bar");
const halfCircles = document.querySelectorAll(".half-circle");
const halfCirclesTop = document.querySelector(".half-circle-top");
const progressBarCircle = document.querySelector(".progress-bar-circle");

let scrolledPortion = 0;
let scrollBool = false;
let imageWrapper = false;

const progressBarFn = (bigImgWrapper) => {
  imageWrapper = bigImgWrapper;
  let pageHeight = 0;
  const pageViewportHeight = window.innerHeight;

  if (!imageWrapper) {
    pageHeight = document.documentElement.scrollHeight;
    scrolledPortion = window.pageYOffset;
  } else {
    pageHeight = imageWrapper.firstElementChild.scrollHeight;
    scrolledPortion = imageWrapper.scrollTop;
  }

  const scrolledPortionDegree =
    (scrolledPortion / (pageHeight - pageViewportHeight)) * 360;

  halfCircles.forEach((el) => {
    el.style.transform = `rotate(${scrolledPortionDegree}deg)`;

    if (scrolledPortionDegree >= 180) {
      halfCircles[0].style.transform = "rotate(180deg)";
      halfCirclesTop.style.opacity = "0";
    } else {
      halfCirclesTop.style.opacity = "1";
    }
  });

  scrollBool = scrolledPortion + pageViewportHeight === pageHeight;

  // Arrow Rotation
  if (scrollBool) {
    progressBarCircle.style.transform = "rotate(180deg)";
  } else {
    progressBarCircle.style.transform = "rotate(0)";
  }
  // End of Arrow Rotation
};

// Progress Bar Click
progressBar.addEventListener("click", (e) => {
  e.preventDefault();

  if (!imageWrapper) {
    const sectionPositions = Array.from(sections).map((section) => {
      return Math.round(scrolledPortion + section.getBoundingClientRect().top);
    });

    const position = sectionPositions.find((sectionPosition) => {
      return sectionPosition > scrolledPortion;
    });
    scrollBool ? window.scrollTo(0, 0) : window.scrollTo(0, position);
  } else {
    scrollBool
      ? imageWrapper.scrollTo(0, 0)
      : imageWrapper.scrollTo(0, imageWrapper.scrollHeight);
  }
});
// End of Progress Bar Click

progressBarFn();
// End of Progres Bar

// Navigation
const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

const scrollFn = () => {
  menuIcon.classList.add("show-menu-icon");
  navbar.classList.add("hide-navbar");

  if (window.scrollY === 0) {
    menuIcon.classList.remove("show-menu-icon");
    navbar.classList.remove("hide-navbar");
  }

  progressBarFn();
};

document.addEventListener("scroll", scrollFn);

menuIcon.addEventListener("click", () => {
  menuIcon.classList.remove("show-menu-icon");
  navbar.classList.remove("hide-navbar");
});
// End of Navigation

//About Me Text
const aboutMeText = document.querySelector(".about-me-text");
const aboutMeTextContent =
  "Lorem ółżęćń Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";

Array.from(aboutMeTextContent).forEach((char) => {
  const span = document.createElement("span");
  span.textContent = char;
  aboutMeText.appendChild(span);
  span.addEventListener("mouseenter", (e) => {
    e.target.style.animation = "aboutMeTextAnim 3s infinite";
  });
});
//End of About Me Text

// Projects
const container = document.querySelector(".container");
const projects = document.querySelectorAll(".project");
const projectHideBtn = document.querySelector(".project-hide-btn");

projects.forEach((project, i) => {
  project.addEventListener("mouseenter", () => {
    project.firstElementChild.style.top = `-${
      project.firstElementChild.offsetHeight - project.offsetHeight + 20
    }px`;
  });

  project.addEventListener("mouseleave", () => {
    project.firstElementChild.style.top = "2rem";
  });

  // Big Project Image
  project.addEventListener("click", () => {
    const bigImgWrapper = document.createElement("div");
    bigImgWrapper.className = "project-img-wrapper";
    container.appendChild(bigImgWrapper);

    const bigImg = document.createElement("img");
    bigImg.className = "project-img";
    const imgPath = project.firstElementChild.getAttribute("src").split(".")[0];

    bigImg.setAttribute("src", `${imgPath}-big.jpg`);
    bigImgWrapper.appendChild(bigImg);
    document.body.style.overflowY = "hidden";

    document.removeEventListener("scroll", scrollFn);

    progressBarFn(bigImgWrapper);

    bigImgWrapper.onscroll = () => {
      progressBarFn(bigImgWrapper);
    };

    projectHideBtn.classList.add("change");

    projectHideBtn.onclick = () => {
      projectHideBtn.classList.remove("change");
      bigImgWrapper.remove();
      document.body.style.overflowY = "scroll";
      document.addEventListener("scroll", scrollFn);
      progressBarFn();
    };
  });
  // End of Big Project Image

  if (i >= 6) {
    project.style.cssText = "display:none; opacity: 0";
  }
});

// Projects Button
const section3 = document.querySelector(".section-3");
const projectsBtn = document.querySelector(".projects-btn");
const projectsBtnText = document.querySelector(".projects-btn span");
let showHideBool = true;

const showProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = "flex";
    section3.scrollIntoView({ block: "end" });
  }, 600);

  setTimeout(() => {
    project.style.opacity = "1";
  }, i * 200);
};

const hideProjects = (project, i) => {
  setTimeout(() => {
    project.style.display = "none";
    section3.scrollIntoView({ block: "end" });
  }, 1200);

  setTimeout(() => {
    project.style.opacity = "0";
  }, i * 100);
};

projectsBtn.addEventListener("click", (e) => {
  e.preventDefault();

  projectsBtn.firstElementChild.nextElementSibling.classList.toggle("change");

  showHideBool
    ? (projectsBtnText.textContent = "Show Less")
    : (projectsBtnText.textContent = "Show More");

  projects.forEach((project, i) => {
    i >= 6 &&
      (showHideBool ? showProjects(project, i) : hideProjects(project, i));
  });
  showHideBool = !showHideBool;
});
// End of Projects Button
// End of Projects

// Section 4
document.querySelectorAll(".service-btn").forEach((service) => {
  service.addEventListener("click", (e) => {
    e.preventDefault();

    const serviceText = service.nextElementSibling;
    serviceText.classList.toggle("change");

    const rightPosition = serviceText.classList.contains("change")
      ? `calc(100% - ${getComputedStyle(service.firstElementChild).width})`
      : 0;

    service.firstElementChild.style.right = rightPosition;
  });
});
// End of Section 4

// Section 5
// Form
const formHeading = document.querySelector(".form-heading");
const formInputs = document.querySelectorAll(".contact-form-input");

formInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = `Your ${input.placeholder}`;
      formHeading.style.opacity = "1";
    }, 300);
  });
  input.addEventListener("blur", () => {
    formHeading.style.opacity = "0";
    setTimeout(() => {
      formHeading.textContent = "Let`s Talk";
      formHeading.style.opacity = "1";
    }, 300);
  });
});
// End of Form

// Slideshow
const slideshow = document.querySelector(".slideshow");

setInterval(() => {
  const firstIcon = slideshow.firstElementChild;

  firstIcon.classList.add("faded-out");

  const thirdIcon = slideshow.children[2];
  thirdIcon.classList.add("light");
  thirdIcon.previousElementSibling.classList.remove("light");

  setTimeout(() => {
    slideshow.removeChild(firstIcon);
    slideshow.appendChild(firstIcon);

    setTimeout(() => {
      firstIcon.classList.remove("faded-out");
    }, 500);
  }, 500);
}, 3000);
// End of Slideshow

// Form Validation
const form = document.querySelector(".contact-form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
const messages = document.querySelectorAll(".message");
const submit = document.querySelector(".form-submit-btn");

const error = (input, message) => {
  input.nextElementSibling.classList.add("error");
  input.nextElementSibling.textContent = message;
};

const success = (input) => {
  input.nextElementSibling.classList.remove("error");
};

const checkRequiredFields = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      error(input, `${input.id} is required`);
    }
  });
};

const checkLength = (input, min) => {
  if (input.value.trim().length < min) {
    error(input, `${input.id} must be at least ${min} characters`);
  } else {
    success(input);
  }
};

const checkEmail = (input) => {
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regEx.test(input.value.trim())) {
    success(input);
  } else {
    error(input, "Email is not valid");
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkLength(username, 2);
  checkLength(subject, 2);
  checkLength(message, 10);
  checkEmail(email);
  checkRequiredFields([username, email, subject, message]);

  const notValid = Array.from(messages).find((message) => {
    return message.classList.contains("error");
  });

  const sendForm = () => {
    let formData = {
      name: username.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        submit.nextElementSibling.style.visibility = "visible";
        submit.nextElementSibling.style.opacity = "1";
        submit.nextElementSibling.textContent = "Email sent";

        setTimeout(() => {
          submit.nextElementSibling.style.visibility = "hidden";
          submit.nextElementSibling.style.opacity = "0";
        }, 4000);
        submit.disabled = false;
        submit.value = "Send Request";
        username.value = "";
        email.value = "";
        subject.value = "";
        message.value = "";
      }
    };
    xhr.send(JSON.stringify(formData));
  };

  if (!notValid) {
    submit.value = "Sending...";
    submit.disabled = true;
    sendForm();
  }
});
// End of Form Validation
// End of Section 5
