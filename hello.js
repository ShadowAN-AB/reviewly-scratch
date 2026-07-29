// Say hi to a user by name.
function greet(name) {
  const message = "Hello, " + name + "!";
  document.getElementById('greeting').innerHTML = message;
  return message;
}

module.exports = { greet };
// added later
// again
