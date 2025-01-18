import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { StyledText } from './ui/StyledText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import brand from '../brand/brandConfig';
import { ThemeContext } from '../theme/theme';
import Card from './ui/Card';

interface ReviewProps {
  reviewText?: string;
  rating?: number;
}

export default function Review({ reviewText, rating }: ReviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getEmojiForRating = (rating: number) => {
    switch (rating) {
      case 5:
        return 'emoticon-excited';
      case 4:
        return 'emoticon-happy';
      case 3:
        return 'emoticon-confused';
      case 2:
        return 'emoticon-frown';
      case 1:
        return 'emoticon-poop';
      default:
        return 'emoticon';
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const theme = useContext(ThemeContext);

  return (
    <Pressable onPress={toggleExpand}>
      <Card>
        <View style={[styles.container, { backgroundColor: theme.values.cardBackgroundColor }]}>
          <View style={styles.ratingContainer}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={getEmojiForRating(rating ?? 3)}
                size={24}
                color={brand.colors.primary}
                style={styles.emojiIcon}
              />
            </View>
            <StyledText bold>Rating: {rating}/5</StyledText>
          </View>

          {/* Review Text */}
          <StyledText numberOfLines={isExpanded ? undefined : 3}>{reviewText}</StyledText>

          {/* Show More / Show Less */}
          <View style={styles.showMoreContainer}>
            <MaterialCommunityIcons
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={25}
              color={brand.colors.primary}
            />
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: brand.borderRadius,
    padding: 16,
    gap: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiIcon: {},
  iconContainer: {
    borderRadius: 100,
    marginRight: 5,
    padding: 2,
  },
  // Center the Show More / Show Less icon and text
  showMoreContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end', // Center content horizontally
    marginTop: 10,
  },
});
