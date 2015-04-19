	$(document).ready(function(){

		$.getJSON( "api/dataAPI.php", function( data ) {

  			var clothingData = JSON.parse(data);
			var sortedClothingData = _.zip.apply(null, _.values(_.groupBy(clothingData, 'shop_name')));


			$.each(sortedClothingData, function(index, value){

				$.each(value, function(index, val){
						if(val !== undefined){
							$('body .content').append('\
								<p>Description: ' +  val.description + '</p>\
								<p>Img: ' + val.img_src + '</p>\
								<p>Price: £' + val.price + '</p>\
								<p>Shop link: ' + val.shop_link + '</p>\
							 	<p>Shop name: ' + val.shop_name + '</p><br>\
							');
						}
					});

			});

		});

	});