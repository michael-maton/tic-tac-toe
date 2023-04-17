import React, {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const difficulty = {
  '1': 'Beginner',
  '3': 'Intermediate',
  '4': 'Hard',
  '-1': 'Impossible'
};

type SettingsType = {
  difficulty: keyof typeof difficulty;
  haptics: boolean;
  sounds: boolean;
};

const defaultSettings: SettingsType = {
  difficulty: '3',
  haptics: true,
  sounds: true
};

type SettingsContextType = {
  settings: SettingsType | null;
  loadSettings: () => void;
  saveSetting: <T extends keyof SettingsType>(settings: T, value: SettingsType[T]) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('Settings context outside of provider.');
  }
  return context;
}

function SettingsProvider(props: { children: ReactNode }): ReactElement {
  const [settings, setSettings] = useState<SettingsType | null>(null);

  const saveSetting = async <T extends keyof SettingsType>(setting: T, value: SettingsType[T]) => {
    try {
      // throw new Error();
      const oldSettings = settings ? settings : defaultSettings;
      const newSettings = { ...oldSettings, [setting]: value };
      await AsyncStorage.setItem('@settings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (e) {
      console.log(e);
      Alert.alert('An error has occured saving settings.');
    }
  };

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('@settings');
      settings !== null ? setSettings(JSON.parse(settings)) : setSettings(defaultSettings);
    } catch (e) {
      setSettings(defaultSettings);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider
      {...props}
      value={{
        settings,
        saveSetting,
        loadSettings
      }}
    />
  );
}

export { useSettings, SettingsProvider, difficulty };
