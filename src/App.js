import React, { Component } from "react";
import ThemeProvider from "react-toolbox/lib/ThemeProvider";
import theme from "./assets/react-toolbox/theme";
import ReactToolboxExample from "./reactToolboxExample";
import EmotionExample from "./emotionExample";
import logo from "./logo.svg";
import "./App.css";
import "./assets/react-toolbox/theme.css";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>

          <ReactToolboxExample />
          <EmotionExample />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
