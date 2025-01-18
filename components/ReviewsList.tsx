import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ReviewProps } from '../types/PlacesTypes';
import Review from '../components/Review';
import { StyledText } from './ui/StyledText';
import { breakpoints, useWindowWidth } from '../hooks/useWindowWidth';
import { useFetchReviewsByPlace } from '../hooks/queries/useFetchReviewsbyPlace';

interface ReviewsListProps {
  google_place_id: string;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ google_place_id }) => {
  const windowWidth = useWindowWidth();
  const { data: reviews, isLoading } = useFetchReviewsByPlace(google_place_id);

  return (
    <View style={styles.reviewsContainer}>
      <View style={styles.header}>
        <StyledText bold uppercase fontSize={'lg'} align={'center'}>
          Reviews
        </StyledText>
      </View>
      <View style={styles.gridContainer}>
        {reviews
          ? reviews.map((item) => (
            <View
              key={item.author_url}
              style={[
                styles.gridItem,
                { width: windowWidth > breakpoints.small ? '49%' : '100%' },
              ]}>
              <Review reviewText={item.text} rating={item.rating} />
            </View>
          ))
          : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewsContainer: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: '3%',
    paddingVertical: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
  },
  gridItem: {
    width: '50%',
    marginBottom: 20,
  },
});

export default ReviewsList;
