// socket.js
import { io } from 'socket.io-client';

const socket = process.env.NODE_ENV === 'development'
  ? io('http://192.168.0.154:3000') // or whatever your dev backend is
  : io();

export default socket; 
