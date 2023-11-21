// const avatares = [
//     "1", "2", "3", "4", "5", "6", "12", "22", "32", "42", "52", "26"
// ]
// let object = {
//     img1: "",
//     img2: "",
//     img3: "",
//     img4: "",
//     img5: "",
// }
// let novoAvatares = []
// let count = 1
// avatares.forEach((avatar) => {
//     object[`img${count}`] = avatar
//     if (count == 5) {
//         novoAvatares.push(object)
//         object = {
//             img1: "",
//             img2: "",
//             img3: "",
//             img4: "",
//             img5: "",
//         }
//         count = 1
//     } else {
//         count++
//     }
// })

// novoAvatares.push(object)
// console.log(novoAvatares)
const rotas = [
    {
        facil1: "https://mineurl.com/931cad",
        medio1: "https://mineurl.com/e3f207",
        dificil1: "https://mineurl.com/8cfe01",
        facil2: "https://mineurl.com/8cfe01",
        medio2: "https://mineurl.com/d5cc13",
        dificil2: "https://mineurl.com/d5cc13",
        facil3: "https://mineurl.com/ebed34",
        medio3: "https://mineurl.com/271bcf",
        dificil3: "https://mineurl.com/3d718d",
    },
    {
        facil1: "https://mineurl.com/931cad",
        medio1: "https://mineurl.com/e3f207",
        dificil1: "https://mineurl.com/8cfe01",
        facil2: "https://mineurl.com/8cfe01",
        medio2: "https://mineurl.com/d5cc13",
        dificil2: "https://mineurl.com/d5cc13",
        facil3: "https://mineurl.com/ebed34",
        medio3: "https://mineurl.com/271bcf",
        dificil3: "https://mineurl.com/3d718d",
    },
    {
        facil1: "https://mineurl.com/931cad",
        medio1: "https://mineurl.com/e3f207",
        dificil1: "https://mineurl.com/8cfe01",
        facil2: "https://mineurl.com/8cfe01",
        medio2: "https://mineurl.com/d5cc13",
        dificil2: "https://mineurl.com/d5cc13",
        facil3: "https://mineurl.com/ebed34",
        medio3: "https://mineurl.com/271bcf",
        dificil3: "https://mineurl.com/3d718d",
    }
]
let rotasRenomeadas = {}
let object = "{"

rotas.forEach((rota, index) => {
    object += `"R${index + 1}facil1": [],`
    object += `"R${index + 1}medio1": [],`
    object += `"R${index + 1}dificil1": [],`
    object += `"R${index + 1}facil2": [],`
    object += `"R${index + 1}medio2": [],`
    object += `"R${index + 1}dificil2": [],`
    object += `"R${index + 1}facil3": [],`
    object += `"R${index + 1}medio3": [],`
    object += `"R${index + 1}dificil3": []${index + 1 == rotas.length ? "" : ","}`
})
object += "}"


console.log(JSON.parse(object))
// console.log(object)