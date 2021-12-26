import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: 'AIzaSyDzdK6EyHiK2HvMruaLxDCgBAaizphLMmU',
    authDomain: 'itransition-005-d0c90.firebaseapp.com',
    databaseURL:
        'https://itransition-005-d0c90-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'itransition-005-d0c90',
    storageBucket: 'itransition-005-d0c90.appspot.com',
    messagingSenderId: '1038132178647',
    appId: '1:1038132178647:web:88168d936b8a2f0833ca92',
}

const app = initializeApp(firebaseConfig)

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
