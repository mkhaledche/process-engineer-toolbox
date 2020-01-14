const pipeSizes = [
  { label: '1in', value: '1in' },
 { label: '8in', value: '8in' },
//  '1.5in','2in','3in','4in','6in','8in','10in','12in','16in','20in','24in','30in','36in',
 ]



const pipeSchedules = [
                { label: '40-STD', value: '40-STD' },
                { label: '80-XS', value: '80-XS' },
                { label: 'XXS', value: 'XXS' },
                { label: '120', value: '120' },
                { label: '160', value: '160' },
            ]

const pipeSizeVsSchedule = {
'1in': {'40-STD': 1.049, '80-XS': 0.957, 'XXS': 0.599, '120': null, '160': 0.815},
'8in': {'40-STD': 7.981, '80-XS': 7.625, 'XXS': 6.875, '120': 7.187, '160': 6.813},
};

const pipeSizeVseqLength = {
'1in': {'length-factor': 1.5, 'globe-ball': 28, 'check': 11, 'gate-fbball': 1, 'elbow-45': 1, 'elbow-90': 2, 'tee-hard': 6, 'reducer': 1, 'enlarger': 2, 'vessel-entry': 5,'vessel-exit': 2.5,},
'8in': {'length-factor': 1.4, 'globe-ball': 260, 'check': 64, 'gate-fbball': 6, 'elbow-45': 6, 'elbow-90': 15, 'tee-hard': 37, 'reducer': 9, 'enlarger': 16, 'vessel-entry': 48,'vessel-exit': 24,},
};

const getNominalSize = inputSize => {
      if (inputSize == 0) {
        return 'Please add Pipe size.';
      }
      else if (inputSize < 1.05) {
        return '1in';
      }
      else if(inputSize < 1.7) {
        return '1.5in';
      }
      else if(inputSize < 2.2) {
        return '2in';
      }
      else if(inputSize < 3.3) {
        return '3in';
      }
      else if(inputSize < 4.3) {
        return '4in';
      }
      else if(inputSize < 6.4) {
        return '6in';
      }
      else if(inputSize < 8.4) {
        return '8in';
      }
      else if(inputSize < 10.126) {
        return '10in';
      }
      else if(inputSize < 15.5) {
        return '16in';
      }
      else if(inputSize < 19.5) {
        return '20in';
      }
      else if(inputSize < 23.5) {
        return '24in';
      }
      else if(inputSize < 29.4) {
        return '30in';
      }
      else if(inputSize < 36) {
        return '1.5in';
      }
      else {
        return 'Cannot calculate nominal size for a pipe greater than 36in. Please add the pipe distance manually.';
      }
};

export {pipeSizes, pipeSchedules, pipeSizeVseqLength, pipeSizeVsSchedule, getNominalSize};