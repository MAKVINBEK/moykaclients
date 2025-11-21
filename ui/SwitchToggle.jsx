import React, { useEffect, useRef } from "react";
import { TouchableWithoutFeedback, Animated, StyleSheet } from "react-native";

export default function SwitchToggle({
  value = false,
  onValueChange = () => {},
  activeColor = "#3083FF",
  inactiveColor = "#D2D5DA",
  circleColor = "#fff",
  size = 22,
  duration = 250,
}) {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration,
      useNativeDriver: true,
    }).start();
  }, [value]);

  const circleSize = size - 4;
  const switchWidth = size * 1.81;

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [ switchWidth - circleSize - 2,2],
  });

  const bgColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  return (
    <TouchableWithoutFeedback onPress={() => onValueChange(!value)}>
      <Animated.View
        style={[
          styles.switch,
          {
            width: switchWidth,
            height: size,
            borderRadius: size / 2,
            backgroundColor: bgColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.circle,
            {
              width: circleSize,
              height: circleSize,
              borderRadius: circleSize / 2,
              backgroundColor: circleColor,
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  switch: {
    justifyContent: "center",
  },
  circle: {
    shadowColor: '#272727',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1, 
shadowRadius: 4,
elevation: 3,
  },
});
