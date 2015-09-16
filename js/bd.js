/**
 * 
 */


function save_local_data(){
	
	var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

	db.transaction(function (tx) {  
	   tx.executeSql('CREATE TABLE IF NOT EXISTS BOOKS (id unique, author,title, publisher, price)');
	   var SQL = 'INSERT INTO BOOKS (id, author, title, publisher, price) VALUES (' 
		 + $("#id" ).val()  + SQLString($("#author" ).val()) +
	   SQLString($("#title" ).val())  + SQLString($("#publisher").val()) + SQLString($("#price" ).val()) + ')';
	   console.log(SQL);
	   tx.executeSql(SQL);
	});
	
	function SQLString(strvalue) {
		return  ", '" + strvalue + "'";
	}
	
}


function list_data() {
	
	var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
    var msg = "";
    var books = [];
    
	    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM BOOKS', [], function (tx, results) {
           var len = results.rows.length, i;
				
           for (i = 0; i < len; i++){
           	  book = new Object();
              book.id =  results.rows.item(i).id;
              book.author = results.rows.item(i).author;
              book.title = results.rows.item(i).title;
              book.publisher= results.rows.item(i).publisher;
              book.price = results.rows.item(i).price;
              books.push(book);
           }
   	       $("#my-table").dynatable({dataset: {records: books}});
        }, null);
        });
	    
} 