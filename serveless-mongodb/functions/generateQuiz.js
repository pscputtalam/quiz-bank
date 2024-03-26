// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
    // Data can be extracted from the request as follows:

    // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
    let {difficulty, amount} = query;
    
    const match = {};
    
    if (difficulty !== undefined) {
      match.weightage = difficulty;
    }
    
    
    if (amount === undefined) {
      amount = 5;
    } else {
      amount = parseInt(amount);
    }

    // Querying a mongodb service:
    const doc = await context.services
                        .get("mongodb-atlas")
                        .db("pscqbdb")
                        .collection("questionsV2")
                        .aggregate(
                          [
                            { "$match": match },
                            {"$sample": { "size": amount }}
                          ]
                        ).toArray();
                        
    console.log(doc);
    
    response.setBody(JSON.stringify({
      response_code: 0,
      results: doc
    }))

    // Calling a function:
    // const result = context.functions.execute("function_name", arg1, arg2);

    // The return value of the function is sent as the response back to the client
    // when the "Respond with Result" setting is set.
    return  response;
};
