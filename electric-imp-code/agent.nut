device.on("impSerialIn", function(data) {
// Set URL to your web service
  local url = "https://dinkydinky.herokuapp.com/data";

  // Set Content-Type header to json
  local headers = { "Content-Type": "application/json" };

  // encode data and log
    local body = http.jsonencode(data);
    server.log(body);

  // send data to your web service commented out so it doesnt keep posting //during development.   Comment in to use http.post:
    http.post(url, headers, body).sendsync();

});
