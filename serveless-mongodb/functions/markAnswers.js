// This function is the endpoint's request handler.
exports = function({ query, headers, body}, response) {
    // Data can be extracted from the request as follows:

    // Raw request body (if the client sent one).
    // This is a binary object that can be accessed as a string using .text()
    const reqBody = JSON.parse(body.text());
    
    const ids = reqBody.map((que, i) => BSON.ObjectId(que._id));

    // Querying a mongodb service:
    const doc = context.services.get("mongodb-atlas").db("pscqbdb").collection("questions").find({ _id: {$in: ids}}, {_id: 1, "Correct Answer": 1});

    return  doc;
};
