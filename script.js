var pizzaContainer = document.getElementById("showVeg");
var request = new XMLHttpRequest();
request.open('GET','https://raw.githubusercontent.com/vinodtik/pizza-ordering/master/vegpizza.json');
request.onload = function(){
	var result = JSON.parse(request.responseText);
	renderPizza(result);
};
function renderPizza(result) {
	var html = '';
	var price;
	html +="<div class='row'>";
	var colnum = 1;
	for(let i=0; i<result.length; i++){
		html +="<div class='col-xs-4 pizza-box'><p class='pizza-title'>"+result[i].name+"</p><img class='thumbnail pizza-img' src="+result[i].image+"><p class='desc'><small>"+ result[i].description +"</small></p><p><button class='btn btn-primary add_order' data-title='"+result[i].name+"' data-price='"+result[i].price+"'>Add</button><span class='price'>&#x20B9; "+ result[i].price +"</span></p></div>";
		if(colnum == 3){
			html+="</div><div class='row'>";
			colnum=1;
		}
		else{
			colnum++;
		}
	}
	html+="</div>";
	pizzaContainer.insertAdjacentHTML('beforeend',html);
}
request.send();

$(document).ready(function(){
	var total = 0;
	$('.container').on('click','.add_order',function(){
		var price = $(this).data('price');
		var title = $(this).data('title');
		total +=price;
		$(".appendOrders").append("<p>"+title+" ("+price+") <button class='btn btn-sm btn-danger remove' data-price="+price+"><span class='fa fa-trash'></span></button></p>");
		$("#total").html("Total: "+total);
	});
	$('.container').on('click','.remove', function(){
		// alert('clicked');
		var p = $(this).data('price');
		total -=p;
		$("#total").html("Total: "+total);
		$(this).parent('p').remove();
	});
	$('.confirm').click(function(){
		if(total == 0){
			alert("No items added");
		}
		else{
			alert("Thank you! your order will be ready within 60 Minutes.");
			$('.appendOrders p').remove();
			total = 0;
			$("#total").html("Total: "+total);
		}
	});
});