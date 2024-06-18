let handler = async (m, { conn, text, command, usedPrefix }) => {
  let user = global.db.data.users[m.sender];

  if (command === 'personaje') {
    if (!text.includes('|')) {
      return conn.reply(m.chat, `Uso incorrecto del comando. Por favor, usa el formato:\n${usedPrefix}personaje personaje|biografía`, m);
    }

    let [personaje, biografia] = text.split('|').map(v => v.trim());

    if (!personaje || !biografia) {
      return conn.reply(m.chat, `Uso incorrecto del comando. Por favor, usa el formato:\n${usedPrefix}personaje personaje|biografía`, m);
    }

    user.personaje = personaje;
    user.biografia = biografia;

    return conn.reply(m.chat, `Registro completado:\n\n🎭 *Personaje:* ${personaje}\n📝 *Biografía:* ${biografia}`, m);
  }

  if (command === 'mirol') {
    if (!user.personaje || !user.biografia) {
      return conn.reply(m.chat, `Aún no has registrado tu rol. Usa el comando ${usedPrefix}personaje para registrarte.`, m);
    }

    let mensaje = `
🔍 *Información de tu Rol:*
🎭 *Personaje:* ${user.personaje}
📝 *Biografía:* ${user.biografia}`;

    try {
      await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      conn.reply(m.chat, 'Ocurrió un error al enviar el mensaje. Por favor, intenta de nuevo más tarde.', m);
    }
  }
};

handler.command = ['personaje', 'mirol'];
export default handler;
