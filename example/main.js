import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { CallModal, CallModalUtil, connectCallModal } from '@fugood/react-native-call-modal';

@connectCallModal
class App extends React.Component {
  state = {
    message: '',
  }
  render() {
    const list = [{
      title: 'Simple Alert',
      icon: { type: 'foundation', name: 'alert' },
      handlePress: () => {
        CallModalUtil.alert('Hello Modal!!!');
      }
    }, {
      title: 'Customize Ok Button',
      icon: { type: 'font-awesome', name: 'language' },
      handlePress: () => {
        CallModalUtil.alert({
          title: '您的手機即將起飛',
          okText: '好的',
        });
      }
    }, {
      title: 'Confirm box',
      icon: { type: 'font-awesome', name: 'question-circle' },
      handlePress: async () => {
        const result = await CallModalUtil.confirm('Do you like javascript?');
        this.setState({
          message: `Confirm result: ${result}`,
        });
      }
    }, {
      title: 'Prompt text input',
      icon: { type: 'material-icons', name: 'nature-people' },
      handlePress: async () => {
        const result = await CallModalUtil.prompt('Your name?');
        this.setState({
          message: `Prompt result: ${result}`,
        });
      }
    }, {
      title: 'Prompt select input',
      icon: { type: 'font-awesome', name: 'intersex' },
      handlePress: async () => {
        const result = await CallModalUtil.prompt({
          title: 'Gender',
          message: 'If you select you can\'t change this again.',
          inputType: 'select',
          value: [{
            key: 'women',
            value: 'Women'
          }, {
            key: 'man',
            value: 'Man'
          }]
        });
        this.setState({
          message: `Prompt result: ${result}`,
        });
      }
    }, {
      title: 'Prompt select input (Auto Submit)',
      icon: { type: 'font-awesome', name: 'intersex' },
      handlePress: async () => {
        const result = await CallModalUtil.prompt({
          title: 'Gender',
          message: 'If you select you can\'t change this again.',
          autoSubmit: true,
          inputType: 'select',
          value: [{
            key: 'women',
            value: 'Women'
          }, {
            key: 'man',
            value: 'Man'
          }]
        });
        this.setState({
          message: `Prompt result: ${result}`,
        });
      }
    }, {
      title: 'Prompt checkbox input',
      icon: { type: 'material-icons', name: 'color-lens' },
      handlePress: async () => {
        const result = await CallModalUtil.prompt({
          title: 'Color',
          inputType: 'checkbox',
          value: [{
            key: 'red',
            value: 'Red',
          }, {
            key: 'blue',
            value: 'Blue',
          }, {
            key: 'green',
            value: 'Green',
          }, {
            key: 'black',
            value: 'Black',
          }]
        });
        this.setState({
          message: `Prompt result: ${result}`,
        });
      }
    }, {
      title: 'Custom modal',
      icon: { type: 'font-awesome', name: 'certificate' },
      handlePress: async () => {
        CallModal.show({
          renderFunction: () => <View style={{width: 200, height: 300, backgroundColor: '#F00'}}><Text>{'Hello World!!!'}</Text></View>,
          backgroundColor: '#FF0',
          closeWhenPressBackground: true,
        });
      }
    }];
    return (
      <View style={styles.container}>
        <List style={styles.container}>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={item.icon}
                onPress={item.handlePress}
              />
            ))
          }
        </List>
        <View style={styles.result}>
          <Text style={styles.text}>
            {this.state.message}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    flex: 1,
    backgroundColor: '#333',
    padding: 10,
  },
  text: {
    color: '#CCC',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

Exponent.registerRootComponent(App);
