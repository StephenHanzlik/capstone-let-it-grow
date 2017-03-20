// string we're collecting
s <- "";

function process(newline) {
        server.log(newline);
        local sArr = split(s, ",")
        server.log(sArr);
        local dataTwo = { "light": sArr[1], "temperature": sArr[2], "humidity": sArr[3], "soil_moisture": sArr[4] }
        agent.send("impSerialIn", dataTwo);

}

function newdata() {
  local b = hardware.uart57.read();
  while(b!=-1) {
    if (s == "") {
      // We look for an S to start the string, otherwise ignore
      if (b == 'S') s = "S";
    } else {
      // Append to string
      s+=b.tochar();

      // If we saw an X, we got the end of the string
      if (b == 'X') {
        // process string
        process(s);
        // and blank it
        s = "";
      }
    }
    b = hardware.uart57.read();
  }
}

// Init uart. It will call callback
hardware.uart57.configure(9600, 8, PARITY_NONE, 1, NO_CTSRTS, newdata);
