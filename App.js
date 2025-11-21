import { StyleSheet, View } from 'react-native';
import Navigate from './Navigate';
import { ThemeProvider } from './ui/ThemeContext';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <ThemeProvider>
    <View style={styles.safe}>
        <StatusBar
          style="dark" 
          backgroundColor={styles.safe.backgroundColor}
        />
        <Navigate />
      </View>
  </ThemeProvider>
  );
};
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F2F2F2', 
  },
});
