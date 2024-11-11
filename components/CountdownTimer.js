import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export const CountdownTimer = ({initialMinutes = 1, onDelete}) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };

  useEffect(() => {
    let timer = null;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const startTimer = () => setIsActive(true);

  const pauseTimer = () => setIsActive(false);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialMinutes * 60);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Start"
          onPress={startTimer}
          disabled={isActive || timeLeft === 0}
        />
        <Button title="Pause" onPress={pauseTimer} disabled={!isActive} />
        <Button title="Reset" onPress={resetTimer} />
        <Button title="Delete" onPress={onDelete} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timeText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
