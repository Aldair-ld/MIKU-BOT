const contoh = `*Asmaul Husna*
`
// data here
const anjuran = `
Desde Abu Hurairah radhiallahu anhu, Rasulullah SAW dijo: "Tengo noventa y nueve nombres, cien menos 1. Quien los memorice entrará en el Paraíso, y él es un acorde que ama el acorde."
Significado: "De hecho, yo tengo noventa y nueve nombres, también conocido como cien menos uno. Quien los cuente, entrará en el cielo; Él es Witr y ama a Witr".`

let handler = async (m, { args, usedPrefix, command }) => {
    let json = JSON.parse(JSON.stringify(global.asmaulhusna))
    let data = json.map((v, i) => `${i + 1}. ${v.latin}\n${v.arabic}\n${v.translation_id}`).join('\n\n')

    if (command === 'aldairtriste') {
        const videoUrl = 'https://www.ejemplo.com/video_aldairtriste.mp4' // Reemplaza con la URL del video real
        const mensaje = `Aquí tienes un mensaje para alegrar tu día: ¡No estés triste!\n\n${videoUrl}`
        return m.reply(mensaje)
    }

    if (isNaN(args[0])) throw `Ejemplo:\n${usedPrefix + command} 1`
    if (args[0]) {
        if (args[0] < 1 || args[0] > 99) throw `mínimo 1 y máximo 99!`
        let { index, latin, arabic, translation_id, translation_en } = json.find(v => v.index == args[0].replace(/[^0-9]/g, ''))
        return m.reply(`🔢 *Número:* ${index}
${arabic}

${latin}

${translation_id}

${translation_en}
`.trim())
    }
    m.reply(contoh + data + anjuran)
}

handler.help = ['frase [escribe un número 1 - 99]', 'aldairtriste']
handler.tags = ['quran', 'diversion']
handler.command = /^(frase(s)?|aldairtriste)$/i
export default handler

global.asmaulhusna = [
    {
        index: 1,
        latin: "💐 *Autor:* *ALDAIR*",
        arabic: "💐 *Frase:* Cuando te enamoras de alguien dejas de ver a las demas y te efocas en una sola chica ",
        translation_id: "💐 El amor es tan bonito cuando te enamoras de la persona incorrecta, cuanto daria por que me de un abrazo o me diga te amo ",
        translation_en: "."
    },
    // Añade más datos según sea necesario
]
