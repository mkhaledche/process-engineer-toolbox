  import React from 'react';
  import {View} from 'react-native';

  const iosPickerIcon = () => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          borderTopWidth: 7,
          borderTopColor: 'gray',
          borderRightWidth: 7,
          borderRightColor: 'transparent',
          borderLeftWidth: 7,
          borderLeftColor: 'transparent',
          width: 0,
          height: 0,
        }}
      />
    );
  };

  export default iosPickerIcon;
