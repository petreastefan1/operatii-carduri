let pageContainer = document.querySelector(".card-container")
let brandInpt = document.getElementById("brand-inpt")
let modelInpt = document.getElementById("model-inpt")
let yearInpt = document.getElementById("year-inpt")
let addBtn = document.querySelector(".btn-add")
let alertContainer = document.querySelector(".alerts")



function createRow(car){
    let text=`

    <div class="card border-secondary mb-3 card-item" >
    <div class="card-header header-size">${car.brand}</div>
    <div class="card-body">
      <h4 class="card-title">${car.model}</h4>
      <p class="card-text">This car was produced in ${car.year}</p>
      <button type="button" class="btn btn-warning btn-edit ${car.model.split(" ").join("")}">Edit</button>
      <button type="button" class="btn btn-danger btn-delete ${car.brand}">Delete</button>
      <button type="button" class="btn btn-light btn-save ${car.model.split(" ").join("")}">Save</button>
      
    </div>
  </div>
`

    return text;
}

function firstLetterUpper(string){

    let x = string.charAt(0).toUpperCase() +string.slice(1,)
    return x 
}

function checkForNumber(text){
    let result = text.match(/\d/g)

    if(result!=null){
        return true
    }

    else{
        return false
    }

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

function createAlertError(message){
    let alerta =`
    <div class="alert alert-dismissible alert-danger">
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    <a href="#" class="alert-link">${message}!</a>
</div>
    `
    return alertContainer.innerHTML +=alerta
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


function attachRowToEdit(car){
    let pos
    for(let i =0;i<cars.length;i++){
        if(cars[i]==car){
            pos=cars[i] 
        }
    }
    return pageContainer.innerHTML= createRow(pos) 

}

function carPosition(car){
    let pos
    for(let i =0;i<cars.length;i++){
        if(cars[i]==car){
            return i 
        }
    }

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

function findCarByBrand(brand){

    for(let i = 0;i<cars.length;i++){
        if(cars[i].brand.toLowerCase() == brand.toLowerCase()){
            return true
        }

    }

}

function findCarByModel(model){
    
    for(let i = 0;i<cars.length;i++){
        if(cars[i].model.toLowerCase() == model.toLowerCase()){
            return true
        }

    }

}

function findCarByModel(model){
    
    for(let i =0;i<cars.length;i++){
        if(cars[i].model.replace(" ","")==model){
            return cars[i] 
        }
    }
}

attachRows()

//Validatori
function validateBrand(brand){
//unicitate
    if(findCarByBrand(brand)==true){
        return{
            msg:"Brand already exists",
            valid:false
        }
    }
//
//limitare numar de caractere
    if(brand.length<=3){
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
//

//fara cifre
    if(checkForNumber(brand)==true){
        return{
            msg:"Brand needs to contain only letters",
            valid:false
        }
    }


    else{
        return{
        valid:true
    }
    }
}

function validateYear(year){
    //anul sa fie compus din cifre
    if(checkForNumber(year)==false){
        return{
            msg:"Year needs to be composed of digits",
            valid:false
        }
    }
//
//anul sa fie compus din 4 cifre & sa fie un an de fabricatie posibil
    if(year.length<4 || year.length>4 || year<1950 || year>=2024){
        return{
            msg:"Invalid year",
            valid:false
        }
    }
//

    else{
        return{
            valid:true
        }
    }

}

function validateModel(model){

    //unicitate
    if(findCarByModel(model)==true){
        return{
            msg:"Model already exists",
            valid:false
        }
    }
//
//fara cifre
if(checkForNumber(model)==true){
    return{
        msg:"Model needs to contain only letters",
        valid:false
    }
}
//
//limitare numar de caractere
    if(model.length<=3){
        return{
            msg:"Model name too short",
            valid: false
        }
    }

    if(model.length>20){
        return{
            msg:"Brand name too long",
            valid: false
        }
    }
//



    else{
        return{
        valid:true
    }
    }
}
addBtn.addEventListener("click",()=>{
    let validareBrand = validateBrand(brandInpt.value);
    let validareModel = validateModel(modelInpt.value)
    let validareYear = validateYear(yearInpt.value)
    
    if(validareBrand.valid == false){
        createAlertError(validareBrand.msg)
    }
    if(validareModel.valid == false){
        createAlertError(validareModel.msg)
    }
    if(validareYear.valid == false){
        createAlertError(validareYear.msg)
    }


    if(validareBrand.valid && validareModel.valid && validareYear.valid){
        let newCar = {
            brand: firstLetterUpper(brandInpt.value),
            model: firstLetterUpper(modelInpt.value),
            year: yearInpt.value
        }
        cars.push(newCar);
        attachRows(cars);
        createAlert("New car added!")
        brandInpt.value="";
        modelInpt.value="";
        yearInpt.value="";
    }

    
    })

pageContainer.addEventListener("click",(e)=>{

    let obj = e.target;
    let classes= obj.classList;
    let lastClass=classes[classes.length-1];    
    let car=findCarByModel(lastClass);
    if(classes.contains("btn-delete")){
        deleteRow(lastClass);
        attachRows();
    }
    else if(classes.contains("btn-edit")){
        brandInpt.disabled=true
        brandInpt.value=car.brand;
        modelInpt.value=car.model;
        yearInpt.value=car.year;
        attachRowToEdit(car)

    }
    else if(classes.contains("btn-save")){
        let savedCar={
            brand: brandInpt.value,
            model: modelInpt.value,
            year: yearInpt.value
        }
        let pos= carPosition(car)
        cars[pos].model= savedCar.model!=='' ? savedCar.model : cars[pos].model;
        cars[pos].year= savedCar.year!=='' ? savedCar.year : cars[pos].year;
        attachRows();
        brandInpt.disabled=false;
        brandInpt.value="";
        modelInpt.value="";
        yearInpt.value="";

    }

})
