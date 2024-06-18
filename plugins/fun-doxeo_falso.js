let handler = async (m, { conn, text, command, usedPrefix }) => {
  let user = global.db.data.users[m.sender];

  if (command === 'personaje') {
    if (text.includes('|') && text.split('|').length === 2) {
      let [personaje, biografia] = text.split('|').map(v => v.trim());

      user.personaje = personaje;
      user.biografia = biografia;

      return conn.reply(m.chat, `Registro completado:\n\n🎭 *Personaje:* ${personaje}\n📝 *Biografía:* ${biografia}`, m);
    } else {
      return conn.reply(m.chat, `Uso incorrecto del comando. Por favor, usa el formato:\n${usedPrefix}personaje personaje|biografía`, m);
    }
  }

  if (command === 'mirol') {
    if (!user.personaje || !user.biografia) {
      return conn.reply(m.chat, `Aún no has registrado tu rol. Usa el comando ${usedPrefix}personaje para registrarte.`, m);
    }

    let mensaje = `
🔍 *Información de tu Rol:*
🎭 *Personaje:* ${user.personaje}
📝 *Biografía:* ${user.biografia}`;

    await conn.sendMessage(m.chat, mensaje, { quoted: m });
  }
};

handler.command = ['personaje', 'mirol'];
export default handler;
