import { useState } from 'react';

import { Grid } from './components/grid';
import { Title } from './components/title';

import './App.css';

function App() {
  const [hideGrid, setHideGrid] = useState(false);
  const [hideTitle, setHideTitle] = useState(false);
  const now = new Date().toLocaleDateString('pt-BR');

  return (
    <div>
      <Title
        defaultTitle={`Loteria Familiar - ${now}`}
        hide={hideTitle}
        onSelected={() => setHideGrid((prev) => !prev)}
      />
      <Grid hide={hideGrid} onSelected={() => setHideTitle((prev) => !prev)} />
    </div>
  );
}

export default App;
