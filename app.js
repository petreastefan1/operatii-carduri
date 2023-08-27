let pageContainer = document.querySelector(".card-container")
let brandInpt = document.getElementById("brand-inpt")
let modelInpt = document.getElementById("model-inpt")
let yearInpt = document.getElementById("year-inpt")
let addBtn = document.querySelector(".btn-add")
let removeBtn = document.querySelector(".btn-delete")
let alertContainer = document.querySelector(".alerts")

function createRow(car){
    let text=`

    <div class="card border-secondary mb-3 card-item" >
    <div class="card-header">${car.brand}</div>
    <div class="card-body">
      <h4 class="card-title">${car.model}</h4>
      <p class="card-text">This car was produced in ${car.year}</p>
      <button type="button" class="btn btn-warning btn-edit ${car.brand}">Edit</button>
      <button type="button" class="btn btn-danger btn-delete ${car.brand}">Delete</button>
    </div>
  </div>
`

    return text;
}



function createAlert(message){

let alerta =`
<div class="alert alert-dismissible alert-success">
<button type="button" class="btn-close" data-bs-dismiss="alert"></button>
<a href="#" class="alert-link">${message}</a>.
</div>
`


return alertContainer.innerHTML += alerta


}

function createRows(cars){


    let all="";

    for(let i=0;i<cars.length;i++){

        all+=createRow(cars[i]);
    }
    return all;
}



function attachRows(){
    pageContainer.innerHTML= createRows(cars)
}


function deleteRow(brand){
    let all=[];

    for(let i=0;i<cars.length;i++){
        if(cars[i].brand!=brand){
            all.push(cars[i]);
        }       
    }
    cars=all
}

attachRows()


function validateBrand(brand){

    if(brand.length<3){
        return{
            msg:"Brand name too short",
            valid: false
        }
    }

    if(brand.length>10){
        return{
            msg:"Brand name too long",
            valid: false
        }
    }
    
    return{
        valid:true
    }

}



addBtn.addEventListener("click",()=>{
    let validareBrand = validateBrand(brandInpt.value);

    
    if(validareBrand.valid == false){
        alert(validareBrand.msg)
    }

    if(validareBrand.valid){
        let newCar = {
            brand: brandInpt.value,
            model: modelInpt.value,
            year: yearInpt.value
        }
        cars.push(newCar);
        attachRows(cars);
        createAlert("New car added!")
    }

    
    })

pageContainer.addEventListener("click",(e)=>{

    let obj = e.target;
    let classes= obj.classList;
    let lastClass=classes[classes.length-1];
    if(classes.contains("btn-delete")){
        deleteRow(lastClass);
        attachRows();
    }


})