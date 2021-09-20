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
let renderAllUsers = (users) => {
    let outputUsers = ''
    users.forEach(user => {
        let userRole = ''
        user.roles.forEach(role => {
                userRole += role.authority + "  "
            }
        )
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
                  <div>
                      <button type="button" class="btn btn-primary">
                         Edit
                      </button>
                 </div>
             </td>                                  
             <td>
                  <button type="button" class="btn btn-danger">
                      Delete
                  </button>
             </td>
        `
    })
    allUsers.innerHTML = outputUsers
}
const urlHeader = '/admin'
const urlAllUsers = '/users'
const urlAllRoles = '/roles'
const urlNewUser = '/newUser'
let outputPrincipalEmail = ''
let outputRoles = ''
let outputUserSimplyInfo = ''

// fill header
fetch(urlHeader)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        outputPrincipalEmail = `
<div class="text-light fw-bold mx-2 my-2">${data.email}
            `
        principalEmail.innerHTML = outputPrincipalEmail
    })
fetch(urlHeader)
    .then(res => res.json())
    .then(data => data.roles.forEach(role => {
        outputRoles += `
                  <div class="d-flex mx-2">${role.authority}
                  `
        principalRoles.innerHTML = outputRoles
    }))
usersTable()
async function usersTable() {
    const response = await fetch(urlAllUsers)
    const data = await response.json()
    renderAllUsers(data)
}

// fill user information
fetch(urlHeader)
    .then(res => res.json())
    .then(data => {
        let userRole = ''
        data.roles.forEach(role => {
                userRole += role.authority + "  "
            }
        )
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

// select roles
selectRoles()
async function selectRoles() {
    let outputAllRoles = ''
    const response = await fetch(urlAllRoles)
    const data = await response.json()
    data.forEach(role => {
        outputAllRoles += `
                                        <option 
                                                th:value="${role.id}"
                                                >${role.role}
                                        </option>
                  `
        allRoles.innerHTML = outputAllRoles
    })}
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
