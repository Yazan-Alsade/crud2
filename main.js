var courseName = document.getElementById('courseName');
var courseCategory = document.getElementById('courseCategory');
var coursePrice = document.getElementById('coursePrice');
var courseDescription = document.getElementById('courseDescription');
var btn = document.getElementById('click');
var courses = [];
var table = document.getElementById('data');
var inputs = document.getElementsByClassName('inputs');
var clearBtn = document.getElementById("clear");
var deleteAll = document.getElementById('deleteBtn');
var currentIndex = 0;
var nameAlert = document.getElementById('nameAlert');


if(localStorage.getItem("coursesItem")==null)
var courses=[];
else{
var courses = JSON.parse(localStorage.getItem("coursesItem"));
displayData();
}
clearBtn.onclick = function(){
    ClearForm();
}
btn.onclick = function(){
    if(btn.innerHTML=="Add Course"){
    AddCourses();
}
else{
UpdateCourse();
}
    displayData();
    // ClearForm();
}
function AddCourses(){
  
    var Course = {
        name : courseName.value,
        category: courseCategory.value,
        price: coursePrice.value,
        description:courseDescription.value
    };
courses.push(Course);
localStorage.setItem("coursesItem",JSON.stringify(courses));
Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your work has been saved',
    showConfirmButton: false,
    timer: 1500
  })
}
function displayData(){
var result = "";
for(var i = 0 ; i< courses.length ; i++){
    result +=`<tr>
      <td>${i}</td>
      <td>${courses[i].name}</td>
      <td>${courses[i].category}</td>
      <td>${courses[i].price}</td>
      <td>${courses[i].description}</td>
      <td><button onclick="Delete(${i})" class="btn btn-outline-danger">delete</button></td>
      <td><button onclick="Update(${i})" class="btn btn-outline-info">update</button></td>
    </tr>` ;
}
table.innerHTML = result; 
}
function ClearForm(){
    for(var i=0; i<inputs.length ; i++)
    inputs[i].value = "";
}
function Delete(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
    if (result.isConfirmed) {
    courses.splice(index,1);
    localStorage.setItem("coursesItem",JSON.stringify(courses));
    displayData();
    Swal.fire(
    'Deleted!',
    'Your course has been deleted.',
    'success'
          )
        }
      })
  
}
deleteAll.onclick = function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
    if (result.isConfirmed) {
    localStorage.removeItem("coursesItem");
    courses=[];
    table.innerHTML="";  
    Swal.fire(
    'Deleted!',
    'Your Courses has been deleted.',
    'success'
          )
        }
      })
     
}
function search(searchText){
 
    var result = "";
    for(var i=0;i<courses.length;i++){
        if(courses[i].name.toLowerCase().includes(searchText.toLowerCase())){
        result+=`
        <tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].category}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].description}</td>
            <td><button class="deletee" onclick="deleteCourse(${i})"> delete </button></td>          
            <td><button class="update"> update </button></td>

        </tr>
        `;
    }
    }
    table.innerHTML = result;
}

function Update(index){
    
    var Course = courses[index];
    courseName.value = Course.name;
    courseCategory.value = Course.category;
    coursePrice.value = Course.price;
    courseDescription.value = Course.description;
    btn.innerHTML = "Update Course";
    currentIndex = index;
}
function UpdateCourse(){
    var Course = {
        name : courseName.value,
        category: courseCategory.value,
        price: coursePrice.value,
        description:courseDescription.value
    };
    courses[currentIndex].name=Course.name;
    courses[currentIndex].category=Course.category;
    courses[currentIndex].price=Course.price;
    courses[currentIndex].description=Course.description;
    localStorage.setItem("coursesItem",JSON.stringify(courses));
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
}

courseName.onkeyup=function(){
    var namePattern = /^[A-Z][a-z]{2,8}$/;
    if(namePattern.test(courseName.value) ){
        btn.removeAttribute("disabled");
        courseName.classList.add('is-valid');
        courseName.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
    }
    else{
        btn.disabled="true";
        courseName.classList.add('is-invalid')
        courseName.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');
    }

} 









