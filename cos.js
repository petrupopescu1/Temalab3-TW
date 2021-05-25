var currentid;

function init()
{
    let open = document.getElementById("continut");
    let newp = document.createElement("p");
    newp.id = "identificare";
    newp.innerText = "Coșul dumneavoastra este gol";
    open.appendChild(newp);
}

init();

function listAllItems()
{
    fetch("http://localhost:3000/meniu", {
        method: "get"
    }).then ((response)=>
    {
        response.json().then((data)=>
        {
            let ok = 0;
            let total = 0;
            for(let i = 0; i < data.length; i++)
            {
                console.log(data[i].cantitate);
                if(data[i].cantitate != 0)
                {
                    ok = 1;
                    let lista = document.getElementById("continut-list");
                    let preturi = document.getElementById("continut-pret");
                    let newitem = document.createElement("li");
                    newitem.innerText = data[i].nume + "\xa0\xa0x" + data[i].cantitate;
                    newitem.className="meniu-item";
                    let minusButton = document.createElement("button");
                    minusButton.textContent = "-";
                    minusButton.addEventListener("click",function()
                    {
                        decrease(data[i]);
                    })
                    newitem.append(minusButton);
                    let plusButton = document.createElement("button");
                    plusButton.textContent = "+";
                    plusButton.onclick = function()
                    {
                        increase(data[i]);
                    }
                    newitem.append(plusButton);
                    lista.appendChild(newitem);
                    let newprice = document.createElement("li");
                    if(data[i].pret.toString().length != 1)
                    {
                        newprice.innerText = (data[i].pret*data[i].cantitate).toString() + " lei";
                    }
                    else
                    {
                        newprice.innerText = "\xa0\xa0" + (data[i].pret*data[i].cantitate).toString() + " lei";
                    }
                    total += data[i].pret * data[i].cantitate;
                    newprice.className="pret";
                    preturi.appendChild(newprice);
                }   
            }
            if(ok == 1)
            {
                divtotal = document.getElementById("total");
                console.log(divtotal);
                let stringtotal = document.createElement("p");
                stringtotal.innerText = "Total:  " + total.toString() + " lei";
                divtotal.appendChild(stringtotal);
                let open = document.getElementById("continut");
                let newp = document.getElementById("identificare");
                open.removeChild(newp);
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

function decrease(data)
{
    let newItem =
    {
        id: data.id,
        cantitate: data.cantitate -1

    }
    console.log(data.id);
    fetch("http://localhost:3000/meniu/" + data.id, 
    {
        method: "put",
        headers:
        {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newItem)
    }).then((response)=>
    {
        window.location.reload();
    })
}