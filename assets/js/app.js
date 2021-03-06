var App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Router.map(function(){

	this.route('about', {path: '/about'});
	this.route('contactus', {path: '/contact-us'});
	this.resource('products');

	// // products is a resource route
	// this.resource('products', function(){
	// 	this.resource('product', {path: '/:product_id'})
	// 	// could have a nested clothes/warehouse for instance
	// 	this.route('sale');
	// });

});

// non default adapter that needs to be added to load data from Fixtures for testing/development
// App.ApplicationAdapter = DS.FixtureAdapter.extend();
// App.ApplicationAdapter = DS.RestAdapter.extend();

// model for the products
App.Product = DS.Model.extend({
	shop_name: DS.attr('string'),
	price: DS.attr(''),
	description: DS.attr('string'),
	img_src: DS.attr('string'),
	shop_link: DS.attr('boolean'),
	featured: DS.attr('boolean'),
});


// Test product data
App.Product.FIXTURES = [
	
	{
		id: 1,
		description: "CROPPED EMBROIDERED LASER-CUT TOP",
		price: 25.99,
		shop_name: "Zara",
		shop_link: "http://www.zara.com/uk/en/new-this-week/woman/cropped-embroidered-laser-cut-top-c363008p2422002.html",
		img_src : "//static.zara.net/photos//2015/V/0/1/p/4786/041/251/2/w/400/4786041251_2_5_1.jpg?ts=1423676733043",
		featured : true
	},
	{
		id: 2,
		description: "LASER-CUT TOP",
		price: 25.99,
		shop_name: "Zara",
		shop_link: "http://www.zara.com/uk/en/new-this-week/woman/cropped-embroidered-laser-cut-top-c363008p2422002.html",
		img_src : "//static.zara.net/photos//2015/V/1/1/p/1536/001/040/2/w/400/1536001040_2_9_1.jpg?ts=1423474188809",
		featured : false
	},
	{
		id: 3,
		description: "Cobalt Tencel Shirt Dress",
		price: 75,
		shop_name: "French Connection",
		shop_link: "http://www.frenchconnection.com/product/Woman+New+In/71DEK/Cobalt+Tencel+Shirt+Dress.htm",
		img_src : "//media.frenchconnection.com/ms/fcuk/71DEK_model/768/526/Cobalt-Tencel-Shirt-Dress.jpg?lc=en-GB&lv=9&404=fcuk/71DEK.jpg",
		featured : true
	},
	{
		id: 4,
		description: "Casual Army Shirt Jacket",
		price: 48,
		shop_name: "Warehouse",
		shop_link: "http://www.warehouse.co.uk/casual-army-shirt-jacket/all/warehouse/fcp-product/02282028",
		img_src: "http://media.warehouse.co.uk/pws/client/images/catalogue/products/02282028/list4/02282028.jpg",
		featured : false
	},
	{
		id: 5,
		description: "ASOS Peplum Top with Mixed Fabric",
		img_src: "http://images.asos-media.com/inv/media/0/8/9/2/4882980/navy/image1xl.jpg",
		price: 32,
		shop_link: "http://www.asos.com/ASOS/ASOS-Peplum-Top-with-Mixed-Fabric/Prod/pgeproduct.aspx?iid=4882980&cid=2623&sh=0&pge=0&pgesize=36&sort=-1&clr=Navy&totalstyles=591&gridsize=3",
		shop_name: "Asos",
		featured : false
	},
	{
		id: 6,
		description: "Floral cotton dress",
		img_src: "http://media.karenmillen.com/pws/client/images/catalogue/products/103DV11808/list5/103DV11808.jpg",
		price: 145,
		shop_link: "http://www.karenmillen.com/floral-cotton-dress/new-in/karenmillen/fcp-product/103DV11808",
		shop_name: "Karen Millen",
		featured : false
	}

];

App.IndexRoute = Ember.Route.extend({
	model: function(){
		return this.store.findAll('product');
	}
});


// Gets the product data from the data store
App.ProductsRoute = Ember.Route.extend({

	//sorts in the server side
	model: function(){
		// return this.store.findAll('product', {order: 'title'}); 
		return this.store.findAll('product'); 
	}

});

// Controllers are used to work with the data in the model. 'this' refers to the model data
App.IndexController = Ember.ArrayController.extend({

	featured : function(){
		return this.filterBy('featured').slice(0,2);
	}.property('@each.featured'),

});

// possibly better way to do the filters: http://emberjs.jsbin.com/fikuk/6/edit?html,css,js,output
// select menu: http://emberjs.com/api/classes/Ember.Select.html
// Array controller to work with Products, which is array data

App.ProductsController = Ember.ArrayController.extend({
	totalItems: function(){
		// this first looks in the controller for the value of length, then in the model
		return this.get('length');
	}.property('length'),

	// define the values for the select pagination
	itemsPerPageOptions: function(){
    	return [1, 2, 4, this.get('totalItems')];
	}.property('totalItems'),

	// set the default value - this also is bound to changes to the select menu
	selectedItem : function(){
		return this.get('totalItems');
	}.property('totalItems'),
	

	sortOptions: [
		{desc: 'Description', val: 'description'},
		{desc: 'Price high to low', val: 'price:asc'},
		{desc: 'Price low to high', val: 'price:desc'},
	],

	// initally sort by description
	sortValue : 'description', // for the select menu
	sortProperties: ['description'], // for the actual sorting
	// sortAscending: false

	// observe changes to the select menu & change the sortProperties appropriately
    onSortPropertiesChange : function(){
	  var sortVal = this.get('sortValue');
	  console.log(sortVal);
	  this.set('sortProperties', [sortVal]);
	}.observes('sortValue'),


	// filter the content

	// text filter
	filterText: "",

	// checkbox filter - perhaps can get this from the database
	shops: [
		{
			name: 'French Connection',
			value: 'French Connection',
			isChecked: true,
		},
		{
			name: 'Zara',
			value: 'Zara',
			isChecked: true,
		},
		{
			name: 'Asos',
			value: 'Asos',
			isChecked: true,
		},
		{
			name: 'Warehouse',
			value: 'Warehouse',
			isChecked: true,
		},
		{
			name: 'Karen Millen',
			value: 'Karen Millen',
			isChecked: true,
		}

	],

	filteredContent: function(){

		var filter = this.get('filterText');
		// Regex for the text string - gi is global match & ignore cases
		var rx = new RegExp(filter, 'gi');

		// the products
		var products = this.get('arrangedContent');

		// items per page from select box
		var itemsPerPage = this.get('selectedItem');

		// checkboxes for brand names
		var checkedShops = this.get('shops').filterBy('isChecked');
		var checkedShopsArray = [];

		// make array of checked shops to use for filter checks
		for(i=0;i<checkedShops.length;i++){
			checkedShopsArray.push(checkedShops[i].name);
		}

		return products.filter(function(product){

			// only return products that have the shop_name checked
			if(checkedShopsArray.indexOf(product.get('shop_name')) >= 0)
			{	
				// check the products against the text string
				return product.get('description').match(rx);
			}


		}).slice(0, itemsPerPage);
		// slice amount of products to show to the value in the select box

	}.property('arrangedContent', 'filterText', 'selectedItem', 'shops.@each.isChecked')

});


