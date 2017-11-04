var net = require('net');

module.exports = function(RED) {
  function PilightDaemonNode(n) {
    RED.nodes.createNode(this, n);

    this.host = n.host;
    this.port = n.port;
    this.socket = new net.Socket();
    var node = this;

    node.on('close', function() {
      node.socket.end();
    });

    var welcomeMessage = JSON.stringify({
      action: "identify",
      options: {
        config: 1,
        receiver: 0
      }
    });

    node.socket.on('connect', function() {
      node.socket.write(welcomeMessage, 'utf-8');
    });

    node.socket.on('end', function() {
      node.log('socket connection: closed');
    });

    node.socket.connect(node.port, node.host);
  }
  RED.nodes.registerType("pilight-daemon", PilightDaemonNode);
}
