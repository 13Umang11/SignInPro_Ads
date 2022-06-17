import React, {useRef, useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import NativeAdView, {
  IconView,
  CallToActionView,
  HeadlineView,
  PriceView,
  StarRatingView,
  StoreView,
  TaglineView,
  ImagePropsWithOptionalSource,
} from 'react-native-admob-native-ads';
const {width} = Dimensions.get('screen');
export default function NativeAds() {
  const [Nativedata, setnativeaddata] = useState({});
  const nativeAdViewRef = useRef();

  useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <NativeAdView
      style={{borderWidth: 2, borderRadius: 10}}
      ref={nativeAdViewRef}
      adUnitID="ca-app-pub-3940256099942544/2247696110"
      onAdLoaded={() => {
        console.log('Loaded');
      }}
      onAdFailedToLoad={e => {
        console.log(e);
      }}
      onNativeAdLoaded={() => {
        console.log('Loaded');
      }}>
      <View
        style={{
          padding: 10,
          borderWidth: 2,
          borderRadius: 10,
          marginHorizontal: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <IconView style={{height: 100, width: 100}} />
          <View style={{marginHorizontal: 10}}>
            <HeadlineView style={{fontSize: 20}} />
            <View style={{flexDirection: 'row'}}>
              <PriceView style={{color: 'green', marginRight: 20}} />
              <StoreView />
            </View>
            {/* <StarRatingView /> */}
            <TaglineView style={{width: 190}} />
          </View>
        </View>
        <CallToActionView
          style={{height: 50, width: width - 45}}
          textStyle={{fontSize: 12}}
        />
      </View>
    </NativeAdView>
  );
}
