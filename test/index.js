'use strict';

var OpenSubtitles = require('../');

var openSubtitles = new OpenSubtitles();

openSubtitles.on('onBeforeLogin', function(credentials) {
  console.log('onBeforeLogin!');
  if (credentials)
    console.log(credentials);
});

openSubtitles.on('onAfterLogin', function(token) {
  console.log('onAfterLogin!');
  if (token)
    console.log(token);
});

openSubtitles.on('onErrorLogin', function(err) {
  console.log('onErrorLogin!');
  if (err)
    console.log(err);
});

openSubtitles.on('onBeforeLogout', function(token) {
  console.log('onBeforeLogout!');
  if (token)
    console.log(token);
});

openSubtitles.on('onAfterLogout', function(status) {
  console.log('onAfterLogout!');
  if (status)
    console.log(status);
});

openSubtitles.on('onErrorLogout', function(err) {
  console.log('onErrorLogout!');
  if (err)
    console.log(err);
});


openSubtitles.on('onBeforeSearch', function(search) {
  console.log('onBeforeSearch!');
  if (search)
    console.log(search);
});

openSubtitles.on('onAfterSearch', function(result) {
  console.log('onAfterSearch!');
  if (result)
    console.log(result);
});

openSubtitles.on('onErrorSearch', function(err) {
  console.log('onErrorSearch!');
  if (err)
    console.log(err);
});

var credentials = [
  '', //login
  '', //password
  'pt-br', //language
  'OSTestUserAgent' //userAgent
];

var search = {
  q: {
    'sublanguageid':  'pob',
    'query':          'The Walking Dead',
    'tag':            ''
  },
  limit:  500
};

openSubtitles.login(credentials).then(function(token) {

  console.log('login token: %s', token);

  openSubtitles.search(token, search).then(function(res){

      console.log('search result');
      console.log(res);
      console.log('search total: %d', res.data.length);

      openSubtitles.logout([token]).then(function(res) {
        console.log('Logout: %s', res);

      }, function(err){
        console.log('Logout error:');
        console.log(err);
      });

  })

}, function(err){
  console.log('Login error:');
  console.log(err);
})

