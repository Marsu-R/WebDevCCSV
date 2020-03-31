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
  // add inputCylinder and inputAddition to initial state
  state = {
    inputSphere: 0,
    inputCylinder: 0,
    inputAddition: 0,
    results: [],
    darkMode: false
  };

  // Task 1: add componentDidMount to show all products on page load
  componentDidMount() {
    this.setState({
      results: result.data
    });
  }

  // Task 2 + 4: functionality to filter search results
  findResults = (inputSphere, inputCylinder, inputAddition) => {
    //console.log("This is the input:", inputSphere);

    let filteredProducts = this.state.results
      .filter(product => {
        if (!inputSphere) {
          return true;
        } else {
          return (
            inputSphere <= product.maxSphere && inputSphere >= product.minSphere
          );
        }
      })
      .filter(product => {
        if (!inputCylinder) {
          return true;
        } else {
          return (
            inputCylinder <= product.maxCylinder &&
            inputCylinder >= product.minCylinder
          );
        }
      })
      .filter(product => {
        if (!inputAddition) {
          return true;
        } else {
          return (
            inputAddition <= product.maxAddition &&
            inputAddition >= product.minAddition
          );
        }
      });

    //console.log("These are the filtered results:", filteredProducts);
    this.setState({
      results: filteredProducts
    });
  };

  // Task 3: trigger the findResults() function when hitting the Search button
  onSearch = () => {
    // use the input values from the input fields and make them available for the findResults() function
    const { inputSphere, inputCylinder, inputAddition } = this.state;
    this.findResults(inputSphere, inputCylinder, inputAddition);
    //console.log("Search button was pressed!");
  };
  onChange = (key, value) => {
    this.setState({ [key]: value });
    //console.log("This is the onChange value:", value);
  };
  toggledarkMode = () => {
    this.setState({
      darkMode: !this.state.darkMode
    });
  };
  render() {
    // add inputCylinder and inputAddition to variable to make them available as props
    const {
      darkMode,
      inputSphere,
      inputCylinder,
      inputAddition,
      results
    } = this.state;
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
            <InputField
              inputField={inputCylinder}
              name="inputCylinder"
              label="Cylinder"
              onChange={this.onChange}
            />
            <InputField
              inputField={inputAddition}
              name="inputAddition"
              label="Addition"
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
