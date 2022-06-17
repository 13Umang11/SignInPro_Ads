import React, {useRef, useEffect, useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import NativeAdView, {
  IconView,
  VideoOptions,
  HeadlineView,
  PriceView,
  StarRatingView,
  StoreView,
  TaglineView,
  CallToActionView,
  NativeMediaView,
  TestIds,
  AdBadge,
} from 'react-native-admob-native-ads';

export default function NativeAds() {
  const {height, width} = Dimensions.get('screen');
  const nativeAdViewRef = useRef();

  useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  const onVideoPlay = data => {
    console.log(data);
    // Logger('VIDEO', 'PLAY', 'Video is now playing');
  };

  const onVideoPause = data => {
    console.log(data);
    // Logger('VIDEO', 'PAUSED', 'Video is now paused');
  };

  const onVideoProgress = event => {
    console.log(event);
    // Logger('VIDEO', 'PROGRESS UPDATE', event);
  };

  const onVideoEnd = data => {
    console.log(data);
    // Logger('VIDEO', 'ENDED', 'Video end reached');
  };

  const onVideoMute = muted => {
    console.log(muted);
    // Logger('VIDEO', 'MUTE', muted);
  };

  return (
    <NativeAdView
      style={{borderWidth: 2, borderRadius: 10}}
      ref={nativeAdViewRef}
      adUnitID={(TestIds.Video, TestIds.Image)}
      onAdLoaded={() => {
        console.log('Loaded');
      }}
      onAdFailedToLoad={e => {
        console.log(e);
      }}
      onNativeAdLoaded={data => console.log(data)}>
      <View
        style={{
          padding: 10,
          borderWidth: 2,
          borderRadius: 10,
          marginHorizontal: 10,
        }}>
        {/* <Image source={{uri : }} />  */}

        <NativeMediaView
          style={{
            marginLeft: -5,
            width: width / 1.12,
            height: height / 5,
            backgroundColor: 'white',
          }}
          onVideoStart={() => alert('start')}
          onVideoPause={onVideoPause}
          onVideoPlay={onVideoPlay}
          onVideoEnd={onVideoEnd}
          onVideoProgress={onVideoProgress}
          onVideoMute={onVideoMute}
        />

        <View style={{flexDirection: 'row'}}>
          <IconView style={{height: 100, width: 100}} />
          <View style={{marginHorizontal: 10}}>
            <HeadlineView style={{fontSize: 18}} />
            <View style={{flexDirection: 'row'}}>
              <PriceView style={{color: 'green', marginRight: 20}} />
              <StoreView />
            </View>
            {/* <StarRatingView /> */}
            <TaglineView style={{width: 200}} />
          </View>
        </View>

        <AdBadge style={{margin: 10}} />

        <CallToActionView
          style={{height: 50, width: width - 45}}
          textStyle={{fontSize: 12}}
        />
      </View>
    </NativeAdView>
  );
}
