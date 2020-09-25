import React from 'react';
import { Image, StyleSheet, Text, View, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Card } from './Card';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export function Product({ product, onPress }) {
  const { colors } = useTheme();

  const LinkingURL = async () => {
    await Linking.openURL(product.url).catch((err) => alert('An error occurred', err));
  }

  return (
    <Card key={product.id} style={styles.card} onPress={LinkingURL}>
      <Image
        style={styles.thumb}
        source={{ uri: product.urlToImage }}
      />
      <View style={styles.infoContainer}>
        <Text style={{
          color: colors.text,
          fontSize: responsiveScreenFontSize(2),
          fontWeight: 'bold',
          marginBottom: responsiveScreenHeight(0.9),
        }}>{product.title}</Text>
        {
          product.description == '' || product.description == null
            ?
            <Text style={{
              color: colors.text,
              fontSize: responsiveScreenFontSize(1.8),
              fontWeight: '600',
              marginBottom: responsiveScreenHeight(0.9),
            }}>No Description</Text>
            :
            <Text ellipsizeMode={'tail'}
              numberOfLines={3}
              style={{
                color: colors.text,
                fontSize: responsiveScreenFontSize(1.9),
                fontWeight: '600',
                marginBottom: responsiveScreenHeight(0.9),
              }}>{product.description}</Text>
        }
        <Text style={{
          color: colors.text,
          fontSize: responsiveScreenFontSize(1.9),
          fontWeight: '400',
          marginBottom: responsiveScreenHeight(0.9),
        }}>{product.publishedAt}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    height: responsiveScreenHeight(50),
    width: responsiveScreenWidth(100),
    borderRadius: responsiveScreenHeight(1.8),
    marginVertical: responsiveScreenHeight(1.5),
    elevation: 15,
    shadowRadius: 26,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10,
    },
  },
  thumb: {
    height: responsiveScreenHeight(28),
    width: responsiveScreenWidth(100),
    borderTopLeftRadius: responsiveScreenHeight(1.8),
    borderTopRightRadius: responsiveScreenHeight(1.8),
  },
  infoContainer: {
    padding: 16,
  },
});
