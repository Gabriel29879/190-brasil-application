import { NavigationContainer } from '@react-navigation/native';
import { AppRouter } from './src/AppRouter';
import { NativeBaseProvider, Box, extendTheme } from 'native-base';

export default function App() {
  const colors = {
    primary: {
      100: '#C1E1FF',
      200: '#8BC1F3',
      300: '#6191DA',
      400: '#3E60B9',
      500: '#204195',
      600: '#052E7E',
    },
    neutral: {
      300: '#EFF1F6',
      400: '#DBDDE2',
      600: '#9BA0AC',
      700: '#585B65',
    }
  }

  const theme = extendTheme({ 
    colors,
    components: {
      Button: {
        baseStyle: {
          shadow: 4
        }
      }
    }
   })

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Box flex={1} bg="#F9F9FA" safeArea>
          <AppRouter />
        </Box>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
