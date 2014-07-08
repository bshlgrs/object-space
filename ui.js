$(function() {
  window.thingsToAdd = [];

  $("#add-thing").on('click', function(e) {
    e.preventDefault();

    var ast, variables;
    var result = parseExpr($("#thing").val());
    ast = result[0];
    variables = result[1];

    addThings(ast, variables);

  })

  var addThings = function(ast, variables) {
    if (Array.isArray(ast)) {
      var values = [];
      for (var i = 0; i < ast.length; i++) {
        values.push(addThings(ast[i], variables));
      };
      var array = new OSArray(values);
      // thingsToAdd.push(array);
      array.add();
      return array;
    }
    else if (ast + 0 === ast) {
      if (variables[ast]) {
        notImplemented;
      } else {
        var number = new OSNumber(ast);
        // thingsToAdd.push(number);
        number.add();
        return number;
      }
    }
  }

  // var x = new OSNumber(3);
  // var y = new OSNumber(5);
  // x.add();
  // y.add();
  // var z = new OSArray([x,y,x,y,x,y]);
  // z.add();

  // var w = new OSArray([z]);
  // w.add();

  addThings([[1]], {});
});