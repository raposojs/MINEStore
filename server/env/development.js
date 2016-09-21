module.exports = {
  DATABASE_URI: 'postgres://localhost:5432/minestore',
  SESSION_SECRET: 'Optimus Prime is my real dad nope',
  TWITTER: {
    consumerKey: 'INSERT_TWITTER_CONSUMER_KEY_HERE',
    consumerSecret: 'INSERT_TWITTER_CONSUMER_SECRET_HERE',
    callbackUrl: 'INSERT_TWITTER_CALLBACK_HERE'
  },
  FACEBOOK: {
    clientID: '1033792766736823',
    clientSecret: '51287049f79f4b76fe22eed426654417',
    callbackURL: 'http://127.0.0.1:1337/auth/facebook/callback'
  },
  GOOGLE: {
    clientID: '915037713775-flqie4edd3qbmeeftd5hat2kmvru64hd.apps.googleusercontent.com',
    clientSecret: 'EYYqNM0dqF8ErTd_bwKz1E59',
    callbackURL: 'http://127.0.0.1:1337/auth/google/callback'
  },
  NODEMAIL: {
    user: 'customerservice.mine@gmail.com',
    pass: 'MineralsINeverEncountered'
  },
  LOGGING: true,
  NATIVE: true
};
