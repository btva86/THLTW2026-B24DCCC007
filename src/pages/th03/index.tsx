import React, { useState } from 'react';
import { Card, Button, Typography, List } from 'antd';

const { Title } = Typography;

const choices = ['Kéo', 'Búa', 'Bao'];

const th03 = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [result, setResult] = useState('');

  const play = (playerChoice: string) => {
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    let kq = '';

    if (playerChoice === computerChoice) {
      kq = 'Hòa';
    } else if (
      (playerChoice === 'Kéo' && computerChoice === 'Bao') ||
      (playerChoice === 'Búa' && computerChoice === 'Kéo') ||
      (playerChoice === 'Bao' && computerChoice === 'Búa')
    ) {
      kq = 'Bạn thắng';
    } else {
      kq = 'Bạn thua';
    }

    const newRound = {
      player: playerChoice,
      computer: computerChoice,
      result: kq,
    };

    setHistory([newRound, ...history]);
    setResult(`Bạn chọn ${playerChoice} - Máy chọn ${computerChoice} → ${kq}`);
  };

  return (
    <div style={{ padding: 40, maxWidth: 700, margin: 'auto' }}>
      <Card>
        <Title style={{ textAlign: 'center' }}>
          Trò Chơi Oẳn Tù Tì
        </Title>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Button
            type="primary"
            style={{ margin: 10 }}
            onClick={() => play('Kéo')}
          >
            Kéo
          </Button>

          <Button
            type="primary"
            style={{ margin: 10 }}
            onClick={() => play('Búa')}
          >
            Búa
          </Button>

          <Button
            type="primary"
            style={{ margin: 10 }}
            onClick={() => play('Bao')}
          >
            Bao
          </Button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <b>{result}</b>
        </div>

        <Title level={4}>Lịch sử ván đấu</Title>

        <List
          bordered
          dataSource={history}
          renderItem={(item, index) => (
            <List.Item>
              #{history.length - index} | Bạn: {item.player} | Máy: {item.computer} | {item.result}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default th03;