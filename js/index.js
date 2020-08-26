///////////////////
//I'll just gab all my elements here...
const intro = document.querySelector('.intro');
const startBtn = document.querySelector('.start-btn');
const form = document.querySelector('form');
const course = document.querySelector('.course');
const newBtn = document.getElementById('new-btn');
const courseNum = document.querySelector('.course-num');
const calcBtn = document.querySelector('.calc');
const grade = document.querySelector('.grade');
const unit = document.querySelector('.course-unit');
const alertBox = document.querySelector('.alert-box');
const overlay = document.querySelector('.overlay1');
const closeBox = document.querySelector('.close');
const formWrap = document.querySelector('.forms');

/////just a little function to initialise the calculator's forms...

loopForm=()=>{
  let courseNumber = Number(courseNum.value);
  let welcome = document.querySelector('.text');
  if (courseNumber > 0) {
    intro.style.display = 'none';
    formWrap.style.transform = 'translatex(0vw)';
    for(var i = 1; i < courseNum.value; i++){
    welcome.textContent =  `Hi there!, You have ${courseNumber} course forms here, pls input all your course units and grades before procceeding to calculate.`;
    let courseClone = course.cloneNode(true);
    form.appendChild(courseClone);
    }
    if (courseNumber < 3) {
      let footer = document.querySelector('footer');
      footer.style.position = 'absolute';
    }
  } else {
    let text = document.querySelector('.error');
    text.textContent = `*pls input valid number`;
  }
}

////////////////////////////////
///main function to calculate gp

myAlert = (gp, nthClass) => {
  gpa.textContent = `You're on ${nthClass} with a GPA of ${gp}!`
  overlay.style.display = 'block';
  alertBox.style.display = 'flex';
}

calcBtn.addEventListener('click', () => {
  let formArr =  Array.prototype.slice.call(form);//comvert thr form nodelist to sn array  
  let unitVal = [];
  let unitNum = [];
  let gradeVal = [];
  let numerator = [];
  
  for (var i = 0; i < formArr.length; i++) {
    if (i % 2 === 0) {
      unitVal.push(formArr[i].value);
    }
  }//get all the values of the course units and push them into an array
  
  for (var i = 0; i < unitVal.length; i++) {
    let num = Number(unitVal[i]);
    unitNum.push(num); 
  }//converts all the course unit arrays to an array of numbers just to be safe
  
  for (var i = 0; i < formArr.length; i++) {
    if (i % 2 === 1) {
      gradeVal.push(formArr[i].value);
    }
  }//get all the values of the grade options and push them into an array
   
  for (var i = 0; i < unitVal.length; i++) {
    let multiply = unitVal[i] * gradeVal[i];
    numerator.push(multiply);
  }
  
  let unitTotal = unitNum.reduce((a, b) => a + b, 0);//sums up the array i created
  
  let numeratorTotal = numerator.reduce((a, b) => a + b, 0);//sums up arrays
  
  let gpa = numeratorTotal / unitTotal;//calculate final gp score
  
  let gp = gpa.toFixed(2);//rounds it up to 2 decimal places

  if (gp !== NaN){
    if (gp >= 4.50 && gp <= 5.00) {
      
      return myAlert(gp, 'First Class');
      
    } else if(gp >= 3.50 && gp <= 4.49){
      
      return myAlert(gp, 'Second Class Upper');
    } else if(gp >= 2.40 && gp <= 3.49){
      
      return myAlert(gp, 'Second Class lower');
      
    } else if(gp >= 1.50 && gp <= 2.39){
      
      return myAlert(gp, 'Third Class');
      
    } else if(gp >= 1.00 && gp <= 1.49){
      
      return myAlert(gp, 'Pass');
      
    }
  }
});


newBtn.addEventListener('click', () => window.location.reload(true)
);

closeBox.addEventListener('click', e => {
  overlay.style.display = 'none'
  alertBox.style.display = 'none'
});

startBtn.addEventListener('click', loopForm);

courseNum.addEventListener('keyup', e => {
  if(event.keyCode === 13){
    event.preventDefault();
    return loopForm();
  }
});