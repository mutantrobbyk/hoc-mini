<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250" align="right">

# Project Summary

In this project, we will practice making higher-order components (HOC) to better understand this technique for reusing component logic. A higher-order component is a function that takes in a component and returns a new component.

## Setup

- `cd` into the project directory.
- Run `create-react-app ./`.
- Remove the service worker from `src/index.js`:
  - Delete `import registerServiceWorker from './registerServiceWorker';`
  - Delete `registerServiceWorker();`
- Run `npm start`.
- In a seperate terminal, `cd` into the project directory.
- Create the following folders inside of src
  - HOCs
  - components

## HOC 1

### Summary

We will create a high-order component that will check if a user is authenticated in order to render a component.

### Step 1

- Inside the HOCs folder, create the following file:
  - withAuthentication.js
- Import `React`.  React must be in scope when using jsx.
- Create a function `withAuthentication` that takes in a component as it's parameter `WrappedComponent` and returns a functional component.
- The functional component should return the `WrappedComponent` that was passed into the `withAuthentication` function if `props.isAuthenticated` is true, and `null` if it is false.
- With HOCs it is important that you pass any props that will be passed to the component made from using the HOC, to the component that is passed into the HOC.  You can do this with object destructuring.

### Solution

<details>

<summary> <code> ./src/HOCs/withAuthentication.js </code> </summary>

```jsx
import React from 'react'

export default function withAuthentication(WrappedComponent) {
  return function(props) {
    return props.isAuthenticated ? <WrappedComponent { ...props } /> : null
  }
}
```

</details>

### Step 2

- Inside the components folder, create the following file:
  - SuperSecret.js
- Because this component is "super secret", we only want authenticated users to see it.  So we will use the `withAuthentication` HOC to add logic to our component.  
- import `React` and `withAuthentication`.
- create a functional component called `SuperSecret` that renders the followng:
```jsx
(
  <div style={{ margin: 20, border: '1px solid green'}}>
    <h1>This is top secret!</h1>
    <p>only an authenticated user can see this</p>
  </div>
)
```
- Next, create a new component by invoking `withAuthentication` and passing in `SuperSecret`.  This new component will be the `export default`.
- When we use this new component, we can pass a prop called `isAuthenticated` and if the value is `true` the component will render, if it is `false` it will not.

### Solution

<details>

<summary> <code> ./src/components/SuperSecret.js </code> </summary>

```jsx
import React from 'react'

import withAuthentication from '../HOCs/withAuthentication'

function SuperSecret(props) {
  return (
    <div style={{ margin: 20, border: '1px solid green'}}>
      <h1>This is top secret!</h1>
      <p>only an authenticated user can see this</p>
    </div>
  )
}

export default withAuthentication(SuperSecret)
```

</details>

### Step 3

- In App.js, bring in our newly created `SuperSecret` component and add it to the jsx code in the render method.
- Give it the prop `isAuthenticated` and set the value to `true`.  In the browser, you should now see the secret component. Next, set it to false, and you can see that the component no longer shows in the browser.

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```jsx
import React, { Component } from 'react';
import './App.css';

import SuperSecret from './components/SuperSecret'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SuperSecret isAuthenticated={true}/>
      </div>
    );
  }
}

export default App;
```

</details>


## HOC 2

### Summary

Now we will create a higher-order component that will add toggle logic to a component.  We can use this HOC with any component that needs to toggle something.

### Step 1

- Inside the HOCs folder, create the following file:
  - withToggle.js
- Import `React` and `Component`.
- Create a function `withToggle` that takes in a component as it's parameter `WrappedComponent` and returns a class component `WithToggle`.  `WithToggle` should have state with one property `toggle` that is set to `false`.
- `WithToggle` should have a method `handleChange` that will update the component's state and change the value of `toggle` to the opposite of its current value.
- In the render method, create an object named `toggle` that will store the `value` of `this.state.toggle`, and the `handleChange` method.  Then, return the `WrappedComponent` and pass the `toggle` object as a prop.  Make sure to also pass on the rest of the props `{ ...props }`

### Solution

<details>

<summary> <code> ./src/HOCs/withToggle.js </code> </summary>

```jsx
import React, { Component } from 'react'

export default function (WrappedComponent) {
  return class WithToggle extends Component {
    state = {
      toggle: false
    }
  
    handleChange = e => {
      this.setState({
        toggle: !this.state.toggle
      })
    }
  
    render() {
      let toggle = {
        value: this.state.toggle,
        handleChange: this.handleChange
      }
      return <WrappedComponent toggle={toggle} { ...this.props }/>
    }
  }
}
```

</details>

### Step 2

- Inside the components folder, create the following files:
  - OnOffButton.js
  - AccordianMenu.js
- In `OnOffButton.js` import `React` and `withToggle`.  Then, create a functional component `OnOffButton`, that returns the following:
  ```jsx
  ( 
    <button onClick={toggle.handleChange}>
      <h1>{ toggle.value ? 'ON' : 'OFF' }</h1>
    </button>
  )
  ```
- Create a new component by invoking `withToggle` and passing in `OnOffButton`.  This new component will be the `export default`.
- In `AccordianMenu.js` import `React` and `withToggle`.  Create a functional component `AccordianMenu`.
  ```jsx
  function AccordianMenu(props) {
    let { toggle } = props
    return (
      <div>
        <div id="title" style={styles.menuTitle} onClick={toggle.handleChange}>
          {props.title}
        </div>
        {toggle.value && <div id="body" style={styles.menuBody}>{props.children}</div> }
      </div>
    )
  }

  let styles = {
    menuTitle: {
      border: '1px solid black',
      padding: 20
    },
    menuBody: {
      border: '1px solid black',
      borderTop: 'none',
      backgroundColor: '#F0F0F0',
      padding: 20
    }
  }
  ```
- Let's walk through what is happening here.  First, we are grabbing the toggle object from props which we will have access to once we pass `AccordianMenu` into `withToggle`.  Then, we have a click event on the first child `div` so when we click on it, the `handleChange` method from `withToggle` will be invoked and update the value of `toggle`.  Below that, we are checking to see if the value of `toggle` is `truthy`, and if it is, we render a `div` for the body.  Notice that between the body `div` tags we are rendering `props.childred`.  `props.children` refers to the elements between the opening and closing tags of the `AccordianMenu` component, when we use the component. 
- Create a new component by invoking `withToggle` and passing in `AccordianMenu`.  This new component will be the `export default`.

### Solution

<details>

<summary> <code> ./src/components/OnOffButton.js </code> </summary>

```jsx
import React from 'react'

import withToggle from '../HOCs/withToggle'

function OnOffButton(props) {
  let { toggle } = props
  return (
    <button style={styles.button} onClick={toggle.handleChange}>
      <h1>{ toggle.value ? 'ON' : 'OFF' }</h1>
    </button>
  )
}

export default withToggle(OnOffButton)

let styles = {
  button: {
    border: '1px solid orange',
    borderRadius: '3px',
    padding: 20,
    margin: 20
  }
}
```

</details>

<details>

<summary> <code> ./src/components/AccordianMenu.js </code> </summary>

```jsx
import React from 'react'

import withToggle from '../HOCs/withToggle'

function AccordianMenu(props) {
  let { toggle } = props
  return (
    <div>
      <div style={styles.menuTitle} onClick={toggle.handleChange}>
        {props.title}
      </div>
      {toggle.value && <div style={styles.menuBody}>{props.children}</div> }
    </div>
  )
}

export default withToggle(AccordianMenu )

let styles = {
  menuTitle: {
    border: '1px solid black',
    padding: 20
  },
  menuBody: {
    border: '1px solid black',
    borderTop: 'none',
    backgroundColor: '#F0F0F0',
    padding: 20
  }
}
```

</details>

### Step 3

- In App.js, bring in our newly created `OnOffButton` and `AccordianMenu` components and add them to the jsx code in the render method.

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```jsx
import React, { Component } from 'react';
import './App.css';

import SuperSecret from './components/SuperSecret'
import OnOffButton from './components/OnOffButton'
import AccordianMenu from './components/AccordianMenu'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SuperSecret isAuthenticated={true}/>
        <OnOffButton />
        <AccordianMenu title="Aloha!" >
          <p> this p tag is the "props.children" for the AccordianMenu component </p>
        </AccordianMenu>
      </div>
    );
  }
}

export default App;
```

</details>

## Black Diamond

Create these same higher-order components using render props instead.

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250">
</p>
