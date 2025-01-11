import React, { useContext, useState } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import StyledTextInput from '../../../components/ui/StyledTextInput'; // Using the custom StyledTextInput component
import { ThemeContext } from '../../../theme/theme';
import Message from '../../../components/Message';
import Footer from '../../../components/ui/Footer';

const ChatPage = () => {
  const theme = useContext(ThemeContext);
  const [messages, setMessages] = useState<{ text: string; isSent: boolean }[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const handleSendMessage = () => {
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

  return (
    <View style={[styles.container, { backgroundColor: theme.values.backgroundColor }]}>
      {/** Sent and Received Messages **/}
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={[
          { flexGrow: 1, justifyContent: messages.length > 0 ? 'flex-end' : 'center' },
        ]}
      >
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Message key={index} text={message.text} isSent={message.isSent} />
          ))
        ) : (
          <Text style={[styles.noMessages, { color: theme.values.color }]}>No messages yet</Text>
        )}
      </ScrollView>

      {/** Text Input and Send Button wrapped in KeyboardAvoidingView **/}
      <KeyboardAvoidingView
        keyboardVerticalOffset={110}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.inputContainer, { backgroundColor: theme.values.backgroundColor, borderColor: theme.values.borderColor }]}>
          <StyledTextInput
            value={currentMessage}
            onChangeText={setCurrentMessage}
            placeholder="Type your message..."
            onPressSend={handleSendMessage} // This uses the custom StyledTextInput with the IconButton
          />
        </View>
      </KeyboardAvoidingView>
      <Footer />
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
  },
  inputContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
