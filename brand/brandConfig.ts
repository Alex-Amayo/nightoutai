import { BorderRadius, Colors, FontSizes, Logo, Name, Shadows } from './brandTypes';

interface Brand {
  colors: Colors;
  fontSizes: FontSizes;
  borderRadius: BorderRadius;
  name: Name;
  logo: Logo;
  shadows: Shadows;
}

const brand: Brand = {
  name: 'Night Out AI',
  colors: {
    primary: '#cc3366',
    secondary: '#cc3366',
    appbarColor: '#ffffff',
    backgroundColor: '#ffffff',
  },
  borderRadius: 5,
  shadows: false,
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
  logo: {
    light: 'https://utfs.io/f/YPschnd1m5QkLkMtWdZNXt7Hux80yzqbspNAiFl93fdRhkmK',
    dark: 'https://utfs.io/f/YPschnd1m5QkLkMtWdZNXt7Hux80yzqbspNAiFl93fdRhkmK',
  },
};

export default brand;
