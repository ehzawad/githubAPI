import React from "react";
import { Button, Grid, Jumbotron, ListGroup, ListGroupItem } from "react-bootstrap"

function ListItem(props) {
  // stateless component
  return (
    <div>
      <ListGroup>
        <ListGroupItem>
          <strong>{props.reponame} -></strong> {props.description}
        </ListGroupItem>
      </ListGroup>
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
    const owner = jsonData.map(x =>  x.owner.login)
    const username = new Set(owner)

    const listItems = jsonData.map((x, index) =>
      <ListItem key={index} reponame={x.name} description={x.description} />
    );

    return (
      <div>
        <Jumbotron>
          <Grid>
            <Button bsStyle="info" onClick={this.handleClick}>
              {this.state.gistsORrepos ==="gists" ? "gists" : "repos"}
              <br/>{username}
            </Button>
          </Grid>
        </Jumbotron>
        {listItems}
      </div>
    );
  }
}

export default MyComponent;
