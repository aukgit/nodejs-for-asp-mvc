module.exports = {
  
	home: function (req, reqParams, post, app, config, global){
		// default get
		console.log("Home [Get] - Read - Default one");
		console.log(reqParams);
		return reqParams;
	},
	
	homeGet: function (req, reqParams, post, app, config, global){
		// default get
		var id = req.params.id;
		console.log("Home [Get] - Read");
		var getParams = req.query;
		console.log(getParams);
		return getParams;
	},
	
	homePut: function (req, reqParams, post, app, config, global){
		// default put
		console.log("Home [Post] - Create or Update | Mostly Create");
		console.log(req);
		return req.body;
	},
	
	examplePost: function (req, reqParams, post, app, config, global){
		console.log("Home [Post] - Update");
		console.log(req);
		return req.body;
	},
	
	homeDelete: function (req, reqParams, post, app, config, global){
		// home delete
		console.log("Home [Delete]");
		console.log(req);
		return req.body;
	}
};

