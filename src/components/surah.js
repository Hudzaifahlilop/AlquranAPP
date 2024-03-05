import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { PlayCircleIcon, StopCircleIcon } from 'react-native-heroicons/outline';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import numberOrnamen from "../assets/nomorornamen-removebg-preview.png"
import Loading from './loading';
// import TrackPlayer from 'react-native-track-player';


const Surah = () => {
    const navigation = useNavigation();
    const [dataSurah, setDataSurah] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState([]); // Array to store play status for each surah

    const togglePlay = async (index) => {
        const updatedIsPlaying = [...isPlaying]; // Copy the array
        updatedIsPlaying[index] = !updatedIsPlaying[index]; // Toggle the play status of the specific surah
        setIsPlaying(updatedIsPlaying); // Update the state
        // You can add more logic here if needed, such as playing or stopping audio.
        const audioUrl = dataSurah[index].audioFull['01'];

        // if (updatedIsPlaying[index]) {
        //     await TrackPlayer.setupPlayer();
        //     await TrackPlayer.add({
        //         id: index.toString(),
        //         url: audioUrl,
        //         title: dataSurah[index].nama,
        //         artist: '',
        //         artwork: '',
        //     });
        //     await TrackPlayer.play();
        // } else {
        //     await TrackPlayer.stop();
        //     await TrackPlayer.remove(index.toString());
        // }


    };

    const getDataAlquran = async () => {
        try {
            const response = await axios.get(`https://equran.id/api/v2/surat`);
            if (response && response.data.data) {
                setDataSurah(response.data.data);
                setIsPlaying(Array(response.data.data.length).fill(false)); // Initialize isPlaying array with false for each surah
                setLoading(false);
            }
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        getDataAlquran();
        // TrackPlayer.updateOptions({
        //     stopWithApp: false,
        //     capabilities: [TrackPlayer.CAPABILITY_PLAY,TrackPlayer.CAPABILITY_PAUSE],
        //     compactCapabilities: [TrackPlayer.CAPABILITY_PLAY,TrackPlayer.CAPABILITY_PAUSE]
        // });

        // return async () => {
        //     await TrackPlayer.destroy();
        // };

    }, []);

    return (
        <View className="space-y-2 mx-2">
            {loading ? (
                <Loading size="large" className="mt-16" color="#D97706FF" />
            ) : ( dataSurah.length > 0 && dataSurah.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate("Detail", { surahNumber: item.nomor, surahName: item.namaLatin, surahTurun: item.tempatTurun, jumlahAyat: item.jumlahAyat, surahArti: item.arti })}>
                    <View id="surah" className="bg-purple-200 flex-row p-2 rounded-xl justify-between">
                        <View className="flex-row items-center">
                            <View style={{ width: hp(6), height: hp(6) }}>
                                <ImageBackground
                                    source={numberOrnamen}
                                    style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: hp(2.3), color: 'white', fontWeight: 'bold' }}>{item.nomor}</Text>
                                </ImageBackground>
                            </View>
                            <View className="flex space-y-2 p-2 justify-center">
                                <Text style={{ fontSize: hp(2.5) }} className="text-slate-600 font-bold">{item.namaLatin}</Text>
                                <Text style={{ fontSize: hp(2) }} className="text-slate-500 font-semibold ">{item.tempatTurun} {item.jumlahAyat} Ayat</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center p-2">
                            <Text style={{ fontSize: hp(3) }} className="text-slate-600 font-bold mr-2">{item.nama}</Text>
                            {/* <Pressable onPress={() => togglePlay(index)} className="bg-white p-2 rounded-full">
                                {isPlaying[index] ? (
                                    <StopCircleIcon color="gray" style={{ width: hp(4), height: hp(4) }} />
                                ) : (
                                    <PlayCircleIcon color="gray" style={{ width: hp(4), height: hp(4) }} />
                                )}
                            </Pressable> */}
                        </View>
                    </View>
                </TouchableOpacity>
            ))
            )}
        </View>
    )
}

export default Surah;
