const tokens = require('./src/design-system/tokens');

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: tokens.color.bg,
        ink: tokens.color.ink,
        line: tokens.color.line,
        accent: tokens.color.accent,
        rose: tokens.color.rose,
        status: tokens.color.status,
      },
      fontFamily: {
        sans: tokens.font.family.sans,
        display: tokens.font.family.display,
        mono: tokens.font.family.mono,
      },
      fontSize: tokens.font.size,
      fontWeight: tokens.font.weight,
      spacing: tokens.spacing,
      borderRadius: tokens.radius,
      transitionDuration: tokens.duration,
      transitionTimingFunction: { standard: tokens.easing.standard },
      boxShadow: tokens.shadow,
      maxWidth: {
        container: tokens.layout.containerMax,
      },
      minHeight: {
        nav: tokens.layout.navHeight,
        row: tokens.layout.rowHeight,
      },
      height: {
        row: tokens.layout.rowHeight,
        nav: tokens.layout.navHeight,
      },
    },
  },
  plugins: [],
};
