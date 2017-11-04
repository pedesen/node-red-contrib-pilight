module.exports = function(RED) {
  function PilightReceiveNode(config) {
    RED.nodes.createNode(this, config);
    this.server = RED.nodes.getNode(config.server);

    var node = this;

    node.server.socket.on('data', function(data) {
      var dataArray = data.toString().split('\n');

      for (msg in dataArray) {
        if (dataArray[msg].length) {
          var event = JSON.parse(dataArray[msg]);

          if (!event.status) {
            node.send({ payload: event });
          } else {
            node.log('socket connection: ' + event.status);
          }
        }
      }
    });
  }

  RED.nodes.registerType("pilight-receive", PilightReceiveNode);
}
