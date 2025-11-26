import React, { useEffect, useRef } from "react";
import { TouchableWithoutFeedback, Animated, StyleSheet, View } from "react-native";

export default function RadioButton({
  selected = false,         
  onPress = () => {},      
  size = 24,                 
  color = "#3083FF",         
  borderWidth = 2.5,          
  duration = 200,           
}) {
  const anim = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: selected ? 1 : 0,
      duration,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  const innerScale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 1],
  });

  const innerOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          styles.outer,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth,
            borderColor: color,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.inner,
            {
              backgroundColor: color,
              width: size / 1.75,
              height: size / 1.75,
              borderRadius: size / 3.2,
              transform: [{ scale: innerScale }],
              opacity: innerOpacity,
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  outer: {
    alignItems:"center",
    justifyContent:"center"
  },
  inner: {},
});
