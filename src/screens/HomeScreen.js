import React from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView, RefreshControl } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { UserContext } from '../Context/UserContext';
import { Product } from '../components/Product';
import { ProductHead } from '../components/ProductHead';
import axios from 'axios';
import { FlatlistHeader } from '../components/FlatlistHeader';
import { Header } from '../components/Header';
import { DrawerActions } from '@react-navigation/native';
import { MyCarousel } from '../components/MyCarousel';
import { useTheme } from '@react-navigation/native';
import { BASE_URL } from '../config';
import { AntDesign } from '@expo/vector-icons';
import { SimpleAnimation } from 'react-native-simple-animations';
import { Button } from 'react-native-paper';
import { MyActionButton } from '../components/MyActionButton';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth
} from 'react-native-responsive-dimensions';

export function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { logout } = React.useContext(AuthContext);
  const user = React.useContext(UserContext);
  const [products, setProducts] = React.useState();
  const [head, setHead] = React.useState();
  const [TC, setTC] = React.useState();
  const [NC, setNC] = React.useState();
  const [TD, setTD] = React.useState();
  const [TR, setTR] = React.useState();
  const [date, setDate] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const APIStats = async () => {
    await axios.get(`${BASE_URL}/api/covid`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      setTC(data.TotalConfirmed);
      setTD(data.TotalDeaths);
      setNC(data.NewConfirmed);
      setTR(data.TotalRecovered);
      setDate(data.Date);
      setLoading(false);
    })
  }

  const HeadNews = async () => {
    await axios.get(`${BASE_URL}/api/headnews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      setHead(data);
      setLoading(false);
    })
  }

  const PHNews = async () => {
    await axios.get(`${BASE_URL}/api/news`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(({ data }) => {
      setProducts(data);
      setLoading(false);
    })
  }

  React.useEffect(() => {
    APIStats();
    HeadNews();
    PHNews();
  }, [token])

  const OpenMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  function renderProduct({ item: product }) {
    return (
      <SimpleAnimation delay={500} useNativeDriver={true} fade
        duration={500} staticType={'zoom'}>
        <Product
          product={product}
        />
      </SimpleAnimation>
    );
  }

  function renderHead({ item: productHead }) {
    return (
      <SimpleAnimation delay={500} useNativeDriver={true} fade
        duration={500} staticType={'zoom'}>
        <ProductHead
          productHead={productHead}
        />
      </SimpleAnimation>
    );
  }

  return (
    <>
      <Header name={'menu'} onPress={OpenMenu} />
      <ScrollView nestedScrollEnabled={true}
        refreshControl={<RefreshControl refreshing={loading}
          onRefresh={() => APIStats(), () => HeadNews(), () => PHNews()} />}>
        <MyCarousel />
        <View style={{
          padding: 12,
          width: responsiveScreenWidth(100),
          height: responsiveScreenHeight(18),
          borderColor: colors.borderColor,
          borderBottomWidth: responsiveScreenHeight(0.1),
        }}>
          <Text style={{
            textAlign: 'center',
            fontWeight: '900',
            fontSize: responsiveScreenFontSize(4),
            fontFamily: 'serif',
            color: colors.text
          }}>Covid Statistics</Text>
          <Text style={{
            textAlign: 'center',
            fontSize: responsiveScreenFontSize(1.5),
            marginBottom: responsiveScreenHeight(1.5),
            color: colors.text
          }}>{date}</Text>
          <View style={styles.stats}>
            <View style={styles.columnStats}>
              <Text style={{
                textAlign: 'center',
                color: '#f4a261',
                fontSize: responsiveScreenFontSize(1.9)
              }}>
                Total Cases
                </Text>
            </View>
            <View style={styles.columnStats}>
              <Text style={{
                textAlign: 'center',
                color: '#f4a261',
                fontSize: responsiveScreenFontSize(1.9)
              }}>
                {TC}
              </Text>
            </View>
            <View style={styles.columnStats}>
              <Text style={{
                textAlign: 'center',
                color: '#74c69d',
                fontSize: responsiveScreenFontSize(1.9)
              }}>
                Total Recovered
                </Text>
            </View>
            <View style={styles.columnStats}>
              <Text style={{
                textAlign: 'center',
                color: '#74c69d',
                fontSize: responsiveScreenFontSize(1.9)
              }}>
                {TR}
              </Text>
            </View>
          </View>
          <View style={styles.stats}>
            <View style={styles.columnStats}>
              <Text style={{
                textAlign: 'center',
                color: '#e26d5c',
                fontSize: responsiveScreenFontSize(1.9)
              }}>
                New Cases
                </Text>
            </View>
            <View style={styles.columnStats}>
              <Text style={{
                textAlign: 'center',
                color: '#e26d5c',
                fontSize: responsiveScreenFontSize(1.9)
              }}>
                {NC}
              </Text>
            </View>
            <View style={styles.columnStats}>
              <Text style={{
                textAlign: 'center',
                color: '#e26d5c',
                fontSize: responsiveScreenFontSize(1.9)
              }}>
                Total Deaths
                </Text>
            </View>
            <View style={styles.columnStats}>
              <Text style={{
                textAlign: 'center',
                color: '#e26d5c',
                fontSize: responsiveScreenFontSize(1.9)
              }}>
                {TD}
              </Text>
            </View>
          </View>
        </View>
        <FlatlistHeader title={'News around the world'} />
        <FlatList
          contentContainerStyle={styles.productsListContainer1}
          data={head}
          renderItem={renderHead}
          keyExtractor={item => { item.id }}
          ListFooterComponent={
            <>
              <View style={{ marginBottom: responsiveScreenHeight(0.5) }}>
                <Button style={{ width: responsiveScreenWidth(100), color: colors.primary }}
                  icon={() => (
                    <AntDesign name="doubleright" size={responsiveScreenFontSize(3)}
                      color={colors.primary} />
                  )}
                  labelStyle={{ color: colors.primary, fontSize: responsiveScreenFontSize(2) }}
                  mode="text" onPress={() => { navigation.navigate('World News'); }}>
                  View all news around the world
              </Button>
              </View>
              <FlatlistHeader title={'Latest News in PH'} />
              <FlatList
                contentContainerStyle={styles.productsListContainer2}
                data={products}
                renderItem={renderProduct}
                keyExtractor={item => { item.id }}
                ListFooterComponent={
                  <>
                    <View style={{ marginBottom: responsiveScreenHeight(2) }}>
                      <Button style={{ width: responsiveScreenWidth(100), color: colors.primary }}
                        icon={() => (
                          <AntDesign name="doubleright" size={responsiveScreenFontSize(3)}
                            color={colors.primary} />
                        )}
                        labelStyle={{ color: colors.primary, fontSize: responsiveScreenFontSize(2) }}
                        mode="text" onPress={() => { navigation.navigate('PH News'); }}>
                        View all news in Philippines
                      </Button>
                    </View>
                  </>
                }
              /></>}
        />
      </ScrollView>
      <MyActionButton
        AboutPressHandler={() => { navigation.push('About'); }}
        ProfilePressHandler={() => { navigation.push('Profile'); }}
        PostPressHandler={() => { navigation.push('Post'); }} />
    </>
  );
}

const styles = StyleSheet.create({
  productsListContainer: {
    width: responsiveScreenWidth(100),
  },

  stats: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },

  columnStats: {
    flexDirection: 'column',
    padding: responsiveScreenWidth(1),
  },

  textContainer: {
    backgroundColor: 'black'
  },
});
