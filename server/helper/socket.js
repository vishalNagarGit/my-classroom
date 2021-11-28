// all the socket events are handled here

const User = require('../models/user/model');

module.exports = function(io) {
    io.on('connection',socket=>{
        console.log("new socket:",socket.id);

        socket.on('userId',userId=>console.log("userId:"+userId));

        socket.on('join-room',teamId=>{
                socket.join(teamId);
                console.log("socket ",socket.id,' joined team:',socket.rooms);
        })

        socket.on('new-msg',(teamId)=>{
                io.in(teamId).emit('new-msg');
        })

        socket.on('join-all-teams',userId=>{
                User.findById(userId, (err, user) => {
                    if(!err) {
                       // user.joinedTeams.map(team => socket.join(team.teamId));
                        user.joinedTeams.forEach(element => {
                            socket.join(String(element.teamId));
                        });

                        console.log(socket.id,'joined teams:',socket.rooms);
                    }
                });

                
        })
        
        socket.on('new-quiz',teamId=>{
                console.log(socket.id,'created new-quiz in team:',teamId,'target sockets:',io.sockets.adapter.rooms);
                io.in(teamId).emit('new-quiz');
        })

    })
};