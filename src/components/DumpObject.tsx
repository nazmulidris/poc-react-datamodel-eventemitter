/*
 * Copyright 2020 Nazmul Idris. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";

interface DumpObjectPropsType {
  arg: {}[];
}

class DumpObject extends React.Component<DumpObjectPropsType, {}> {
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