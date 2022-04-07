document.addEventListener(`DOMContentLoaded`, () => {
    let form = document.getElementById(`github-form`)
    form.addEventListener(`submit`, formSubmit)


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
            .then(data => renderUserData(data))
    }

    function renderUserData(data) {
        console.log("data", data)
        let list = document.getElementById(`user-list`)
        // username, avatar and a link
        for (let i = 0; i < data.items.length; i++) {
            // console.log(data.items[0])
            let userObj = data.items[i]
            let li = document.createElement("li")
            let div = document.createElement("div")
            let h1 = document.createElement("h1")
            let img = document.createElement("img")
            let p = document.createElement("p")
            p.addEventListener(`click`, () => {
                // let repoList = document.getElementById("repos-list")
                // let repoLi = document.createElement("li")

                // repoList.append(repoLi)
                fetch(`https://api.github.com/users/${userObj.login}/repos`,
                    {
                        headers:
                        {
                            "Accept": "application/vnd.github.v3+json"
                        }
                    })
                    .then(response => response.json())
                    .then(data => renderAllReposForSingleUser(data))
            })
            let underline = document.createElement("u")
            // let a = document.createElement("a")
            h1.innerText = userObj.login
            img.src = userObj.avatar_url
            // a.href = userObj.url
            // a.innerText = userObj.url
            underline.innerText = userObj.url
            p.append(underline)
            li.append(div, h1, img, p)
            list.append(li)

        }




    }
    let repoList = document.getElementById("repos-list")

    function renderAllReposForSingleUser(repos) {
        repoList.innerHTML = ``
        repos.forEach(repo => renderRepoData(repo))

    }

    function renderRepoData(repo) {
        console.log("repo", repo)
        let repoLi = document.createElement("li")
        repoLi.innerText = repo.name
        repoList.append(repoLi)
    }
})