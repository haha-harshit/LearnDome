class ChatEngine{constructor(n,t){this.chatBox=$("#"+n),this.userEmail=t,this.socket=io.connect("http://localhost:5000"),this.userEmail&&this.connectionHandler()}connectionHandler(){this.socket.on("connect",(function(){console.log("Connection established using sockets!")}))}}