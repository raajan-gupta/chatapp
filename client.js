const socket = io();



const name = prompt("Enter Your Name : ")

socket.emit("user-joined", name)

socket.on("new-user-joined", name => {
    // console.log(name)
    if (name)
        generateMessage("center", `${name} Joined the chat`)
})

const first = document.querySelector(".first")

function generateMessage(side, message) {
    var div = document.createElement("div")
    div.classList.add("alert")
    div.innerHTML = message

    if (side == "left")
        div.classList.add("alert-primary")
    else if (side == "right")
        div.classList.add("alert-secondary")
    else
        div.classList.add("alert-danger")

    first.appendChild(div)
}

function sendMessage() {
    let input = document.getElementById("message")

    generateMessage("right", `${input.value} : You`)

    socket.emit("send", input.value)
    input.value = ""
}

socket.on("recevie", ({ name, message }) => {
    generateMessage("left", `${name} : ${message}`)
})
socket.on("user-left", (name) => {
    if (name)
        generateMessage("center", `${name} Left the Chat`)
})