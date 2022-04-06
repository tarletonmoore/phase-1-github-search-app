document.addEventListener(`DOMContentLoaded`, () => {
    let form = document.getElementById(`github-form`)
    form.addEventListener(`submit`, formSubmit)
})

function formSubmit(event) {
    event.preventDefault()
    const input = event.target[0].value
    fetch(`https://api.github.com/search/users?q=${input}`,
        {
            headers:
            {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
}

function renderUserData(data) {
    let list = document.getElementById(`user-list`)
    // username, avatar and a link
    console.log(data.login)
    // let newObj = {
    //     username: data.login,
    //     avatar: data.avatar_url,
    //     profile: data.url
    // }


}

