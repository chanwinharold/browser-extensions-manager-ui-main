fetch('../data/data.json').then(response => response.json())
    .then(data => {

        const gridSection = document.getElementById("grid-section")
        const radioChoice = document.querySelectorAll("input[name='choice']")

        if (radioChoice[0].checked) refreshList(data, gridSection)

        radioChoice[0].onclick = () => {
            refreshList(data, gridSection)
        }
        radioChoice[1].onclick = () => {
            const result = data.filter(object => object.active)
            refreshList(result, gridSection)
        }
        radioChoice[2].onclick = () => {
            const result = data.filter(object => !object.active)
            refreshList(result, gridSection)
        }


    }).catch(error => console.log("Données non récupérées : ", error))

const refreshList = (data, container) => {
    container.innerHTML = ""
    data.forEach((eachElement) => {
        const article = document.createElement('article')
        article.innerHTML = (`
                <div>
                    <span>
                        <img src=${eachElement.icon} alt=${eachElement.title}>
                    </span>
                    <div>
                        <h2>${eachElement.title}</h2>
                        <p>${eachElement.text}</p>
                    </div>
                </div>
                <div>
                    <button>Remove</button>
                    ${checkboxElement(eachElement.active)}
                </div>
            `)
        container.appendChild(article)
    })
}

const checkboxElement = (isActive) => {
    if (isActive) return `<label><input type="checkbox" checked></label>`
    else return `<label><input type="checkbox"></label>`
}