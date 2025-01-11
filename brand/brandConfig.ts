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
  name: 'Eat Out Food Finder',
  colors: {
    primary: '#ff3131',
    secondary: '#ff3131',
    appbarColor: '#ffffff',
    backgroundColor: '#ffffff',
  },
  borderRadius: 10,
  shadows: true,
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
