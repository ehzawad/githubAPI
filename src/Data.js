import React from "react";

function ListItem(props) {
  // stateless component
  return (
    <div>
      <li>
        <span style={{ color: "purple" }}>{props.reponame}</span>{" "}
        <strong>-></strong>
        <span style={{ color: "brown" }}> {props.description}</span>
      </li>
    </div>
  );
}

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], gistsORrepos: "gists" };

    // this binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.fetching = this.fetching.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      gistsORrepos: prevState.gistsORrepos === "gists" ? "repos" : "gists"
    }));
    this.fetching()
    console.log(this.state.gistsORrepos)
  }

  fetching() {
    let USER = "abrarshariar";

    const URL = `https://api.github.com/users/${USER}/${this.state.gistsORrepos}`;
    let f = fetch(URL);
    f
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ data: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }


  render() {
    const jsonData = this.state.data;
    // console.log(jsonData)
    // jsonData.map(x => console.log(x.name))
    const listItems = jsonData.map((x, index) =>
      <ListItem key={index} reponame={x.name} description={x.description} />
    );

    return (
      <div>
        <button onClick={this.handleClick}>
          {this.state.gistsORrepos ==="gists" ? "gists" : "repos"}
        </button>
        {listItems}
      </div>
    );
  }
}

export default MyComponent;
