import React from 'react';
import Navigation from './src/navigation/Navigation';
import { LogBox, StyleSheet } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient();
LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native, along with all other PropTypes.',
]);

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={styles.sucessnotice}
      contentContainerStyle={styles.contentsucess}
      text1Style={styles.sucessText}
      text2Style={styles.sucessText2}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={styles.failText}
      text2Style={styles.failText2}
      style={styles.failNotice}
    />
  ),
  };
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  sucessnotice:{
    borderLeftColor: '#2AB6AD',
  },
  contentsucess:{
    paddingHorizontal: 15,
  },
  sucessText:{
    fontSize: 20,
    fontWeight: '600',
  },
  sucessText2:{
    fontSize:13,
  },
  failText:{
    fontSize: 20,
  },
  failText2:{
    fontSize:13,
  },
  failNotice:{
    borderLeftColor: 'red',
  },
});
