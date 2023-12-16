const data = [
    {
        name: "Каталог товаров",
        items: [
            {
                name: "Mойки",
                items: [
                    {
                        name: "Ulgran",
                        items: [{ name: "Smth" }, { name: "Smth" }],
                    },
                    { name: "Vigro Mramor" },
                    {
                        name: "Handmade",
                        items: [{ name: "Smth" }, { name: "Smth" }],
                    },
                    { name: "Vigro Glass" },
                ],
            },
            {
                name: "Фильтры",
                items: [
                    {
                        name: "Ulgran",
                        items: [{ name: "Smth" }, { name: "Smth" }],
                    },
                    { name: "Vigro Mramor" },
                ],
            },
        ],
    },
];

function mouseClick(event) {
    event.stopPropagation()
    const li = event.target
    if (li.className === "open") {
        li.className = "close"
    } else if (li.className === "close") {
        li.className = "open"
    }
}

function renderItems(items, div) {
    if (Array.isArray(items) && items.length > 0) {
        let ul = document.createElement("ul");
        items.forEach((i) => {
            let li = document.createElement("li");
            li.innerHTML = "&#128193; " + i.name
            if (Array.isArray(i.items) && i.items.length > 0) {
                li.className = "close"
                li.onclick = mouseClick
            }
            renderItems(i.items, li)
            ul.appendChild(li)
        })
        div.appendChild(ul)
    }
}

renderItems(data, document.getElementById("menu"))