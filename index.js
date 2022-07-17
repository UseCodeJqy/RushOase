const { clear } = require('console');
const Discord = require('discord.js');
const got = require('got')
const sourcebin = require('sourcebin_js');
const {MessageSelectMenu } = require('discord.js');
const prefix = '.'
const fs = require('fs')
const { MessageMenuOption, MessageMenu } = require("discord-buttons");
const ms = require('ms')
const keepalive = require("./keepa_live");
const reactionRolesConfig = JSON.parse(fs.readFileSync('reactionroles.json' , 'utf8'))
const client = new Discord.Client({ 
partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
require('discord-buttons')(client)
const { MessageButton, MessageActionRow } = require('discord-buttons');
const { channel } = require('diagnostics_channel');
const welcomechannelId = `939531517540048956`
 //Channel You Want to Send The Welcome Message
const suggestchannel = `937625490611638313`

const messages = ['.help' , 'auf RushOase' , 'Coded by Jay'];
let current = 1;
client.on('ready', () => {
    
    console.log(`Angemeldet als ${client.user.tag}`)

    client.user.setActivity(messages[0] ,{type: `PLAYING`})

    setInterval(() => {
        if(messages[current]){
            client.user.setActivity(messages[current] , {type: "PLAYING"})
            current++;
        } else{
            current = 0;
            client.user.setActivity(messages[current] , {type : "PLAYING"})
        }
    }, 5*1000)
});

keepalive();



client.on('guildMemberAdd', (member) => {  
  
    const channel = member.guild.channels.cache.get(welcomechannelId)

    const embed = new Discord.MessageEmbed()
    .setTitle(`🔹 **Beigetreten | RushOase**`)
    .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
    .setDescription(`>  <@${member.user.id}>, **Willkommen auf RushOase**`)
    .setColor('#3A01DF')
    channel.send(embed)

});

client.on('guildMemberRemove', (member) => {   
  
    const channel = member.guild.channels.cache.get(welcomechannelId)

    const embed = new Discord.MessageEmbed()
    .setTitle(`🔹 **Verlassen | RushOase**`)
    .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
    .setDescription(`>  <@${member.user.id}>, **hat den Server verlassen**`)
    .setColor('#3A01DF')
channel.send(embed)

});



  client.on('messageReactionAdd', async (reaction, user, member) =>{
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
        
        if(reaction.emoji.name === "🇩🇪"){
            reaction.users.remove(user);

            reaction.message.guild.channels.create(`de-ticket ${user.username.substr(0,18)}`, {
                type: "text",
                parent: "939531516587937883",
                topic: `Ticket von ${user.tag}, wenn du das Ticket schließen möchtest klicke auf den Knopf`,
                permissionOverwrites: [
                { id: user.id, allow: ["SEND_MESSAGES", "VIEW_CHANNEL"], },
                { id: "939531506387386368", allow: ["SEND_MESSAGES", "VIEW_CHANNEL"], },
                { id: reaction.message.guild.roles.everyone, deny: ['VIEW_CHANNEL'], },
            ]
            })
            .then(ch => {
                const embed = new Discord.MessageEmbed()
                .setColor('#3A01DF')
                .setTitle(`🔹 **Ticket | RushOase** `)
                .setDescription('» Der Support wird sich in Kürze bei Ihnen melden, bitte schreiben sie ihre Frage direkt in den Chat. Die Leitung wird gleich für sie da sein, wir bitten um ihr Verständnis dafür, dass wir nicht jedes Anleigen direkt bearbeiten können.', 'Bitte haben sie etwas geduld!')
                .addField('Sprache :' , '🇩🇪')
                .setFooter('Coded by Jay 🔥')
                ch.send('<@&939531504483184660>')

                const close1Button = new MessageButton()
                .setLabel('Close')
                .setStyle('grey')
                .setEmoji('❌')
                .setID('close1')

                const transcript1Button = new MessageButton()
                .setLabel('Transcript')
                .setStyle('grey')
                .setEmoji('📝')
                .setID('transcript1')
                const row1 = new MessageActionRow()

                .addComponent(close1Button)
.addComponent(transcript1Button)

                    ch.send({
                    embed: embed,
                    components: [row1]
                })
            })
        }
  })
  

  
client.on('clickButton', async (button, message, member) => {

if(button.id === 'close1') {
                button.reply.send('» Das Ticket wird in **5** Sekunden unwiderruflich gelöscht!', true) 
                setTimeout(() => button.message.channel.delete(), 5000);
              
      } else if(button.id === 'transcript1') {
						button.reply.send('» Funktion noch in Wartungen!', true)
				}
})

  client.on('messageReactionAdd', async (reaction, user, member) =>{
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
        
        if(reaction.emoji.name === "🇬🇧"){
            reaction.users.remove(user);
            

            reaction.message.guild.channels.create(`en-ticket ${user.username.substr(0,18)}`, {
                type: "text",
                parent: "939531516587937883",
                topic: `Ticket from ${user.tag}, if you want to close the Ticket click on the Button!`,
                permissionOverwrites: [
                { id: user.id, allow: ["SEND_MESSAGES", "VIEW_CHANNEL"], },
                { id: "939531507272384573", allow: ["SEND_MESSAGES", "VIEW_CHANNEL"], },
                { id: reaction.message.guild.roles.everyone, deny: ['VIEW_CHANNEL'], },
            ]
            })
            .then(ch => {
                const embed = new Discord.MessageEmbed()
                .setColor('#3A01DF')
                .setTitle(`🔹 **Ticket | RushOase** `)
                .setDescription('» The support will contact you shortly, please write your question directly in the chat. The line will be right there for you, we ask for your understanding that we can not process every request directly.', 'Please be patient!')
                .addField('Language :' , '🇬🇧')
                .setFooter('Coded by Jay 🔥')
                ch.send('<@&939531504483184660>')


                const closeButton = new MessageButton()
                .setLabel('Close')
                .setStyle('grey')
                .setEmoji('❌')
                .setID('close')

                const transcriptButton = new MessageButton()
                .setLabel('Transcript')
                .setStyle('grey')
                .setEmoji('📝')
                .setID('transcript')
                const row1 = new MessageActionRow()

                .addComponent(closeButton)
.addComponent(transcriptButton)

                    ch.send({
                    embed: embed,
                    components: [row1]
                })
            })
        }
  })
  

  
client.on('clickButton', async (button, message, member) => {

if(button.id === 'close') {
                button.reply.send('» Das Ticket wird in **5** Sekunden unwiderruflich gelöscht!') 
                setTimeout(() => button.message.channel.delete(), 5000);
              
      } else if(button.id === 'transcript') {
						button.reply.send('» Funktion noch in Wartungen!', true)
				}
})

client.on('message', async message => {
    let parts = message.content.split(" ");

    if(parts[0].toLowerCase() == '.verifyreaction') {
        const embed = new Discord.MessageEmbed()
        .setColor('#3A01DF')
        .setTitle('🔹 **Regeln | RushOase**')
        .setDescription(`**§1** Sollten die Regeln nicht eingehalten werden, dürfen Teammitglieder eine gerechte Strafe aussprechen.

**§2** Das Regelwerk wird regelmäßig angepasst, weshalb jeder User verpflichtet ist immer auf den neusten Stand der Regeln zu sein.  

**§3** Das missbrauchen unseres Supports wird bestraft.  

**§4** Werbung jeglicher Art, im Chat oder per Privatnachricht ist strengstens untersagt. 

**§5** Spaming ist untersagt. Dazu zählt auch das senden von unnötigen Emojis oder GIF's.

**§6** Links zu Webseiten die nichts mit RushOase.net zutun haben sind untersagt.  

**§7** Pornographische, rassistische, sexistische, oder weitere unangebrachte Äußerungen oder Inhalte sind hier verboten.

**§8** Beleidigungen oder Provokationen, egal ob ernst gemeint oder nicht, sind strengstens verboten und werden je nach Härte bestraft.

**§9** Grundlose Pings, Massenpings oder sogenannte "Ghostpings" (@Erwähnung, und die Nachricht wieder löschen) sind verboten. 

**§10** Das Verbreiten von persönlichen Daten wie Name, Adresse oder Telefonnummer ist zu unterlassen, und trägt Konsequenzen mit sich.  

**§11** Bei Unklarheiten sollte das Team gefragt werden. Inoffizielle Informationen anderer Quellen sind meist ohne Gewähr. 

**§12** Beschwerden gegenüber Teammitgliedern haben öffentlich nichts zu suchen, sondern sollen mit ausdrucksvollen Beweisen und Begründungen an einen Administrator privat geschildert werden. 

**§13** Jegliche rassistischen, sexistischen und weitere unangebrachte Äußerungen oder Inhalte gegen einzelne Menschen bzw. Menschengruppen sind in jeglicher Art strengstens verboten.`)

        const greenButton = new MessageButton()
        .setLabel('Accept')
        .setStyle('green')
        .setEmoji('✅')
        .setID('green')

        const row1 = new MessageActionRow()
        .addComponent(greenButton)
      
        message.channel.send({
            embed: embed,
            components: [row1]
        })
    }
})

client.on('clickButton', async (button) => {
  const embed = new Discord.MessageEmbed()
    if(button.id === `green`) {

        button.clicker.member.roles.add('939531500569890826')
  
      
      button.reply.send('**Du wurdest erfolgreich Verifiziert und hast somit die Regeln aktzeptiert!**', true)

        button.message.edit({    
          embed: embed
        })
    }
})

client.setMaxListeners(25)

client.on('message', async message => {
    let parts = message.content.split(" ");

    if(parts[0].toLowerCase() == '!reactionr') {
     message.delete.message 
        const embed = new Discord.MessageEmbed()
        .setColor('#3A01DF')
        .setTitle('🔹 **Selfroles | RushOase**')
        .setDescription('Um eine Rolle zu erhalten klicke auf einen **Button** auf dem jeweiligen Button steht welche Rolle man erhält und womit man dann gepingt wird!')

        const newsButton = new MessageButton()
        .setLabel('× News')
        .setStyle('grey')
        .setEmoji('📰')
        .setID('news')

        const redButton = new MessageButton()
        .setLabel('× Changelog')
        .setStyle('grey')
        .setEmoji('🗓')
        .setID('red')

        const blurpleButton = new MessageButton()
        .setLabel('× SocialMedia')
        .setStyle('grey')
        .setEmoji('📷')
        .setID('blurple')

        const greyButton = new MessageButton()
        .setLabel('× Giveaways')
        .setStyle('grey')
        .setEmoji('🎉')
        .setID('grey')


        const row1 = new MessageActionRow()
        .addComponent(newsButton)
        .addComponent(redButton)
        .addComponent(blurpleButton)
        .addComponent(greyButton)

        message.channel.send({
            embed: embed,
            components: [row1]
        })
    }
})

client.on('clickButton', async (button) => {
    if(button.id === `news`) {
       button.reply.send('**Du hast nun die 🔹 × News? Rolle**', true) 
      button.clicker.member.roles.add('934528634306326560')

    }
    else if(button.id === 'red') {
        button.reply.send('**Du hast nun die 🔹 × Changelog? Rolle**', true) 
      button.clicker.member.roles.add('934528635753340969')
    }
    else if(button.id === 'blurple') {
     button.reply.send('**Du hast nun die 🔹 × SocialMedia? Rolle**', true) 
      button.clicker.member.roles.add('934528637707878400')   
        
    }
    else if(button.id === 'grey') {
       button.reply.send('**Du hast nun die 🔹 × Giveaways? Rolle**', true) 
      button.clicker.member.roles.add('934528636470575106')   
    }
})





    var cmdmap = {
        help: helpcommand,
        commands: listcommand,
        uptime: uptimecommand,
        kick: kickcommand,
        ban: bancommand,
        embed: embedcommand,
        rankadd: rankaddcommand,
        mute: mutecommand,
        info: infocommand,
        say: saycommand,
        ping: pingcommand,
        verifyreaction: verifyreactioncommand,
        rankremove: rankremovecommand,
        rankupgrade: rankupgradecommand,
        unmute: unmutecommand,
        vote: votecommand,
        ticketsetup: ticketsetupcommand,
        rankkick: rankkickcommand,
        rankdowngrade: rankdowngradecommand,
        clear,
        


    
        
    }
function infocommand () {
}
function ticketsetupcommand () {
}
function saycommand () {
}
function embedcommand () {
}
function rankaddcommand () {
}
function rankremovecommand () {
}
function rankupgradecommand () {
}
function rankdowngradecommand () {
}
function rankkickcommand () {
}
function votecommand () {
}
function verifyreactioncommand () {
}

 

function listcommand (message, args) {
    const channel = message.channel
    const embed = new Discord.MessageEmbed()
    .setColor('3A01DF')
    .setTitle('🔹 **Commands | RushOase**')
    .addField('**» .help |**', 'Zeigt dir ein Hilfe-Menu an!')
    .addField('**» .commands |**', 'Zeigt dir alle Befehle an')
    .addField('**» .info |**', 'Gibt dir eine Information über Mitglieder')
    .addField('**» .ping |**', 'Zeigt dir dein Ping an!')           
    .addField('**» .uptime |**', 'Zeigt dir die Online Zeit des Bots an!')
    .setFooter('Coded by Jay 🔥')
    channel.send(embed);
}



function helpcommand (message, args) {
    const channel = message.channel
    const embed = new Discord.MessageEmbed()
    .setColor('#3A01DF')
    .setTitle('🔹 **Help | RushOase**')
    .setDescription('> **Dies ist der RushOase Bot, dieser Bot wird hauptsächlich die Arbeit in Discord vereinfachen, aber er kann euch auch bei Supportfällen oder anderen Dingen helfen, wenn ihr genauer wissen wollt, welche Befehle es gibt, gebt einfach (.commands) ein!**')
    .setFooter('Coded by Jay 🔥')
    channel.send(embed);

}



client.on('message', async (message) => {
  const text = message.content.slice(prefix.lenght)
    if (message.content.startsWith('.embed')) {
            const channel = message.mentions.channels.first()
        if(!channel) return message.reply('Gib ein Channel an!', true) // If No Channel Is Provided

        // Embed Options
        const title = text.split('^')[1] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!title) return message.reply('Provide Title For Embed.', true)// If No Title Is Provided
        const description = text.split('^')[2] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!description) return message.reply(('Provide Description For Embed.', true), true) // If No Description Is Provided
        const footer = text.split('^')[3] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!footer) return message.reply(('Provide Footer For Embed.', true), true) // If No Footer Is Provided
        const color = text.split('^')[4] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!color) return message.reply('Provide Color For Embed.', true) // If No Color Is Provided
        const author = text.split('^')[5] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!author) return message.reply('Provide Author For Embed.', true) // If No Color Is Provided                
      

        // Send Embed
        const embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setFooter(`${footer}`, message.author.displayAvatarURL())
        .setAuthor(author)
        .setTimestamp() 
        channel.send(embed) // Send Embed
        
    }
})

client.on('message', async (message) => {
const text = message.content.slice(prefix.lenght)
  let parts = message.content.split(" ");
    if(parts[0] == '.rankadd') {
            const channel = message.mentions.channels.first()
        if(!channel) return message.reply('Gib ein Channel an!', true) // If No Channel Is Provided

        // Embed Options
        const user = text.split('^')[1] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!user) return message.reply('Provide a User who joined.') // If No Title Is Provided
        const rank = text.split('^')[2] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!rank) return message.reply('Provide a Rank for the join.') // If No Description Is Provided

        // Send Embed
        const embed = new Discord.MessageEmbed()
        .setDescription(`${user} **ist dem Team als** ${rank} **beigetreten**`)
        .setColor('#3A01DF')
        .setFooter(`RushOase.de || Practice makes perfect`, message.author.displayAvatarURL())
        channel.send(embed) // Send Embed
    }
})

client.on('message', async (message) => {
  let parts = message.content.split(" ");
  const text = message.content.slice(prefix.lenght)
    if(parts[0] == '.rankremove') {
            const channel = message.mentions.channels.first()
        if(!channel) return message.reply('Gib ein Channel an!', true) // If No Channel Is Provided

        // Embed Options
        const user = text.split('^')[1] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!user) return message.reply('Provide a User For the remove.') // If No Title Is Provided
        const reason = text.split('^')[2] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!reason) return message.reply('Provide a Reason for his left.') // If No Title Is Provided   

        const embed = new Discord.MessageEmbed()
        .setDescription(`${user} **hat das Team verlassen** (${rank})`)
        .setColor('#3A01DF')
        .setFooter(`RushOase.de || Practice makes perfect`, message.author.displayAvatarURL())
        channel.send(embed) // Send Embed
    }
})

client.on('message', async (message) => {
  let parts = message.content.split(" ");
  const text = message.content.slice(prefix.lenght)
    if(parts[0] == '.rankupgrade') {
            const channel = message.mentions.channels.first()
        if(!channel) return message.reply('Gib ein Channel an!', true) // If No Channel Is Provided

        // Embed Options
        const user = text.split('^')[1] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!user) return message.reply('Provide the User ') // If No Title Is Provided
        const zu = text.split('^')[2] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!zu) return message.reply('Provide the Rank wich he now has.') // If No Title Is Provided                

          const embed = new Discord.MessageEmbed()
        .setDescription(`${user} **wurde promoted** (${zu})`)
        .setColor('#3A01DF')
        .setFooter(`RushOase.de || Practice makes perfect`, message.author.displayAvatarURL())
        channel.send(embed) // Send Embed
    }
})


client.on('message', async (message) => {
    let parts = message.content.split(" ");
  const text = message.content.slice(prefix.lenght)
    if(parts[0] == '.rankdowngrade') {
            const channel = message.mentions.channels.first()
        if(!channel) return message.reply('Gib ein Channel an!', true) // If No Channel Is Provided

        // Embed Options
        const user = text.split('^')[1] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!user) return message.reply('Provide the User ') // If No Title Is Provided
        const zu = text.split('^')[2] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!zu) return message.reply('Provide the Rank wich he now has.') // If No Title Is Provided                

        const embed = new Discord.MessageEmbed()
        .setDescription(`${user} **wurde demoted** (${zu})`)
        .setColor('#3A01DF')
        .setFooter(`RushOase.de || Practice makes perfect`, message.author.displayAvatarURL())
        channel.send(embed) // Send Embed
    }
})

client.on('message', async (message) => {
    let parts = message.content.split(" ");
  const text = message.content.slice(prefix.lenght)
    if(parts[0] == '.rankkick') {
            const channel = message.mentions.channels.first()
        if(!channel) return message.reply('Gib ein Channel an!', true) // If No Channel Is Provided

        // Embed Options
        const user = text.split('^')[1] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!user) return message.reply('Provide the User ') // If No Title Is Provided
        const zu = text.split('^')[2] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!zu) return message.reply('Provide the reason!') // If No Title Is Provided                

        const embed = new Discord.MessageEmbed()
        .setDescription(`${user} **wurde aus dem Team gekickt** (${zu})`)
        .setColor('#3A01DF')
        .setFooter(`RushOase.de || Practice makes perfect`, message.author.displayAvatarURL())
        channel.send(embed) // Send Embed
    }
})



client.on('message', async (message) => {
        let parts = message.content.split(" ");
        const text = message.content.slice(prefix.lenght)
        if(parts[0] == '.vote') {
        const channel = message.mentions.channels.first()
        if(!channel) return message.reply('Gib ein Channel an!', true) // If No Channel Is Provided

        // Embed Options
        const vote = text.split('^')[1] // [1] Because args[0] Is Channel // You Can Keep Anything Instead Of >
        if(!vote) return message.reply('Provide a Vote.') // If No Title Is Provided

        // Send Embed
        let sent = await channel.send(new Discord.MessageEmbed()
        .setTitle('Umfrage')
        .setDescription(`${vote}

        <:upvote:939562878221029417> ... Upvote
        <:downvote:939563086107525130> ... DownVote `)
        .setColor('3A01DF')
        .setFooter(`RushOase.de || Practice makes perfect`, message.author.displayAvatarURL()))
        channel.send(sent) // Send Embed

        sent.react('<:upvote:939562878221029417>');
        sent.react('<:downvote:939563086107525130>');
    }
})


function pingcommand (message, args) {
    const channel = message.channel
  const ping = Math.floor(client.ws.ping)
    const embed = new Discord.MessageEmbed()
    .setColor('#3A01DF')
    .setTitle('🔹 **Ping | RushOase**')
    .setDescription(`**Dein Ping beträgt : ${ping}ms**`)
    .setFooter('Coded by Jay 🔥')
    channel.send(embed);

}                                                    
  
    client.on('message', async (message) => {
        let parts = message.content.split(" ");
        if(parts[0] == '.ticketsetup') {
        let channel = message.mentions.channels.first();
        if(!channel) return message.reply("Nutze | .ticketsetup #channel");

        let sent = await channel.send(new Discord.MessageEmbed()
        .setColor('#3A01DF')
        .setTitle('🔹 **Ticket | RushOase**')
        .setDescription(`Sie brauchen Support? Kein Problem! Wählen Sie einfach eines der Symbole aus, dessen Sprache ihnen am besten passt!

Bitte beachte unsere Support-Zeiten: Mo bis Fr: 15:00 bis 22:00Uhr Sa & So: 08:00 bis 23:00Uhr`)
                                      
        .addField(`🇩🇪 | Deutsch`, `Dieser Support ist in Deutsch`)                  
        .addField(`🇬🇧 | English`, `This Support is in English`)
        .setFooter('Coded by Jay 🔥')
        );

        sent.react('🇩🇪');
        sent.react('🇬🇧');

        message.channel.send("Ticket erstellt")
    }
})



 function uptimecommand (message, args) {
    let days = Math.floor(client.uptime / 86400000 );
    let hours = Math.floor(client.uptime / 3600000 ) % 24;
    let minutes = Math.floor(client.uptime / 60000 ) % 60;
    let seconds = Math.floor(client.uptime / 1000 ) % 60;
    const channel = message.channel
    const embed = new Discord.MessageEmbed()
    .setColor('#3A01DF')
    .setTitle('🔹 **Uptime | RushOase**')
    .setDescription(`> » Der Bot ist seit dem Restart **${days} Tagen**, **${hours} Stunden**, **${minutes} Minuten** und **${seconds} Sekunden Online**!`)
    .setFooter('Coded by Jay 🔥')
    channel.send(embed);
}

function kickcommand (message, args) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Du brauchst die Berechtigung, um zu Kicken!')
    let toKick = message.mentions.members.first();
    let reason = args.slice(2).join(" ");
    if(!args[0]) return message.channel.send('Bitte gib ein Spieler an!', true);
    if(!toKick) return message.channel.send(`${args[1]} ist kein Spieler`, true);
    if(!reason) return message.channel.send(`Gib ein Grund an`, true);

    if(!toKick.kickable){
        return message.channel.send('Ich kann kein Admin kicken!', true)
    }

    if(toKick.kickable){
        let x = new Discord.MessageEmbed()
        .setColor('#3A01DF')
        .setTitle('🔹 **Kick | RushOase**')
        .addField(`Kick :`, toKick)
        .addField(`von : `, message.author)
        .addField(`Grund : `, reason)
        .addField(`Datum : `, message.createdAt)
        .setFooter('Coded by Jay 🔥')
        message.channel.send(x);
        toKick.kick();
    }
}

function mutecommand (message, args) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Du brauchst die Berechtigung, um zu Muten!', true)
    let toMute = message.mentions.members.first();
    let reason = args.slice(2).join(" ");
    if(!args[0]) return message.channel.send('Bitte gib ein Spieler an!', true);
    if(!toMute) return message.channel.send(`${args[1]} ist kein Spieler`, true);
    if(!reason) return message.channel.send(`Gib ein Grund an`);

        let muteRole = message.guild.roles.cache.get('939531501362642994') 
  

        let x = new Discord.MessageEmbed()
        .setColor('#3A01DF')
        .setTitle('🔹 **Mute | RushOase**')
        .addField(`Mute :`, toMute)
        .addField(`von : `, message.author)
        .addField(`Grund : `, reason)
        .addField(`Datum : `, message.createdAt)
        .setFooter('Coded by Jay 🔥')
        message.channel.send(x);
        toMute.roles.add(muteRole)
      }

      
function unmutecommand (message, args) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Du brauchst die Berechtigung, um zu unMuten!', true)
    let toMute = message.mentions.members.first();
    let reason = args.slice(2).join(" ");
    if(!args[0]) return message.channel.send('Bitte gib ein Spieler an!', true);
    if(!toMute) return message.channel.send(`${args[1]} ist kein Spieler`, true);
    if(!reason) return message.channel.send(`Gib ein Grund an`, true);

        let muteRole = message.guild.roles.cache.get('936683408703246367') 
  

        let x = new Discord.MessageEmbed()
        .setColor('#3A01DF')
        .setTitle('🔹 **Unmute | RushOase**')
        .addField(`Unmute :`, toMute)
        .addField(`von : `, message.author)
        .addField(`Grund : `, reason)
        .addField(`Datum : `, message.createdAt)
        .setFooter('Coded by Jay 🔥')
        message.channel.send(x);
        toMute.roles.remove(muteRole)
      }




function bancommand (message, args) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Du brauchst die Berechtigung, um zu Banen!', true)
    let toBan = message.mentions.members.first();
    let reason = args.slice(2).join(" ");
    if(!args[0]) return message.channel.send('Bitte gib ein Spieler an!', true);
    if(!toBan) return message.channel.send(`${args[1]} ist kein Spieler`, true);
    if(!reason) return message.channel.send(`Gib ein Grund an`);

    if(!toBan.bannable){
        return message.channel.send('Ich kann kein Admin kicken!', true)
    }

    if(toBan.bannable){
        let x = new Discord.MessageEmbed()
        .setColor('#3A01DF')
        .setTitle('🔹 **Ban | RushOase**')
        .addField(`Ban :`, toBan)
        .addField(`von : `, message.author)
        .addField(`Grund : `, reason)
        .addField(`Datum : `, message.createdAt)
        .setFooter('Coded by Jay 🔥')
        message.channel.send(x);
        toBan.ban();
    }

}


client.on('message', message => {

    let parts = message.content.split(" ");
    if(parts[0] == '.clear') {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Du brauchst die Berechtigung, Nachrichten zu löschen!', true)
        if(!parts[1]) return message.channel.send('Du musst angeben wieviele Narichten du löschen willst!', true)
        if(isNaN(parts[1])) return message.channel.send('The indication of how many messages you want to delete must be a number!', true)
        if(parts[1] > 100) return message.channel.send('You cant delete more than **100** messages!', true)
        if(parts[1] < 1) return message.channel.send('You can delete not less than 1 message', true)
        message.channel.bulkDelete(parts[1])
        message.channel.send(`I have successfully deleted **${parts[1]}** messages!`).then(m => m.delete({timeout: 500}))
    }
    if(parts[0] == '.info') {
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Du brauchst die Berechtigung um auf Infos zuzugreifen!", true);

            const guild = message.guild
            const usr = message.mentions.users.first() || message.author
            const member = guild.members.cache.get(usr.id)

            const userr = member.user

            const embed = new Discord.MessageEmbed()
            .setColor('#3A01DF')
            .setAuthor(`${usr.tag}`, `${usr.displayAvatarURL({dynamic: true})}`)
            .setThumbnail(`${usr.displayAvatarURL({dynamic: true})}`)
            .setDescription(`${usr}'s Informationen`)
            .addField('**Name + ID:**', `${usr.tag}`)
            .addField('**ID:**', `${usr.id}`)
            .addField('**Avatar URL:**', `${usr.displayAvatarURL({dynamic: true})}`)
            .addField('**Nickname (if any):**', `${member.nickname || `Der User hat kein Nicknamen`}`)
            .addField('**Server beigetreten:**', `${member.joinedAt}`)
            .addField('**Discord Beigetreten:**', `${usr.createdAt}`)
            .addField('**Status:**', `${userr.presence.status}`)
            .addField('**Bot:**', `${usr.bot}`)
            .addFields({
                name: '**Roll quantity:**',
                value: member.roles.cache.size - 1,
            })
            .setFooter('Coded by Jay 🔥')

            message.channel.send(embed)
        }




    if (!message.guild) return;
    var cont = message.content,
        author = message.member,
        channel = message.channel,
        guild = message.guild

    if (channel.type !== "text") return

    if (message.author.bot) return

    if (cont.startsWith('.')) {
        if (author.id !== client.user.id) {

            var invoke = cont.split(' ')[0].substr(prefix.length).toLowerCase(),
                args = cont.split(' ')

            try {
                if (invoke in cmdmap) {
                    cmdmap[invoke](message, args)
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setColor('#3A01DF')
                    .setTitle('**RushOase | Bot**')
                    .setDescription('**🔹 | Dieser Befehl wurde nicht registriert**')
                    channel.send(embed); 
                }        
            } catch (e) {
                console.log(e)
            }
        }
      }

      
});
client.login('OTM3MTQyODk2MTYxODQ5MzY1.YfXcVQ.r2rHBcWoL5tHCd_dFfMtBhmrqHQ')