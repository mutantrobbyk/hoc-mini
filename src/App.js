import React from 'react';
import SuperSecret from '../src/components/SuperSecret'
import OnOffButton from './components/OnOffButton'
import AccordianMenu from './components/AccordianMenu'

function App() {
  return (
    <div className="App">
      <SuperSecret isAuthenticated={true}/>
      <OnOffButton/>
      <AccordianMenu title='Aloha!'>
        <p>This p tag is the 'props.children' for the accordian menu</p>
        </AccordianMenu>
    </div>
  );
}

export default App;
