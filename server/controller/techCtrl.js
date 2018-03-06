var techModel = require('../model/techModel');

module.exports.create = function(req,res){
	var tech = new techModel(req.body);
	techModel.findOne({
	    name: req.body.name
	  }, function(err, technology) {

	    if (err) throw err;
	    if (!technology) {
	    	tech.save(function(err,result){
				if(err){
					res.json({ success: false, message: 'Technology is not added.', result:result });
				}
				else{
					res.json({ success: true, message: 'Technology is added.', result:result })
				}
			});
	    } 

	    //technology is already present
	    else {
	    	res.json({ success: false, message: 'Technology is already present.'});
	    }

	  });
	
}

module.exports.list = function(req,res){
	techModel.find({},function(err,result){
		if(err){
			res.json({ success: false})
		}
		else{
			res.json({ success: true, result:result})
		}
		
	});
}


