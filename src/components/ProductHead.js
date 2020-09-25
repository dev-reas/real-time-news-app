import React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Card } from './Card';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export function ProductHead({ productHead, onPress }) {
  const { colors } = useTheme();

  const LinkingURL = async () => {
    await Linking.openURL(productHead.url).catch((err) => console.error('An error occurred', err));
  }

  return (
    <Card key={productHead.id} style={styles.card} onPress={LinkingURL}>
      <View style={styles.infoContainer}>
        <Text
          ellipsizeMode={'tail'}
          numberOfLines={4}
          style={{
            color: colors.text,
            fontSize: responsiveScreenFontSize(2),
            fontWeight: 'bold',
            marginBottom: responsiveScreenHeight(1)
          }}>{productHead.title}</Text>
        <Text style={{
          color: colors.text,
          fontSize: responsiveScreenFontSize(2),
          fontWeight: '600',
          marginBottom: responsiveScreenHeight(1),
        }}>{productHead.published}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(16),
    borderRadius: responsiveScreenHeight(1.8),
    marginVertical: responsiveScreenHeight(1),
    elevation: 5,
    shadowRadius: 26,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10,
    },
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    padding: responsiveScreenHeight(2),
  },
});
