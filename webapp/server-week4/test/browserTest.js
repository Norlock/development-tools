casper.test.begin('Complete test of the todo-list', 5, function suite(test) {
  // Check if the todo list is empty
  casper.start("http://localhost:8080", function() {
    test.assertExists('form', "main form is found");
    test.assertEquals(this.fetchText('ul#todo-list'), '', 'todo list is empty');
  });

  // Check if the item has been added to the todolist
  casper.then(function() {
    this.fill('form', {
      'todo': 'NewItem'
    }, true);

    casper.wait(1000, function() {
      test.assertEquals(this.fetchText('ul#todo-list').trim(), 'NewItem', 'item was added to the list');
    });
  });

  casper.on("page.error", function(msg, trace) {
    this.echo("Error: " + msg, "ERROR");
  });

  // Check if duplicate items give an error
  casper.on('remote.alert', function(message) {
    test.assertEquals(message, 'Can not add to ToDo list (duplicate item or empty input)', "alert message is correct");

    // Make sure there is still one item in the list!
    test.assertEquals(this.fetchText('ul#todo-list').trim(), 'NewItem', 'item was not added to the list');
  });

  // Add the same item again (is not allowed!)
  casper.then(function() {
    this.fill('form', {
      'todo': 'NewItem'
    }, true);
  });

  casper.run(function() {
    test.done();
  });
});