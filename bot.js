var twit = require('twit');
var config = require('./config');
var T = new twit(config);

T.get('account/verify_credentials', {
      include_entities: false,
      skip_status: true,
      include_email: false
  }, onAuthenticated)
    
  function onAuthenticated(err, res) {
      if (err) {
          throw err
      }

      console.log('Authentication successful. Running bot...\r\n')

      var stream = T.stream('user')

      stream.on('follow', onFollowed)
      stream.on('error', onError)
  }

  function onFollowed(event) {
      var name = event.source.name
      var screenName = event.source.screen_name
      var response = '@' + screenName + ' Thank you for following, ' + name + '!'

      

      // tweet response to user here
      T.post('statuses/update', {
            status: response
        }, onTweeted)

      console.log('I was followed by: ' + name + ' @' + screenName)
  }

  function onError(error) {
      throw error
  }

  function onTweeted(err, reply) {
      if (err !== undefined) {
          console.log(err)
      } else {
          console.log('Tweeted: ' + reply.text)
      }
  }
