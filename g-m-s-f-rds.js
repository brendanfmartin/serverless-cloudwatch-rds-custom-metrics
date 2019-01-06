const mysql = require('mysql');
const Promise = require('bluebird');
//
// console.log("MySQL Custom Application CloudWatch Metrics - Script initiated");
//
// const connection = mysql.createConnection({
//     host: 'test-db.cte7dqmhq9v2.us-east-2.rds.amazonaws.com',
//     user: 'master',
//     password: 'password',
//     database: 'test-db'
// });
//
// const queries = [
//   "SELECT COUNT(*) AS metric, 'users_total' AS label, 'Count' AS unit FROM users",
//   "SELECT UNIX_TIMESTAMP()-max(task_last_succeeded_at) AS metric, 'task_last_succeeded' AS label, 'Seconds' AS unit FROM task_engine",
//   "SELECT COALESCE(NOW()-max(creation_time), 0) AS metric, 'mail_queue_seconds_behind' AS label, 'Seconds' AS unit FROM mail_queue_table",
//   "SELECT COUNT(*) AS metric, 'mail_queue_items' AS label, 'Count' AS unit FROM mail_queue",
//   "SELECT COUNT(*) AS metric, 'users_added' AS label, 'Count' AS unit FROM users where creation_date >= now() - INTERVAL 1 MINUTE"
// ];
//
// const params = {
//   MetricData: [],
//   Namespace: 'CustomRDSMetrics' /* required */
// };
//
// console.log("Connecting to MySQL...");
// connection.connect();
// Promise.promisifyAll(connection);
//
// // Lambda Handler
// console.log("Started up, waiting for someone to call the exports.handler...");
// exports.handler = function(event, context, callback) {
//   console.log("MySQL Custom Application CloudWatch Metrics - Handler called");
//   // Clone the params global instance for this iteration
//   const params_instance = JSON.parse(JSON.stringify(params));
//   console.log('params.instance', params.instance);
//
//   // For AWS Lambda NodeJS 4.3 Instant-Callback Support
//   context.callbackWaitsForEmptyEventLoop = false;
//
//   // Run all of our queries asynchronously with promises...
//   Promise.map(queries, function(query) {
//     return connection.queryAsync(query).then(function(row) {
//       // console.log("Got metric " + row[0].label + " value " + row[0].metric);  // For debugging/development
//       // Push our metrics data into a collector in the format ready for insertion into CloudWatch that we'll return when all our promises are complete
//       params_instance['MetricData'].push({
//          MetricName: row[0].label,
//          Timestamp: new Date,
//          Unit: row[0].unit,
//          Value: row[0].metric
//       });
//     }).catch(function(failed_reason) {
//       console.log("ERROR: The following query failed:");
//       console.log(query);
//       console.log("Because:");
//       console.log(failed_reason);
//     });
//   }).then(function() {
//     // Return the data back to our caller
//     console.log("Ran successfully, returning params");
//     // console.log(JSON.stringify(params_instance));
//     return callback( null, params_instance );
//   });
// };

// For debugging/development, so you can test locally is your queries if you setup a SSH port forward or run this on a server in your VPC.  Please do not have this uncommented when you deploy to Lambda
// exports.handler({}, function() { const callbackWaitsForEmptyEventLoop = true }, function( err, success ) { console.log('Error result:'); console.log(err); console.log('Success result:'); console.log(success); process.exit(); });


exports.test = (event, context, callback) => {
  const query = 'SELECT "Hello world!" as message';
  console.log(query);

  const connection = mysql.createConnection({
    host: 'test-db.cte7dqmhq9v2.us-east-2.rds.amazonaws.com',
    user: 'master',
    password: 'password',
    database: 'testdb'
  });

  connection.connect();

  connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });

  connection.end();
  //
  // Promise.promisifyAll(connection);
  //
  // connection.queryAsync(query)
  //    .then(res => {
  //      console.log(res);
  //      callback(null, res);
  //    })
  //    .catch(err => {
  //      console.log(err);
  //      callback(err);
  //    });
};
