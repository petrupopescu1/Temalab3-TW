function listAllItems()
{
    fetch("http://localhost:3000/meniu", {
        method: "get"
    }).then ((response)=>
    {
        response.json().then((data)=>
        {
            for(let i = 0; i < data.length; i++)
            {
                console.log(data[i].pret.toString().length);
                let lista = document.getElementById(data[i].tip+"-list");
                let preturi = document.getElementById(data[i].tip+"-pret");
                let newitem = document.createElement("li");
                newitem.innerText = data[i].nume;
                newitem.className="meniu-item";
                lista.appendChild(newitem);
                let newprice = document.createElement("li");
                if(data[i].pret.toString().length != 1)
                {
                    newprice.innerText = data[i].pret + " lei";
                }
                else
                {
                    newprice.innerText = "\xa0\xa0" + data[i].pret.toString() + " lei";
                }
                newprice.className="pret";
                let addButton = document.createElement("button");
                let addimage = document.createElement("img");
                addimage.setAttribute("src", "adauga.jpg");
                addimage.className = "adauga";
                addButton.appendChild(addimage);
                addButton.className = "button-adauga";
                addButton.onclick = function()
                {
                    increase(data[i]);
                }
                newprice.appendChild(addButton);
                preturi.appendChild(newprice);
            }
        })
    })
}

listAllItems();


function increase(data)
{
    let newItem =
    {
        id: data.id,
        cantitate: data.cantitate + 1
    }
    fetch('http://localhost:3000/meniu/' + data.id, 
    {
        method: 'put',
        headers:
        {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newItem)
    }).then((response)=>
    {
        window.location.reload();
    })
}