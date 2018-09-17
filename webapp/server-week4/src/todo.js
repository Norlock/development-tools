const _ = require('lodash');

/**
 * Class for keeping track of ToDo-items
 */
class ToDoList {
  /**
   * Initialize an empty ToDoList
   */
  constructor() {
    this.items = [];
  }

  /**
   * Add an todo item to the list. The items need to be unique!
   * @param {string} item Todo list item
   * @throws Will throw an error when the item is already in the list
   */
  add(item) {
    if (!this.contains(item)) {
      this.items.push(item);
    } else {
      throw "Duplicate item";
    }
  }

  contains(item) {
    return _.includes(this.items, item);
  }

  delete(item) {
    if (this.contains(item)) {
      _.remove(this.items, function(curItem) {
        return curItem === item;
      });
    } else {
      throw "Item not found";
    }
  }

  /**
   * Get the list from the object
   * @returns {string[]} todo list
   */
  getList() {
    return this.items;
  }
}

module.exports = ToDoList;