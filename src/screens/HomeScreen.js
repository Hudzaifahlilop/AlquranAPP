import { View, Text, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import Surah from '../components/surah';
import { BellIcon, BookmarkIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import alquran from "../assets/alquranopen-removebg-preview.png";
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';




const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Surah");
  const route = useRoute();
  const { namaSurah, nomorAyat } = route.params || {};
  // console.log("route", namaSurah, nomorAyat);
  const [storedParams, setStoredParams] = useState({});
  // console.log("stored params", storedParams);

  useEffect(() => {
    loadStoredParams();
  }, []);

  useEffect(() => {
    if (namaSurah && nomorAyat) {
      saveParamsToStorage(namaSurah, nomorAyat);
      loadStoredParams();
    }
  }, [namaSurah, nomorAyat]);


  const loadStoredParams = async () => {
    try {
      const storedParamsValue = await AsyncStorage.getItem('storedParams');
      if (storedParamsValue !== null) {
        setStoredParams(JSON.parse(storedParamsValue));
      }
    } catch (error) {
      console.error('Error loading stored params:', error);
    }
  };

  const saveParamsToStorage = async (namaSurah, nomorAyat) => {
    try {
      const paramsToStore = JSON.stringify({ namaSurah, nomorAyat });
      await AsyncStorage.setItem('storedParams', paramsToStore);
      // console.log("paramsItem", paramsToStore);
    } catch (error) {
      console.error('Error saving params to storage:', error);
    }
  };


  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
      className="flex-1 bg-white space-y-6" >
      <StatusBar style="auto" />
      <View className="flex-1 space-y-6">
        {/* header */}
        <View className="flex-row justify-between items-center mx-4 mt-4 ">
          <Text style={{ fontSize: hp(3) }} className="font-bold text-purple-800">Alquran App</Text>
          <BellIcon color="gray" style={{ width: hp(4), height: hp(4) }} />
        </View>
        {/* greetings */}
        <View className="flex mx-4 space-y-1" >
          <Text style={{ fontSize: hp(2) }} className="font-semibold text-slate-400" >Assalamualaikum</Text>
          <Text style={{ fontSize: hp(3) }} className="font-bold text-purple-600" >Mari Membaca Alquran</Text>
        </View>
        {/* hero */}
        <View className="flex-row justify-between bg-purple-200 mx-2 rounded-xl">
          <View className="space-y-4 items-center" >
            <View className="flex-row space-x-1 p-2 ml-2 " >
              <BookmarkIcon color="gray" size={hp(3)} />
              <Text style={{ fontSize: hp(2) }} className="text-slate-400">Last Read</Text>
            </View>
            {storedParams.namaSurah && storedParams.nomorAyat ? (
              <View className="space-y-1 p-2">
                <Text style={{ fontSize: hp(3) }} className="text-slate-600 font-bold ml-2">{storedParams.namaSurah}</Text>
                <Text className="text-slate-600 ml-2">Ayat ke {storedParams.nomorAyat}</Text>
              </View>
            ) : (
              <View className="space-y-1 p-2">
                <Text style={{ fontSize: hp(3) }} className="text-slate-600 font-bold ml-2">-</Text>
                <Text className="text-slate-600 ml-2">-</Text>
              </View>
            )}
          </View>
          <View>
            <Image source={alquran} style={{ height: hp(20), width: hp(20) }} />
          </View>
        </View>
        {/* surah / asmaul husna */}
        {/* <View className="flex-row justify-evenly">
          <TouchableOpacity onPress={() => setActiveCategory("Surah")}>
            <Text style={{ fontSize: hp(2.3) }} className={`font-semibold text-purple-600 ${activeCategory === 'Surah' ? 'border-b-2 border-purple-600 pb-1' : ''}`}>Surah</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveCategory("Asmaulhusna")} >
            <Text style={{ fontSize: hp(2.3) }} className={`font-semibold text-purple-600 ${activeCategory === 'Asmaulhusna' ? 'border-b-2 border-purple-600 pb-1' : ''}`}>Asmaul Husna</Text>
          </TouchableOpacity>
        </View> */}
        {/* show surah */}
        <View>
          <Surah />
        </View>
      </View>
    </ScrollView>
  )
}

export default HomeScreen

