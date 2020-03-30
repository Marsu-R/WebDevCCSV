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
    inputCylinder: 0,
    inputAddition: 0,
    results: result.data,
    darkMode: false
  };

  findResults = (inputSphere, inputCylinder, inputAddition) => {
    console.log("this is the input", this.state.inputSphere);
    // let filteredProducts = this.state.results.filter(obj => {
    //   if (
    //     this.state.inputSphere <= obj.maxSphere &&
    //     this.state.inputSphere >= obj.minSphere
    //   ) {
    //     return true;
    //   }

    let filteredProducts = this.state.results;
    if (this.state.inputSphere) {
      filteredProducts = this.state.results.filter(product => {
        if (
          this.state.inputSphere <= product.maxSphere &&
          this.state.inputSphere >= product.minSphere
        ) {
          return true;
        }
      });
    }

    if (this.state.inputCylinder) {
      filteredProducts = this.state.results.filter(product => {
        if (
          this.state.inputCylinder <= product.maxCylinder &&
          this.state.inputCylinder >= product.minCylinder
        ) {
          return true;
        }
      });
    }

    if (this.state.inputAddition) {
      filteredProducts = this.state.results.filter(product => {
        if (
          this.state.inputAddition <= product.maxAddition &&
          this.state.inputAddition >= product.minAddition
        ) {
          return true;
        }
      });
    }

    //----------
    // if (
    //   this.state.inputCylinder <= obj.maxCylinder &&
    //   this.state.inputCylinder >= obj.minCylinder
    // ) {
    //   return true;
    // }
    // if (
    //   this.state.inputAddition <= obj.maxAddition &&
    //   this.state.inputAddition >= obj.minAddition
    // ) {
    //   return true;
    // }
    //   console.log("this is the obj", obj);
    // });

    console.log("filtered", filteredProducts);
    this.setState({
      results: filteredProducts
      //inputSphere: 0
    });
  };

  onSearch = () => {
    // console.log("to be done");
    this.findResults();
    // this.setState({
    //   inputSphere: this.state.inputSphere,
    // });
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
