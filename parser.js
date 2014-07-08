$(function() {
  window.parseExpr = function(instr) {
    variables = {}
    numerical_version = instr.replace(/[a-z]+/g, function(m) {
      var newName = Math.random();

      variables[newName] = m;
      return newName + "";
    })

    return [JSON.parse(numerical_version), variables];
  }
});
