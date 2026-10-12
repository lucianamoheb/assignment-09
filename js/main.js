var fullName = document.getElementById('FullName')
var phoneNum = document.getElementById('phoneNum')
var email = document.getElementById('email')
var address = document.getElementById('address')
var notes = document.getElementById('notes')
var contactRow = document.getElementById('contactRow')
var searchInput = document.getElementById('search')
var group = document.getElementById('group')

var contactArr =[]
if(localStorage.getItem('list')){
    contactArr=JSON.parse(localStorage.getItem('list'))
    display();
}

function createContact(){
    
    var contactItem ={
        cName: fullName.value,
        cPhone: phoneNum.value,
        cEmail:email.value,
        cAddress: address.value,
        cNotes: notes.value,
        cGroup: group.value,
    };

    contactArr.push(contactItem);
    localStorage.setItem('list',JSON.stringify(contactArr))
    display();

document.getElementById('createBtn').classList.remove('d-none')
document.getElementById('updateBtn').classList.add('d-none')


}



function deleteFunc(index){
    contactArr.splice(index,1)
    localStorage.setItem('list',JSON.stringify(contactArr))
    
    display();
}


function display(arr=contactArr){
    var box='';

    for(var i=0;i<arr.length;i++){
        box+=`
    
      <div class="col-sm-6">

        <div class="card  rounded-4">

          <div class="contactInfo d-flex align-items-center p-3 gap-3 mb-3">

          
              <div class="contact-icon bg-success d-flex justify-content-center align-items-center  rounded-4">
            <p class="Firstletter m-0 text-center text-white">h</p>
          </div>

          
          <div class="contactDetails">
            <p class="name m-0 p-0">${arr[i].cName}</p>
            <div class="phoneNum d-flex align-items-center gap-2">
            <div class="tel-icon d-flex justify-content-center align-items-center  rounded-3 ">
              <i class="fa-solid fa-phone "></i>
            </div>
             <span class="phoneNumber">${arr[i].cPhone}</span>
             </div>
          </div>

        </div>

        
        <div class="emailPart d-flex flex-row align-items-start gap-2 m-3">


          <div class="email d-flex flex-row justify-content-center align-items-center rounded-3 " style="width: 25px; height: 25px; background-color: rgb(237, 233, 254);" >
            <i class="fa-solid fa-envelope" style="font-size: 10px; color:rgb(127, 34, 254) ;"></i>
          </div>
          <div class="text">
            <p style="font-size: 14px; font-weight: 400; line-height: 20px;color: oklch(0.446 0.03 256.802);">${arr[i].cEmail}</p>
          </div>

           </div>
         

        <div class="addressPart d-flex flex-row align-items-start gap-2 mx-3">


          <div class="address d-flex flex-row justify-content-center align-items-center rounded-3 " style="width: 25px; height: 25px; background-color: rgb(208, 250, 229);" >
            <i class="fa-solid fa-envelope" style="font-size: 10px; color:rgb(0, 153, 102) ;"></i>
          </div>
          <div class="text">
            <p style="font-size: 14px; font-weight: 400; line-height: 20px;color: oklch(0.446 0.03 256.802);">${arr[i].cAddress}</p>
          </div>

           </div>



        <div class="cardFooter bg-body-tertiary d-flex flex-row justify-content-between align-items-center w-100 p-3 rounded-bottom-4">
          <div class="tel-icon d-flex justify-content-center align-items-center p-2 rounded-3">
              <i class="fa-solid fa-phone text-success"></i>
            </div>
            <div class="right-cardFooter d-flex justify-content-end align-items-center gap-2 ">

              <div class="starIcon p-2 rounded-3">
              <button class="btn border-0" onclick="toggleFav(${i})">
              <i class="${arr[i].isFav? 'fa-solid text-warning':'fa-regular' } fa-star "></i>
              </button>
              </div>


              <div class="heartIcon p-2 rounded-3">
              <button class="btn border-0" onclick="toggleEm(${i})">
              <i class="${arr[i].isEm? 'fa-solid text-danger':'fa-regular '} fa-heart "></i>
              </button>
              </div>
        
              <div class="penIcon p-2 rounded-3">
              <button class="btn border-0"> <i class="fa-solid fa-pen " onclick="handleUpdate(${i})"></i></button>
              </div>
              
            <div class="trashIcon p-2 rounded-3" >
             <button class="btn border-0"> <i class="fa-solid fa-trash " onclick="deleteFunc(${i})"></i></button>
               
             </div>
             
            </div>
        </div>

        </div>

      </div>
    </div>
  
</div>

</div>



        `
    }


    contactRow.innerHTML=box;


    var favBox=''
    var hasFav = false;
    for(var i=0;i<contactArr.length;i++){
       if(contactArr[i].isFav){
        hasFav = true;
        favBox+= `
        
          <div class="col-sm-6  col-lg-12 px-3">
            
           <div class="card rounded-4 p-2 d-flex flex-row justify-content-between align-items-center">

            <div class="left d-flex flex-row align-items-center gap-2">
            <div class="contact-icon bg-success d-flex justify-content-center align-items-center  rounded-4">
              <p Firstletter m-0 text-center text-white>${contactArr[i].cName.slice(0,1)}</p>
            </div>
            <div class="contactDetails">
              <p class="name m-0 p-0">${contactArr[i].cName}</p>
              <span class="phoneNumber">${contactArr[i].cPhone}</span>
              
            </div>
          </div>

          <div class="right rounded-3 d-flex justify-content-center align-items-center" style="background-color:rgb(208, 250, 229); width: 25px; height: 25px;">
            <i class="fa-solid fa-phone text-success" style="font-size: 10px"></i>
          </div>

           </div>

          </div>
    
        `;
       } 
    }

    var favContainerRow = document.querySelector('.fav-card .row.g-2');
    var noFavText = document.querySelector('.no-fav');

    if (hasFav) {
        favContainerRow.innerHTML = favBox;
        favContainerRow.classList.remove('d-none');
        noFavText.classList.add('d-none');
    } else {
        favContainerRow.classList.add('d-none');
        noFavText.classList.remove('d-none');
    }

var emBox = '';
    var hasEm = false;

    for (var i = 0; i < contactArr.length; i++) {
        if (contactArr[i].isEm) {
            hasEm = true;
            emBox += `
            <div class="col-sm-6 col-lg-12 px-3 mb-2">
               <div class="card rounded-4 p-2 d-flex flex-row justify-content-between align-items-center">
                <div class="left d-flex flex-row align-items-center gap-2">
                    <div class="contact-icon bg-success d-flex justify-content-center align-items-center rounded-4" style="width: 40px; height: 40px;">
                      <p class="Firstletter m-0 text-center text-white">${contactArr[i].cName.slice(0,1)}</p>
                    </div>
                    <div class="contactDetails">
                      <p class="name m-0 p-0 fw-bold">${contactArr[i].cName}</p>
                      <span class="phoneNumber" style="font-size: 13px;">${contactArr[i].cPhone}</span>
                    </div>
                </div>
                <div class="right rounded-3 d-flex justify-content-center align-items-center" style="background-color:rgb(255, 228, 230); width: 25px; height: 25px;">
                  <i class="fa-solid fa-phone text-danger" style="font-size: 10px"></i>
                </div>
               </div>
            </div>
            `;
        }
    }

    var emContainerRow = document.querySelector('.em-card .row.g-2');
    var noEmText = document.querySelector('.no-em');

    if (hasEm) {
        emContainerRow.innerHTML = emBox;
        emContainerRow.classList.remove('d-none');
        noEmText.classList.add('d-none');
    } else {
        emContainerRow.classList.add('d-none');
        noEmText.classList.remove('d-none');
    }



    updateCounters();

}


var globalIndex;
function handleUpdate(index){
    globalIndex=index;
fullName.value = contactArr[index].cName
phoneNum.value = contactArr[index].cPhone
email.value = contactArr[index].cEmail
address.value = contactArr[index].cAddress
notes.value = contactArr[index].cNotes
group.value = contactArr[index].cGroup


document.getElementById('createBtn').classList.add('d-none')
document.getElementById('updateBtn').classList.remove('d-none')

var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'))
myModal.show()
}

function updateFunc(){
contactArr[globalIndex].cName =fullName.value
contactArr[globalIndex].cPhone =phoneNum.value
contactArr[globalIndex].cEmail =email.value
contactArr[globalIndex].cAddress =address.value
contactArr[globalIndex].cNotes =notes.value
contactArr[globalIndex].cGroup =group.value


localStorage.setItem('list',JSON.stringify(contactArr))
display()

document.getElementById('createBtn').classList.remove('d-none')
document.getElementById('updateBtn').classList.add('d-none')

var myModalEl = document.getElementById('staticBackdrop');
var modal = bootstrap.Modal.getInstance(myModalEl);
modal.hide();
}



function searchFun(){
    var term = searchInput.value.toLowerCase().trim()
    var searchedArr=[]

    for(var i=0 ;i<contactArr.length;i++){
        if(contactArr[i].cName.trim().toLowerCase().includes(term)||
    contactArr[i].cPhone.includes(term) || contactArr[i].cEmail.toLowerCase().includes(term)){
            searchedArr.push(contactArr[i])
        }
    }
    display(searchedArr)
}



function toggleFav(index){
contactArr[index].isFav = !contactArr[index].isFav;
localStorage.setItem('list',JSON.stringify(contactArr));
display();
}

function toggleEm(index){
    contactArr[index].isEm =!contactArr[index].isEm;
    localStorage.setItem('list',JSON.stringify(contactArr));
    display();
}


function updateCounters() {
    
    var totalCount = contactArr.length;
    document.getElementById('total').innerHTML = totalCount;

    
    var favCount = 0;
    for (var i = 0; i < contactArr.length; i++) {
        if (contactArr[i].isFav) {
            favCount++;
        }
    }
    document.getElementById('totalFav').innerHTML = favCount;

    
    var emCount = 0;
    for (var i = 0; i < contactArr.length; i++) {
        if (contactArr[i].isEm) {
            emCount++;
        }
    }
    document.getElementById('totalEm').innerHTML = emCount;
}

// function validate(ele){
// var regex ={
//     fullName:/^[A-Z][a-z]{2,15}$/,
//     phoneNum: /^01[0125][0-9]{8}$/,
//     email:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//     address:/^[a-zA-Z0-9\s.,'#-]{1,100}$/,
//     notes:/^[a-zA-Z0-9\s.,!?'"()\-:;]+$/,
//     group:/^(Family|Friends|Work|School|Others)$/

// }

// var isValid = regex[ele.id].test(ele.value.trim())
//     ele.classList.toggle('is-valid',isValid)
//     ele.classList.toggle('is-invalid',!isValid)
//     return isValid
// }