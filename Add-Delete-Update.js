var courseApi = 'http://localhost:3000/courses'


function start() {
    getCourse(renderCourses)
    handleCreateCourse()
}

start()


function getCourse(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

// RENDER
function renderCourses(courses) {
    var listCourses = document.querySelector('#list-courses')
    var htmls = courses.map(function (course) {
        return `
            <li>
                <h1 class="course-name-${course.id}">${course.name}</h1>
                <p class="course-description-${course.id}">${course.description}</p>
                <button onclick=deleteCourse(${course.id})>DELETE</button>
                <button onclick=changeCourse(${course.id})>CHANGE</button>
            </li>
        `
    })
    listCourses.innerHTML = htmls.join('')

}

// CREATE
function handleCreateCourse() {
    var createBtn = document.querySelector('#create')

    createBtn.onclick = function () {
        var nameInputValue = document.querySelector('input[name="name"]').value
        var descriptionInputValue = document.querySelector('input[name="description"]').value

        var data = {
            name: nameInputValue,
            description: descriptionInputValue
        }

        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        fetch(courseApi, options)
            .then(function (response) {
                return response.json()
            })
            .then(function () {
                getCourse(renderCourses)
            })
    }
}

// DELETE
function deleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    fetch(courseApi + '/' + id, options)
        .then(function (response) {
            return response.json()
        })
        .then(function () {
            // get và render lại courses sau khi delete
            getCourse(renderCourses)
        })
}

// UPDATE

function updateCourse(id) {
    var nameInput = document.querySelector('input[name="name"]')
    var descriptionInput = document.querySelector('input[name="description"]')

    var courseName = document.querySelector(`.course-name-${id}`).innerText
    var courseDescription = document.querySelector(`.course-description-${id}`).innerText

    nameInput.value = courseName
    descriptionInput.value = courseDescription

    var createBtn = document.querySelector('#create')
    createBtn.innerHTML = 'SAVE'

    createBtn.onclick = function () {
        var updateData = {
            name: nameInput.value,
            description: descriptionInput.value
        }

        var options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        }

        fetch(courseApi + '/' + id, options)
            .then(function (response) {
                return response.json()
            })
            .then(function () {
                getCourse(renderCourses)
            })
    }
}