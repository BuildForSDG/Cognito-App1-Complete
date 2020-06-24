import React from 'react';
import './components/App.css';
import Form from './components/Form';
import Footer from './components/Footer';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App App-header">
      <h1 style={{textAlign: "center"}} >COGNITO</h1>
        <Form />
        <Footer />
    </div>
  )}

export default App;
