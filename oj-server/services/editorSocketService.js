module.exports = function(io) {
    //record all the participants in each session, server can send changes to all participants in a session
    var collaborations = {};
    //map from socketId to sessionId
    var socketIdTsessionId = {};
    io.on('connection', (socket) => {
        //get sessionId
        let sessionId = socket.handshake.query['sessionId'];
        console.log("sessionId");
        socketIdTsessionId[socket.id] = sessionId;

        //if sessionId not in collabration, initialize
        if (! (sessionId in collaborations)) {
            collaborations[sessionId] = {
                'participants': []
            };
        }
        collaborations[sessionId]['participants'].push(socket.id);

        //socket event listeners, delta is change info, records row and column of the changes
        socket.on('change', delta => {
            //log for debug
            console.log('change' + socketIdTsessionId[socket.id] + " " + delta);
            //get session id based on socket.id
            let sessionId = socketIdTsessionId[socket.id];
            if (sessionId in collaborations) {
                //get all participants
                let participants = collaborations[sessionId]['participants'];
                //send changes to all participants
                for (let i = 0; i < participants.length; i++) {
                    //skip the one who created the change
                    if (socket.id != participants[i]) {
                        io.to(participants[i]).emit("change", delta);
                    }
                }
            } else {
                console.log("could not tie socket id to any collaboration");
            }
        });
        io.to(socket.id).emit('message', 'we are from server');
    });
}