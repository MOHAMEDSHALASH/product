let title=document.getElementById('title');
let price=document.getElementById('price');
let ads=document.getElementById('ads');
let taxis=document.getElementById('taxis');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let catogery=document.getElementById('catogery');
let btnCreate=document.getElementById('create');
let mood="create"
let temp;
// FUNCTION GET TOTAL
function totalPrice(){
    if(price.value!=""){
        total.innerHTML=+price.value+ +ads.value+ +taxis.value-discount.value;
        total.style.background="green"
    }
    else{
        total.innerHTML="";
        total.style.background="#f00"
    }
}
// FUNCTION GET PRODUCTS
let arrData;
if(localStorage.products!=null){
    arrData=JSON.parse(localStorage.products)
}
else{
    arrData=[];
}
btnCreate.onclick=()=>{
        let objectData={
            title:title.value.toUpperCase(),
            price:price.value,
            ads:ads.value,
            taxis:taxis.value,
            discount:discount.value,
            total:total.innerHTML,
            catogery:catogery.value.toUpperCase()
        }
        if(mood==="create"){
        if(title.value!=''){
                // COUNT CREATE
                if(count.value>1){
                    for(let x=0;x<count.value;x++){
                        arrData.push(objectData)
                    }
                }else{
                    arrData.push(objectData)
                }
            }    
        }

    else{
        arrData[temp]=objectData;
        mood="create"
        btnCreate.innerHTML="Create"
        count.style.display="block"
    }
    localStorage.setItem("products",JSON.stringify(arrData))
    showData()
    clearInputs()
    deleteAll()
}
// FUNCTION SHOW DATA
function showData(){
    let table='';
    for(let i=0;i<arrData.length;i++){
        table+=`<tr>
                    <td class="number">${i}</td>
                    <td>${arrData[i].title}</td>
                    <td>${arrData[i].price}</td>
                    <td>${arrData[i].ads}</td>
                    <td>${arrData[i].taxis}</td>
                    <td>${arrData[i].discount}</td>
                    <td>${arrData[i].total}</td>
                    <td>${arrData[i].catogery}</td>
                    <td><button onclick="update(${i})" id="update" type="submit">Update</button></td>
                    <td><button onclick="deleteItem(${i})" id="delete" type="submit">Delete</button></td>
                </tr>
        `
    }
    let tbody=document.getElementById('tbody');
    tbody.innerHTML=table;
    deleteAll()
    // =========================================================
}
showData()
// FUNCTION CLEAR INPUTS
function clearInputs(){
    title.value='';
    price.value='';
    ads.value='';
    taxis.value='';
    discount.value='';
    catogery.value='';
    count.value='';
    total.innerHTML='';
    total.style.background="#f00"
}
// FUNCTION DELETE ONE ITEMS
function deleteItem(i){
    arrData.splice(i,1);
    localStorage.products=JSON.stringify(arrData)
    showData()
}
// FUNCTION DELETE ALL
function deleteAll(){
    let btnDeletAll=document.getElementById('btnDelete')
    let btnDeletAllNum=document.getElementById('numProduct')
    if(arrData.length>0){
        btnDeletAll.style.display="block"
        btnDeletAllNum.innerHTML=arrData.length;
    }
    else{
        btnDeletAll.style.display="none"
    }
    btnDeletAll.onclick=()=>{
        body.style.overflow="hidden"
        let alertDelete=document.createElement('div');
        alertDelete.className="alert-delete";
        body.appendChild(alertDelete);
        let boxConfirm=document.createElement('div');
        boxConfirm.className="box-confirm";
        alertDelete.appendChild(boxConfirm);
        let titleDelete=document.createElement('p');
        titleDelete.innerHTML="Are You Sure To Delete All Products !"
        boxConfirm.appendChild(titleDelete);
        let twoBtns=document.createElement("section");
        boxConfirm.appendChild(twoBtns);
        // TWO BUTTON YES - NO
        let btnYes=document.createElement('button');
        btnYes.innerHTML="Yes";
        twoBtns.appendChild(btnYes)
        btnYes.onclick=()=>{
        arrData.splice(0)
        localStorage.removeItem("products")
        showData()
        alertDelete.remove()
        body.style.overflow=""
        }
        let btnNo=document.createElement('button');
        btnNo.innerHTML="No";
        twoBtns.appendChild(btnNo);
        btnNo.onclick=()=>{
            alertDelete.remove()
            body.style.overflow=""
        }
    }
}
// FUNCTION UPDATE
function update(i){
    title.value=arrData[i].title;
    price.value=arrData[i].price;
    ads.value=arrData[i].ads;
    taxis.value=arrData[i].taxis;
    discount.value=arrData[i].discount;
    catogery.value=arrData[i].catogery;
    total.innerHTML=arrData[i].total;
    total.style.background="green"
    count.style.display="none"
    scrollTo(0,0)
    mood="update"
    btnCreate.innerHTML="Update"
    temp=i;
    title.focus()
}
// ======================================================
// SEARCH FUNCTION
let search=document.getElementById('search');
let searchTitle=document.getElementById('searchTitle');
let searchCatogery=document.getElementById('searchCatogery');
let searchMode='title';
function getsearch(id){
    if(id=="searchTitle"){
        searchMode='title'
        search.placeholder="Search By Title"
    }
    else{
        searchMode='catogery'
        search.placeholder="Search By Catogery"
    }
    search.focus()
}
function searchData(value){
    let table ='';
    if(searchMode=='title'){
        for(let i=0;i<arrData.length;i++){
            if(arrData[i].title.includes(value.toUpperCase())){
                table+=`<tr>
                    <td class="number">${i}</td>
                    <td>${arrData[i].title}</td>
                    <td>${arrData[i].price}</td>
                    <td>${arrData[i].ads}</td>
                    <td>${arrData[i].taxis}</td>
                    <td>${arrData[i].discount}</td>
                    <td>${arrData[i].total}</td>
                    <td>${arrData[i].catogery}</td>
                    <td><button onclick="update(${i})" id="update" type="submit">Update</button></td>
                    <td><button onclick="deleteItem(${i})" id="delete" type="submit">Delete</button></td>
                </tr>
        `
            }
        }
        let tbody=document.getElementById('tbody');
        tbody.innerHTML=table;
    }
    else{
        for(let i=0;i<arrData.length;i++){
            if(arrData[i].catogery.includes(value.toUpperCase())){
                table+=`<tr>
                    <td class="number">${i}</td>
                    <td>${arrData[i].title}</td>
                    <td>${arrData[i].price}</td>
                    <td>${arrData[i].ads}</td>
                    <td>${arrData[i].taxis}</td>
                    <td>${arrData[i].discount}</td>
                    <td>${arrData[i].total}</td>
                    <td>${arrData[i].catogery}</td>
                    <td><button onclick="update(${i})" id="update" type="submit">Update</button></td>
                    <td><button onclick="deleteItem(${i})" id="delete" type="submit">Delete</button></td>
                </tr>
        `
            }
        }
        let tbody=document.getElementById('tbody');
        tbody.innerHTML=table;
    }
}