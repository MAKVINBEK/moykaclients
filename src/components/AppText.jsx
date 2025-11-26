import React from 'react';
import { Text, Platform } from 'react-native';

const fontMap = {
  Inter: {
    '100': 'Inter-100',
    '300': 'Inter-300',
    '400': 'Inter-400',
    '500': 'Inter-500',
    '600': 'Inter-600',
    '700': 'Inter-700',
  },
  Mulish: {
    '400': 'Mulish-400',
    '500': 'Mulish-500',
    '600': 'Mulish-600',
    '700': 'Mulish-700',
  },
};

export default function AppText({ style, children, font = 'Mulish', ...props }) {
  let weight = '400';

  if (Array.isArray(style)) {
    for (const s of style) {
      if (s?.fontWeight) weight = s.fontWeight.toString();
    }
  } else if (style?.fontWeight) {
    weight = style.fontWeight.toString();
  }

  let fontFamily = fontMap[font]?.[weight] || fontMap[font]?.['400'];

  if (Platform.OS === 'web') {
    return (
      <Text {...props} style={[{ fontFamily, fontWeight: weight }, style]}>
        {children}
      </Text>
    );
  }

  return (
    <Text {...props} style={[{ fontFamily }, style]}>
      {children}
    </Text>
  );
}
