import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Button onClick={(e) => {e.preventDefault();alert(1)}}> Hello </Button>
       <Button disabled> disabled Button </Button>
       <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Primary Large</Button>
       <Button btnType={ButtonType.Primary} size={ButtonSize.Small}> Primary Small</Button>
       <Button btnType={ButtonType.Link} href="https://www.baidu.com" target="_blank"> Button Link </Button>
       <Button btnType={ButtonType.Link} href="https://www.baidu.com" disabled> Disabled Link </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
