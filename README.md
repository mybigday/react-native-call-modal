# React Native Call Modal: Programmatically modal component control
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

const result = await CallModalUtil.confirm('Sure to logout?');
console.log(`Answer: ${result}`);

const name = await CallModalUtil.prompt('Enter your name');
console.log(`Hello: ${name}`);
```

Now you can see an beautiful modal (maybe...) jump out screen, with an OK button and custom message. Until user press the OK button the second line `console.log` will be execute.

If a simple `title` modal can not meet you, keep going!

## Advanced Usage
First argument can be a `string` or `object`, you can give an object to get more control.

#### Alert
| Name    | Type   | Description                      | Default |
|---------|--------|----------------------------------|---------|
| title   | string | Title text with bold font weight |         |
| message | string | Body text                        |         |
| okText  | string | Text show on confirm button      | "OK"    |

#### Confirm
| Name        | Type   | Description                      | Default  |
|-------------|--------|----------------------------------|----------|
| title       | string | Title text with bold font weight |          |
| message     | string | Body text                        |          |
| okText      | string | Text show on confirm button      | "OK"     |
| cancelText  | string | Text show on cancel button       | "CANCEL" |

#### Prompt
| Name                     | Type   | Description                                                                       | Default  |
|--------------------------|--------|-----------------------------------------------------------------------------------|----------|
| title                    | string | Title text with bold font weight                                                  |          |
| message                  | string | Body text                                                                         |          |
| okText                   | string | Text show on confirm button                                                       | "OK"     |
| cancelText               | string | Text show on cancel button                                                        | "CANCEL" |
| autoSubmit               | bool   | When select use to disable OK button                                              | false    |
| inputType                | string | One of `text`, `select`, `checkbox`, `action`                                     | "text"   |
| value (text)             | string | Default value of prompt, this must be a string value                              | ""       |
| value (select, checkbox) | string | Default value of prompt, this must be an array of `{ key: , value: }`             | []       |
| value (action)           | string | Default value of prompt, this must be an array of `{ key: , value: , onSelect: }` | []       |

## Customize Modal Usage
If you want customize all your modal and just want we open/close the modal for you. You can use `CallModal.show()` to get things done.

```js
// Notice: here is CallModal not CallModalUtil
CallModal.show({
  renderFunction: () => <View style={{width: 200, height: 300, backgroundColor: '#F00'}}><Text>{'Hello World!!!'}</Text></View>,
  backgroundColor: '#FF0',
  closeWhenPressBackground: true,
});

// Or a react class
CallModal.show({
  renderFunction: class extends Component {
    handleSubmit = () => {
      this.props.requestCloseModal();
    };
    render() {
      return (
        <View style={{width: 200, height: 300, backgroundColor: '#F00'}}>
          <TouchableWithoutFeedback onPress={this.props.handleSubmit}>
            ...
          </TouchableWithoutFeedback>
        </View>
      )
    }
  }
});

```

## Live Demo
![Exponent Live Demo](http://i.imgur.com/dAEWa0dl.png)

[Exponent Live Demo](https://exp.host/@pepper/react-native-call-modal-example)


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Roadmap

- [x] Basic modal
- [ ] Test coverage
- [ ] Custom modal
- [ ] Custom container, title, item, button render function
- [ ] QRCode modal

## Known Issues

## History

TODO: Write history

## Thanks

Inspired by:
* [react-native-action-sheet](https://github.com/exponent/react-native-action-sheet)
* [Bootbox.js](http://bootboxjs.com)

## License

[MIT](LICENSE.md)