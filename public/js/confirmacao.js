const btn_confirmar = document.querySelector("#btn-confirmar")
const content_confirmar = document.querySelector(".content-confirmacao")
const input = document.querySelector("#token")

const tarefa_confirmada = `
<div class="content-confirmacao">
    <h1 class="text">Desafio Concluído!</h1>
    <div class="row">
        <img class="imageicon" src="/images/check.png" alt="">
        <h3 class="text">Sua tarefa foi confirmada!</h3>
    </div>
</div>`
const tarefa_recusada = `
<div class="content-confirmacao">
    <h1 class="text">Novos desafios estão lhe esperando!</h1>
    <h3 class="text">Para confirmar alguma tarefa, você precisa realizá-la primeiro!</h3>
    <h3 class="text">Acesse o https://cherrysocial.com.br e realize os nosso desafios!</h3>
</div>`

btn_confirmar.addEventListener("click", async () => {
    const mode = "nuvem"
    const url = `${mode == "nuvem" ? "https://encanto-service.online/" : "http://localhost:4000/"}api/confirmar-tarefa`
    const response = await axios.post(url, {
        token: input.value
    })
    if (response.data.status == 200) {
        content_confirmar.innerHTML = tarefa_confirmada
    } else {
        content_confirmar.innerHTML = tarefa_recusada
    }
})