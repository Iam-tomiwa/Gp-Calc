///////////////////
//I'll just grab all my elements here...
const intro = document.querySelector(".intro");
const startBtn = document.querySelector(".start-btn");
const form = document.querySelector("form");
const course = document.querySelector(".course");
const newBtn = document.getElementById("new-btn");
const courseNum = document.querySelector(".course-num");
const calcBtn = document.querySelector(".calc");
const grade = document.querySelector(".grade");
const unit = document.querySelector(".course-unit");
const alertBox = document.querySelector(".alert-box");
const overlay = document.querySelector(".overlay1");
const closeBox = document.querySelector(".close");
const formWrap = document.querySelector(".forms");

/////just a little function to initialise the calculator's forms...
errorMsg = (message, i) => {
  let error = document.querySelectorAll(".error-msg")[i];
  error.textContent = `*pls input ${message}`;
  error.style.display = "block";
};

loopForm = () => {
  let welcome = document.querySelector(".text");
  let courseNumber = Number(courseNum.value);
  if (courseNumber > 0) {
    intro.style.display = "none";
    formWrap.style.cssText = "transform: translatex(0vw); transition: 1s;";
    welcome.textContent = `Hi there!, You have ${courseNumber} course forms here, pls input all your course units and grades before procceeding to calculate.`;
    for (var i = 1; i < courseNum.value; i++) {
      let courseClone = course.cloneNode(true);
      form.appendChild(courseClone);
    }
    if (courseNumber < 4) {
      let footer = document.querySelector("footer");
      footer.style.margin = "40vh 0 0 0";
    }
  } else {
    errorMsg("a valid number", 0);
  }
};

////////////////////////////////
///main function to calculate gp
myAlert = (gp, nthClass) => {
  gpa.textContent = `You're on ${nthClass} with a GPA of ${gp}!`;
  overlay.style.display = "block";
  alertBox.style.display = "flex";
}; //alertbox!

calcBtn.addEventListener("click", () => {
  let formArr = Array.prototype.slice.call(form); //convert the form nodelist to an array

  let unitVal = formArr
    .filter((input) => input.type == "number")
    .map((val) => parseInt(val.value)); //get all the values of the course units and push them into an array

  let unitTotal = unitVal.reduce((a, b) => a + b, 0); //sums up the array i created

  let gradeVal = formArr
    .filter((input) => input.type == "select-one")
    .map((val) => parseInt(val.value));
  //get all the values of the grade options and push them into an array

  let numerator = [];
  for (var i = 0; i < unitVal.length; i++) {
    let multiply = unitVal[i] * gradeVal[i];
    numerator.push(multiply);
  }

  let numeratorTotal = numerator.reduce((a, b) => a + b, 0); //sums up arrays

  let gp = (numeratorTotal / unitTotal).toFixed(2); //calculate final gp score and rounds it up to 2d.p

  if (!isNaN(gp)) {
    if (gp >= 4.5 && gp <= 5.0) {
      return myAlert(gp, "First Class");
    } else if (gp >= 3.5 && gp <= 4.49) {
      return myAlert(gp, "Second Class Upper");
    } else if (gp >= 2.4 && gp <= 3.49) {
      return myAlert(gp, "Second Class lower");
    } else if (gp >= 1.5 && gp <= 2.39) {
      return myAlert(gp, "Third Class");
    } else if (gp >= 1.0 && gp <= 1.49) {
      return myAlert(gp, "Pass");
    } else if (gp < 1.0) {
      return myAlert(gp, "failure!");
    }
  } else {
    return errorMsg("all fields correctly", 1);
  }
});

newBtn.addEventListener("click", () => window.location.reload(true));

closeBox.addEventListener("click", (e) => {
  overlay.style.display = "none";
  alertBox.style.display = "none";
});

startBtn.addEventListener("click", loopForm);

courseNum.addEventListener("keyup", (e) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    return loopForm();
  }
});
