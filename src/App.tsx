import { useState } from 'react';
import './App.css';
import { TProduct } from './types/TProduct.type';

function App() {
  const [user, setUsers] = useState<TProduct | null>(null);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
      </header>
      <main>

      </main>

      <footer>
        
      </footer>
    </div>
  );
}

export default App;
