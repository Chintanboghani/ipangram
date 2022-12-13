const mongoose = require('mongoose');
const DBURL = process.env.MONGODB_URI;

module.exports = {
	connectDatabase:async () => {
		try {
			const options = {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				//useCreateIndex: true,
				//useFindAndModify: false
			};
            mongoose.set('strictQuery', false)
			const connection = await mongoose.connect(DBURL, options);
			if(connection) console.log('Database Connected Successfully...');
		  } catch (err) {
			console.log('Error while connecting database\n');
			console.log(err);
		  }
	}
}
