//////////////////
//I'll just grab all my elements here...
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
errorMsg=(message, i)=>{ 
  let error = document.querySelectorAll('.error-msg')[i];
  error.textContent = `*pls input ${message}`;
  error.style.display = 'block';
}

loopForm=()=>{
  let welcome = document.querySelector('.text');
  let courseNumber = Number(courseNum.value);
  if (courseNumber > 0) {
    intro.style.display = 'none';
    formWrap.style.cssText = 'transform: translatex(0vw); transition: 1s;';
    welcome.textContent =  `Hi there!, You have ${courseNumber} course forms here, pls input all your course units and grades before procceeding to calculate.`;
    for(var i = 1; i < courseNum.value; i++){
    let courseClone = course.cloneNode(true);
    form.appendChild(courseClone);
    }
    if (courseNumber < 3) {
      let footer = document.querySelector('footer');
      footer.style.position = 'absolute';
    }
  } else {
    errorMsg('a valid number', 0);
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
  let formArr =  Array.prototype.slice.call(form);//converts the form nodelist to an array  
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
    let num = parseInt(unitVal[i]);
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
  if (!(isNaN(gp))){
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
  }else{
      return errorMsg('all fields correctly', 1);
  }
});


newBtn.addEventListener('click', () => window.location.reload(true));

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





















