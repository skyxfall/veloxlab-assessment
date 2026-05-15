const tokens = {
  color: {
    bg: {
      app: '#FAFAFA',
      surface: '#FFFFFF',
      subtle: '#F4F4F5',
      muted: '#E5E7EB',
    },
    ink: {
      DEFAULT: '#0F172A',
      2: '#1F2937',
      3: '#6B7280',
      4: '#9CA3AF',
      5: '#D1D5DB',
      invert: '#FFFFFF',
    },
    line: {
      DEFAULT: '#E5E7EB',
      2: '#F3F4F6',
      strong: '#0F172A',
    },
    accent: {
      DEFAULT: '#0F172A',
      ink: '#000000',
    },
    rose: {
      DEFAULT: '#E63462',
      ink: '#BB1F47',
      light: '#FF8FA9',
      soft: '#FFD9E1',
      tint: '#FCE7EE',
    },
    status: {
      success: '#166534',
      'success-bg': '#DCFCE7',
      warning: '#92400E',
      'warning-bg': '#FEF3C7',
      danger: '#991B1B',
      'danger-bg': '#FEE2E2',
      info: '#1E40AF',
      'info-bg': '#DBEAFE',
    },
  },
  font: {
    family: {
      display: ['Fraunces', '"Fraunces Fallback"', 'Georgia', 'Times New Roman', 'serif'],
      sans: ['Inter', '"Inter Fallback"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      mono: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'Consolas', 'monospace'],
    },
    size: {
      'label-sm': ['11px', { lineHeight: '1.5' }],
      label: ['12px', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      'label-lg': ['14px', { lineHeight: '1.5' }],
      caption: ['14px', { lineHeight: '1.45' }],
      body: ['16px', { lineHeight: '1.55' }],
      h4: ['17px', { lineHeight: '1.4' }],
      h3: ['22px', { lineHeight: '1.3' }],
      h2: ['28px', { lineHeight: '1.1' }],
      h1: ['36px', { lineHeight: '1.05' }],
      display: ['52px', { lineHeight: '1.02' }],
    },
    weight: {
      regular: '400',
      medium: '500',
      semibold: '600',
    },
  },
  spacing: {
    xxs: '2px',
    xs: '10px',
    sm: '14px',
    md: '18px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  radius: {
    none: '0px',
    pill: '9999px',
  },
  duration: {
    instant: '100ms',
    fast: '180ms',
    normal: '240ms',
    slow: '400ms',
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
  },
  shadow: {
    xs: '0 1px 2px rgba(15, 23, 42, 0.04)',
    sm: '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.06)',
  },
  layout: {
    containerMax: '1120px',
    listViewport: '640px',
    rowHeight: '64px',
    navHeight: '56px',
  },
};

module.exports = tokens;
