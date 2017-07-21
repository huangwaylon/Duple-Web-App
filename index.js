// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

// IDs of divs that display Instance ID token UI or request permission UI.
const row_welcome = "row_welcome";
const row_notification = "row_notification";
const row_sign_in = "row_sign_in";
const row_user = "row_user";

const TOAST_LENGTH = 4000;

var UID_VAL = "null";

var apps_json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'actions.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
            console.log(json);
        }
    });
    return json;
})(); 

function signIn() {
  console.log("Sign in clicked.");
  if (!firebase.auth().currentUser) {
    // Show progress bar.
    showHideDiv("progress_signin", true);
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');

    firebase.auth().signInWithRedirect(provider);

    setSigningIn(true);
  } else {
    console.log("Already logged in.");
    Materialize.toast('Already signed in.', TOAST_LENGTH);
  }
}

function signOut() {  
  console.log("Sign out clicked.");
  if (firebase.auth().currentUser) {
    // Show progress bar.
    showHideDiv("progress_signout", true);

    firebase.auth().signOut();
    Materialize.toast('Signed out successfully.', TOAST_LENGTH);
  } else {
    console.log("Already signed out.");
    Materialize.toast('Already signed out.', TOAST_LENGTH);
  }
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 *  - firebase.auth().getRedirectResult(): This promise completes when the user gets back from
 *    the auth redirect flow. It is where you can get the OAuth access token from the IDP.
 */
function initApp() {
  console.log("Initialize app.");

  // Result from Redirect auth flow.
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      //document.getElementById('quickstart-oauthtoken').textContent = token;
    } else {
      //document.getElementById('quickstart-oauthtoken').textContent = 'null';
    }
    // The signed-in user info.
    var user = result.user;
    setSigningIn(false);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    if (errorCode === 'auth/account-exists-with-different-credential') {
      alert('You have already signed up with a different auth provider for that email.');
      // If you are using multiple auth providers on your app you should handle linking the user's accounts here.
    } else {
      console.error(error);
      Materialize.toast('Strange sign in error. Check console.', TOAST_LENGTH);
    }
  });

  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    // User is not signing in anymore.
    setSigningIn(false);

    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      
      console.log("User is signed in. UID is: " + uid);
      UID_VAL = uid;

      Materialize.toast('Signed in successfully! Hi ' + displayName + '.', TOAST_LENGTH);

      setLoggedIn(true);
      showHideDiv(row_sign_in, false);
      showHideDiv(row_user, true);

      showHideDiv("progress_signin", false);
      showHideDiv("progress_signout", false);

      document.getElementById('row_user_name').textContent = 'Hello ' + displayName;
      document.getElementById('row_user_email').textContent = 'Signed in as ' + email;
    } else {
      // User is signed out.
      console.log("User is signed out.");
      setLoggedIn(false);

      showHideDiv(row_sign_in, true);
      showHideDiv(row_user, false);

      showHideDiv("progress_signin", false);
      showHideDiv("progress_signout", false);
    }
  });
}

<!-- INDEX APP -->

Date.prototype.customFormat = function(formatString) {
    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
    YY = ((YYYY=this.getFullYear())+"").slice(-2);
    MM = (M=this.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
    DD = (D=this.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
    h=(hhh=this.getHours());
    if (h==0) h=24;
    if (h>12) h-=12;
    hh = h<10?('0'+h):h;
    hhhh = hhh<10?('0'+hhh):hhh;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=this.getMinutes())<10?('0'+m):m;
    ss=(s=this.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
  };

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
  messaging.getToken()
  .then(function(refreshedToken) {
    console.log('Token refreshed.');
    // Indicate that the new Instance ID token has not yet been sent to the app server.
    setTokenSentToServer(false);
    // Send Instance ID token to app server.
    sendTokenToServer(refreshedToken);

    // Display new Instance ID token and clear UI of all previous messages.
    resetUI();

  })
  .catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
    Materialize.toast('Unable to get refreshed token.', TOAST_LENGTH);
  });
});

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a sevice worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function(payload) {
  console.log("Message received. ", payload);

  // Customize notification here
  const data = payload.data;

  const pkg = data.pkg;
  var icon = '/icon.png';
  var click_action = null;
  if (pkg in apps_json) {
    icon = "/appicons/" + pkg + ".png";
    click_action = apps_json[pkg]["url"];
  }

  var time = new Date(parseInt(data.time));
  var dateStr = time.customFormat("#MMM# #D#, #h#:#mm# #AMPM#");

  const notificationTitle = data.title;
  const notificationOptions = {
    "body": data.body + "\n" + dateStr,
    "icon": icon,
    "click_action": click_action
  };

  const timeout = data.timeout;
  
  var n = new Notification(notificationTitle, notificationOptions);
  n.onclick = function () {
    if (click_action !== null) {
      window.open(click_action);
    }
  };

  setTimeout(n.close.bind(n), timeout); 
});

function resetUI() {
  console.log("Resetting UI...");

  // Get Instance ID token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  messaging.getToken()
  .then(function(currentToken) {
    if (currentToken) {
      // Send the token to our server.
      sendTokenToServer(currentToken);
      // Hid the notification card.
      showHideDiv(row_notification, false);

      if (isLoggedIn()) {
        showHideDiv(row_sign_in, false);
        showHideDiv(row_user, true);

        showHideDiv("progress_signin", false);
        showHideDiv("progress_signout", false);
      } else {
        showHideDiv(row_sign_in, true);
        showHideDiv(row_user, false);

        showHideDiv("progress_signin", isSigningIn());
        showHideDiv("progress_signout", false);
      }
    } else {
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show notification card.
      setTokenSentToServer(false);
      showHideDiv(row_notification, true);
      showHideDiv(row_sign_in, false);
      showHideDiv(row_user, false);

      showHideDiv("progress_signin", false);
      showHideDiv("progress_signout", false);
    }
  })
  .catch(function(err) {
    console.log('An error occurred while retrieving token. ', err);
    Materialize.toast('Error getting token.', TOAST_LENGTH);
    setTokenSentToServer(false);

    // Show notification card.
    setTokenSentToServer(false);
    showHideDiv(row_notification, true);
    showHideDiv(row_sign_in, false);
    showHideDiv(row_user, false);

    showHideDiv("progress_signin", false);
    showHideDiv("progress_signout", false);
  });
}

// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server.');

    var data = "uid=" + UID_VAL + "&iid=" + currentToken;
    var path = "https://notifydesktop.herokuapp.com/web/";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", path, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);

    setTokenSentToServer(true);
  } else {
    console.log('Token already sent to server so won\'t send it again unless it changes');
  }
}

function isTokenSentToServer() {
  return window.localStorage.getItem('sentToServer') == 1;
}

function setTokenSentToServer(sent) {
  window.localStorage.setItem('sentToServer', sent ? 1 : 0);
}

function isLoggedIn() {
  return window.localStorage.getItem('loggedIn') == 1;
}

function setLoggedIn(loggedIn) {
  window.localStorage.setItem('loggedIn', loggedIn ? 1 : 0);
}

function isWelcomeDismissed() {
  return window.localStorage.getItem('welcomeDismissed') == 1;
}

function setWelcomeDismissed(dismissed) {
  window.localStorage.setItem('welcomeDismissed', dismissed ? 1 : 0);
}

function isSigningIn() {
  return window.localStorage.getItem('signingIn') == 1;
}

function setSigningIn(signingIn) {
  window.localStorage.setItem('signingIn', signingIn ? 1 : 0);
}

function showHideDiv(divId, show) {
  const div = document.querySelector('#' + divId);
  if (show) {
    div.style = "display: visible";
  } else {
    div.style = "display: none";
  }
}

function requestPermission() {
  console.log('Requesting permission for notifications.');

  messaging.requestPermission()
  .then(function() {
    console.log('Notification permission granted.');
    // Retrieve an Instance ID token for use with FCM.
    // Once an app has been granted notification permission, it should update its UI reflecting this.
    resetUI();
    Materialize.toast('Notification permission granted successfully!', TOAST_LENGTH);
  })
  .catch(function(err) {
    console.log('Unable to get permission to notify.', err);
    Materialize.toast('Unable to get permission to send notifications.', TOAST_LENGTH);
  });
}

function deleteToken() {
  // Delete Instance ID token.
  messaging.getToken()
  .then(function(currentToken) {
    messaging.deleteToken(currentToken)
    .then(function() {
      console.log('Token deleted.');
      setTokenSentToServer(false);
      // Once token is deleted update UI.
      resetUI();
      Materialize.toast('Token refreshed.', TOAST_LENGTH);
    })
    .catch(function(err) {
      console.log('Unable to delete token. ', err);
      Materialize.toast('Unable to delete token.', TOAST_LENGTH);
    });
  })
  .catch(function(err) {
    console.log('Error retrieving Instance ID token. ', err);
    Materialize.toast('Error getting current token.', TOAST_LENGTH);
  });
}

function dimissWelcome() {
  showHideDiv(row_welcome, false);
  setWelcomeDismissed(true);
}

function initUI() {
  console.log("Initialize UI.");

  // If welcome has been dimssed, don't show the card.
  showHideDiv(row_welcome, !isWelcomeDismissed());

  showHideDiv(row_notification, false);
  showHideDiv(row_sign_in, false);
  showHideDiv(row_user, false);
}

window.onload = function() {
  initApp();
  initUI();
  resetUI();
};

