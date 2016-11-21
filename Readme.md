# vsko-ngrok

Client for ngrok with customizable tunnels by configuration json file.

# configuration

By default tries to open a configuration file called 'ngrok-configuration.json'. If you use a different file name send it on initialization.

```
var ngrok = require('vsko-ngrok');

ngrok('my-config.json');
```

The token property is mandatory.

Ngrok configuration properties definition are defined in https://ngrok.com/docs#tunnel-definitions

Example

```
{ "token": "<token key>",
  "tunnels": [
    {"name": "debug", "proto": "tcp", "addr": 5858},
    {"name": "ssh", "proto": "tcp", "addr": 2222},
    {"name": "inspector", "proto": "http", "addr": 8000, "bind_tls": false}
  ]
}
```
