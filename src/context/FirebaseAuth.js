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

import firebase from "firebase";
import {dataModel} from "./DataModel";

/**
 * Firebase documentation on Auth: https://firebase.google.com/docs/reference/js/firebase.auth.Auth
 */
class FirebaseAuth {
    constructor() {
        const config = {
            apiKey: "AIzaSyBiGQI2Z0jh7cYTn8yawY9tMZZTdnMLo7w",
            authDomain: "poc-react-datamodel-events.firebaseapp.com",
            databaseURL: "https://poc-react-datamodel-events.firebaseio.com",
            projectId: "poc-react-datamodel-events",
            storageBucket: "poc-react-datamodel-events.appspot.com",
            messagingSenderId: "97985664561",
            appId: "1:97985664561:web:00b004b7d37599f00b2710"
        };
        this.firebaseApp = firebase.initializeApp(config);
        this.firebaseAuth = firebase.auth(this.firebaseApp);
    }

    signIn() {
        const authProvider = new firebase.auth.GoogleAuthProvider();
        this.firebaseAuth
            .signInWithPopup(authProvider)
            .then((result) => {
                const {uid, displayName, photoURL, email} = result.user;
                const userObject = {uid, displayName, photoURL, email};
                console.log(userObject);
                dataModel.setUser(userObject);
            });
    };

    signOut() {
        console.log("Signed out!🐣");
        this.firebaseAuth.signOut().then(() => {
            dataModel.setUser(null);
        });
    }
}

const firebaseAuth = new FirebaseAuth();

export {firebaseAuth};
