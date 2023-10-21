const btn_confirmar = document.querySelector("#btn-confirmar")
const content_confirmar = document.querySelector(".content-confirmacao")
const input = document.querySelector("#token")

btn_confirmar.addEventListener("click", async () => {
    const response = await axios.post("http://localhost:4000/api/confirmar-tarefa", {
        token: input.value
    })

    if (response.status == 200) {
        content_confirmar.innerHTML = ""
    }
    console.log("==============RESPONSE CLIQUE CONFIRMAR TOKEN==================")
    console.log(response)
})