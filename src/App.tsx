import { useState } from 'react';

import { Grid } from './components/grid';
import { Title } from './components/title';

import './App.css';

function App() {
  const [hideGrid, setHideGrid] = useState(false);
  const [hideTitle, setHideTitle] = useState(false);

  return (
    <div>
      <Title
        defaultTitle="Loteria Familiar - 22/11/22"
        hide={hideTitle}
        onSelected={() => setHideGrid((prev) => !prev)}
      />
      <Grid hide={hideGrid} onSelected={() => setHideTitle((prev) => !prev)} />
    </div>
  );
}

export default App;
