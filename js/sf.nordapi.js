if (typeof sf != 'object') {
	sf = {};
}

sf.nordapi = (function() {
	var baseObj = this;

	// intialize anything necessary
	baseObj.limit = 5;
	baseObj.apiURL = 'http://shop.nordstrom.com/FashionSearch.axd';
	baseObj.apiParams = {
		instoreavailability: 'false',
		page: 1,
		pagesize: baseObj.limit,
		partial: 0,
		sort: 'featured',
		type: 'keyword',
		keyword: ''
	};

	function translateResults(type, products) {
		if (products.length == 0) {type = 'none';}
		return {
			type: type,
			results: products
		};
	}

	// function defines
	function executeFn(params, callback) {
		if (typeof params == 'undefined') {var params = {};}

		var data = {
			brand: false,
			buzzword: false
		};

		$.extend(data, params);

		var searchTerms = [];
		if (data.brand != false) {searchTerms.push(data.brand);}
		if (data.buzzword != false) {searchTerms.push(data.buzzword);}

		if (searchTerms.length == 0) {callback(translateResults('none', [])); return;}

		if (searchTerms.length == 2) {
			// brand + buzz
			runQuery(searchTerms.join(' '), function(productsBrandBuzz) {
				if (productsBrandBuzz.length == 0) {
					// b+b = 0
					runQuery(searchTerms[0], function(productsBrand) {
						if (productsBrand.length == 0) {
							// brand = 0
							runQuery(searchTerms, function(productsBuzz) {
								// buzz = 0 OR buzz > 0
								productsBuzz = translateResults('buzz', productsBuzz);
								callback(productsBuzz);
							});
						} else {
							// brand > 0
							productsBrand = translateResults('brand', productsBrand);
							callback(productsBrand);
						}

					});
				} else {
					productsBrandBuzz = translateResults('brandbuzz', productsBrandBuzz);
					callback(productsBrandBuzz);
				}
			});


		} else {
			// brand or buzz only
			runQuery(searchTerms.join(''), function(prods) {
				if (data.brand == false) {
					callback(translateResults('buzz', prods));
				} else {
					callback(translateResults('brand', prods));
				}
			});
		}

	}



	function runQuery(keywordStr, callback) {
		var products = [];
		if (typeof keywordStr != 'string') {
			callback(products);
			return;
		}
		var ajaxParams = baseObj.apiParams;
		ajaxParams.keyword = keywordStr;

		$.ajax({
			data: ajaxParams,
			dataType: 'json',
			url: baseObj.apiURL,
			type: 'GET',
			success: function(r) {
				if (r && r.Fashions && r.Fashions.length > 0) {
					// something found!
					for(var i=0; i < r.Fashions.length; i++) {
						products.push(trimProduct(r.Fashions[i]));
					}
				}

				callback(products);
			},
			error: function(a,b,c) {
				console.error(a,b,c);
			}
		});
	}

	function trimProduct(pObj) {
		return {
			id: 	pObj.Id,
			name: 	pObj.Title,
			brand: 	pObj.BrandLabelName,
			photo: 	pObj.PhotoPath,
			path: 	pObj.PathAlias,
			style: 	pObj.StyleNumber
		};
	}



	return {
		execute: executeFn
	};
})();