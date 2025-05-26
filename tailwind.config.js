const config = {
  animation: {
    flicker: 'flicker 2s infinite alternate',
  },
  keyframes: {
    flicker: {
      '0%, 100%': { opacity: '0.95' },
      '50%': { opacity: '1' },
      '60%': { opacity: '0.9' },
    },
  },
};

module.exports = config;
