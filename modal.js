import React, { Component } from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const api = {}
exports.CallModal = api;
exports.connectCallModal = function(WrappedComponent) {
  return class extends Component {
    state = {
      animationType: 'slide',
      visible: false,
      onModalClose: () => {},
      content: () => {},
      closeWhenPressBackground: false,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }
    componentDidMount() {
      api.show = this.show;
    }
    handleBackgroundPress = () => {
      if (this.state.closeWhenPressBackground) {
        this.handleCloseModal();
      }
    }

    handleContentPress = () => {
      return false;
    }
    handleCloseModal = () => {
      this.state.onModalClose();
      this.setState({
        animationType: 'slide',
        visible: false,
        onModalClose: () => {},
        content: () => {},
        closeWhenPressBackground: false,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      });
    }

    show = async (property) => {
      return new Promise((resolve, reject) => {
        if(typeof property.renderFunction !== 'function') {
          return reject(new Error('Require property: renderFunction'));
        }
        this.setState({
          visible: true,
          content: property.renderFunction,
          onModalClose: resolve,
          backgroundColor: property.backgroundColor || 'rgba(0, 0, 0, 0.3)',
          closeWhenPressBackground: property.closeWhenPressBackground,
        });
      }) 
    }

    render() {
      const Content = this.state.content;

      return (
        <View style={styles.container}>
          <WrappedComponent {...this.props} />
          <Modal
            transparent
            animationType={this.state.animationType}
            visible={this.state.visible}
            onRequestClose={() => {}}
          >
            <TouchableWithoutFeedback onPress={this.handleBackgroundPress}>
              <View
                style={[styles.modalBackground, {
                  backgroundColor: this.state.backgroundColor,
                }]}
              >
                <TouchableWithoutFeedback onPress={this.handleContentPress}>
                  <Content requestCloseModal={this.handleCloseModal} />
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      );
    }
  }
}

module.exports = exports;