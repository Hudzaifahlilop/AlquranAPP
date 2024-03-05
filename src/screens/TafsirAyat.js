import { View, Text, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import mesjid from "../assets/mesjidbaru.png";
import { useNavigation } from '@react-navigation/native';



const TafsirAyat = () => {
    const navigation = useNavigation();
    const route = useRoute();
    let { nomorSurah, nomorAyat, namaSurah } = route.params;
    const [dataTafsir, setDataTafsir] = useState([]);

    useEffect(() => {
        getDataTafsir(nomorSurah);
    }, [])

    const getDataTafsir = async (id) => {
        try {
            const response = await axios.get(`https://equran.id/api/v2/tafsir/${id}`);
            // console.log("nomor surah", surahNumber);
            // console.log("API Tafsir", response.data.data.tafsir);
            if (response && response.data.data.tafsir) {
                setDataTafsir(response.data.data.tafsir);
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    const tafsirAyat = dataTafsir.filter(tafsir => tafsir.ayat === nomorAyat);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
            className="flex-1"
        >
            <StatusBar style="dark" />
            <View className="flex-1 space-y-6 mt-4" >
                {/* header
            <View className="flex-row space-x-2 items-center mx-4 mt-4 ">
                    <ChevronLeftIcon color="gray" style={{ width: hp(3), height: hp(3) }} onPress={() => navigation.goBack()} />
                    <Text style={{ fontSize: hp(2.5) }} className="font-bold text-purple-800 justify-center">{namaSurah}</Text>
            </View> */}
                <View className="space-y-6">
                    {
                        <View className="">
                            {tafsirAyat.map((tafsir, index) => (
                                <View key={index} className="space-y-6">
                                    <View className="flex-row space-x-2 items-center mx-2 mt-4 ">
                                        <ChevronLeftIcon color="gray" style={{ width: hp(3), height: hp(3) }} onPress={() => navigation.goBack()} />
                                        <Text style={{ fontSize: hp(2.5) }} className="font-bold text-purple-800 justify-center">{namaSurah} - {tafsir.ayat}</Text>
                                    </View>
                                    {/* hero */}
                                    <ImageBackground className="mx-2" source={mesjid} style={{ flex: 1, height: hp(22), borderRadius: 20, overflow: 'hidden' }}>
                                        <View style={{ flex: 1, padding: 16 }}>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: hp(4), color: 'white', fontWeight: 'bold' }}>Tafsir Surah</Text>
                                                <Text style={{ fontSize: hp(2), color: 'white', fontWeight: 'bold' }}>{namaSurah}</Text>
                                            </View>
                                            <View style={{ borderBottomWidth: 1, borderBottomColor: 'white', width: '75%', alignSelf: 'center' }} />
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: hp(2), color: 'white', fontWeight: 'bold' }}>Tafsir Ayat ke-{tafsir.ayat}</Text>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                    {/* Tafsir */}
                                    <View className="flex bg-purple-200 mx-2 rounded-xl px-2 py-3">
                                        <Text className="text-slate-600 font-semibold">{tafsir.teks}</Text>
                                    </View>

                            
                                </View>
                            ))}
                        </View>
                    }
                </View>
            </View>

        </ScrollView>
    )
}

export default TafsirAyat