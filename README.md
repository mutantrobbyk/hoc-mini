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

Now we will create a higher-order component that will add form logic to any form component.  That way we only have to write the logic once (hanldling input change and submitting the form), and we can add it to any form component

### Step 1

- Inside the HOCs folder, create the following file:
  - withForm.js
- Import `React` and `Component`.
- Create a function `withForm` that takes in a component as it's parameter `WrappedComponent` and returns a class component with the following 3 methods:
  - handleChange
  ```js
  handleChange = e => {
    let { value, name } = e.target
    
    this.setState({
      [name]: value
    })
  }
  ```
  - handleSubmit
  ```js
  handleSumbit = e => {
    this.props.handleSubmit(this.state)
  }
  ```
  - render
  ```jsx
  render() {
    let form = {
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit
    }

    return <WrappedComponent
              form={form}
              { ...this.props } />
  }
  ```
- Notice that the render method is returning the component that was passed into the `withForm` HOC.
- Also, we put the methods we want to pass as props to the `WrappedComponent` on an object named `form`.  This will help us make sure we aren't interfering with other prop names that are being passed on.


### Solution

<details>

<summary> <code> ./src/HOCs/withForm.js </code> </summary>

```jsx
import React, { Component } from 'react'

export default function(WrappedComponent) {
  return class WithForm extends Component {
    handleChange = e => {
      let { value, name } = e.target
      
      this.setState({
        [name]: value
      })
    }

    handleSubmit = e => {
      this.props.handleSubmit(this.state)
    }

    render() {
      let form {
        handleChange: this.handleChange,
        handleSubmit: this.handleSubmit
      }

      return <WrappedComponent 
                form={form}
                { ...this.props } />
    }
  }
}
```

</details>

### Step 2

- Inside the components folder, create the following files:
  - LoginForm.js
  - RegistrationForm.js
- In `LoginForm.js` import `React` and `withForm`.  Then, create a functional component `LoginForm`, that returns the following:
  ```jsx
  ( 
    <div>
      <h1>Login Form</h1>
      <input 
        type="text" 
        name="email" 
        placeholder="email"
        onChange={props.form.handleChange}/>
      <input 
        type="text" 
        name="password" 
        placeholder="password"
        onChange={props.form.handleChange}/>
      <button onClick={props.form.handleSubmit}>submit</button>
    </div>
  )
  ```
- Create a new component by invoking `withForm` and passing in `LoginForm`.  This new component will be the `export default`.
- In `RegistrationForm.js` import `React` and `withForm`.  Create a functional component `RegistrationForm`, that returns:
  ```jsx
  (
    <div>
      <h1>Registration Form</h1>
      <input 
        type="text" 
        name="name" 
        placeholder="name"
        onChange={props.form.handleChange}/>
      <input 
        type="text" 
        name="email" 
        placeholder="email"
        onChange={props.form.handleChange}/>
      <input 
        type="text" 
        name="password" 
        placeholder="password"
        onChange={props.form.handleChange}/>
      <input 
        type="text" 
        name="confirmPassword" 
        placeholder="confirm Password"
        onChange={props.form.handleChange}/>
      <button onClick={props.form.handleSumbit}>submit</button>
    </div>
  )
  ```
- Create a new component by invoking `withForm` and passing in `RegistrationForm`.  This new component will be the `export default`.
- Notice the `name` attribute on each of the `input` elements.  We are using the `name` attribute in the `withForm` HOC as the key for the object we pass into `setState` in the `handleChange` method.

### Solution

<details>

<summary> <code> ./src/components/LoginForm.js </code> </summary>

```jsx
import React from 'react'

import withForm from '../HOCs/withForm'

function LoginForm(props) {
  return (
    <div>
      <h1>Login Form</h1>
      <input 
        type="text" 
        name="email" 
        placeholder="email"
        onChange={props.form.handleChange}/>
      <input 
        type="text" 
        name="password" 
        placeholder="password"
        onChange={props.form.handleChange}/>
      <button onClick={props.form.handleSubmit}>submit</button>
    </div>
  )
}

export default withForm(LoginForm)
```

</details>

<details>

<summary> <code> ./src/components/RegistrationForm.js </code> </summary>

```jsx
import React from 'react'

import withForm from '../HOCs/withForm'

function RegistrationForm(props) {
  return (
    <div>
      <h1>Registration Form</h1>
      <input 
        type="text" 
        name="name" 
        placeholder="name"
        onChange={props.form.handleChange}/>
      <input 
        type="text" 
        name="email" 
        placeholder="email"
        onChange={props.form.handleChange}/>
      <input 
        type="text" 
        name="password" 
        placeholder="password"
        onChange={props.form.handleChange}/>
      <input 
        type="text" 
        name="confirmPassword" 
        placeholder="confirm Password"
        onChange={props.form.handleChange}/>
      <button onClick={props.form.handleSubmit}>submit</button>
    </div>
  )
}

export default withForm(RegistrationForm)
```

</details>

### Step 3

- In App.js, bring in our newly created `LoginForm` and `RegistrationForm` components and add them to the jsx code in the render method.
- Pass a prop to both components called `handleSubmit` with a function that takes in a parameter `formData` and logs it to the console.

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```jsx
import React, { Component } from 'react';
import './App.css';

import SuperSecret from './components/SuperSecret'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SuperSecret isAuthenticated={true}/>
        <LoginForm handleSubmit={formdata => console.log('form data:', formData)} />
        <RegistrationForm handleSubmit={formdata => console.log('form data:', formData)} />
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
