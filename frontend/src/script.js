
const getBtn = document.getElementById("get")
const input = document.getElementById('input')


const baseUrl = "http://localhost:8000/search"

getBtn.addEventListener("click", getChannels)
async function getChannels(e) {
    e.preventDefault()
    const res = await fetch(baseUrl,
    {
        method: "GET"
    })
    console.log(res)
}
