import React, { useState } from 'react';
import { Card, InputNumber, Button, Typography, Space, Alert } from 'antd';

const { Title, Text } = Typography;

const th01 = () => {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);

  const handleGuess = () => {
    if (guess === null) return;

    if (count >= 9) {
      setMessage(`❌ Hết lượt! Số đúng là ${randomNumber}`);
      return;
    }

    if (guess < randomNumber) {
      setMessage('⬆️ Bạn đoán quá thấp!');
    } else if (guess > randomNumber) {
      setMessage('⬇️ Bạn đoán quá cao!');
    } else {
      setMessage('🎉 Chúc mừng! Bạn đoán đúng!');
    }

    setCount(count + 1);
  };

  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess(null);
    setMessage('');
    setCount(0);
  };

  return (
    <Card style={{ maxWidth: 500, margin: '40px auto' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        🎮 Trò chơi đoán số
      </Title>

      <Text>Đoán một số từ 1 đến 100</Text>

      <Space direction="vertical" style={{ width: '100%', marginTop: 20 }}>
        <InputNumber
          style={{ width: '100%' }}
          min={1}
          max={100}
          value={guess ?? undefined}
          onChange={(value) => setGuess(value)}
        />

        <Button type="primary" block onClick={handleGuess}>
          Đoán
        </Button>

        <Button danger block onClick={resetGame}>
          Chơi lại
        </Button>

        {message && <Alert message={message} type="info" showIcon />}
      </Space>

      <Text>Số lượt đã chơi: {count}/10</Text>
    </Card>
  );
};

export default th01;