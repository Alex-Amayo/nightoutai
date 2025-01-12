import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  Image,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import StyledTextInput from '../../../components/ui/StyledTextInput'; // Using the custom StyledTextInput component
import { ThemeContext } from '../../../theme/theme';
import Message from '../../../components/Message';
import Footer from '../../../components/ui/Footer';
import { breakpoints, useWindowWidth } from '../../../hooks/useWindowWidth';

const ChatPage = () => {
  const theme = useContext(ThemeContext);
  const [messages, setMessages] = useState<{ text: string; isSent: boolean }[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const windowWidth = useWindowWidth();
  const sendMessage = () => {
    if (currentMessage.trim()) {
      // Add the new message as a sent message
      setMessages([...messages, { text: currentMessage, isSent: true }]);
      setCurrentMessage(''); // Clear the input after sending the message

      // Simulate a received message after 1 second
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'This feature is in development.', isSent: false },
        ]);
      }, 1000);
    }
  };
  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.values.backgroundColor }]}>
      {/** Sent and Received Messages **/}
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={[
          { flexGrow: 1, justifyContent: messages.length > 0 ? 'flex-end' : 'center' },
        ]}>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Message key={index} text={message.text} isSent={message.isSent} />
          ))
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require('../../../assets/Jeff.webp')}
              style={{
                width: windowWidth > breakpoints.small ? 200 : 100,
                height: windowWidth > breakpoints.small ? 200 : 100,
                borderRadius: 125, // 100% borderRadius is not supported in React Native
                marginVertical: 10,
              }}
            />
            <Text style={[styles.noMessages, { color: theme.values.color }]}>
              Chat with Jeff – Your AI Nightlife Guide
            </Text>
          </View>
        )}
      </ScrollView>

      {/** Text Input and Send Button wrapped in KeyboardAvoidingView **/}
      <KeyboardAvoidingView
        keyboardVerticalOffset={125}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.values.backgroundColor,
              borderColor: theme.values.borderColor,
            },
          ]}>
          <StyledTextInput
            value={currentMessage}
            onChangeText={setCurrentMessage}
            placeholder="Type your message..."
            onKeyPress={handleKeyPress}
            onPressSend={sendMessage} // This uses the custom StyledTextInput with the IconButton
          />
        </View>
      </KeyboardAvoidingView>
      {Platform.OS === 'web' && <Footer />}
    </View>
  );
};

export default ChatPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  noMessages: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 500,
  },
  inputContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
