		var x = [   
		    {
		        "name" : "Tim",
		        "preference" : "b"
		    },
		    {
		        "name" : "Tom",
		        "preference" : "b"
		    },
		    {
		        "name" : "Steve",
		        "preference" : "a"
		    },
		    {
		        "name" : "Rick",
		        "preference" : "a"
		    },
		    {
		        "name" : "Nile",
		        "preference" : "c"
		    },
		    {
		        "name" : "Julian",
		        "preference" : "c"
		    },
		    {
		        "name" : "James",
		        "preference" : "c"
		    }
		];
		// var result = _.groupBy(x, 'preference');
		// console.log(result);
		var result = _.zip.apply(null, _.values(_.groupBy(x, 'preference')));

		$.each(result, function(index, value){

			$.each(value, function(index, val){
				if(val !== undefined){
					console.log(val);
					console.log($('body'));
					$('body').append('\
						<p>' +  val.name + ', Preference: ' + val.preference + '</p>\
					');
				}
			});

		});