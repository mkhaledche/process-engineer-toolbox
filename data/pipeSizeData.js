const pipeSizes = [
  { label: '1in', value: '1in' },
  { label: '1.5in', value: '1.5in' },
  { label: '2in', value: '2in' },
  { label: '3in', value: '3in' },
  { label: '4in', value: '4in' },
  { label: '6in', value: '6in' },
  { label: '8in', value: '8in' },
  { label: '10in', value: '10in' },
  { label: '12in', value: '12in' },
  { label: '16in', value: '16in' },
  { label: '20in', value: '20in' },
  { label: '24in', value: '24in' },
  { label: '30in', value: '30in' },
  { label: '36in', value: '36in' },
];

const pipeSchedules = [
  { label: '40-STD', value: '40-STD' },
  { label: '80-XS', value: '80-XS' },
  { label: 'XXS', value: 'XXS' },
  { label: '120', value: '120' },
  { label: '160', value: '160' },
];

const pipeSizeVsSchedule = {
  '1in': {
    '40-STD': 1.049,
    '80-XS': 0.957,
    'XXS': 0.599,
    '120': null,
    '160': 0.815,
  },
  '1.5in': {
    '40-STD': 1.61,
    '80-XS': 1.5,
    'XXS': 1.1,
    '120': null,
    '160': 1.338,
  },
  '2in': {
    '40-STD': 2.067,
    '80-XS': 1.939,
    'XXS': 1.503,
    '120': null,
    '160': 1.687,
  },
  '3in': { '40-STD': 3.068, '80-XS': 2.9, 'XXS': 2.3, '120': null, '160': 2.624 },
  '4in': {
    '40-STD': 4.026,
    '80-XS': 3.826,
    'XXS': 3.152,
    '120': 3.624,
    '160': 3.438,
  },
  '6in': {
    '40-STD': 6.065,
    '80-XS': 5.761,
    'XXS': 4.897,
    '120': 5.501,
    '160': 5.187,
  },
  '8in': {
    '40-STD': 7.981,
    '80-XS': 7.625,
    'XXS': 6.875,
    '120': 7.187,
    '160': 6.813,
  },
  '10in': {
    '40-STD': 10.02,
    '80-XS': 9.75,
    'XXS': 8.75,
    '120': 9.062,
    '160': 8.5,
  },
  '12in': {
    '40-STD': 12.0,
    '80-XS': 11.75,
    'XXS': 10.75,
    '120': 10.75,
    '160': 10.126,
  },
  '16in': {
    '40-STD': 15.25,
    '80-XS': 15.0,
    'XXS': null,
    '120': 13.562,
    '160': 12.812,
  },
  '20in': {
    '40-STD': 19.25,
    '80-XS': 19,
    'XXS': null,
    '120': 17.0,
    '160': 16.062,
  },
  '24in': {
    '40-STD': 23.25,
    '80-XS': 23,
    'XXS': null,
    '120': 20.376,
    '160': 19.312,
  },
  '30in': { '40-STD': 29.25, '80-XS': 29, 'XXS': null, '120': null, '160': null },
  '36in': { '40-STD': 35.25, '80-XS': 35, 'XXS': null, '120': null, '160': null },
};

const pipeSizeVseqLength = {
  '1in': {
    'length-factor': 1.5,
    'globe-ball': 28,
    'check': 11,
    'gate-fbball': 1,
    'elbow-45': 1,
    'elbow-90': 2,
    'tee-hard': 6,
    'reducer': 1,
    'enlarger': 2,
    'vessel-entry': 5,
    'vessel-exit': 2.5,
  },
  '1.5in': {
    'length-factor': 1.5,
    'globe-ball': 55,
    'check': 13,
    'gate-fbball': 1,
    'elbow-45': 1,
    'elbow-90': 3,
    'tee-hard': 8,
    'reducer': 2,
    'enlarger': 3,
    'vessel-entry': 7,
    'vessel-exit': 3.5,
  },
  '2in': {
    'length-factor': 1.5,
    'globe-ball': 70,
    'check': 17,
    'gate-fbball': 2,
    'elbow-45': 2,
    'elbow-90': 4,
    'tee-hard': 10,
    'reducer': 4,
    'enlarger': 3,
    'vessel-entry': 9,
    'vessel-exit': 4.5,
  },
  '3in': {
    'length-factor': 1.5,
    'globe-ball': 100,
    'check': 25,
    'gate-fbball': 2,
    'elbow-45': 2,
    'elbow-90': 6,
    'tee-hard': 14,
    'reducer': 4,
    'enlarger': 6,
    'vessel-entry': 15,
    'vessel-exit': 7.5,
  },
  '4in': {
    'length-factor': 1.5,
    'globe-ball': 130,
    'check': 32,
    'gate-fbball': 3,
    'elbow-45': 3,
    'elbow-90': 7,
    'tee-hard': 19,
    'reducer': 5,
    'enlarger': 8,
    'vessel-entry': 20,
    'vessel-exit': 10,
  },
  '6in': {
    'length-factor': 1.4,
    'globe-ball': 200,
    'check': 48,
    'gate-fbball': 4,
    'elbow-45': 4,
    'elbow-90': 11,
    'tee-hard': 28,
    'reducer': 7,
    'enlarger': 12,
    'vessel-entry': 36,
    'vessel-exit': 18,
  },
  '8in': {
    'length-factor': 1.4,
    'globe-ball': 260,
    'check': 64,
    'gate-fbball': 6,
    'elbow-45': 6,
    'elbow-90': 15,
    'tee-hard': 37,
    'reducer': 9,
    'enlarger': 16,
    'vessel-entry': 48,
    'vessel-exit': 24,
  },
  '10in': {
    'length-factor': 1.4,
    'globe-ball': 330,
    'check': 80,
    'gate-fbball': 7,
    'elbow-45': 7,
    'elbow-90': 18,
    'tee-hard': 47,
    'reducer': 12,
    'enlarger': 20,
    'vessel-entry': 62,
    'vessel-exit': 31,
  },
    '12in': {
    'length-factor': 1.4,
    'globe-ball': 400,
    'check': 95,
    'gate-fbball': 9,
    'elbow-45': 9,
    'elbow-90': 22,
    'tee-hard': 55,
    'reducer': 14,
    'enlarger': 24,
    'vessel-entry': 78,
    'vessel-exit': 39,
  },
  '16in': {
    'length-factor': 1.3,
    'globe-ball': 500,
    'check': 120,
    'gate-fbball': 11,
    'elbow-45': 11,
    'elbow-90': 29,
    'tee-hard': 72,
    'reducer': 18,
    'enlarger': 30,
    'vessel-entry': 100,
    'vessel-exit': 50,
  },
  '20in': {
    'length-factor': 1.2,
    'globe-ball': 650,
    'check': 155,
    'gate-fbball': 14,
    'elbow-45': 14,
    'elbow-90': 36,
    'tee-hard': 90,
    'reducer': 38,
    'enlarger': 90,
    'vessel-entry': 136,
    'vessel-exit': 68,
  },
  '24in': {
    'length-factor': 1.2,
    'globe-ball': 750,
    'check': 185,
    'gate-fbball': 16,
    'elbow-45': 16,
    'elbow-90': 44,
    'tee-hard': 110,
    'reducer': 27,
    'enlarger': 46,
    'vessel-entry': 170,
    'vessel-exit': 85,
  },
  '30in': {
    'length-factor': 1.2,
    'globe-ball': 0,
    'check': 0,
    'gate-fbball': 21,
    'elbow-45': 21,
    'elbow-90': 55,
    'tee-hard': 140,
    'reducer': 0,
    'enlarger': 0,
    'vessel-entry': 0,
    'vessel-exit': 0,
  },
  '36in': {
    'length-factor': 1.2,
    'globe-ball': 0,
    'check': 0,
    'gate-fbball': 30,
    'elbow-45': 30,
    'elbow-90': 77,
    'tee-hard': 200,
    'reducer': 0,
    'enlarger': 0,
    'vessel-entry': 0,
    'vessel-exit': 0,
  },

};

const getNominalSize = inputSize => {
  if (inputSize == 0) {
    return '1in';
  } else if (inputSize < 1.05) {
    return '1in';
  } else if (inputSize < 1.7) {
    return '1.5in';
  } else if (inputSize < 2.2) {
    return '2in';
  } else if (inputSize < 3.3) {
    return '3in';
  } else if (inputSize < 4.3) {
    return '4in';
  } else if (inputSize < 6.4) {
    return '6in';
  } else if (inputSize < 8.4) {
    return '8in';
  } else if (inputSize < 10.126) {
    return '10in';
  } else if (inputSize < 15.5) {
    return '16in';
  } else if (inputSize < 19.5) {
    return '20in';
  } else if (inputSize < 23.5) {
    return '24in';
  } else if (inputSize < 29.4) {
    return '30in';
  } else {
    return '36in';
  } 
};

export {
  pipeSizes,
  pipeSchedules,
  pipeSizeVseqLength,
  pipeSizeVsSchedule,
  getNominalSize,
};
