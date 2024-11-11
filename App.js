import React, {useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  Text,
} from 'react-native';
import {CountdownTimer} from './components/CountdownTimer';
const App = () => {
  const [timers, setTimers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(1);

  const addTimer = (initialMinutes = 1) => {
    const newTimer = {id: Date.now().toString(), initialMinutes};
    setTimers(prevTimers => [...prevTimers, newTimer]);
  };

  const renderTimer = ({item}) => (
    <CountdownTimer
      key={item.id}
      initialMinutes={item.initialMinutes}
      onDelete={() => deleteTimer(item.id)}
    />
  );

  const deleteTimer = id => {
    setTimers(prevTimers => prevTimers.filter(timer => timer.id !== id));
  };

  const openModal = () => {
    return (
      <Modal
        presentationStyle="formSheet"
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
        visible={showModal}>
        <View>
          <Text style={styles.modalHeader}>Add Timer</Text>
          <TextInput
            style={styles.textInputStyle}
            value={selectedTime.toString()}
            onChangeText={val => setSelectedTime(Number(val))}
          />
          <Button
            title="Set Timer"
            onPress={() => {
              setShowModal(false);
              addTimer(selectedTime);
            }}
          />
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Add New Timer" onPress={() => setShowModal(true)} />
      <FlatList
        data={timers}
        renderItem={renderTimer}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.timerList}
      />
      {openModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
  },
  timerList: {
    marginTop: 20,
  },
  textInputStyle: {
    margin: 30,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
    height: 45,
    paddingHorizontal: 20,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default App;
