import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import brand from '../brand/brandConfig';
import { StyledText } from './ui/StyledText';

interface MessageProps {
  text: string;
  isSent: boolean;
}

const Message = ({ text, isSent }: MessageProps): React.JSX.Element => {
  return (
    <View style={[styles.messageBubble, isSent ? styles.sentMessage : styles.receivedMessage]}>
      <StyledText color={isSent ? 'white' : 'black'}>{text}</StyledText>
      {isSent && <Feather name="check" size={16} color="white" style={styles.icon} />}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: brand.colors.primary,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  icon: {
    marginLeft: 8,
  },
});
