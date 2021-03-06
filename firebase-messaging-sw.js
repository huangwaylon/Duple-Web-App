// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('/__/firebase/3.9.0/firebase-app.js');
importScripts('/__/firebase/3.9.0/firebase-messaging.js');
importScripts('/__/firebase/init.js');

const messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.

 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

 // Initialize the Firebase app in the service worker by passing in the
 // messagingSenderId.
 firebase.initializeApp({
   'messagingSenderId': 'YOUR-SENDER-ID'
 });

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]
 **/

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  var apps_json = {
  "jp.naver.line.android": {
    "url": "https://line.me/en/"
  },
  "org.hcilab.projects.notification": {
    "title": "notification_button_action_desktop_notifications",
    "url":   "https://play.google.com/store/apps/details?id=org.hcilab.projects.notification"
  },

  "org.hcilab.projects.notification.test": {
    "title": "notification_button_action_desktop_notifications",
    "url":   "https://play.google.com/store/apps/details?id=org.hcilab.projects.notification"
  },

  "com.google.android.apps.plus": {
    "title": "notification_button_action_google_plus",
    "url":   "https://plus.google.com"
  },

  "com.facebook.katana": {
    "title": "notification_button_action_facebook",
    "url":   "https://www.facebook.com/"
  },

  "com.facebook.lite": {
    "title": "notification_button_action_facebook",
    "url":   "https://www.facebook.com/"
  },

  "com.facebook.orca": {
    "title": "notification_button_action_facebook_messenger",
    "url":   "https://messenger.com/"
  },

  "com.google.android.gm": {
    "title": "notification_button_action_google_mail",
    "url":   "https://mail.google.com/"
  },

  "com.twitter.android": {
    "title": "notification_button_action_twitter",
    "url":   "https://twitter.com/"
  },

  "com.android.vending": {
    "title": "notification_button_action_google_play",
    "url":   "https://play.google.com/store"
  },

  "com.google.android.music": {
    "title": "notification_button_action_google_play_music",
    "url":   "https://play.google.com/store/music"
  },

  "com.google.android.videos": {
    "title": "notification_button_action_google_play_movies",
    "url":   "https://play.google.com/store/movies"
  },

  "com.pinterest": {
    "title": "notification_button_action_pinterest",
    "url":   "https://pinterest.com/"
  },

  "com.spotify.mobile.android.ui": {
    "title": "notification_button_action_spotify",
    "url":   "https://play.spotify.com/"
  },

  "com.spotify.music": {
    "title": "notification_button_action_spotify",
    "url":   "https://play.spotify.com/"
  },

  "com.valvesoftware.android.steam.community": {
    "title": "notification_button_action_steam",
    "url":   "http://store.steampowered.com/"
  },

  "com.google.android.calendar": {
    "title": "notification_button_action_google_calendar",
    "url":   "https://www.google.com/calendar/"
  },

  "com.yahoo.mobile.client.android.mail": {
    "title": "notification_button_action_yahoo_mail",
    "url":   "https://mail.yahoo.com/"
  },

  "com.instagram.android": {
    "title": "notification_button_action_instagram",
    "url":   "https://instagram.com/"
  },

  "com.sofascore.android": {
    "title": "notification_button_action_sofascore",
    "url":   "http://www.sofascore.com/"
  },

  "com.dropbox.android": {
    "title": "notification_button_action_dropbox",
    "url":   "https://www.dropbox.com/home"
  },

  "com.outlook.Z7": {
    "title": "notification_button_action_outlook",
    "url":   "https://outlook.com/"
  },

  "com.google.android.talk": {
    "title": "notification_button_action_google_hangouts",
    "url":   "https://hangouts.google.com"
  },

  "com.google.android.apps.docs": {
    "title": "notification_button_action_google_drive",
    "url":   "https://drive.google.com"
  },

  "com.microsoft.skydrive": {
    "title": "notification_button_action_onedrive",
    "url":   "https://onedrive.live.com/"
  },

  "com.google.android.youtube": {
    "title": "notification_button_action_youtube",
    "url":   "https://www.youtube.com/feed/subscriptions"
  },

  "io.avocado.android": {
    "title": "notification_button_action_avocado",
    "url":   "https://avocado.io/"
  },

  "com.mysms.android.sms": {
    "title": "notification_button_action_mysms",
    "url":   "https://app.mysms.com/"
  },

  "com.google.android.keep": {
    "title": "notification_button_action_google_keep",
    "url":   "https://keep.google.com/"
  },

  "com.humblebundle.library": {
    "title": "notification_button_action_humble_bundle",
    "url":   "https://www.humblebundle.com/"
  },

  "com.google.android.apps.inbox": {
    "title": "notification_button_action_inbox",
    "url":   "https://inbox.google.com/"
  },

  "com.facebook.groups": {
    "title": "notification_button_action_facebook_groups",
    "url":   "https://www.facebook.com/browsegroups/?category=membership"
  },

  "com.linkedin.android": {
    "title": "notification_button_action_linkedin",
    "url":   "https://www.linkedin.com/"
  },

  "com.whatsapp": {
    "title": "notification_button_action_whatsapp",
    "url":   "https://web.whatsapp.com/"
  },

  "org.telegram.messenger": {
    "title": "notification_button_action_telegram",
    "url":   "https://web.telegram.org/"
  },

  "com.netflix.mediaclient": {
    "title": "notification_button_action_netflix",
    "url":   "https://netflix.com"
  },

  "com.netflix.ninja": {
    "title": "notification_button_action_netflix",
    "url":   "https://netflix.com"
  },

  "com.tencent.mm": {
    "title": "notification_button_action_wechat",
    "url":   "https://wx.qq.com/"
  },

  "com.google.android.apps.photos": {
    "title": "notification_button_action_google_photos",
    "url":   "https://photos.google.com/"
  },

  "de.web.mobile.android.mail": {
    "title": "notification_button_action_web_de",
    "url":   "https://web.de/"
  },

  "tv.twitch.android.app": {
    "title": "notification_button_action_twitch",
    "url":   "https://twitch.tv/directory/following"
  },

  "de.gmx.mobile.android.mail": {
    "title": "notification_button_action_gmx",
    "url":   "http://www.gmx.net/"
  },

  "com.paypal.android.p2pmobile": {
    "title": "notification_button_action_paypal",
    "url":   "https://www.paypal.com/"
  },

  "com.tumblr": {
    "title": "notification_button_action_tumblr",
    "url":   "https://www.tumblr.com/"
  },

  "com.skype.raider": {
    "title": "notification_button_action_skype",
    "url":   "https://web.skype.com/"
  },

  "com.tencent.mobileqqi": {
    "title": "notification_button_action_qq",
    "url":   "http://w.qq.com/"
  },

  "com.tencent.qqlite": {
    "title": "notification_button_action_qq",
    "url":   "http://w.qq.com/"
  },

  "com.tencent.minihd.qq": {
    "title": "notification_button_action_qq",
    "url":   "http://w.qq.com/"
  },

  "com.tencent.hd.qq": {
    "title": "notification_button_action_qq",
    "url":   "http://w.qq.com/"
  },

  "com.groupme.android": {
    "title": "notification_button_action_groupme",
    "url":   "https://web.groupme.com/chats"
  }

}

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
  
  // var n = new Notification(notificationTitle, notificationOptions);
  // n.onclick = function () {
  //   if (click_action !== null) {
  //     window.open(click_action);
  //   }
  // };
  // n.close.bind(n);

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
// [END background_handler]
