import React from "react";
import result from "./data.json";
import InputField from "./InputField";
import SearchButton from "./SearchButton";
import ShowResults from "./ShowResults";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import SwitchStyle from "./SwitchStyle";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#007BA7"
    },
    secondary: {
      main: "#02e2f2"
    }
  },
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif"
    ].join(",")
  }
});

class App extends React.Component {
  state = {
    inputSphere: 0,
    results: result.data,
    darkMode: false
  };

  findResults = inputSphere => {
    console.log("this is the input", this.state.inputSphere);
    let filteredProducts = this.state.results.filter(obj => {
      if (
        this.state.inputSphere <= obj.maxSphere &&
        this.state.inputSphere >= obj.minSphere
      ) {
        return true;
      }
      console.log("this is the obj", obj);
    });
    console.log("filtered", filteredProducts);
    this.setState({
      results: filteredProducts
    });
  };

  onSearch = () => {
    // console.log("to be done");
    this.findResults();
    console.log("search button was pressed");
  };
  onChange = (key, value) => {
    this.setState({ [key]: value });
    console.log("this is onChange", value);
  };
  toggledarkMode = () => {
    this.setState({
      darkMode: !this.state.darkMode
    });
  };
  render() {
    const { darkMode, inputSphere, results } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <div className={darkMode ? "AppDark" : "AppLight"}>
          <Grid className="searchField">
            <InputField
              inputField={inputSphere}
              name="inputSphere"
              label="Sphere"
              onChange={this.onChange}
            />
            <SearchButton onSearch={this.onSearch} />
          </Grid>
          <Grid className={darkMode ? "serchResult" : "serchResultLight"}>
            <ShowResults results={results} />
          </Grid>
          <SwitchStyle
            darkMode={this.state.darkMode}
            toggledarkMode={this.toggledarkMode}
          />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
