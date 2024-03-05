// import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
// import React from 'react'
// import { PlayCircleIcon } from 'react-native-heroicons/outline'
// import { useNavigation, useRoute } from '@react-navigation/native';

// const IsiSurah = () => {
//     const navigation = useNavigation();
//     const route = useRoute();
//     let { surahNumber } = route.params;
//     const [detailSurah, setDetailSurah] = useState([]);
//     const [nomorSurah, setNomorSurah] = useState(null);

//     useEffect(() => {
//         getDetailSurah(surahNumber);
//     }, []);

//     const getDetailSurah = async (id) => {
//         try {
//             const response = await axios.get(`https://equran.id/api/v2/surat/${id}`);
//             const getNomorSurah = response.data.data.nomor;
//             setNomorSurah(getNomorSurah);
//             // console.log("nomor surah", surahNumber);
//             // console.log("API DETAIL", response.data.data.ayat);
//             if (response && response.data.data.ayat) {
//                 setDetailSurah(response.data.data.ayat);
//             }
//         } catch (error) {
//             console.log("error", error);
//         }
//     }
//   return (
//     <View className="space-y-2 mx-2">
//             {
//                 dataSurah.map((item, index) => {
//                     return (
//                         <TouchableOpacity key={index} onPress={() => navigation.navigate("Detail", { surahNumber: item.nomor, surahName: item.namaLatin, surahNameArabic: item.nama, jumlahAyat: item.jumlahAyat })}>
//                             <View className="bg-purple-200 flex-row p-2 rounded-xl justify-between">
//                                 <View className="flex-row items-center">
//                                     <View style={{ width: hp(6), height: hp(6) }}>
//                                         <ImageBackground
//                                             source={numberOrnamen}
//                                             style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
//                                             <Text style={{ fontSize: hp(2.3), color: 'white', fontWeight: 'bold' }}>{item.nomor}</Text>
//                                         </ImageBackground>
//                                     </View>
//                                     <View className="flex space-y-2 p-2 justify-center">
//                                         <Text style={{ fontSize: hp(2.5) }} className="text-slate-600 font-bold">{item.namaLatin}</Text>
//                                         <Text style={{ fontSize: hp(2) }} className="text-slate-500 font-semibold ">{item.tempatTurun} {item.jumlahAyat} Ayat</Text>
//                                     </View>
//                                 </View>
//                                 <View>
//                                     <View className="flex-row items-center p-2">
//                                         <Text style={{ fontSize: hp(2.7) }} className="text-slate-600 font-bold mr-2">{item.nama}</Text>
//                                         <PlayCircleIcon color="gray" style={{ width: hp(3), height: hp(3) }} />
//                                     </View>
//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                     )
//                 })
//             }
//         </View>
//   )
// }

// export default IsiSurah