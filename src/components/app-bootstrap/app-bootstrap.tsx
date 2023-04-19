import React, { useState, useEffect, useCallback, ReactNode, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Auth, Hub } from 'aws-amplify';
import { useAuth } from '@contexts/auth-context';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

type AppBootstrapProps = {
  children: ReactNode;
};

export default function AppBootstrap({ children }: AppBootstrapProps): ReactElement | null {
  const [appIsReady, setAppIsReady] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);
  const { setUser } = useAuth();

  useEffect(() => {
    async function checkUserLoggedIn() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch (e) {
        setUser(null);
      }
      setAuthLoaded(true);
    }
    checkUserLoggedIn();

    function hubListener(hubData: any) {
      const { data, event } = hubData.payload;
      console.log(data);
      switch (event) {
        case 'signOut':
          setUser(null);
          break;
        case 'signIn':
          setUser(data);
          break;
        default:
          break;
      }
    }
    const listener = Hub.listen('auth', hubListener);

    return () => {
      listener(); // Call the result of Hub.listen to remove the listener
    };
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({ Inter_400Regular, Inter_700Bold });
        // await new Promise(resolve => setTimeout(resolve, 6000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      {authLoaded && children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
