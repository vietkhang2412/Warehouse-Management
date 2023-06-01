import { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Toolbar = () => {

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;

    const desiredWidth = screenWidth * 0.7;

    setWidth(desiredWidth);
  }, []);
  
  const [isSearching, setIsSearching] = useState(false);
  const searchWidth = new Animated.Value(0);

  const handleSearchPress = () => {
    setIsSearching(true);
  };

  const handleClearPress = () => {
    setIsSearching(false);
  };

  useEffect(() => {
    Animated.timing(searchWidth, {
      toValue: isSearching ? width : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isSearching]);

  return (
    <View style={styles.toolbarContainer}>
      {!isSearching ? (
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.clearButton} onPress={handleClearPress}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      )}
      <Animated.View style={[styles.searchInputContainer, { width: searchWidth }]}>
        {isSearching && (
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
            placeholderTextColor="#eee"
          />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#03DAC6',
    paddingHorizontal: 0,
    height: 56,
    alignSelf: 'flex-end'
  },
  searchButton: {
    marginRight: 0,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white',
    marginVertical: 2,
  },
  clearButton: {
    marginLeft: 8,
  }
});

export default Toolbar