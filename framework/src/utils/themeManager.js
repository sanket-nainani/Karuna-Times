import { parseToRgb, darken, lighten, rgb } from 'polished';

class ThemeManager {
  constructor(
    primaryColor = '#ffffff',
    bodyBackgroundColor = '#ffffff',
    footerBackgroundColor = '#ffffff',
    gradientTop = '#ffffff',
    gradientBottom = '#ffffff',
    headlineFont = 'GothamPro-Black'
  ) {
    this.primaryColorObject = rgb(40, 184, 167);
    this.primaryColor = rgb(40, 184, 167);
    this.bodyBackgroundColor = bodyBackgroundColor;
    this.footerBackgroundColor = footerBackgroundColor;
    this.gradientTop = gradientTop;
    this.gradientBottom = gradientBottom;
    this.headlineFont = headlineFont;
    this.styles = [
      { name: 'primary', value: this.primaryColor },
      {
        name: 'primary-rgb',
        value: `${this.primaryColorObject.red},${this.primaryColorObject.green},${this.primaryColorObject.blue}`
      },
      { name: 'body-background-color', value: this.bodyBackgroundColor },
      { name: 'text-on-background-color', value: '#333' },
      {
        name: 'text-on-primary-color',
        value: this.getContrastYIQ(this.primaryColor)
      },
      {
        name: 'footer-background-color',
        value: this.footerBackgroundColor
      },
      {
        name: 'text-on-footer-background-color',
        value: this.getContrastYIQ(this.footerBackgroundColor)
      },
      {
        name: 'brand-gradient-top',
        value: this.gradientTop
      },
      {
        name: 'brand-gradient-bottom',
        value: this.gradientBottom
      },
      {
        name: 'headline-font',
        value: this.headlineFont
      }
    ];

    this.darkStyles = [
      { name: 'primary-dark-5', value: 5 },
      { name: 'primary-dark-7_5', value: 7.5 },
      { name: 'primary-dark-10', value: 10 },
      { name: 'primary-dark-12_5', value: 12.5 },
      { name: 'primary-dark-15', value: 15 }
    ];
    this.lightStyles = [
      { name: 'primary-light-7_5', value: 7.5 },
      { name: 'primary-light-10', value: 10 },
      { name: 'primary-light-25', value: 25 },
      { name: 'primary-light-45', value: 45 },
      { name: 'primary-light-50', value: 50 }
    ];
    // this.generateStyle()
  }

  generateStyle() {
    this.styles.forEach(data => {
      document.documentElement.style.setProperty(`--${data.name}`, data.value);
    });
    this.darkStyles.forEach(data => {
      document.documentElement.style.setProperty(`--${data.name}`, darken(data.value / 100, this.primaryColor));
    });
    this.lightStyles.forEach(data => {
      document.documentElement.style.setProperty(`--${data.name}`, lighten(data.value / 100, this.primaryColor));
    });
  }

  generateStyleObject() {
    const style = {
      '--gautam': '#fff'
    };
    this.styles.forEach(data => {
      style[`--${data.name}`] = data.value;
    });
    this.darkStyles.forEach(data => {
      style[`--${data.name}`] = darken(data.value / 100, this.primaryColor);
    });
    this.lightStyles.forEach(data => {
      style[`--${data.name}`] = lighten(data.value / 100, this.primaryColor);
    });
    return style;
  }

  getContrastYIQ(hexcolor) {
    // hexcolor=parseToRgb(hexcolor);
    // hexcolor=rgb(hexcolor);
    const r = parseInt(hexcolor.substr(1, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 150 ? '#333333' : '#ffffff';
  }
}

export default ThemeManager;
