
// This function is the endpoint's request handler.
exports = function({ query, headers, body}, response) {
    // Data can be extracted from the request as follows:

    // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
    const {id} = query;

    // Headers, e.g. {"Content-Type": ["application/json"]}

    // You can use 'context' to interact with other application features.
    // Accessing a value:
    // var x = context.values.get("value_name");

    // Querying a mongodb service:
    const doc = context.services.get("mongodb-atlas")
                  .db("pscqbdb")
                  .collection("questions")
                  .findOne({ _id: BSON.ObjectId(id) }, {Question: 1, "Answer 01": 1, "Answer 02": 1, "Answer 03": 1, "Answer 04": 1, "Answer 05": 1});

    // Calling a function:
    // const result = context.functions.execute("function_name", arg1, arg2);

    // The return value of the function is sent as the response back to the client
    // when the "Respond with Result" setting is set.
    return  doc;
};
