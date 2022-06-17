import React, {useEffect, useState} from 'react';

import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import mobileAds, {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  RewardedAd,
  RewardedInterstitialAd,
} from 'react-native-google-mobile-ads';
import NativeAds from './NativeAds';
import NativeVideo from './NativeVideos';

export default function GoogleAds() {
  const interstitialPoster = InterstitialAd.createForAdRequest(
    'ca-app-pub-3940256099942544/1033173712',
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );

  const interstitialVideo = InterstitialAd.createForAdRequest(
    'ca-app-pub-3940256099942544/8691691433',
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );

  const rewarded = RewardedAd.createForAdRequest(
    'ca-app-pub-3940256099942544/5224354917',
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );

  const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
    'ca-app-pub-3940256099942544/5354046379',
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );

  useEffect(() => {
    interstitialPoster.load();
    interstitialVideo.load();
    rewarded.load();
    rewardedInterstitial.load();
    mobileAds()
      .setRequestConfiguration({
        testDeviceIdentifiers: [
          'ec3203f5-6ca7-44a4-9e4a-10ca1ad1abe1',
          'EMULATOR',
        ],
      })
      .then(data => {
        console.log('Request config successfully set!', data);
      });
  }, []);

  const sInterstitialAd = async () => {
    interstitialPoster.load();
    await interstitialPoster.show();
  };

  const sInterstitialAdVideo = async () => {
    interstitialVideo.load();
    await interstitialVideo.show();
  };

  const sRewardedAd = async () => {
    await rewarded.show().then(() => {
      rewarded.load();
    });
  };

  const sRewardedInterstitial = async () => {
    rewardedInterstitial.load();
    await rewardedInterstitial.show();
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 50,
          backgroundColor: '#fff',
          justifyContent: 'center',
          elevation: 5,
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 22, alignSelf: 'center'}}>Google Ads</Text>
      </View>
      <ScrollView>
        <BannerAd
          unitId={'ca-app-pub-3940256099942544/6300978111'}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
          onAdFailedToLoad={error => {
            console.error('Advert failed to load: ', error);
          }}
        />
        <Text style={{textAlign: 'center', marginVertical: 10}}>Banner AD</Text>
        <TouchableOpacity
          onPress={sInterstitialAd}
          style={{
            marginHorizontal: 15,
            marginVertical: 10,
            justifyContent: 'center',
            elevation: 3,
            backgroundColor: '',
            borderRadius: 100,
          }}>
          <Text style={{alignSelf: 'center', color: '#000', padding: 13}}>
            Interstitial Poster Ads
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={sInterstitialAdVideo}
          style={{
            marginHorizontal: 15,
            marginVertical: 10,
            justifyContent: 'center',
            elevation: 3,
            backgroundColor: '',
            borderRadius: 100,
          }}>
          <Text style={{alignSelf: 'center', color: '#000', padding: 13}}>
            Interstitial Video Ads
          </Text>
        </TouchableOpacity>
        <NativeAds />
        <Text style={{textAlign: 'center', marginVertical: 10}}>
          Native Advance Ads
        </Text>
        <TouchableOpacity
          onPress={sRewardedAd}
          style={{
            marginHorizontal: 15,
            marginVertical: 10,
            justifyContent: 'center',
            elevation: 3,
            backgroundColor: '',
            borderRadius: 100,
          }}>
          <Text style={{alignSelf: 'center', color: '#000', padding: 13}}>
            Rewarded Ads
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={sRewardedInterstitial}
          style={{
            marginHorizontal: 15,
            marginVertical: 10,
            justifyContent: 'center',
            elevation: 3,
            backgroundColor: '',
            borderRadius: 100,
          }}>
          <Text style={{alignSelf: 'center', color: '#000', padding: 13}}>
            Rewarded Interstitial Ads Video
          </Text>
        </TouchableOpacity>

        <NativeVideo />

        <Text style={{textAlign: 'center', marginVertical: 10}}>
          Native Advance Video Ads
        </Text>
      </ScrollView>
    </View>
  );
}
