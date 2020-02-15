import React from "react";

class DumpObject extends React.Component {
  constructor(props) {
    super(props);
  }
  
  /**
   * https://scotch.io/courses/10-react-challenges-beginner/loop-over-and-display-data-with-jsx
   */
  render() {
    return (
        <ol>
          {this.props.arg.map((todolist, index) => (
              <li key={index}>
                {console.log(todolist)}
                <pre>{JSON.stringify(todolist, null, 2)}</pre>
              </li>
          ))}
        </ol>
    );
  }
}

export default DumpObject;