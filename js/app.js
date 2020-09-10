/////  VARIABLES  ////
const courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#clear-cart');


/////  LISTENERS  ////
loadEventListeners();
function loadEventListeners(){
    // When a new course is added
    courses.addEventListener('click',buyCourse);
    // When the remove btn is clicked
    shoppingCartContent.addEventListener('click',removeCourse);
    // Clear Cart Button
    clearCartBtn.addEventListener('click', clearCart);
    // Document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
};

////  FUNCTIONS  ////

function buyCourse(e) {
    e.preventDefault();
    // Find delagation to find the course that was added
    if (e.target.classList.contains('add-to-cart')) {
        // Reading the values of the course
        const course = e.target.parentElement.parentElement;

        // Read the Values
        getCourseInfo(course);
    };
};
/// Reading the HTML information
function getCourseInfo(course){
    // Create an object with Couse's data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector(".price span").textContent,
        id: course.querySelector('a').getAttribute('data-id')
    };
    // Insert into the shopping cart
    addIntoCart(courseInfo);
};
// Display the selected courses in the shopping cart

// Add the course into cart
function addIntoCart(course) {
    // Ceate a <tr></tr>
    const row = document.createElement('tr');

    // Build the template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    // Add into the shopping cart
    shoppingCartContent.appendChild(row);

    // Add the course into the Storage
    saveIntoStorage(course);
};

// Add the courses into the Local Storage
function saveIntoStorage(course){
    let courses = getCoursesFromStorage();
    // Push new course to the array
     courses.push(course);
    // Stringify the array wich contains all the course
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Get the Contents from the Storage
function getCoursesFromStorage() {
    let courses;
    // Check If the key exists on the Storage
    if(localStorage.getItem('courses') === null){
        courses = []
    } else {
        courses = JSON.parse( localStorage.getItem('courses') )
    };
    return courses
}

// Remove the Course from the cart
function removeCourse(e) {
    e.stopPropagation();
    let course, courseId;
    // Remove From THE DOM
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    };
    // Remove from the Local Storage
    console.log(courseId);
    // Remove from the local Storage
    removeCourseLocalStorage(courseId)
};

//Remove the course form the Storage by clickin' the X btn
function removeCourseLocalStorage(id) {
    // Get LS data
    let coursesLS = getCoursesFromStorage();

    // Loop throught the array to find the index
    coursesLS.forEach(function(courseLS, index){
        if(courseLS.id === id) {
            coursesLS.splice(index, 1);
        };
    });
    // add to the storage
    localStorage.setItem('courses', JSON.stringify(coursesLS));
};

// Clear cart BTN
function clearCart() {
    // 1-way doin' that
    // shoppingCartContent.innerHTML = '';
    
    // 2-way
    while (shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    };
    // Clear From Storage
    clearFromStorage();
};

// Clear the whole storage
function clearFromStorage() {
    localStorage.clear();
};

// Loads when document is ready and print courses into shopping cart
function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    // Loop throught the courses and print thouse into the cart
    coursesLS.forEach(function(course){
        // Ceate a <tr></tr>
        const row = document.createElement('tr');

        // Build the template
        row.innerHTML = `
            <tr>
                <td>
                    <img src="${course.image}" width=100>
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        `;
        shoppingCartContent.appendChild(row);
    });
};