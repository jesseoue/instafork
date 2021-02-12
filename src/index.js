import React from "react";
import ReactDOM from "react-dom";

import Influencer from "./Influencer";
import Hero from "./Hero";

import "bootstrap/dist/css/bootstrap.css";

class App extends React.PureComponent {
  state = {
    influencers: [],
    addVal: ""
  };

  render() {
    const { addVal, influencers } = this.state;

    return (
      <div className="container">
        <div className="mt-5">
          <Hero />
        </div>
        <hr className="mt-5 mb-5" />
        <div className="row mb-5">
          <div className="col">
            <div className="form-row">
              <div className="col-4">
                <label className="col-form-label">Add new influencer:</label>
              </div>

              <div className="col-6">
                <input
                  value={addVal}
                  onChange={e => {
                    this.setState({ addVal: e.target.value });
                  }}
                  className="form-control"
                />
              </div>
              <div className="col">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() =>
                    this.setState({
                      influencers: [...influencers, addVal],
                      addVal: ""
                    })
                  }
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Followers</th>
                  <th scope="col">Average likes on Posts 4-10</th>
                  <th scope="col">Average comments on Posts 4-10</th>
                  <th scope="col">Average likes + comments on posts 4-10</th>
                  <th scope="col">Engagement rate (likes)</th>
                  <th scope="col">Engagement rate (likes + comments)</th>
                </tr>
              </thead>
              <tbody>
                {influencers.map(influencer => (
                  <Influencer key={influencer} username={influencer} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
