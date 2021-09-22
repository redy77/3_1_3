const principalEmail = document.getElementById('principalEmail')
const principalRoles = document.getElementById('principalRoles')
const allUsers = document.getElementById('allUsers')
const userSimplyInfo = document.getElementById('userSimplyInfo')
const userDataNew = document.getElementById('userDataNew')
const allRoles = document.getElementById('allRoles')
const nameNewUser = document.getElementById('name')
const ageNewUser = document.getElementById('age')
const emailNewUser = document.getElementById('email')
const passwordNewUser = document.getElementById('password')
const editUser = document.getElementById('userData')
const formEdit = document.getElementById('formEdit')
const allRolesEdit = document.getElementById('allRolesEdit')
const userDataDelete = document.getElementById('userDelete')
const roleUserDelete = document.getElementById('allRolesDelete')
const deleteUser = document.getElementById('userDataDelete')
let renderAllUsers = (users) => {
    let outputUsers = ''
    users.forEach(user => {
        let userRole = ''
        user.roles.forEach(role => {
            let usersRole = 'User'
            if (role.authority === 'ROLE_ADMIN') {
                usersRole = 'Admin'
            }
            userRole += (usersRole + "  ")
        })
        outputUsers += `
             <tr>
             <td><a>${user.id}</a></td>
             <td><a></a>${user.username}</td>
             <td><a>${user.age}</a></td>
             <td><a>${user.email}</a></td>
             <td>
             <div class="d-flex">
                 <div id="userRoles">
                      <div class="mx-2">${userRole}
                      </div>
                     </div>
                 </div>
             </td>      
             <td>
             <div data-id="${user.id}">
             <button type="button" class="btn btn-primary" id="editUserClick"
             data-bs-toggle="modal" data-bs-target="#editUser">
             Edit
             </button>
             </div>
             </td>
              <td>
              <div data-id="${user.id}">
              <button type="button" class="btn btn-danger"
              data-bs-toggle="modal" data-bs-target="#deleteUser" id="deleteUserClick">
              Delete
               </button>
               </div>
             </td>
        `
    })
    allUsers.innerHTML = outputUsers
}
const urlHeader = '/admin'
const urlAllUsers = '/users'
const urlAllRoles = '/roles'
const urlNewUser = '/newUser'
const urlEditUser = '/editUser'
let outputPrincipalEmail = ''
let outputRoles = ''
let outputUserSimplyInfo = ''
let userId = ''

// fill header
fetch(urlHeader)
    .then(res => res.json())
    .then(data => {
        outputPrincipalEmail = `
<div class="text-light fw-bold mx-2 my-2">${data.email}
            `
        principalEmail.innerHTML = outputPrincipalEmail
    })
fetch(urlHeader)
    .then(res => res.json())
    .then(data => data.roles.forEach(role => {
        let userRole = 'User'
        if (role.authority === 'ROLE_ADMIN') {
            userRole = 'Admin'
        }
        outputRoles += `
                  <div class="d-flex mx-2">${userRole}
                  `
        principalRoles.innerHTML = outputRoles
    }))

// select roles
selectRoles()
async function selectRoles() {
    let outputAllRoles = ''
    const response = await fetch(urlAllRoles)
    const data = await response.json()
    data.forEach(role => {
        outputAllRoles += `
                                        <option >${role.role}
                                        </option>
                  `
        allRoles.innerHTML = outputAllRoles
        allRolesEdit.innerHTML = outputAllRoles
    })
}

usersTable()
async function usersTable() {
    const response = await fetch(urlAllUsers)
    const data = await response.json()
    renderAllUsers(data)


    // get user for delete/edit
    allUsers.addEventListener('click', (e) => {
        let editButtonClick = e.target.id === 'editUserClick'
        let deleteButtonClick = e.target.id === 'deleteUserClick'

        if (deleteButtonClick){
            userId = e.target.parentElement.dataset.id
            let userRoles = ''
            fetch(`${urlEditUser}/${userId}`, {method: 'GET',})
                .then(res => res.json())
                .then(data => {
                    let deleteForm = `
                      <br/>
                    <label class="form-label"
                           for="id">ID</label>
                    <input id="id"
                           name="id" value=${data.id} disabled type="text"/>
                    <br/>
                    <label class="form-label"
                           for="name">Name</label>
                    <input id="name"
                           disabled value=${data.username} name="username"
                           type="text"/>
                    <br/>
                    <br/>
                    <label for="age">Age</label>
                    <input id="age" value=${data.age}
                           disabled name="age" type="number"/>
                    <br/>
                    <br/>
                    <label for="email">Email</label>
                    <input id="email" value=${data.email}
                           disabled name="email" type="text"/>
                     `
                    userDataDelete.innerHTML = deleteForm
                    data.roles.forEach(role => {
                        userRoles += `
                                        <option >${role.role}
                                        </option>
                  `

                    })
                    roleUserDelete.innerHTML = userRoles
                })
        }
        if (editButtonClick) {
            userId = e.target.parentElement.dataset.id
            fetch(`${urlEditUser}/${userId}`, {method: 'GET',})
                .then(res => res.json())
                .then(data => {
                    let editForm = `
                      <label class="form-label"
                               for="id">ID</label>
                        <input id="idEdit" value=${data.id}
                               name="id" readonly type="text"/>
                        <br/>
                        <label class="form-label" for="name">Enter
                            name: </label>
                        <input id="nameEdit"
                               name="username" value=${data.username} type="text"/>
                        <br/>
                        <br/>
                        <label for="age">Enter age: </label>
                        <input id="ageEdit"
                               name="age" value=${data.age} type="number"/>
                        <br/>
                        <br/>
                        <label for="email">Enter email: </label>
                        <input id="emailEdit"
                               name="email" value=${data.email} type="text"/>
                        <br/>
                        <br/>
                        <br/>
                        <label th:for="password">Пароль</label>
                        <input type="password" name="password"
                               id="passwordEdit">
                     `
                    formEdit.innerHTML = editForm
                })
        }
    })
}

// fill user information
fetch(urlHeader)
    .then(res => res.json())
    .then(data => {
        let userRole = ''
        let usersRole = 'User'
        data.roles.forEach(role => {
            if (role.authority === 'ROLE_ADMIN') {
                usersRole = 'Admin'
            }
            userRole += (usersRole + "  ")
        })
        outputUserSimplyInfo = `
                                <td><a>${data.id}</a></td>
                                <td><a>${data.username}</a></td>
                                <td><a>${data.age}</a></td>
                                <td><a>${data.email}</a></td>
                                <td>
                                    <div class="d-flex">
                                            <div id="userRoles">
                                             <div class="mx-2">${userRole}
                                            </div>
                                        </div>
                                    </div>
                                </td>
            `
        userSimplyInfo.innerHTML = outputUserSimplyInfo
    })

// add new user
userDataNew.addEventListener('submit', async e => {
    e.preventDefault()

    let selected = Array.from(userDataNew.role.options)
        .filter(option => option.selected)
        .map(option => option.value);

    fetch(urlNewUser, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: nameNewUser.value,
            age: ageNewUser.value,
            email: emailNewUser.value,
            password: passwordNewUser.value,
            roles: selected
        })
    })
        .then(() => {
            selectRoles()
            nameNewUser.value = '',
                ageNewUser.value = '',
                emailNewUser.value = '',
                passwordNewUser.value = '',
                usersTable()
        })
})

//edit user
editUser.addEventListener('submit', async e => {
    e.preventDefault()
    const ageEdit = document.getElementById('ageEdit')
    const idEdit = document.getElementById('idEdit')
    const nameEdit = document.getElementById('nameEdit')
    const emailEdit = document.getElementById('emailEdit')
    const passwordEdit = document.getElementById('passwordEdit')

    let selected = Array.from(editUser.role.options)
        .filter(option => option.selected)
        .map(option => option.value);

    await fetch(urlEditUser, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: idEdit.value,
            username: nameEdit.value,
            age: ageEdit.value,
            email: emailEdit.value,
            password: passwordEdit.value,
            roles: selected
        })
    })
        .then(() => {
            usersTable()
        })
})

//delete user
deleteUser.addEventListener('submit', async e => {
    e.preventDefault()

    await fetch(`${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => {
            usersTable()
        })
})

