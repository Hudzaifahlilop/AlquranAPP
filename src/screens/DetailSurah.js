import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Touchable } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { BookmarkIcon, ChevronLeftIcon, PlayCircleIcon } from 'react-native-heroicons/outline';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import mesjid from "../assets/mesjidbaru.png"
import Loading from '../components/loading';



const DetailSurah = () => {
    const navigation = useNavigation();
    const route = useRoute();
    let { surahNumber, surahName, surahTurun, jumlahAyat, surahArti } = route.params;
    const [detailSurah, setDetailSurah] = useState([]);
    const [nomorSurah, setNomorSurah] = useState(null);
    const [namaSurah, setNamaSurah] = useState("");
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        getDetailSurah(surahNumber);
    }, [])

    const getDetailSurah = async (id) => {
        try {
            const response = await axios.get(`https://equran.id/api/v2/surat/${id}`);
            const getNomorSurah = response.data.data.nomor;
            const getNamaSurah = response.data.data.namaLatin;
            setNomorSurah(getNomorSurah);
            setNamaSurah(getNamaSurah);
            // console.log("nomor surah", surahNumber);
            // console.log("API DETAIL", response.data.data.ayat);
            if (response && response.data.data.ayat) {
                setDetailSurah(response.data.data.ayat);
                setLoading(false);
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    // const handleBookmarkClick = (namaSurah, nomorAyat) => {
    //     navigation.setParams({ namaSurah: namaSurah, nomorAyat: nomorAyat });
    // }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
            className="flex-1 bg-white" >
            <StatusBar style="dark" />
            <View className="flex-1 space-y-6 mt-4">
                {/* header */}
                <View className="flex-row space-x-2 items-center mx-4 mt-4 ">
                    <ChevronLeftIcon color="gray" style={{ width: hp(3), height: hp(3) }} onPress={() => navigation.goBack()} />
                    <Text style={{ fontSize: hp(2.5) }} className="font-bold text-purple-800 justify-center">{surahName}</Text>
                </View>
                {/* hero */}
                <ImageBackground className="mx-2" source={mesjid} style={{ flex: 1, height: hp(22),borderRadius: 20, overflow: 'hidden'}}>
                    <View style={{ flex: 1, padding: 16 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: hp(4), color: 'white', fontWeight: 'bold' }}>{surahName}</Text>
                            <Text style={{ fontSize: hp(2), color: 'white', fontWeight: 'bold' }}>{surahArti}</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'white', width: '75%', alignSelf: 'center' }} />
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: hp(2), color: 'white', fontWeight: 'bold' }}>{surahTurun} {jumlahAyat} Ayat</Text>
                        </View>
                    </View>
                </ImageBackground>
                {/* show detail surah */}
                <View className="space-y-2 mx-2">
                    { loading ? (<Loading size="large" className="mt-16" color="#D97706FF"/>) : (
                       detailSurah.length > 0 && detailSurah.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate("Tafsir", { namaSurah: namaSurah, nomorSurah: nomorSurah, nomorAyat: item.nomorAyat })}>
                                    <View className="flex space-y-2 bg-purple-200 rounded-xl p-2">
                                        {/* nomor ayat & audio */}
                                        <View className="flex-row justify-between bg-slate-200 px-2 py-1 rounded-lg items-center">
                                            <View style={{ width: hp(3.5), height: hp(3.5) }} className="bg-purple-600 p-1 items-center rounded-full">
                                                <Text style={{ fontSize: hp(1.5)}} className="text-white font-bold">{item.nomorAyat}</Text>
                                            </View>
                                            <View className="flex-row space-x-1">
                                                {/* <PlayCircleIcon color="grey" style={{ width: hp(3), height: hp(3) }} /> */}
                                                <TouchableOpacity onPress={() => navigation.navigate("Home",{ namaSurah: namaSurah, nomorAyat: item.nomorAyat })}>
                                                    <BookmarkIcon color="grey" style={{ width: hp(3), height: hp(3) }}  />
                                                </TouchableOpacity>
                                                
                                            </View>
                                        </View>
                                        {/* ayat, latin & terjemah */}
                                        <View className="flex space-y-2 px-2">                                          
                                                <Text style={{ fontSize: hp(4) }} className="text-slate-600 font-bold">
                                                    {item.teksArab}
                                                </Text>
                                                <Text style={{ fontSize: hp(2) }} className="text-slate-500 font-semibold">
                                                    {item.teksLatin}
                                                </Text>
                                                <Text style={{ fontSize: hp(2) }} className="text-slate-500 font-semibold">
                                                    {item.teksIndonesia}
                                                </Text>                                           
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }))
                    }
                </View>
            </View>

        </ScrollView>

    )
}

export default DetailSurah