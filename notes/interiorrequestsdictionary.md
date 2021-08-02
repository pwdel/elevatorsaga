### Interior Requests Dictionary

The build file for this is [interiorrequestsdictionary.js](/notes/interiorrequestsdictionary.js).

The logic behind the dictionary as opposed to an array for interior requests is that an array creates a linear string of requests regardless of when they came in, when in reality a floor may need to be visited merely once and then cleared.

### Javascript Dictionaries

Javascript does not actually have dictionaries as in python, but rather it has [javascript objects](https://www.w3schools.com/js/js_objects.asp).

Example declaration:

```
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};
```

In our scenario, we would like a dictionary to represent all pending interior requests which have not yet been cleared from the queue.

```
const interiorRequests = {
  0: 0,
  1: 1,
  2: 2,
  3: 3
};
```

Of course, there could be a dynamic number of interior requests which occur, and it would be necessary to build an interiorRequests object to fit the number of floors that actually exist, e.g. for the keys to fit the numbers of the floors.

While it is [possible to dynamically create keys](https://stackoverflow.com/questions/1184123/is-it-possible-to-add-dynamically-named-properties-to-javascript-object), unlike with Python, [the key names must be interpreted as strings](https://stackoverflow.com/questions/3633362/is-there-any-way-to-use-a-numeric-type-as-an-object-key).

To dynamically create a list of all floors, we need a for loop which loops through an object.  That can be done [as shown](https://stackoverflow.com/questions/2383484/how-to-create-a-dynamic-object-in-a-loop):

```
const TOPFLOOR = 4;

var interiorRequestsDict = {};

for (var x = 0; x < TOPFLOOR+1; x++) {
    // property name is x, or the number of the floor
    // value of each object starts as zero
    interiorRequestsDict[x] = 0;
}

// log to console to ensure was created correctly
console.log('interiorRequestsDict: ',interiorRequestsDict)

```

The above dynamically initializes a dict object:

```
interiorRequestsDict:  {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}
```
