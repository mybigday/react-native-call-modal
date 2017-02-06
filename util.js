import _ from 'lodash';
import { CallModal } from './modal';
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const MODAL_WIDTH = Dimensions.get('window').width / 2;
const MODAL_HEIGHT = Dimensions.get('window').height / 2;
const MODAL_RADIUS = 5;
const FONT_SIZE = 15;
const FONT_COLOR = '#FFF';
const ITEM_HEIGHT = 40;
const ITEM_PADDING = 5;

const OK_TEXT = 'OK';
const CANCEL_TEXT = 'CANCEL';

const defaultContainerRender = (props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 0,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      width: MODAL_WIDTH,
      borderRadius: MODAL_RADIUS,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
  });
  return (
    <View style={styles.container}>
      {props.children}
    </View>
  );
}

const defaultItemRender = (props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 0,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      minHeight: ITEM_HEIGHT,
      borderBottomWidth: 1,
      borderBottomColor: FONT_COLOR,
      padding: ITEM_PADDING,
    },
    last: {
      borderBottomWidth: 0,
    },
    text: {
      color: FONT_COLOR,
      fontSize: FONT_SIZE,
      textAlign: 'center',
    },
  });
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={[styles.container, props.last && styles.last]}>
        <Text
          style={[styles.text, props.textStyle]}
          numberOfLines={props.numberOfLines}
          ellipsizeMode={'middle'}
        >
          {props.text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const defaultTitleRender = (props) => {
  const Item = defaultItemRender;
  const styles = StyleSheet.create({
    text: {
      fontSize: FONT_SIZE * 1.4,
      fontWeight: 'bold',
    },
  });
  return (
    <Item
      numberOfLines={1}
      textStyle={styles.text}
      {...props}
    />
  );
}

const titleYesNoRender = ({ title, message, okText, cancelText, onOk, onCancel, children, Container, Title, Item }) => {
  return (
    <Container>
      {
        !!title && <Title text={title} />
      }
      {
        !!message && <Item text={message} />
      }
      {children}
      {
        !!onOk && <Item
          last={!onCancel}
          onPress={onOk}
          text={okText}
        />
      }
      {
        !!onCancel && <Item
          last
          onPress={onCancel}
          text={cancelText}
        />
      }
    </Container>
  );
}

const defaultArgs = (args) => {
  const result = {
    title: '',
    message: '',
    inputType: 'text',
    okText: OK_TEXT,
    cancelText: CANCEL_TEXT,
    Container: defaultContainerRender,
    Title: defaultTitleRender,
    Item: defaultItemRender,
  };
  if (_.isString(args)) {
    Object.assign(result, {
      message: args,
    });
  } else if (_.isObject(args)) {
    Object.assign(result, args);
  }
  return result;
}

exports.alert = async function(args) {
  const TitleYesNo = titleYesNoRender;
  return await CallModal.show({
    renderFunction: (props) => (
      <TitleYesNo
        {...defaultArgs(args)}
        onOk={props.requestCloseModal}
      />
    )
  });
}

exports.confirm = async function(args) {
  return new Promise((resolve, reject) => {
    const TitleYesNo = titleYesNoRender;
    CallModal.show({
      renderFunction: (props) => (
        <TitleYesNo
          {...defaultArgs(args)}
          onOk={() => {
            props.requestCloseModal();
            resolve(true);
          }}
          onCancel={() => {
            props.requestCloseModal();
            resolve(false);
          }}
        />
      )
    });
  });
}

class TextInputPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.value || '',
    }
  }
  styles = StyleSheet.create({
    container: {
      flex: 0,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
      minHeight: ITEM_HEIGHT,
      borderBottomWidth: 1,
      borderBottomColor: FONT_COLOR,
      padding: ITEM_PADDING,
    },
    input: {
      minHeight: ITEM_HEIGHT,
      color: FONT_COLOR,
      fontSize: FONT_SIZE,
      textAlign: 'center',
      padding: 0,
    },
  });
  handleChangeText = (text) => {
    this.props.onChangeValue(text);
    this.setState({text});
  }
  render() {
    return (
      <View style={this.styles.container}>
        <TextInput
          style={this.styles.input}
          onChangeText={this.handleChangeText}
          value={this.state.text}
        />
      </View>
    );
  }
}

class CheckBoxPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionList: props.value || [],
    }
  }
  render() {
    const Item = defaultItemRender;
    return (
      <View>
        {
          _.map(this.state.selectionList, ({ key, value, selected }, index) => (
            <Item
              key={key}
              last={this.props.autoSubmit && index === this.state.selectionList.length - 1}
              onPress={() => {
                let newSelectionList;
                if (this.props.multiple) {
                  newSelectionList = _.map(this.state.selectionList, (selection) => {
                    let result = Object.assign({}, selection);
                    if (selection.key === key) {
                      Object.assign(result, {
                        selected: !selection.selected,
                      });
                    }
                    return result;
                  });
                  this.setState({
                    selectionList: newSelectionList,
                  });
                  this.props.onChangeValue(newSelectionList);
                } else {
                  newSelectionList = _.map(this.state.selectionList, (selection) => {
                    let result = {
                      key: selection.key,
                      value: selection.value,
                    };
                    if (selection.key === key) {
                      Object.assign(result, {
                        selected: true,
                      });
                    }
                    return result;
                  });
                }
                this.setState({
                  selectionList: newSelectionList,
                });
                this.props.onChangeValue(newSelectionList);
              }}
              text={`${(selected === true)?'V ': ''}${value}`}
            />
          ))
        }
      </View>
    );
  }
}

exports.prompt = async function(args) {
  return new Promise((resolve, reject) => {
    const TitleYesNo = titleYesNoRender;
    const input = defaultArgs(args);
    CallModal.show({
      renderFunction: class extends Component {
        constructor(props) {
          super(props);
          this.state = {
            value: props.value,
          }
        }
        handleValueChange = (value) => {
          this.setState({value});
          if (input.autoSubmit) {
            this.submitValue(value);
          }
        };
        handleSubmit = (value) => {
          this.submitValue(this.state.value);
        };
        handleCancel = () => {
          this.props.requestCloseModal();
          resolve();
        };
        submitValue = (value) => {
          this.props.requestCloseModal();
          let result = value;
          if (!_.isString(result)) {
            result = _.filter(result, ['selected', true]);
            result = _.map(result, 'key').join(',');
          }
          resolve(result);
        };
        render() {
          let content;
          switch(input.inputType){
            case 'text':
              content = (
                <TextInputPrompt
                  value={input.value}
                  onChangeValue={this.handleValueChange}
                />
              );
              break;
            case 'checkbox':
              content = (
                <CheckBoxPrompt
                  multiple
                  value={input.value}
                  onChangeValue={this.handleValueChange}
                />
              );
              break;
            case 'select':
              content = (
                <CheckBoxPrompt
                  autoSubmit={input.autoSubmit}
                  value={input.value}
                  onChangeValue={this.handleValueChange}
                />
              );
              break;
          }
          return (
            <TitleYesNo
              {...input}
              onOk={!input.autoSubmit && this.handleSubmit}
              onCancel={!input.autoSubmit && this.handleCancel}
            >
              {content}
            </TitleYesNo>
          )
        }
      }
    });
  });
}

module.exports = exports;