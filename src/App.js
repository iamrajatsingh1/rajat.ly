import React, { Component } from "react";
import "./sass/index.scss";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import CallToAction from "./components/CTA";
import Footer from "./components/Footer";
import Specifications from "./components/Specifications";
import URLItem from "./components/URLItem";
import GlobalContext from "./components/GlobalContext";
import Loading from "./components/Loading";
import { apiCall } from "./action/api-call-executer";
import { isValidUrl } from "./utils/validater";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      input: "",
      error: false,
      loading: false,
      handleSubmit: this.handleSubmit,
      handleInputChange: this.handleInputChange,
      handleEnter: this.handleEnter,
      giveShortidFromWindow: this.giveShortidFromWindow,
    };
  }

  componentDidMount = () => {
    let shortid = this.giveShortidFromWindow();
    if (shortid !== "") {
      apiCall({
        url: `http://localhost:8001/${shortid}`,
        method: "get",
      })
        .then()
        .catch((e) => {
          console.log(e);
        });
    } else {
      apiCall({
        url: "http://localhost:8001/api/shortid/get",
        method: "get",
        crossDomain: true,
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (res.data.success) {
            let responseData = res.data.data;
            localStorage.setItem("data", JSON.stringify(responseData || []));
            this.setState({
              values: responseData || [],
            });
          } else {
            this.setState({
              error: true,
            });
          }
        })
        .catch((e) => {
          this.setState({
            error: true,
          });
          console.error(e);
        });
    }
  };
  giveShortidFromWindow = () => {
    let shortid = window.location.pathname;

    while (shortid.charAt(0) === "/") {
      shortid = shortid.substring(1);
    }
    return shortid;
  };

  validateAndGetData = () => {
    const { input } = this.state;
    if (input) {
      if (!isValidUrl(input)) {
        return this.setState({ error: true });
      } else {
        this.setState({ loading: true });
        this.getShortenedURL();
      }
    } else {
      return this.setState({ error: true });
    }
  };
  getShortenedURL = async () => {
    let { input } = this.state;
    apiCall({
      url: "http://localhost:8001/api/shortid/add",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: { full: input },
    })
      .then((res) => {
        if (res.data.success) {
          let shortid = res.data.data.shortid;
          const { values } = JSON.parse(JSON.stringify(this.state));
          const _id = this.getUniqueID();
          if (input.length >= 65) {
            input = input.substr(0, 65) + "...";
          }
          values.push({
            _id,
            full: input,
            short: `http://localhost:8001/${shortid}`,
          });
          localStorage.setItem("data", JSON.stringify(values));
          this.setState({ values, input: "", loading: false });
        } else {
          this.setState({
            loading: false,
            error: true,
          });
        }
      })
      .catch((e) => {
        this.setState({
          loading: false,
          error: true,
        });
      });
  };
  handleSubmit = async () => {
    this.validateAndGetData();
  };

  handleEnter = (e) => {
    if (e.key === "Enter") {
      this.validateAndGetData();
    }
  };
  handleInputChange = ({ input, error }) => {
    this.setState({ input, error });
  };

  getUniqueID = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  render() {
    const { values, loading } = this.state;

    return (
      <GlobalContext.Provider value={this.state}>
        <Navbar />
        <Hero />
        <div className="section-2">
          <Search />
          <div className="container">
            {values.map((eachItem, key) => {
              return (
                <div key={Math.random() * key}>
                  <URLItem data={eachItem} />
                </div>
              );
            })}
            {loading && <Loading />}
          </div>
          <Specifications />
        </div>
        <CallToAction />
        <Footer />
      </GlobalContext.Provider>
    );
  }
}
