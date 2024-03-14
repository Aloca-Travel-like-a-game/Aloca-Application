import React, {useEffect} from 'react';
import Navigation from './src/navigation/Navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PermissionsAndroid} from 'react-native';
const queryClient = new QueryClient();
export default function App() {
  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Cho phép truy cập máy ảnh',
      message:
        'Cool Photo App needs access to your camera ' +
        'so you can take awesome pictures.',
      buttonNeutral: 'Để sau',
      buttonNegative: 'Hủy',
      buttonPositive: 'Cho phép',
    });
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}
