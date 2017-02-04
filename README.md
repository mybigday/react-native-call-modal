# React Native Call Modal
## Programmatically modal component control

## React Native Old World
Since react native is a property driven framework (It's really great!). Every component have to locate within render function, and control by `props`. Even THE special Modal component is not an exception.

```js
// Render function
<Madal visible={this.state.visible}>
    <Text>{'Show me the MODAL!'}</Text>
</Modal>

// Some other place
handleSomeThingPress = () => {
    this.setState({
        visible: true,
    });
}
```

Now we got a empty modal, if you want more feature with this modal... Good lock!

But sometimes we just want simply call `confirm()` then show panel and blocking the code wait user's response.

**React Native Call Modal** is born for this, this lib not only give you a callable modal but also provide you a set of modal utilities like: `alert()`, `confirm()`, `prompt()`. And it will add more useful feature for you. 

## Get Started

#### Step 1

Install react-native-call-modal

`npm i @fugood/react-native-call-modal --save`

#### Step 2

Initialize the provider to put the modal component at top.

```js
// At your root component
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { CallModal, CallModalUtil, connectCallModal } from '@fugood/react-native-call-modal';

@connectCallModal
export default class App extends Component {
    ...
}

AppRegistry.registerComponent('App', () => App);

```

#### Step 3

Call for use

```js
// Any where you like just call
await CallModalUtil.alert('Show me the ALERT');
console.log('User press OK');
```

Now you can see an beautiful modal (maybe...) jump out screen, with an OK button and custom message. Until user press the OK button the second line `console.log` will be execute.

If `alert()` can not meet you, there is `confirm()`, `prompt()` can help you.
