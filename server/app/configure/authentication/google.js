'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (app, db) {

    var User = db.model('user');

    var googleConfig = app.getValue('env').GOOGLE;

    var googleCredentials = {
        clientID: googleConfig.clientID,
        clientSecret: googleConfig.clientSecret,
        callbackURL: googleConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        // var info = {
        //     name: profile.displayName,
        //     // google may not provide an email, if so we'll just fake it
        //     email: profile.emails ? profile.emails[0].value : [profile.username , 'fake-auther-email.com'].join('@'),
        //     photo: profile.photos ? profile.photos[0].value : undefined
        // };

        User.findOne({
                where: {
                    google_id: profile.id
                }
            })
            .then(function (user) {
                // console.log(user);
                // console.log(req.session);
                if (user) {
                    return user;
                } else {
                    return User.create({
                        google_id: profile.id
                    });
                }
            })
            .then(function (userToLogin) {
                done(null, userToLogin);
            })
            .catch(function (err) {
                console.error('Error creating user from Google authentication', err);
                done(err);
            });

    };

    passport.use(new GoogleStrategy(googleCredentials, verifyCallback));

    app.get('/auth/google', passport.authenticate('google', {
        // scope: 'email'
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/login'}
            ));

};
