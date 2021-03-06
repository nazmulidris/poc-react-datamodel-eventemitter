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

import {UserObjectType} from "./FirebaseAuth";
import {EventEmitter} from "events";

const DATA_KEY = "data";
const USER_KEY = "user";

const EVENTS = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT"
};

class DataModel {
  public data: {};
  public user: UserObjectType;
  public eventEmitter: EventEmitter;
  
  constructor() {
    const dataString = localStorage.getItem(DATA_KEY);
    this.data = (dataString) ? JSON.parse(dataString) : {};
    const userString = localStorage.getItem(USER_KEY);
    this.user = (userString) ? JSON.parse(userString) : {};
    
    const EventEmitter = require('events');
    this.eventEmitter = new EventEmitter();
  }
  
  getUser = () => {
    return this.user;
  }
  
  getData = () => {
    return this.data;
  }
  
  // Save user object to localStorage from memory.
  setUser = (user: UserObjectType): void => {
    this.user = user;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    // emitter[SignIn].Send --> 🐣
    this.eventEmitter.emit(EVENTS.SIGN_IN, user);
  }
  
  // Save data object to localStorage from memory.
  setData = (data: {}): void => {
    this.data = data;
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
    
    console.log("🏁 dataModel has been created");
  }
  
  init = () => {
    console.log("🏁 dataModel has been created");
  }
  
}

const dataModel = new DataModel();

export {dataModel, EVENTS}
