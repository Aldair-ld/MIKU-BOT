let handler = async (m, { conn, text, command, usedPrefix }) => {
  let user = global.db.data.users[m.sender];

  if (command === 'personaje') {
    let [personaje, nombre, biografia] = text.split('|').map(v => v.trim());

    if (!personaje || !nombre || !biografia || !m.quoted || !m.quoted.mtype.includes('imageMessage')) {
      return conn.reply(m.chat, `Uso incorrecto del comando. Por favor, usa el formato:\n .personaje|nombre|biografía\nY responde a este comando con una foto de tu personaje.`, m);
    }

    let foto = m.quoted.url;
    user.personaje = personaje;
    user.nombre = nombre;
    user.biografia = biografia;
    user.foto = foto;

    return conn.reply(m.chat, `Registro completado:\n\n🎭 *Personaje:* ${personaje}\n📛 *Nombre:* ${nombre}\n📝 *Biografía:* ${biografia}\n🖼️ *Foto:*`, m);
  }

  if (command === 'mirol') {
    if (!user.personaje || !user.nombre || !user.biografia || !user.foto) {
      return conn.reply(m.chat, `Aún no has registrado tu rol. Usa el comando ${usedPrefix}personaje para registrarte.`, m);
    }

    let mensaje = `
🔍 *Información de tu Rol:*
📛 *Nombre:* ${user.nombre}
🎭 *Personaje:* ${user.personaje}
📝 *Biografía:* ${user.biografia}`;

    await conn.sendMessage(m.chat, { image: { url: user.foto }, caption: mensaje }, { quoted: m });
  }
};

handler.command = ['personaje', 'mirol'];
export default handler;
