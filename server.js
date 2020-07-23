var Discord = require("discord.js"),
  client = new Discord.Client(),
  prefix = ">";
var fs = require("fs"),
  snekfetch = require("snekfetch");
var fortuneTimeout = [[], []];
var redditClearTimeout;
function random(min, max, floored) {
  var random = Math.random() * max - min + min;
  var output = floored ? random : Math.floor(random);
  return output;
}
function pickRand(a) {
  return a[Math.floor(Math.random() * a.length)];
}
client.on("ready", () => {
  console.log("bot is ready");
  client.user.setPresence({
    game: {
      name: ">help",
      type: "PLAYING"
    }
  });
});
client.on("messageDelete", message => {
  var embed = new Discord.RichEmbed();
  embed
    .setAuthor(`${message.member.displayName}`, message.author.avatarURL)
    .setDescription(message.content)
    .setColor(message.member.displayColor)
    .setFooter(message.author.tag + " | user id: " + message.author.id)
    .setTimestamp(new Date());
  var snipes = require("./snipes.json");
  snipes[message.channel.id] = embed;
  var string = JSON.stringify(snipes, null, "\t");
  console.log(string);
  console.log(embed);
  fs.writeFile("./snipes.json", string, function(err) {
    if (err) return console.error(err);
    console.log("done");
  });
});
client.on("message", async message => {
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  var content = message.content;
  var args = message.content
    .slice(1)
    .trim()
    .split(/ +/g);
  var command = args.shift().toLowerCase();
  var mention = message.mentions.members.first();
  ///
  ///
  ///
  if (command == "reload") {
    throw new Error();
  }
  ///
  ///
  if (
    command == "help" ||
    command == "h" ||
    command == "cmds" ||
    command == "commands"
  ) {
    var help = require("./storage/help.json");
    var embed = new Discord.RichEmbed()
      .setAuthor("MapleBot Help")
      .setDescription(
        "[Add me to your server](https://discordapp.com/api/oauth2/authorize?client_id=633020236370542653&permissions=8&scope=bot)"
      )
      .setThumbnail(client.user.avatarURL)
      .setFooter(
        "Created by " +
          client.users.get("409494455079403533").tag +
          " | Maplebot"
      );
    help.forEach(cmd => {
      embed.addField(cmd.cmd, cmd.desc);
    });
    message.channel.send(embed);
  }
  ///
  ///
  if (command == "snipe") {
    var snipes = require("./snipes.json");
    console.log(snipes[message.channel.id]);
    var embed = new Discord.RichEmbed(snipes[message.channel.id]);
    message.channel.send(embed);
  }
  ///
  ///
  if (command == "dog") {
    snekfetch.get("https://random.dog/woof.json").then(r => {
      var image = r.body.url;
      var embed = new Discord.RichEmbed()
        .setImage(image)
        .setDescription(`[Woof](https://random.dog)`);
      message.channel.send(embed);
    });
  }
  ///
  ///
  if (command == "cat") {
    snekfetch.get("http://aws.random.cat/meow").then(r => {
      var embed = new Discord.RichEmbed()
        .setImage(r.body.file.toLowerCase())
        .setDescription(`[Meow]($https://random.cat)`);
      console.log(r.body);
      message.channel.send(embed);
    });
  }
  ///
  ///
  if (command == "ship") {
  }
  ///
  ///
  if (command == "reddit") {
    var sub = args[0];
    var link;
    var LoadID;
    var sortMatch = ["hot", "new", "cont", "rising", "top"];
    var sort = sortMatch.includes(args[1]) ? args[1] : "";
    message.channel
      .send("Loading posts<a:dots:641436521831858186>")
      .then(async messagee => {
        LoadID = messagee.id;
        //if(sub=='fiftyfifty') return message.channel.send('Imma just stop you right there.')
        if (sub == undefined) {
          link = "https://www.reddit.com/.json";
        } else {
          link = "https://www.reddit.com/r/" + sub + "/" + sort + ".json";
        }
        var { body } = await snekfetch.get(link).query({ limit: 500 });
        var allowed = body.data.children.filter(
          post =>
            post.data.url.includes(".png") ||
            post.data.url.includes(".jpg") ||
            post.data.url.includes(".gif")
        );
        if (!allowed.length) {
          var { body } = await snekfetch
            .get("https://www.reddit.com/.json")
            .query({ limit: 500 });
          var allowed = body.data.children.filter(
            post =>
              post.data.url.includes(".png") ||
              post.data.url.includes(".jpg") ||
              post.data.url.includes(".gif")
          );
        }
        var randomnumber = 0;
        if (!message.channel.nsfw && allowed[randomnumber].data.over_18) {
          return messagee.edit(
            "uh oh, nsfw, that's not allowed in this channel."
          );
        }
        var embed = new Discord.RichEmbed()
          .setColor(0xff4500)
          .setTitle(allowed[randomnumber].data.title)
          .setDescription(
            allowed[randomnumber].data.ups +
              " points\n" +
              "r/" +
              allowed[randomnumber].data.subreddit +
              "\n"
          )
          .setImage(allowed[randomnumber].data.url)
          .setFooter(randomnumber + 1 + " of " + allowed.length)
          .setTimestamp(allowed[randomnumber].data.created_utc * 1000);
        var id = message.author.id;
        messagee.edit(embed).then(async message => {
          await message.react("🔄");
          await message.react("⬅");
          await message.react("➡");
          const filter = (reaction, user) =>
            (reaction.emoji.name === "🔄" && user.id == id) ||
            (reaction.emoji.name === "⬅" && user.id == id) ||
            (reaction.emoji.name === "➡" && user.id == id);
          const collector = message.createReactionCollector(filter, {});
          redditClearTimeout = setTimeout(() => {
            collector.stop();
          }, 120000);
          collector.on("collect", r => {
            r.remove(client.users.get(id));
            clearTimeout(redditClearTimeout);
            redditClearTimeout = setTimeout(() => {
              collector.stop();
            }, 30000);
            if (r.emoji.name === "🔄") {
              randomnumber = Math.floor(Math.random() * allowed.length);
            } else if (r.emoji.name == "⬅") {
              randomnumber -= 1;
            } else if (r.emoji.name == "➡") {
              randomnumber += 1;
            }
            var embed = new Discord.RichEmbed()
              .setColor(0xff4500)
              .setAuthor("r/" + allowed[randomnumber].data.subreddit + "\n")
              .setDescription(
                allowed[randomnumber].data.ups +
                  " points\n" +
                  "[" +
                  allowed[randomnumber].data.title +
                  "](https://reddit.com" +
                  allowed[randomnumber].data.permalink +
                  ")\n"
              )
              .setImage(allowed[randomnumber].data.url)
              .setFooter(randomnumber + 1 + " of " + allowed.length)
              .setTimestamp(allowed[randomnumber].data.created_utc * 1000);
            message.edit(embed);
          });
          collector.on("end", collected => {
            message.clearReactions();
          });
        });
      });
  }
  ///
  ///
  if (command == "roll") {
    var sides = args[1];
    var dice = args[0];
    if (args[0].split("")[0] == "d") {
      sides = Number(dice.replace("d", ""));
      dice = args[1];
    }
    if (dice == undefined) {
      dice = 1;
    }
    if (sides == undefined) {
      sides = 6;
    }
    var i = 0;
    var output = 0;
    while (i < Number(dice)) {
      output += Math.floor(Math.random() * Number(sides) + 1);
      i++;
    }
    if (output == NaN) return;
    message.channel.send(
      new Discord.RichEmbed()
        .setTitle("[**" + output + "**]")
        .setAuthor(dice + "x d" + sides)
    );
  }
  ///
  ///
  if (command == "8ball") {
    var responses = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes - definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful."
    ];
    message.channel.send(
      new Discord.RichEmbed()
        .setTitle(pickRand(responses))
        .setFooter(args.join(" ") + " | Magic 8 Ball")
    );
  }
  ///
  ///
  if (command == "urban") {
    try {
      var urban = require("urban");
      if (args[0] == undefined) {
        var query = urban.random();
        query.first(function(json) {
          try {
            var toolong = json.definition.length > 1900 ? "..." : "";
          } catch (e) {
            return message.channel.send("No results");
          }
          var embed = new Discord.RichEmbed()
            .setTitle(`**${json.word}**`)
            .setDescription(
              json.definition
                .split("")
                .splice(0, 1900)
                .join("") +
                toolong +
                " [see full description](" +
                json.permalink +
                ")"
            )
            .addField("ex:", json.example)
            .setTimestamp(json.written_on)
            .setColor(0x101010)
            .setFooter("urban dictionary");
          message.channel.send(embed);
        });
      } else {
        var query = urban(args.join(" "));
        query.first(function(json) {
          try {
            var toolong = json.definition.length > 1900 ? "..." : "";
          } catch (e) {
            return message.channel.send("No results");
          }
          var embed = new Discord.RichEmbed()
            .setTitle(`**${json.word}**`)
            .setDescription(
              json.definition
                .split("")
                .splice(0, 1900)
                .join("") +
                toolong +
                " [see full description](" +
                json.permalink +
                ")"
            )
            .addField("ex:", json.example)
            .setTimestamp(json.written_on)
            .setColor(0x101010)
            .setFooter("urban dictionary");
          message.channel.send(embed);
        });
      }
    } catch (e) {}
  }
  ///
  ///
  if (command == "say") {
    var mess = args.slice(1, args.length).join(" ");
    var chan = message.guild.channels.find("name", args[0]);
    if (message.mentions.channels.first() !== undefined) {
      chan = message.mentions.channels.first();
    }else
    if (args[0] == "here") {
      chan = message.channel;
    }else{chan = message.channel}
    chan.send(mess);
    message.delete();
  }
  ///
  ///
  if (command == "kill") {
    var deathJson = require("./storage/deaths.json");
    var d = deathJson.deaths;
    var m = deathJson.mobs;
    var t = deathJson.weapons;
    var deathmessage = pickRand(d)
      .split("[player]")
      .join(
        mention == undefined
          ? args[0] == undefined
            ? message.guild.members.random().displayName
            : args[0]
          : mention.user.username
      )
      .split("[player/mob]")
      .join(
        Math.random() > 0.5
          ? pickRand(m)
          : message.guild.members.random().displayName
      )
      .split("[mob/player]")
      .join(
        Math.random() > 0.5
          ? pickRand(m)
          : message.guild.members.random().displayName
      )
      .split("[weapon]")
      .join(pickRand(t));
    message.channel.send(`\`${deathmessage}\``);
  }
  ///
  ///
  if (command == "pfp") {
    var embed = new Discord.RichEmbed().setImage(
      mention == undefined ? message.author.avatarURL : mention.user.avatarURL
    );
    message.channel.send(embed);
  }
  ///
  ///
  if (command == "colorme") {
    var colour = require("color");
    var colorCheck = args.join("").toLowerCase(),
      newColor;
    try {
      if (
        colorCheck == "remove" ||
        colorCheck == "clear" ||
        colorCheck == "none"
      ) {
        return message.member.roles
          .find("name", message.member.displayHexColor.toLowerCase())
          .delete();
      } else if (/^#[0-9A-F]{6}$/i.test(colorCheck)) {
        newColor = colorCheck;
      } else if (/^#[0-9A-F]{6}$/i.test("#" + colorCheck)) {
        newColor = "#" + colorCheck;
      } else if (
        /^#[0-9A-F]{6}$/i.test(
          colour(colorCheck)
            .hex()
            .toLowerCase()
        )
      )
        newColor = colour(colorCheck)
          .hex()
          .toLowerCase();
    } catch (e) {
      return message.channel.send(
        new Discord.RichEmbed().setDescription(
          "Failed to add role, **" +
            colorCheck +
            "** is an invalid color. See list of web safe colors [here](https://www.color-hex.com/color-names.html)"
        )
      );
    }
    var currentRole = message.member.roles.find(
      "name",
      message.member.displayHexColor.toLowerCase()
    );
    message.guild.createRole({ name: newColor, color: newColor }).then(role => {
      message.member.addRole(role.id.toString());
      message.channel.send(
        new Discord.RichEmbed().setDescription(
          ":ok_hand: succesfully added color **" + colorCheck + "**"
        )
      );
    });
    if (currentRole !== undefined) {
      currentRole.delete();
    }
  }
  ///
  ///
  else if (command == "fortune") {
    function id(id) {
      return message.author.id == id;
    }
    var fortunes = require("./storage/fortunes.json");
    if (fortuneTimeout[0].findIndex(id) == -1) {
      fortuneTimeout[0].push(message.author.id);
      fortuneTimeout[1].push(Math.floor(Math.random() * fortunes.length));
    }
    var index = fortuneTimeout[0].findIndex(id);
    setTimeout(() => {
      fortuneTimeout[0].splice(index, 1);
      fortuneTimeout[1].splice(index, 1);
    }, 3600000);
    console.log(index);
    var embed = new Discord.RichEmbed()
      .setDescription("**" + fortunes[fortuneTimeout[1][index]] + "**")
      .setFooter(`Fortune cookie fortune #${fortuneTimeout[1][index] + 1}`)
      .setColor(0x39393e);
    message.channel.send(embed);
  }
  ///
  ///
  if (command === "eval") {
    //if (message.author.id !== "409494455079403533") return;
    var toEval = args.join(" ");
    var removeBackticks = toEval
      .split("```js")
      .join("")
      .split("```")
      .join("");
    toEval = removeBackticks;
    toEval = toEval.includes("process.env.TOKEN") ? "" : toEval;
    try {
      let Eval = eval(toEval);
      message.react("✅");
    } catch (e) {
      message.channel.send(e);
      message.react("⚠");
      return console.log(e);
    }
  }
});
//client.login(process.env.TOKEN);

const http = require('http');
  
const server = http.createServer((req, res) => {
  res.end("Hello! This is the webserver for the discord bot on "+process.env.PROJECT_DOMAIN);
}).listen(3000);


setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  console.log("WebServer is online!");
}, 270000);
