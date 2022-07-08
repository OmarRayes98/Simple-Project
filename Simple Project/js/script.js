// Variables 
let booksDom = document.querySelector(".book-itmes");

let books = JSON.parse(localStorage.getItem('books')) || booksDB;


//___________



//________

let drawBooksUI;
(drawBooksUI =function(booksItems =[]){
    let booksUI = booksItems.map((item) => {
        return `
        <div class="book-itme">
        <img class="book-img" src="${item.ImageUrl}">

        <div class="book-info">
        <h4 class="book-name">${item.title}</h4>
        <p class="book-author">${item.author}</p>
        <p class="book-desc">${item.desc}</p>
        <div class="thumbs">
        <div>
        <i class="fa fa-2x fa-thumbs-up" onclick='likeUp(${item.id},event)'></i>
        <i class="fa fa-2x fa-thumbs-down" onclick='likeDown(${item.id},event)'></i>
        </div>

        <div class="count-likes">
        <span>${item.like}</span>
        </div>
        </div>
        </div>
    </div>`;
    }).join("");

    booksDom.innerHTML = booksUI;

})(books); // invoke function 


//________________________________________
//Likes Or DisLikes

function likeUp(id,e){
console.log();
   choosenbook= books.find(item => item.id==id);
   choosenbook.like +=1;

   localStorage.setItem("books",JSON.stringify(books));

   e.target.parentElement.nextElementSibling.lastElementChild.innerHTML= choosenbook.like;
//    drawBooksUI(books);
}

//____
function likeDown(id,e){

    choosenbook= books.find(item => item.id==id);

    if(choosenbook.like<=0) return;

    choosenbook.like -=1;
 
    localStorage.setItem("books",JSON.stringify(books));
 
    e.target.parentElement.nextElementSibling.lastElementChild.innerHTML= choosenbook.like;

    //drawBooksUI(books);

 }

 //______Search Function____________
let inputSearch = document.querySelector("#id_search");

inputSearch.addEventListener("keyup",function(e){

    if(inputSearch.value.trim()===""){
        drawBooksUI(books);
        paginationFunc();

        return;
    }
        search(inputSearch.value,books);
});

function search(title , myArray){

    let arr_serach = myArray.filter ((item) => item.title.toLowerCase().indexOf(title.toLowerCase()) != -1);
    drawBooksUI(arr_serach);
    paginationFunc();

}

//____________________________________________
//Filter Product By Size

let sizeFilter = document.getElementById('genre-filter');

sizeFilter.addEventListener('change',getBooksFilterByGenre);

function getBooksFilterByGenre(e){

    let val = e.target.value;

    let booksFilter = books;


    if(val=== 'all'){
        drawBooksUI(booksFilter);
        console.log(booksFilter);

        paginationFunc();
    }else{
        booksFilter = booksFilter.filter(i => i.author === val);
        console.log(booksFilter);

        drawBooksUI(booksFilter);
        paginationFunc();
    }
}

//_____________________________________

//________________________________________

function paginationFunc(){

    let items = $('.book-itmes .book-itme');

    let numItems =items.length;
    let perPage =6;
    
    items.slice(perPage).hide();

    if(window.matchMedia("(max-width:574px)").matches) {
        $('.pagination').pagination({

            items: numItems,
            itemsOnPage: perPage,
            prevText: "<<",
            nextText : ">>",
            displayedPages: 2,
        
            onPageClick : function (pageNumber){
        
                var showFrom = perPage * (pageNumber -1);
                var showTo = showFrom + perPage;
        
                items.hide().slice(showFrom, showTo).show();
                
            }
        
        })
    }else{
        $('.pagination').pagination({

            items: numItems,
            itemsOnPage: perPage,
            prevText: "Previous",
            nextText : "Next",
            displayedPages: 2,
        
            onPageClick : function (pageNumber){
        
                var showFrom = perPage * (pageNumber -1);
                var showTo = showFrom + perPage;
        
                items.hide().slice(showFrom, showTo).show();
                
            }
        
        })
    }

}

paginationFunc();
window.addEventListener('resize', paginationFunc);
