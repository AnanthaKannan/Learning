# React Testing Library

### Unit Tests

Focus is on testing the individual building blocks of an application such as a class or a function or a component

### Integration Test

Focus is on testing a combination of units and ensuring they worked together

### E2E Test

Focus is on testing the entire application flow and ensuring it works as designed from start to finish

## Commands to run
* npm run jest --watchAll
* npm run jest --coverage

### 
* before() - Runs once before the first test in the suite.

* beforeEach() - Runs before each test in the suite.

* afterEach() - Runs after each test in the suite.

* after() - Runs once after the last test in the suite.

##
* test.skip() - Skips a specific test.
* test.only() - Runs only this specific test.
* describe.skip() - Skips an entire test suite.
* describe.only() - Runs only this test suit


## Some case
```js
describe("TodoController.getToDos", () => {
  it("should have a getTodo function", () => {
    expect(typeof TodoController.getTodo).toBe("function");
  });

  it("should call TodoModel.find({})", async () => {
    await TodoController.getTodo(req, res, next);
    expect(TodoModel.find).toHaveBeenCalledWith({});
  });
})
```

## some condition
* expect(result).toBe(3);
*  expect(TodoModel.find).toHaveBeenCalledWith({});
* expect(res._getJSONData()).toStrictEqual(allTodo);
* expect(res._isEndCalled()).toBeTruthy();

## Sinon
```js
// https://vijay-rangan.medium.com/stubbing-with-sinon-in-5-mins-5c7b2af6123
const userRep = { all() {} }

const stubbedUserRepo = sinon.stub(userRepo);

stubbedUserRepo.all.returns([{ 
  id: 1, 
  user: "John Doe", 
  email: "john@doe.com" 
}]);

console.log(userRepo.all()); // prints the object from above

const registerUserStub = sinon.stub(userRepository, 'registerUser');
// Restoring the user repository

stubbedUserRepo.all.restore();


```
