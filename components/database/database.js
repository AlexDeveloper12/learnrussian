import {Platform} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

export let db = SQLite.openDatabase({ name: 'UsersCards.db', createFromLocation: "~UsersCards.db", location: "Library" }, openCB, errorCB);


export function errorCB(err) {
    console.log("SQL Error: " + err);
}

export function successCB() {
    console.log("SQL executed fine");
}

export function openCB() {
    console.log("Database OPENED");
}

//SQLite.openDatabase({name : "testDB", createFromLocation : 1}, okCallback,errorCallback);

export let dbTwo = SQLite.openDatabase({name:"UsersCards.db",location:'default',createFromLocation:'~www/UsersCards.db'},openCB,errorCB);