fetch("../data/data.json")
    .then(response => response.json())
    .then(data => {
        const gridContainer = document.getElementById("grid-section")
        const radioInputs = document.querySelectorAll("input[name='choice']")

        refreshList(data, gridContainer)

        showStates(radioInputs, data, gridContainer)

    }).catch(() => alert("Erreur de chargement des données"))


function refreshList(data, container) {
    container.innerHTML = ""

    const radios = document.querySelectorAll("input[name='choice']")
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            switch (radios[i].value) {
                case "true" : data = data.filter(object => object.active); break
                case "false" : data = data.filter(object => !object.active); break
            }
        }
    }

    for (let i = 0; i < data.length; i++) {
        const article = document.createElement("article")
        article.innerHTML = (`
                <div>
                    <span>
                        <img src=${data[i].icon} alt=${data[i].title}>
                    </span>
                    <div>
                        <h2>${data[i].title}</h2>
                        <p>${data[i].text}</p>
                    </div>
                </div>
                <div>
                    <button>Remove</button>
                    <label><input id='${data[i].title}' type="checkbox" ${ data[i].active ? "checked" : "" }></label>
                </div>
            `)
        container.appendChild(article)
    }
    setStates(data)
    removeExtension(data)
}

function showStates(radios, data, container) {
    let dataFiltered
    for (let i = 0; i < radios.length; i++) {
        radios[i].onclick = (e) => {
            switch (e.target.value) {
                case "all" : dataFiltered = data; break
                case "true" : dataFiltered = data.filter(object => object.active); break
                case "false" : dataFiltered = data.filter(object => !object.active); break
            }
            refreshList(dataFiltered, container)
        }
    }
}

function setStates(data) {
    const gridContainer = document.getElementById("grid-section")
    const checkboxInputs = document.querySelectorAll("#grid-section article input[type='checkbox']")
    for (let i = 0; i < checkboxInputs.length; i++) {
        checkboxInputs[i].onclick = () => {
            data[i].active = checkboxInputs[i].checked

            refreshList(data, gridContainer)
        }
    }
}

function removeExtension(data) {
    const gridContainer = document.getElementById("grid-section")
    const btnRemoves = document.querySelectorAll("#grid-section article button")
    for (let i = 0; i < btnRemoves.length; i++) {
        btnRemoves[i].onclick = () => {
            data.splice(i, 1)

            refreshList(data, gridContainer)
        }
    }
}
