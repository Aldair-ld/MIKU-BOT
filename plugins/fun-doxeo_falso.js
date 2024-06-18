let userRoles = {};

let handler = async function (m, { conn, text, command, usedPrefix }) {
    let fkontak = { 
        "key": { "participants": "0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" },
        "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } },
        "participant": "0@s.whatsapp.net" 
    };

    let user = global.db.data.users[m.sender];

    if (!userRoles[m.sender]) {
        userRoles[m.sender] = {
            step: 0,
            role: '',
            bio: ''
        };
    }

    let userRole = userRoles[m.sender];

    if (command === 'personaje') {
        if (userRole.step === 0) {
            userRole.step = 1;
            return conn.reply(m.chat, `Escribe el nombre de tu personaje:`, fkontak, m);
        } else if (userRole.step === 1) {
            userRole.role = text.trim();
            userRole.step = 2;
            return conn.reply(m.chat, `Escribe tu biografía:`, fkontak, m);
        } else if (userRole.step === 2) {
            userRole.bio = text.trim();
            user.role = userRole.role;
            user.bio = userRole.bio;
            userRole.step = 0;
            return conn.reply(m.chat, `Registro completado!\n\nRol: ${user.role}\nBiografía: ${user.bio}`, fkontak, m);
        }
    } else if (command === 'mirol') {
        if (user.role && user.bio) {
            return conn.reply(m.chat, `Su rol: ${user.role}\n\nBiografía: ${user.bio}`, fkontak, m);
        } else {
            return conn.reply(m.chat, `No ha registrado un rol y biografía aún. Use ${usedPrefix}personaje para empezar.`, fkontak, m);
        }
    }
}

handler.command = ['personaje', 'mirol'];
export default handler;
