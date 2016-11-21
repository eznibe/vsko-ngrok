var ngrok = require('ngrok');
var fs = require('fs');

var token = 'hhbdwe7FXbQTBZGuXhUS_i9MUVPJnfn7N87hPAa8B';

var config = {tunnels: [
  {name: 'debug', proto: 'tcp', addr: 5858},
  {name: 'ssh', proto: 'tcp', addr: 2222},
  {name: 'ngrok', proto: 'http', addr: 4040, bind_tls: false},
  {name: 'node-inspector', proto: 'http', addr: 8000, bind_tls: false}
]};

var configurationFile = 'ngrok-configuration.json';


function init(config) {

  token = config.token ? config.token : token;

  try {
    config = JSON.parse(fs.readFileSync(config.configurationFile ? config.configurationFile : configurationFile))
  }
  catch(err) {
    console.log('Can\'t find config file, using default')
  };

  ngrok.authtoken(token, function(err, token) {
    console.log('Token set');

    var tunnels = config.tunnels;

    if (tunnels.length > 0) {

      var tunnel = tunnels.pop();
      ngrok.connect(tunnel, function (err, url) {

        if (err) {
          console.log('Connection error:', err);
          return;
        }

        console.log('Connected +',url);
        tunnel.url = url;

        tunnels.map(function(tunnel) {

          ngrok.connect(tunnel, function (err, url) {
            console.log('Connected +',url);
            tunnel.url = url;
          });
        });
      });
    }

  });
}


module.exports = init;
