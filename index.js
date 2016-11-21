var ngrok = require('ngrok');
var fs = require('fs');

var token = 'hhbdwe7FXbQTBZGuXhUS_i9MUVPJnfn7N87hPAa8B';

var defaultConfig = {tunnels: [
  {name: 'debug', proto: 'tcp', addr: 5858},
  {name: 'ssh', proto: 'tcp', addr: 2222},
  {name: 'ngrok', proto: 'http', addr: 4040, bind_tls: false},
  {name: 'node-inspector', proto: 'http', addr: 8000, bind_tls: false}
]};

var configurationFile = 'ngrok-configuration.json';


function init(config) {

  configurationFile = config && config.configurationFile ? config.configurationFile : configurationFile;

  // console.log('Config file:', configurationFile)

  try {
    config = JSON.parse(fs.readFileSync(configurationFile));
  }
  catch(err) {
    config = defaultConfig;
    console.log('Can\'t find config file, using default')
  };

  token = config.token ? config.token : token;

  ngrok.authtoken(token, function(err, token) {
    console.log('Ngrok token set');

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
