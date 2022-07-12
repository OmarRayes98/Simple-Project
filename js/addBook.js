// Variables 
let bookName = document.getElementById('book-name');
let bookDesc = document.getElementById('book-desc');
let bookGenreSelect = document.getElementById('gener-filter');
let inputFileImage =document.getElementById('upload-image-file');
let addForm = document.getElementById('add-form');

let bookImage;


//Events
addForm.addEventListener('submit',addBookFun)
inputFileImage.addEventListener('change',uploadImage)



function addBookFun(e){
    e.preventDefault();

    let allbooks = JSON.parse(localStorage.getItem('books')) || booksDB;
    let nameValue =bookName.value;
    let descValue =bookDesc.value;
    
    //Validation of Input :
    if( nameValue && descValue && bookGenreSelect.value !=""){

        let obj ={
        
            id: allbooks ? allbooks.length +1 : 1 ,
            title: nameValue,
            author:bookGenreSelect.value,
            desc: descValue,
            ImageUrl:bookImage,
            like:0,
        };
    
    
        let newBooks= allbooks ?  [...allbooks , obj] : [obj] ; 
        localStorage.setItem("books",JSON.stringify(newBooks));
        
        // make the input is empty (Reset)
    
        bookName.value="";
        bookDesc.value="";
        inputFileImage.value="";

        bookGenreSelect.value=""; // it mean I mention to value of the options that innerHTML is : "select vale"    

        alert("The Processing has been successful")

    } else{

        alert("Please Fill The Data ....")
    }
}


// uploadImage
function uploadImage (){

    let file = this.files[0];
    
    let types = ["image/jpeg" ,"image/png"];

    if(types.indexOf(file.type) == -1 ){
        alert("Type not Supported");
        return;
    }

    if(file.size > 2* 1024 *1024){
        alert("Image not Exced 2MG");
        return;
    }

    getImageBase64(file);
    
}

function getImageBase64(filee){
    let reader = new FileReader();

    reader.readAsDataURL(filee);

    reader.onload = function(){
        bookImage = reader.result;
    }


    reader.onerror =function(){
        alert("Error !");
    }
}