/*
 * Copyright 2020 Maret Idris. All rights reserved.
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

import React               from "react";
import AvatarIcon          from '../images/avatar.svg';
import {firebaseAuth}      from "../context/FirebaseAuth";
import {dataModel, EVENTS} from "../context/DataModel";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name  : "Username",
      avatar: AvatarIcon
    };
  }
  
  render() {
    return (
        <div>
          <button onClick={firebaseAuth.signIn}>Sign in with Google</button>
          <button onClick={firebaseAuth.signOut}>Sign out</button>
          <h3>{this.state.name}</h3>
          <img className="avatar" src={this.state.avatar} alt="user icon"/>
        </div>
    );
  }
  
  handleSignInEvent = (user) => {
    console.log(JSON.stringify(user, null, 2));
    if (user) {
      this.setState({name: user.displayName, avatar: user.photoURL});
    }
    else {
      this.setState({name: "Username", avatar: AvatarIcon});
    }
  };
  
  componentDidMount() {
    // emitter[SignIn].Receive --> 🐣
    dataModel.eventEmitter.addListener(EVENTS.SIGN_IN, this.handleSignInEvent);
  }
  
  componentWillUnmount() {
    // Remember to remove the listener when this component is destroyed.
    dataModel.eventEmitter.removeListener(EVENTS.SIGN_IN, this.handleSignInEvent)
  }
}

export default Auth;
