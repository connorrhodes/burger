// Import the MySQL connection object
var connection = require ('./connection.js');


function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}

	return arr.toString();
}


function toSql(ob) {
	var arr = [];

	for (var key in ob) {
		arr.push(key + "=" + ob[key]);
	}

	return arr.toString();
}


var orm = {
	// Function that returns all table entries
	selectAll: function(tableInput, cb) {
		// Construct the query string that returns all rows from the target table
		var queryString = "SELECT * FROM " + tableInput + ";";

		// Database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return 
			cb(result);
		});
	},

	// Function that insert a single table entry
	insertOne: function(table, cols, vals, cb) {
		// Construct the query string that inserts a single row into the target table
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";


		// Perform the database query
		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	},

	// Function that updates a single table entry
	updateOne: function(table, objColVals, condition, cb) {
		// Construct the query string 
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += toSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		// Database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results 
			cb(result);
		});
	}
};

// Export the orm object for use in other modules
module.exports = orm;