"use strict"
const socket = io();

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButton = document.querySelector(".send-button")

function LiModel(name, msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=>{
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent": "received")
        const dom = `<li class="sent">
            <span class="profile">
                <span class="user">${this.name}</span>
                <img src="https://source.unsplash.com/random/50x50" alt="any" class="image">
            </span>
            <span class="message">${this.msg}</span>
            <span class="time">${this.time}</span>
        </li>`
        li.innerHTML = dom;
        chatList.appendChild(li)
    }
}

sendButton.addEventListener("click", ()=>{
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)
})

socket.on("chatting", (data)=>{
    const { name, msg, time } = data;
    const item = new LiModel(name, msg, time);
    item.makeLi()
})



console.log(socket);
