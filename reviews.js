function init()
{
    let open = document.getElementById("reviews-container");
    let pcontainer = document.createElement("div");
    let newp = document.createElement("p");
    pcontainer.id = "identificare2";
    newp.innerText = "Nu există niciun review.";
    pcontainer.append(newp);
    open.appendChild(pcontainer);
}

init();

function listAllItems()
{
    fetch("http://localhost:3000/reviews", {
        method: "get"
    }).then ((response)=>
    {
        response.json().then((data)=>
        {
            ok = 0;
            for(let i = 0; i < data.length; i++)
            {
                ok = 1;
                let hugecontainer = document.getElementById("reviews-container");
                let titlucontainer = document.createElement("div");
                titlucontainer.className = "container-titlu-review";
                console.log(titlucontainer);

                let newtitlu = document.createElement("p");
                newtitlu.innerText = data[i].titlu;
                newtitlu.className = "titlu-review";
                titlucontainer.appendChild(newtitlu);

                let newreview = document.createElement("p");
                newreview.className = "continut2-review";
                newreview.innerText = data[i].continut;

                let reviewcontainer = document.createElement("div");
                reviewcontainer.appendChild(newreview);

                let newnume = document.createElement("p");
                newnume.className = "nume-review";
                newnume.innerText = "Adăugat de " + data[i].nume + ":";

                let numecontainer = document.createElement("div");
                numecontainer.appendChild(newnume);

                let smallcontainer = document.createElement("div");
                smallcontainer.appendChild(titlucontainer);
                smallcontainer.appendChild(numecontainer);
                smallcontainer.appendChild(reviewcontainer);
                smallcontainer.className = "review";

                let deleteButton = document.createElement("button");
                let deleteText = document.createTextNode("Șterge review");
                deleteButton.appendChild(deleteText);
                deleteButton.onclick = function() {
                    deleteReview(data[i].id);
                }
                deleteButton.className = "delete-button";

                deletecontainer = document.createElement("div");
                deletecontainer.className = "deletecontainerb";
                deletecontainer.append(deleteButton);

                smallcontainer.appendChild(deletecontainer);

                let bigcontainer = document.createElement("div");
                bigcontainer.className = "review-center";
                bigcontainer.appendChild(smallcontainer);

                hugecontainer.appendChild(bigcontainer);
            }
            document.addEventListener('keypress', function(enter)
                {
                    if(enter.key === 'Enter')
                    {
                            AddReview();
                    }
                })
            if(ok == 1)
            {
                let open = document.getElementById("reviews-container");
                let newp = document.getElementById("identificare2");
                open.removeChild(newp);
            }
        })
    })
}



listAllItems();


function AddReview()
{
    var nume = document.getElementById("numer").value.toString();
    var titlu = document.getElementById("titlur").value.toString();
    var review = document.getElementById("reviewr").value.toString();
    var snake =
    {
        titlu:titlu,
        continut:review,
        nume:nume
    }
    fetch('http://localhost:3000/reviews', 
    {
        method: 'post',
        headers:
        {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(snake)
    }).then((response) => {
        document.getElementById("titlur").value = "";
        document.getElementById("reviewr").value = "";
        document.getElementById("numer").value = ""
        window.location.reload();
    })
}


function deleteReview(id) {
    fetch('http://localhost:3000/reviews/' + id, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        window.location.reload();
    })
}
