fetch('../data/data.json').then(response => response.json())
    .then(data => {

        const gridSection = document.getElementById("grid-section")
        refreshList(data, gridSection)
        showAllOrActiveOrInactive(data, gridSection)

    }).catch(error => console.log("Données non récupérées : ", error))

const refreshList = (Element, container) => {
    container.innerHTML = ""
    Element.forEach((eachElement) => {
        const article = document.createElement('article')
        article.id = eachElement.id
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

const showAllOrActiveOrInactive = (Element, container) => {
    const radioChoice = document.querySelectorAll("input[name='choice']")
        radioChoice[0].onclick = () => {
            refreshList(Element, container)
        }
        radioChoice[1].onclick = () => {
            const result = Element.filter(object => object.active)
            refreshList(result, container)
        }
        radioChoice[2].onclick = () => {
            const result = Element.filter(object => !object.active)
            refreshList(result, container)
        }
}

const checkboxElement = (isActive) => {
    if (isActive) return `<label><input type="checkbox" checked></label>`
    else return `<label><input type="checkbox"></label>`
}