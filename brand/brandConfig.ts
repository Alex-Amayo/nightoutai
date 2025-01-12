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
    light: 'https://xyyfo01l4d.ufs.sh/f/YPschnd1m5QkKdKrp2HXaZhTLebdW4vrFcfN9tVHp8loqYnw',
    dark: 'https://xyyfo01l4d.ufs.sh/f/YPschnd1m5QkKdKrp2HXaZhTLebdW4vrFcfN9tVHp8loqYnw',
  },
};

export default brand;
