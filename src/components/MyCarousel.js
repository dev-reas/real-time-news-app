import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    ImageBackground,
} from 'react-native';
import {
    responsiveScreenFontSize,
    responsiveScreenHeight,
    responsiveScreenWidth
} from "react-native-responsive-dimensions";

const ENTRIES1 = [
    {
        title: "COVID-19 Precaution tips",
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://images.unsplash.com/photo-1588776398748-f21b1971bd89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
    },
    {
        title: 'Sneeze and cough? Cover your nose and mouth',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://images.unsplash.com/photo-1584556812945-a6830379555b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    },
    {
        title: 'Always wear a mask',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://images.unsplash.com/photo-1583946099379-f9c9cb8bc030?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
    },
    {
        title: 'Wash your hands for atleast 20secs',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://images.unsplash.com/photo-1588780456980-3032256f910a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80',
    },
    {
        title: 'Physical distancing matters',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://images.unsplash.com/photo-1588783944013-032832fba89c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=332&q=80',
    },
    {
        title: 'Always stay at home!',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://images.unsplash.com/photo-1588781553983-474ccfee18bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80',
    },
    {
        title: 'Stoping Covid-19 is in your hands',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://images.unsplash.com/photo-1588774210246-a1dc467758df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80',
    },
];



export function MyCarousel() {
    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);

    useEffect(() => {
        setEntries(ENTRIES1);
    }, []);


    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ImageBackground
                    source={{ uri: item.illustration }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#333533',
                    padding: responsiveScreenWidth(3),
                    opacity: 0.7,
                    borderRadius: responsiveScreenWidth(6) / 2,
                    elevation: 20,
                }}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                </View>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <Carousel
                ref={carouselRef}
                sliderWidth={responsiveScreenWidth(100)}
                sliderHeight={responsiveScreenWidth(100)}
                itemWidth={responsiveScreenWidth(100)}
                data={entries}
                renderItem={renderItem}
                hasParallaxImages={true}
                layout={'default'}
                autoplay={true}
                autoplayDelay={1000}
                autoplayInterval={5000}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        height: responsiveScreenHeight(24),
    },
    item: {
        width: responsiveScreenWidth(100),
        height: responsiveScreenHeight(24.5),
        justifyContent: "center",
        alignItems: "center",
        shadowColor: '#e98a15',
        shadowOffset: {
            height: 1000,
            width: 1000,
        },
        elevation: 20,
    },
    imageContainer: {
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        overflow: "hidden",
        shadowColor: '#e98a15',
        elevation: 20,
    },
    title: {
        color: '#e8eddf',
        fontWeight: '500',
        fontFamily: 'sans-serif',
        fontSize: responsiveScreenFontSize(2),
        elevation: 20,
    }
});