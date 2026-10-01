// src/components/HeartButton.tsx
//
// CAMADA COMPONENTS — botão de coração com animação Reanimated.
// ATIVIDADE 2 — TASK 8 (HeartButton Reanimated)

import { StyleSheet, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

type Props = {
  active: boolean;
  onPress: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HeartButton({ active, onPress }: Props) {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSequence(withTiming(1.4), withSpring(1));
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable accessibilityLabel="heart-button" onPress={handlePress} style={[styles.heart, animatedStyle]}>
      <Text style={styles.heartIcon}>{active ? '❤️' : '🤍'}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  heart: {
    padding: 8,
  },
  heartIcon: {
    fontSize: 24,
  },
});
