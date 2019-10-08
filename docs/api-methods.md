# API Methods

## app.route

`route(path: String, handler: Function)`

> Specify a view to be rendered on a path. The handler receives the `state` and `actions` as the arguments.
>
> Route parameters will be passed through the `state` argument as `state.params`

## app.use

`use(reducer: Function)`

> The reducer initializes the state and defines how the actions create the next state. The reducer function receives `state` and `action` as the first two arguments.
>
> The `action` requires the property `type`. A `payload` may be also be defined.
>
> **Note:** The `use` method is optional if you do not need state or actions in your application. You may also use multiple reducers by calling the `use` method for each new reducer.

## app.run

`run(handler: Function)`

> Execute a block of code when the application is mounted. The `handler` receives one argument which is the `dipatch` function for dispatching state updates.
>
> This method is particularly useful for loading asynchronous data that is needed on all routes.

## app.mount

`mount(selector: DOMNode)`

> Mount the application and start listening to route changes
