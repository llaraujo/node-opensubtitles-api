# Node Opensubtitles API[![Build Status](https://travis-ci.org/llaraujo/node-opensubtitles-api.svg)](https://travis-ci.org/llaraujo/node-opensubtitles-api)
Node Opensubtitles API to make search for your subtitles in OpenSubtitles.org!

## API

### Available:

#### Login - Get token from the opensubtitles.org

```js
opensubtitles.login()
.then(function(token){
	// make magic! =)
}, function(err){
	// Error login =(
});
```

#### Logout - Release token from the opensubtitles.org

```js
opensubtitles.logout(token)
.then(function(res){
	// Bye bye magic! =/
}, function(err){
	// Error logout =(
});
```

#### Search - Open search

```js
opensubtitles.search(token, {
	q: {
		'sublanguageid':  'pob',
		'query':          'The Walking Dead',
		'tag':            ''
	},
	limit: 1 // max limit: 500
})
.then(function(result){
	// make magic! =)
}, function(err){
	// Error search =(
});
```

### COMING SOON:

#### Search by File

```js
opensubtitles.searchByFile()
.then(function(result){

}, function(err){

});
```

#### Search by Tag

```js
opensubtitles.searchByTag()
.then(function(result){

}, function(err){

});
```

#### Search Episode with details

```js
opensubtitles.searchEpisode()
.then(function(result){

}, function(err){

});
```

## Tests

***coming soon***
