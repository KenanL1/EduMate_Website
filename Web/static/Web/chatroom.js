document.addEventListener('DOMContentLoaded', function() {
console.log(current_user)

const CHANNEL_ID = 'jV7hLgKvwA3DQP1a';
 drone = new ScaleDrone(CHANNEL_ID, {
    data: {
        name: current_user,
        color: getRandomColor(),
    },
});

// Connect to Scaledrone API
drone.on('open', error => {
    if (error) {
        return console.error(error);
    }
    console.log('Successfully connected to Scaledrone');

    // Connect user to the chatroom
const room = drone.subscribe('observable-room');
room.on('open', error => {
    if (error) {
        return console.error(error);
    }
    console.log('Successfully joined room');
});


// List of currently online members
room.on('members', m => {
    members = m;
    updateMembersDOM();

});

// User joined the room
room.on('member_join', member => {
    members.push(member);
    updateMembersDOM();

});

// User left the room
room.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index,1);
    updateMembersDOM();
});

room.on('data', (text, member) => {
    if (member) {
        addMessageToListDOM(text,member);
    } else {
        // Message is from server
    }
});

drone.on('close', event => {
    console.log('Connection was closed', event);
})

drone.on('error', error => {
    console.error(error);
})


});

// check for submit
form.addEventListener('submit', sendMessage);
});

var drone = '';
let members = [];
const membersCount = document.querySelector('.members-count');
const membersList = document.querySelector('.members-list');
const messages = document.querySelector('.messages');
const input = document.querySelector('.message-form_input');
const form = document.querySelector('.message-form');

// generate a random name
function getRandomName() {
    const adjs = ["autumn", "hidden", "bitter", "misty"]
    const nouns = ["waterfall", "river"]
    return (
        adjs[Math.floor(Math.random() * adjs.length)] + "_" + 
        nouns[Math.floor(Math.random() * nouns.length) ]
    );
}

// get a random color for the name
function getRandomColor(){
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}


// create the 
function createMemberElement(member){
    const {name, color} = member.clientData;
    const el = document.createElement('div');
    el.appendChild(document.createTextNode(name));
    el.className = 'member';
    el.style.color = color;
    return el;
}

// update the number of users in the chatroom 
function updateMembersDOM(){
    membersCount.innerText = `${members.length} users in room:`;
    membersList.innerHTML = '';
    members.forEach(member => {
        membersList.appendChild(createMemberElement(member))
    });
}

// create the message
function createMessageElement(text, member) {
    const el = document.createElement('div');
    el.appendChild(createMemberElement(member));
    el.appendChild(document.createTextNode(text));
    el.className = 'message';
    return el;
}

// Add message to textfield
function addMessageToListDOM(text, member) {
    const el = messages;
    const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
    el.appendChild(createMessageElement(text, member));
    if (wasTop) {
        el.scrollTop = el.scrollHeight - el.clientHeight;
    }
}


// send message to server
function sendMessage() {
    const value = input.value;
    if (value === ''){
        return;
    }
    input.value = '';
    drone.publish({
        room: 'observable-room',
        message: value,
    });
}

