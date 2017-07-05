import React, { Component } from "react";
import ThemeProvider from "react-toolbox/lib/ThemeProvider";
import ReactToolboxExample from "./reactToolboxExample";
import EmotionExample from "./emotionExample";
import theme from "./css/theme.css";
import logo from "./logo.svg";
import styles from "./App.css";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className={styles.app}>
          <div className={styles.appHeader}>
            <img src={logo} className={styles.appLogo} alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className={styles.appIntro}>
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
