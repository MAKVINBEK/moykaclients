import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import Slider from '@react-native-community/slider'; 
import AppText from '../../AppText';

const {width, height} = Dimensions.get('window');

export default function FilterBottomSheet({visible = false, onClose = () => {}, onApply = () => {}}) {
  const anim = useRef(new Animated.Value(0)).current; 
  const [distance, setDistance] = useState(5);
  const [sort, setSort] = useState('near');
  const [workTime, setWorkTime] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [extras, setExtras] = useState([]);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [height, height * 0], 
  });

  const overlayOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.4],
  });

  const toggleRating = (r) => {
    setRatings((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));
  };

  const toggleExtra = (e) => {
    setExtras((prev) => (prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]));
  };

  return (
    <>
      <Animated.View
        pointerEvents={visible ? 'auto' : 'none'}
        style={[styles.overlay, {opacity: overlayOpacity}]}
      >
        <Pressable style={{flex: 1}} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.sheet,
          {
            transform: [{translateY}],
          },
        ]}
      >

        <View style={styles.headerRow}>
          <AppText style={styles.header}>Фильтр</AppText>
          <TouchableOpacity onPress={() => {
            setDistance(5);
            setSort('near');
            setWorkTime(null);
            setRatings([]);
            setExtras([]);
          }}>
            <AppText style={styles.clear}>Очистить</AppText>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* Sorting */}
          <AppText style={styles.sectionTitle}>Сортировка</AppText>
          <View style={styles.rowWrap}>
            <TouchableOpacity
              style={[styles.pill, sort === 'near' && styles.pillActive]}
              onPress={() => setSort('near')}
            >
              <AppText style={[styles.pillText, sort === 'near' && styles.pillTextActive]}>Рядом</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.pill, sort === 'rating' && styles.pillActive, {marginLeft: 10}]}
              onPress={() => setSort('rating')}
            >
              <AppText style={[styles.pillText, sort === 'rating' && styles.pillTextActive]}>Рейтинг</AppText>
            </TouchableOpacity>
          </View>

          {/* Distance */}
          <AppText style={[styles.sectionTitle, {marginTop: 30}]}>Расстояние</AppText>
          <View>
            <Slider
              minimumValue={1}
              maximumValue={20}
              step={1}
              value={distance}
              onValueChange={setDistance}
              style={{width: '100%', height: 20}}
            />

            <View style={styles.distanceLabels}>
              <AppText style={styles.smallGray}>1 км</AppText>
              <AppText style={styles.smallGray}> {distance} км</AppText>
              <AppText style={styles.smallGray}>20 км</AppText>
            </View>
          </View>

          <AppText style={[styles.sectionTitle, {marginTop: 30}]}>Время работы</AppText>
          <View style={styles.rowWrap}>
            <TouchableOpacity
              style={[styles.pill, workTime === 'open' && styles.pillActive]}
              onPress={() => setWorkTime(workTime === 'open' ? null : 'open')}
            >
              <AppText style={[styles.pillText, workTime === 'open' && styles.pillTextActive]}>Открыты сейчас</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.pill, workTime === '24' && styles.pillActive, {marginLeft: 10}]}
              onPress={() => setWorkTime(workTime === '24' ? null : '24')}
            >
              <AppText style={[styles.pillText, workTime === '24' && styles.pillTextActive]}>Круглосуточно</AppText>
            </TouchableOpacity>
          </View>

          {/* Rating */}
          <AppText style={[styles.sectionTitle, {marginTop: 30}]}>Рейтинг</AppText>
          <View style={styles.rowWrapMulti}>
            {[4.9, 4.5, 4, 3.5, 3].map((r, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.pill, ratings.includes(r) && styles.pillActive]}
                onPress={() => toggleRating(r)}
              >
                <AppText style={[styles.ratingText, ratings.includes(r) && styles.pillTextActive]}>⭐ от {r}</AppText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Extras */}
          <AppText style={[styles.sectionTitle, {marginTop: 30}]}>Дополнительно</AppText>
          <View style={styles.rowWrapMulti}>
            {['Wi‑Fi', 'Парковка', 'Зал ожидания'].map((e, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.pill, extras.includes(e) && styles.pillActive]}
                onPress={() => toggleExtra(e)}
              >
                <AppText style={[styles.pillText, extras.includes(e) && styles.pillTextActive]}>{e}</AppText>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{height: 36}} />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyBtn} onPress={() => onApply({distance, sort, workTime, ratings, extras})}>
            <AppText style={styles.applyText}>Показать результаты</AppText>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom:0,
    zIndex:1000,
    flex:1,
    height: height - 140,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical:20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -6},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {fontSize: 24, fontWeight: '600', color: '#000'},
  clear: {color: '#000', fontSize:16,},
  content: {paddingBottom: 100},
  sectionTitle: {fontSize: 16, color: '#000', marginBottom: 10, fontWeight: '600'},
  pill: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D5D5D5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillActive: {
    backgroundColor: '#3083FF',
    borderColor: '#3083FF',
  },
  pillText: {color: '#000', fontSize:16,},
  pillTextActive: {color: '#fff'},
  rowWrap: {flexDirection: 'row', alignItems: 'center'},
  rowWrapMulti: {flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10},
  distanceLabels: {flexDirection: 'row', justifyContent: 'space-between', marginTop:10,},
  smallGray: {fontSize: 16, color: '#000'},
  ratingPill: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 8,
  },
  ratingText: {fontSize:16, color: '#2B2929'},
  footer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 20,
  },
  applyBtn: {
    backgroundColor: '#3083FF',
    height:60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent:"center",
  },
  applyText: {color: '#fff', fontWeight: '700', fontSize: 16},
});
