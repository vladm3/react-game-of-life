import { FC } from 'react';
import Game from './game/Game';

const App: FC = () => {
  return (
    <div>
      <Game width={50} height={50} iterationDelay={400} />
    </div>
  );
};

export default App;
