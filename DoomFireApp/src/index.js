import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Table, Cell, TableWrapper} from 'react-native-table-component';

const App = () => {
  const [fireArray, setFireArray] = useState([]);
  const firePixelArray = [];
  const fireWidth = 50;
  const fireHeight = 40;
  const fireColorsPalette = [
    { r: 7, g: 7, b: 7 },
    { r: 31, g: 7, b: 7 },
    { r: 47, g: 15, b: 7 },
    { r: 71, g: 15, b: 7 },
    { r: 87, g: 23, b: 7 },
    { r: 103, g: 31, b: 7 },
    { r: 119, g: 31, b: 7 },
    { r: 143, g: 39, b: 7 },
    { r: 159, g: 47, b: 7 },
    { r: 175, g: 63, b: 7 },
    { r: 191, g: 71, b: 7 },
    { r: 199, g: 71, b: 7 },
    { r: 223, g: 79, b: 7 },
    { r: 223, g: 87, b: 7 },
    { r: 223, g: 87, b: 7 },
    { r: 215, g: 95, b: 7 },
    { r: 215, g: 95, b: 7 },
    { r: 215, g: 103, b: 15 },
    { r: 207, g: 111, b: 15 },
    { r: 207, g: 119, b: 15 },
    { r: 207, g: 127, b: 15 },
    { r: 207, g: 135, b: 23 },
    { r: 199, g: 135, b: 23 },
    { r: 199, g: 143, b: 23 },
    { r: 199, g: 151, b: 31 },
    { r: 191, g: 159, b: 31 },
    { r: 191, g: 159, b: 31 },
    { r: 191, g: 167, b: 39 },
    { r: 191, g: 167, b: 39 },
    { r: 191, g: 175, b: 47 },
    { r: 183, g: 175, b: 47 },
    { r: 183, g: 183, b: 47 },
    { r: 183, g: 183, b: 55 },
    { r: 207, g: 207, b: 111 },
    { r: 223, g: 223, b: 159 },
    { r: 239, g: 239, b: 199 },
    { r: 255, g: 255, b: 255 },
  ];
  // const fireColorsPalette = [
  //   {r: 7, g: 7, b: 7},
  //   {r: 47, g: 15, b: 7},
  //   {r: 87, g: 23, b: 7},
  //   {r: 119, g: 31, b: 7},
  //   {r: 159, g: 47, b: 7},
  //   {r: 191, g: 71, b: 7},
  //   {r: 223, g: 79, b: 7},
  //   {r: 223, g: 87, b: 7},
  //   {r: 215, g: 95, b: 7},
  //   {r: 207, g: 111, b: 15},
  //   {r: 207, g: 127, b: 15},
  //   {r: 183, g: 175, b: 47},
  //   {r: 183, g: 183, b: 55},
  //   {r: 223, g: 223, b: 159},
  //   {r: 255, g: 255, b: 255},
  // ];

  const start = () => {
    createFireDataStruct();
    createFireSource();
    setInterval(updateFireIntensityPerPixel, 20);
  };

  const createFireDataStruct = () => {
    for (let column = 0; column < fireHeight; column++) {
      const columnPixels = [];
      for (let row = 0; row < fireWidth; row++) {
        columnPixels[row] = 0;
      }
      firePixelArray.push(columnPixels);
    }
  };

  const createFireSource = () => {
    for (let column = 0; column < fireWidth; column++) {
      firePixelArray[fireHeight - 1][column] = 36;
    }
  };

  const updateFireIntensityPerPixel = () => {
    for (let column = 0; column < fireWidth; column++) {
      for (let row = fireHeight - 2; row >= 0; row--) {
        const decayC = Math.floor(Math.random() * 3);
        const decayI = Math.floor(Math.random() * 3);
        firePixelArray[row][column - decayC] =
          firePixelArray[row + 1][column] - decayI;
        if (firePixelArray[row][column - decayC] < 0) {
          firePixelArray[row][column - decayC] = 0;
        }
      }
    }
    setFireArray(firePixelArray);
  };

  const updateFireColorPerPixel = pixel => {
    const backgroundcolor = `rgb(${fireColorsPalette[pixel].r}, ${
      fireColorsPalette[pixel].g
    }, ${fireColorsPalette[pixel].b})`;
    return backgroundcolor;
  };

  return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 0, borderColor: '#000'}}>
        {fireArray.map((row, indexRow) => (
          <TableWrapper
            key={indexRow}
            style={{flexDirection: 'row'}}
            borderStyle={{borderWidth: 0, borderColor: '#000'}}>
            {row.map((pixel, indexPixel) => (
              <Cell
                key={indexPixel}
                textStyle={styles.text}
                style={{
                  backgroundColor: updateFireColorPerPixel(pixel),
                  borderWidth: 0,
                  borderColor: '#000',
                  width: 10,
                  height: 10,
                }}
              />
            ))}
          </TableWrapper>
        ))}
      </Table>
      <TouchableOpacity onPress={start} style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: '#000',
    padding: 30,
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: 'rgb(170, 30, 7)',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
