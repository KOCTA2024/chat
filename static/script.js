const socket = io()

let form = document.querySelector("#form")

form.addEventListener("submit", (event)=>{
    event.preventDefault()
    let message = event.target["input"].value
    console.log(message)
    if (message){
        socket.emit("new_message", message)
        event.target.reset()
    }
})

socket.on("message", (data)=>{
    console.log("From server: ", data)
    addMesage(data)
})

function addMesage(message){
    let messageList = document.querySelector(".messages")
    let messageItem = document.createElement("li")
    messageItem.textContent = `${message.user}: ${message.message}`
    messageList.appendChild(messageItem)
    window.scrollTo(0, messageList.scrollHeight)
}

document.querySelector(".auth").addEventListener("click", ()=>{
    let nickname = prompt("Print your nickname", "asfkajfkoiajfioajoiajgaoi;j")
    if(nickname) socket.emit("new_nickname", nickname)
})