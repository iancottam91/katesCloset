	$(document).ready(function(){

		$.getJSON( "api/dataAPI.php", function( data ) {

  			var clothingData = JSON.parse(data);
			var sortedClothingData = _.zip.apply(null, _.values(_.groupBy(clothingData, 'shop_name')));

			var count = 0;

			console.log(sortedClothingData);

			$.each(sortedClothingData, function(index, value){

				$.each(value, function(index, val){
					// console.log(count);

					if(count%3==0 || count == 0){
						// console.log(count);
						$('body .content').append('<div class="row"></div>');
					}

						if(val !== undefined){

							$('body .content .row').last().append('\
								<div class="col-md-4">\
									<img src="' + val.img_src +  '">\
									<p><a href="' + val.shop_link + '">Description: ' +  val.description + '</a></p>\
									<p>Price: £' + val.price + '</p>\
								 	<p>Shop name: ' + val.shop_name + '</p><br>\
								 </div>\
							');

						}

					count++;
				});

			});

		});

	});