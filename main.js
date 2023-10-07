const face = document.querySelector(".face");
const eyes = document.querySelectorAll(".eye");
const eyeApples = document.querySelectorAll(".eye__apple");
const eyeCovers = document.querySelectorAll(".eye-cover");
const myLowerEyelids = document.querySelectorAll(".eyelid_lower");
const myUpperEyelids = document.querySelectorAll(".eyelid_upper");
const myMouth = document.querySelector(".mouth");
const myBrows = document.querySelectorAll(".brow");
let isBlowing = false;
let timerId1;
let timerId2;

face.addEventListener("mousemove", function (e) {
  moveEyes(e);
  myUpperEyelids.forEach((upperEyelid) => {
    upperEyelid.classList.remove("eyelid_relax");
  });

  myBrows.forEach((brow) => brow.classList.add("up"));
  myBrows.forEach((brow) => brow.classList.remove("down", "brow-animation"));

  myMouth.setAttribute("src", "img/mouth0.png");
});

face.addEventListener("mouseout", () => {
  eyeApples.forEach((eyeApple) => {
    eyeApple.style.transition = "0.2s";
    eyeApple.style.top = "";
    eyeApple.style.left = "";
  });

  myUpperEyelids.forEach((upperEyelid) => {
    upperEyelid.classList.add("eyelid_relax");
  });

  myBrows.forEach((brow) => brow.classList.remove("up"));
  myBrows.forEach((brow) => brow.classList.add("brow-animation"));

  myMouth.setAttribute("src", "img/mouth1.png");
});

function getCenter(block) {
  const rect = block.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function moveEyes(e) {
  const x = e.clientX;
  const y = e.clientY;

  eyeApples.forEach((eyeApple) => {
    moveEyeCursorOutside(e, eyeApple);
    eyeApple.style.transition = "";
  });
}

function moveEyeCursorOutside(e, myEyeApple) {
  const sideX = e.clientX - Math.round(getCenter(myEyeApple).x);
  const sideY = e.clientY - Math.round(getCenter(myEyeApple).y);
  const hypotenuse = Math.round(Math.sqrt(sideX ** 2 + sideY ** 2));
  const similarity = hypotenuse / (myEyeApple.clientWidth / 2);
  myEyeApple.style.top = sideY / similarity + "px";
  myEyeApple.style.left = sideX / similarity + "px";
}

eyeCovers.forEach((eyeCover) => {
  eyeCover.addEventListener("mousemove", (e) => {
    eyeApples.forEach((eyeApple) => {
      eyeApple.style.transition = "";
    });
    e.stopPropagation();

    const myEye = eyeCover.closest(".eye");
    const myEyeApple = eyeCover.closest(".eye__apple");

    myLowerEyelids.forEach((eyelid) => {
      eyelid.classList.remove("eyelid_lower_anim");
    });
    myUpperEyelids.forEach((eyelid) => {
      eyelid.classList.remove("eyelid_upper_anim", "eyelid_relax");
    });

    const otherEye = document.querySelector(myEye.classList.contains("eye_left") ? ".eye_right" : ".eye_left");

    const otherEyeApple = otherEye.querySelector(".eye__apple");

    moveEyeCursorOutside(e, otherEyeApple);

    const sideX = e.clientX - Math.round(getCenter(myEye).x);
    const sideY = e.clientY - Math.round(getCenter(myEye).y);
    const hypotenuse = Math.sqrt(sideX ** 2 + sideY ** 2);
    const similarity = hypotenuse / (myEyeApple.clientWidth / 2);

    if (similarity <= 1) {
      myEyeApple.style.top = e.clientY - Math.round(getCenter(myEye).y) + "px";
      myEyeApple.style.left = e.clientX - Math.round(getCenter(myEye).x) + "px";
    }
    if (similarity > 1) {
      myEyeApple.style.top = sideY / similarity + "px";
      myEyeApple.style.left = sideX / similarity + "px";
    }

    startBlowing(true);
    isBlowing = true;

    myBrows.forEach((brow) => brow.classList.add("down"));
    myBrows.forEach((brow) => brow.classList.remove("brow-animation"));
  });
});

const myCheeks = document.querySelectorAll(".cheek");

function blowingCheeksIn() {
  myCheeks.forEach((cheek) => cheek.classList.remove("cheek_show"));
}

function blowingCheeksOut() {
  myCheeks.forEach((cheek) => cheek.classList.add("cheek_show"));
}

function startBlowing(bool) {
  function blowIn() {
    myMouth.setAttribute("src", "img/mouth3.png");
    blowingCheeksIn();
  }

  function blowOut() {
    myMouth.setAttribute("src", "img/mouth4.png");
    blowingCheeksOut();
  }

  if (bool && isBlowing == false) {
    timerBlowIn = setInterval(() => blowIn(), 300);
    timerBlowOut = setInterval(() => blowOut(), 600);
  }

  if (!bool) {
    clearInterval(timerBlowIn);
    myMouth.setAttribute("src", "img/mouth3.png");

    clearInterval(timerBlowOut);
    myMouth.setAttribute("src", "img/mouth4.png");

    myCheeks.forEach((cheek) => cheek.classList.remove("cheek_show"));
  }
}

eyeCovers.forEach((eye) => {
  eye.addEventListener("mouseout", (e) => {
    myLowerEyelids.forEach((eyelid) => {
      eyelid.classList.add("eyelid_lower_anim");
    });
    myUpperEyelids.forEach((eyelid) => {
      eyelid.classList.add("eyelid_upper_anim");
    });

    startBlowing(false);
    isBlowing = false;
  });
});

eyes.forEach((eye) => {
  eye.addEventListener("mouseout", (e) => {
    eyeApples.forEach((eyeApple) => {
      eyeApple.style.transition = "";
    });
  });
});
