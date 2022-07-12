
let books = JSON.parse(localStorage.getItem('books')) || booksDB;


let drawBooksTable;
(drawBooksTable =function(){

let booksUI = books.map((item) => {

return [item.id,item.title,`<img src=${item.ImageUrl} alt="">`,item.author,item.desc,`<span class="action_btn">
            <a href="#">Edit</a>
            <a href="#" onclick="removeFromData(event,${item.id})">Remove</a>
            </span>`];
});

    $(document).ready( function () {
        
    $('#table-id').DataTable({
    
    destroy: true, //to delete old table 
    data:booksUI,

    lengthMenu:[[6,10,50,100,-1],[6,10,50,100,"All"]],
        "columnDefs": [ {
        "targets": 'no-sort',
        "orderable": false,
    } ]
    }
    )
});

})(); // invoke function 



function removeFromData(e,id){

        //To remove item completly

        books= books.filter((item) => item.id !=id);

        localStorage.setItem('books',JSON.stringify(books));

        // console.log(e.target.parentElement.parentElement.parentElement)
        // e.target.parentElement.parentElement.parentElement.remove();

        drawBooksTable();
}