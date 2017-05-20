import React from 'react';

function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return (
    <div>
      <li>
        <span style={{color: "purple"}}>{props.reponame}</span> <strong>-></strong>
        <span style={{color: "brown"}}> {props.description}</span>
      </li>

    </div>

  )
}

class MyComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {data: []}
  }

  componentDidMount() {

    const URL = 'https://api.github.com/users/sohanchy/repos'
    let f = fetch(URL)

    f.then((response) => response.json())
    .then((responseJson) => {
      this.setState({data: responseJson})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    const jsonData = this.state.data;
    console.log(jsonData)

    // jsonData.map(x => console.log(x.name))
     const listItems = jsonData.map((x, index) =>
      <ListItem key={index}
        reponame={x.name} description={x.description}
      />
    );

    return (
      <div>
        {listItems}
      </div>
    )
  }
}

export default MyComponent;
