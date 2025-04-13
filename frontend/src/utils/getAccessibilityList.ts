export enum AccessibilityListEnum {
    has_audio = 'Звуковий супровід',
    has_bathroom = 'Присутня ванна',
    has_braille = 'Шрифт Брайля',
    has_elevator = 'Підйомник',
    has_guide = 'Присутній Гід',
    has_parking = 'Паркінг',
    has_ramp = 'Рампа',
    has_sign_language = 'Мультимовний',
    has_signage = 'Присутні вивіски',
    has_tactical_floor = 'Технічний поверх',
    has_veterans_discounts = 'Знижки ветеранам',
    has_wifi = 'wi-fi',
  }
  
  export const getAccessibilityList = (values: any) => {
    return Object.keys(AccessibilityListEnum).reduce((acc: any[], key: string) => {
      return [
        ...acc,
        {
          [AccessibilityListEnum[key as keyof typeof AccessibilityListEnum]]: values[key],
        },
      ];
    }, []);
  };
  