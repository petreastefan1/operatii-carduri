let pageContainer = document.querySelector(".table-container")
let brandInpt = document.getElementById("brand-inpt")
let modelInpt = document.getElementById("model-inpt")
let yearInpt = document.getElementById("year-inpt")
let addBtn = document.querySelector(".add-btn")

function createRow(cars){
    let text=`
    <section class="test">
    <p class="brand-1 table-border">${cars.brand}</p>
    <p class="model-1 table-border">${cars.model}</p>
    <p class="year-1 table-border">${cars.year}</p>       
</section>
    `
    return text;
}

function createRows(cars){


    let all="";

    for(let i=0;i<cars.length;i++){

        all+=createRow(cars[i]);
    }

    return all;
}



function attachRows(){
    pageContainer.innerHTML+=createRows(cars)
}

function attachLastRow(){
    pageContainer.innerHTML+=createRow(cars[cars.length-1])
}

attachRows()

addBtn.addEventListener("click",()=>{

        let newCar = {
            brand: brandInpt.value,
            model: modelInpt.value,
            year: yearInpt.value
        }
        cars.push(newCar);
        attachLastRow(cars);

     })



