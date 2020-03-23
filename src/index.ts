import * as jssip from 'jssip';

let socket = new jssip.WebSocketInterface('wss://sip.softwareconnect.com/ws');
socket.via_transport = 'wss';

let configuration = {
  sockets  : [ socket ],
  uri      : 'sip:30wss@sip.softwareconnect.com',
  authorization_user: '30wss',
  password : 'my-password',
};

// Create phone object w/ config
let ua = new jssip.UA(configuration);

// Phone event listeners
ua.on('registered'        , e => console.log('registered', e));
ua.on('unregistered'      , e => console.log('unregistered', e));
ua.on('registrationFailed', e => console.log('registration failed', e));
ua.on('connecting'        , e => console.log('connecting', e));
ua.on('disconnected'      , e => console.log('disconnected', e));
ua.on('sipEvent'          , e => console.log('sip event', e));
ua.on('newRTCSession'     , e => console.log('new call', e));
ua.on('newMessage'        , e => console.log('new message'));
ua.on('registrationExpiring', () => console.log('registration expiring'));


ua.on('connected' , e => {
  console.log('connected',e);
  call();
});

// Register phone
ua.start();

// Check phone status on interval
let interval = 5000;
function heartbeat() {
  let isRegistered = ua.isConnected();
  let isConnected = ua.isConnected();
  console.log({isConnected, isRegistered});
}
setInterval(heartbeat, interval);
heartbeat();


// Call event listeners
let eventHandlers = {
  progress : e => console.log('call is in progress', e),
  failed   : e => console.log('call failed', e),
  ended    : e => console.log('call ended', e),
  confirmed: e => console.log('call confirmed', e),
};
 
// Call config
let phoneNumber = 'tel:12628936063'
let mediaConstraints = { audio: true, video: false };
let options = { eventHandlers, mediaConstraints };
 
// Trigger call

function call() {
  let session = ua.call(phoneNumber, options);
}
