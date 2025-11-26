import React, { useMemo, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, Pattern, Rect, ClipPath, Circle } from 'react-native-svg';
import AppText from '../components/AppText';

const { width } = Dimensions.get('window');
const TOTAL_HORIZONTAL_PADDING = 32;
const H_GAP = 10;
const V_GAP = 4;
const CELL = (width - TOTAL_HORIZONTAL_PADDING - H_GAP * 8.2) / 7;

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDate(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function generateCalendar(year, month) {
  const weeks = [];
  const first = new Date(year, month, 1);
  const startIndex = (first.getDay() + 6) % 7; 
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const totalCells = 42;
  for (let i = 0; i < totalCells; i++) {
    const dayIndex = i - startIndex + 1;
    let inMonth = true;
    let dayNumber = dayIndex;
    let cellDate;
    let isPrevMonth = false;
    let isNextMonth = false;
    let stripe = false;

    if (dayIndex <= 0) {
      inMonth = false;
      isPrevMonth = true;
      dayNumber = prevMonthDays + dayIndex;
      cellDate = new Date(year, month - 1, dayNumber);
      if (i < startIndex) stripe = true;
    } else if (dayIndex > daysInMonth) {
      inMonth = false;
      isNextMonth = true;
      dayNumber = dayIndex - daysInMonth;
      cellDate = new Date(year, month + 1, dayNumber);
    } else {
      cellDate = new Date(year, month, dayNumber);
    }

    if (i % 7 === 0) weeks.push([]);
    weeks[weeks.length - 1].push({
      date: cellDate,
      day: cellDate.getDate(),
      inMonth,
      isPrevMonth,
      isNextMonth,
      stripe,
    });
  }

  return weeks;
}

function StripeOverlay({ size = CELL, strokeColor = '#EDEFF3', stripeWidth = 6 }) {
  const id = `p${Math.random().toString(36).slice(2, 9)}`;
  const r = size / 2;
  return (
    <Svg width={size} height={size} style={{ position: 'absolute', left: 0, top: 0 }}>
      <Defs>
        <Pattern id={id} patternUnits="userSpaceOnUse" width={stripeWidth * 2} height={stripeWidth * 2} patternTransform="rotate(45)">
          <Rect x="0" y="0" width={stripeWidth} height={stripeWidth * 2} fill={strokeColor} />
        </Pattern>
        <ClipPath id={`${id}-clip`}>
          <Circle cx={r} cy={r} r={r} />
        </ClipPath>
      </Defs>

      <Rect x="0" y="0" width={size} height={size} fill={`url(#${id})`} clipPath={`url(#${id}-clip)`} />
    </Svg>
  );
}

export default function Calendar({
  selectedDate = null,
  onSelectDate = () => {},
  minDate = startOfToday(),
  initialYear = null,
  initialMonth = null,
  onMonthChange = () => {},
}) {
  const today = useMemo(() => startOfToday(), []);
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(initialYear ?? now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialMonth ?? now.getMonth());

  const rawWeeks = useMemo(() => generateCalendar(currentYear, currentMonth), [currentYear, currentMonth]);

  const weeks = useMemo(() => {
    const w = rawWeeks.slice();
    while (w.length && w[w.length - 1].every((c) => c.isNextMonth)) w.pop();
    return w;
  }, [rawWeeks]);

  const prevMonth = () => {
    const m = currentMonth - 1;
    if (m < 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
      onMonthChange(currentYear - 1, 11);
    } else {
      setCurrentMonth(m);
      onMonthChange(currentYear, m);
    }
  };

  const nextMonth = () => {
    const m = currentMonth + 1;
    if (m > 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
      onMonthChange(currentYear + 1, 0);
    } else {
      setCurrentMonth(m);
      onMonthChange(currentYear, m);
    }
  };

  const monthTitle = new Date(currentYear, currentMonth).toLocaleString('ru-RU', { month: 'long', year: 'numeric' });

  const onDayPress = (cell) => {
    const cellStart = new Date(cell.date);
    cellStart.setHours(0, 0, 0, 0);
    if (!cell.inMonth) return;
    if (cellStart < minDate) return;
    onSelectDate(cell.date);
  };

  return (
    <View>
      <View style={styles.monthRow}>
        <TouchableOpacity onPress={prevMonth} style={styles.monthNav}>
          <AppText style={styles.monthNavText}>◀</AppText>
        </TouchableOpacity>

        <AppText style={styles.monthTitle}>{monthTitle}</AppText>

        <TouchableOpacity onPress={nextMonth} style={styles.monthNav}>
          <AppText style={[styles.monthNavText, { transform: [{ rotate: '180deg' }] }]}>◀</AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.weekDaysRow}>
        {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((d) => (
          <AppText key={d} style={styles.weekDay}>{d}</AppText>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {weeks.map((week, i) => (
          <View key={i} style={[styles.weekRow, i === weeks.length - 1 ? { marginBottom: 0 } : {}]}>
            {week.map((cell, idx) => {
              const isToday = isSameDate(cell.date, today);
              const isSelected = selectedDate && isSameDate(cell.date, selectedDate);
              const disabled = (!cell.inMonth) || (cell.date < minDate);

              if (cell.isNextMonth) {
                return (
                  <View key={idx} style={[styles.emptyCell, { width: CELL, height: CELL, marginRight: idx < 6 ? H_GAP : 0 }]} />
                );
              }

              if (cell.stripe) {
                return (
                  <View key={idx} style={[styles.cellWrap, { width: CELL, height: CELL, marginRight: idx < 6 ? H_GAP : 0 }]}>
                    <View style={[styles.circleBase, { width: CELL, height: CELL, borderRadius: CELL / 2 }]}>
                      <StripeOverlay size={CELL} strokeColor={'#F5F5F5'} stripeWidth={6} />
                    </View>
                  </View>
                );
              }

              return (
                <TouchableOpacity
                  key={idx}
                  onPress={() => onDayPress(cell)}
                  activeOpacity={disabled ? 1 : 0.7}
                  style={[styles.cellWrap, { width: CELL, height: CELL, marginRight: idx < 6 ? H_GAP : 0 }]}
                >
                  <View style={[
                    styles.circleBase,
                    {
                      width: CELL,
                      height: CELL,
                      borderRadius: 100,
                      backgroundColor: isSelected ? '#3083FF' : ('#F5F5F5'),
                    }
                  ]}>
                    {isToday && !isSelected && (
                      <View style={{
                        position: 'absolute',
                        width: CELL,
                        height: CELL,
                        borderRadius: CELL / 2,
                        borderWidth: 1,
                        borderColor: '#d0d0d0',
                      }} />
                    )}

                    <AppText style={{
                      color: isSelected ? '#fff' : (disabled ? '#9EA9B7' : '#232020'),
                      fontSize: 16,
                      fontWeight: isSelected ? '400' : '600',
                    }}>
                      {cell.day}
                    </AppText>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  monthRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  monthTitle: { fontSize: 18, fontWeight: '600', color: '#232020' },
  monthNav: { padding: 6 },
  monthNavText: { color: '#9EA9B7' },

  weekDaysRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 4, marginBottom: 14 },
  weekDay: { width: CELL, textAlign: 'center', color: '#9EA9B7', fontSize: 12 },

  calendarGrid: {},
  weekRow: { flexDirection: 'row', marginBottom: V_GAP },

  cellWrap: { alignItems: 'center', justifyContent: 'center' },
  circleBase: { alignItems: 'center', justifyContent: 'center' },
  emptyCell: { backgroundColor: 'transparent' },
});
