

const Discord = require('discord.js');
var index = require("./server.js")
var client = index.client
//guess vars
var numberSet = new Set();
var tries = 0;

//ttt vars
var tictactoe = new Set();
var players = [""]
var boardStatus = ["0","0","0",
                   "0","0","0",
                   "0","0","0"]
var awaitplayer = "0"
var timeout
var drawcounter = 1 
var turnlog = ""

//c4 vars
var c4a = ["<:space:537429732518526976>","<:Red:549420966145425409>","<:Yellow:549420966342557699>"]
var c4       = [["0","0","0","0","0","0"],
                ["0","0","0","0","0","0"],
                ["0","0","0","0","0","0"],
                ["0","0","0","0","0","0"],
                ["0","0","0","0","0","0"],
                ["0","0","0","0","0","0"],
                ["0","0","0","0","0","0"]]
var c4p = [""]
var c4Timeout
var awaitp = "0"

//simon vars
var simon = []
var playingSim = ""
var space = "<:space:537429732518526976>";
var red = "<:RedS:556559429659787295>"; var blue = "<:BlueS:556559362768896006>"; var green = "<:GreenS:556559404938559526>"; var yellow = "<:YellowS:556559449167495198>"
var simonstat = [space,space,space,space]
var simonlist = []
var simonwait = []
var simready = 0
var simscore = 0

//cah vars 
var whiteCards=["old white men","many bees","an invite to UK Crew",
               "the queen of England","cock","my dad","just crabs",
               "loaf","mexica","racism","being on fire","crystal meth",
               "stalin","dead babies","the meaning of life","the true meaning of christmas",
               "kanye west","god","harry potter erotica","massachusetts","japan","anime",
               "hentai","big bulky gay men","a thermonuclear detonation","a brain tumor","kids with cancer",
               "shrek","lumberjack fantasies","me me big boy","add more protein","the american dream",
               "puberty","sweet vengeance","winking at old people","oompa-loompas",
               "authentic mexican cuisine","preteens","a fleshlight","nothing","asians",
               "saxophone solos","land mines","me time","nickelback","a girls night out","grill",
               "gay dads","ghosts","using your imagination","alcoholics","poorly-timed holocaust jokes",
               "exactly what you'd expect","a time travel paradox","axe body spray","canadians","pirates",
               "idk","a micropenis","old-people smell","women in yogurt commercials","not giving a shit about the third world",
               "an oversized lolipop","mechahitler","flying sex snakes","xXx_3p1c_G4m3r_420_xXx","invading poland","civilian casualties",
               "captain obvious","auschwitz","the blood of christ","magnets","hot pockets","masturbate",
               "agriculture","dying","silence","spraying away the big gay","steam baby","teenage pregnancy","my inner demons","surreal memes",
               "kamikaze pilots","crippling debt","crippling depression","osteoperosis","idubbztv",
               "all-you-can-eat shrimp for $1.99","a cool hat","anthromorphobia","a dissapointing birthday party","a sausage fest","my soul","robocop",
               "getting drunk at a kids birthday party","the morbidly obese","tape","loli","grave robbing",
               "cyka blyat","peta","the terrorists","a school shooter","teaching a robot to love","emotions",
               "man meat","BANANAS","minecraft hunger games ep. 1937","an epic gamer moment","white people",
               "dead people","people in white vans","the hunger games","whipping it out","a snapping turtle biting the tip of your penis",
               "an m16 assault rifle","incest","flightless birds","a foul mouth","doing the right thing",
               "frolicking","being a dick to little childern","seeing grandma naked","the bombing of hiroshima","raptor attacks",
               "swooping","hiding a boner","full frontal nudity","vigorous jass hands","michelle obama's arms","mouth herpes",
               "radiohead","hurricane katrina","heavy metal rock music","geese","a murder of crows","erectile dysfunction",
               "the pirate's life","being a motherfucking sorcerer","a mating display","public displays of affection",
               "friction","fear itself","asians who aren't good at math","yeast","lunchables","citrus","vikings",
               "the kool-aid man","hot cheese","nicolas cage","republicans","beurocrats","a defective condom","nazis",
               "a cooler full of organs","kidneys","dropping a chandelier on your enemies and riding the rope up",
               "hormone injection","switching to gieco","pulling out","the big bang","count chocula",
               "our first chimpanzee president","a super soaker full of cat piss","the cool refreshing taste of pepsi",
               "hope","getting really high","natural selection","seppuku","minecraft kids","stop drop and roll",
               "internet saftey videos","spiders","maplebot","algebra for kindergardeners","My huge penis and substantial fortune",
               "A horse that appeared and won't stop ejaculating","moto moto","child molesters","albert einstien",
               "adolf hitler at age 6","benito mussolini","mr krabs","the hit animated tv show spongebob squarepants",
               "disney channel sitcoms","this year's mass shooting","take-backsies","an erection that lasts over 4 hours",
               "viagra","science","a tribe of warrior women","child beauty pagents","child abuse","gandhi",
               "bill nye the science guy","a middle aged man on roller skates","domino's oreo dessert pizza",
               "a mexican child trapped inside a burrito","cards against humanity","\"secret sauce\"","that one time you saw bart simpson's dick",
               "r/funny","an ak-47","a gang of flying space pirates",""]
var blackCards=["Hi, Phil Swift here for flex ___! The next amazing item in the Flex Seal:tm: line of products!","What's the scariest thing ever?","The reason you skipped school.",
                "Like my ma' always said: never ___ before going to bed.","Time of Death: July 11 8:36 \nCause of Death: ___",
               "What's the worst that could happen if I married my sister?","How did I lose my virginity?","Why can't I sleep at night?",
               "What's that smell?","I got 99 problems but ___ ain't one","Maybe she's born with it. Maybe it's ___",
               "What's the next Happy Meal toy?","Here is the church, Here is the steeple. Open the door and there is the ___",
               "It's a pity that kids these days are all getting involved with ___","Help! My son is ___!",
               "And the academy award goes to... ___!","What's that sound?","What ended my last relationship?",
               "MTV's new reality show features eight washed-up celebrities living with ___.",
                "I drink to forget ___","I'm sorry professer, but I couldn't complete my homework because of ___.",
               "What is Batman's guilty pleasure?","___ is how the world will end.","The last thing that you'll see before you die is ___.",
               "What's a girl's best friend?","TSA guidelines now prohibit ___ on airplanes.",
               "___. That's how I want to die.","For my next trick I will pull a rabbit out of ___.",
               "In the new Disney channel movie, Hannah Montana struggles with ___ for the first time.",
               "___ is a slippery slope that leads to depression.","___ ain't much, but it's honest work.",
               "I get by with a little help from ___.","Why won't Karen let me see the kids again?",
               "Dear abby, I have been having trouble with ___ and would like your advice.",
               "Instead of coal, Santa now gives the bad childern ___.","What's the most emo?",
               "In 1000 years when paper money is a distant memory, how will we pay for goods and services?",
               "Introducing the amazing super hero, ___ man!","A romantic candlelit dinner would be incomplete without ___.",
               "___. I bet you can't just have one!","White people like ___.","___. High five, bro.",
               "Next from J.K Rowling: Harry Potter and the chamber of ___.","Introducing Xtreme Basketball! It's like basketball but with ___!",
               "War! What is it good for?","During sex I like to think about ___.","What are my parents hiding from me?",
               "What will always get you laid?","In LA County jail, the word is you can trade 200 cigarettes for ___.","What did I bring back from mexico?",
               "What don't you want to find in your Kung Pao chicken?","What will I bring back in time to convince people that I'm a powerful wizard?",
               "how am I maintaining my relationship status?","___. It's a trap!","Coming to Broadway this season: ___ the musical.",
               "While the United States raced the Soviet Union to the moon, the Mexican government funneled millions of pesos into ___.",
               "After the earthquake, Sean Penn brought ___ to the people of Haiti.","Next on ESPN2, the ___ World Championships.",
               "Step 1: ___, Step 2: profit.","They said we were crazy. They said you couldn't put ___ in a smoothie. But we did it anyways.",
               "But before I kill you, Mr. Bond. I must show you ___","Silly rabbit! ___ is for kids!","What gives me uncontrollable gas?",
               "The new Chevy Tahoe, with enough power and space to take ___ everywhere you go.","The class field trip was completely ruined by ___.",
               "When the Pharaoh remained unmoved, Moses called down a plauge of ___.","What's my secret power?",
               "What's there a ton of in heaven?","Next on Nick: Me, Myself, and ___.","What would grandma find disturbing, yet oddly charming?",
               "What did the US airdrop the the childern of Afghanistan?","Why am I sticky?","___: Kid tested, Mother approved.",
               "Why do I hurt all over?","The new fad diet contains high calories, low sugar, and ___."]
var turnTimeout
var cahp = [["id",0,0,0,0,0,0,0]]
var blackCard = 0
var requiredplayers = 3
var tzar = 1
var awaiting = [""]
//var cardEmbed = new Discord.RichEmbed()
var cards = 1
var czarturn = 0

//tetro vars
var tetris = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ]
//    ^
//< y x

client.on("message", message => {
  if(message.author.bot)return;
  if (message.content.indexOf("-") !== 0) return;
  const args = message.content.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  try{var color = message.member.displayColor;if(color=='0'){color=3750206}}catch(e){var color = 3750206}
  
  
  
    if(command=='tetris'){
      var xy = {
       x:1,
       y:1
      }
      var current = {
       a: (xy.x+2)+" "+xy.y,
       b: (xy.x+1)+" "+xy.y,
       c: (xy.x+1)+" "+(xy.y+1),
       d: (xy.x)+" "+(xy.y+1)
      }
      
      function set(x,y,set) {
        tetris[x-1][y-1] = 1
      }
      var tile = ":black_circle:"
      var tiles = {
       red: "<:IS:557995262006525954>",
       orange: "<:L_:557995262224760832>",
       yellow: "<:O_:557995262027759632>",
       green: "<:S_:557995262254120981>",
       blue: "<:IL:557995262220697610>",
       purple: "<:T_:557995261939548182>",
       cyan: "<:I_:557995262208114718>"
      }
      var tilesarr = [tile, tiles.red, tiles.orange, tiles.yellow, tiles.green, tiles.blue, tiles.purple, tiles.cyan]
      function getTile(x,y){
        return tilesarr[tetris[x-1][y-1]]
      }
      var stat = ["<:space:537429732518526976>"]
      function placeTiles() {
        set(Number(current.a.split(" ")[0]),Number(current.a.split(" ")[1]),tiles.red)
        set(Number(current.b.split(" ")[0]),Number(current.b.split(" ")[1]),tiles.red)
        set(Number(current.c.split(" ")[0]),Number(current.c.split(" ")[1]),tiles.red)
        set(Number(current.d.split(" ")[0]),Number(current.d.split(" ")[1]),tiles.red)
      } 
      function undoPlaceTiles() {
        set(current.a.split(" ")[0],current.a.split(" ")[1],":black_circle:")
        set(current.b.split(" ")[0],current.b.split(" ")[1],":black_circle:")
        set(current.c.split(" ")[0],current.c.split(" ")[1],":black_circle:")
        set(current.d.split(" ")[0],current.d.split(" ")[1],":black_circle:")
      }
    function writeBoard() {

    var board = 
    getTile(8,1)+getTile(7,1)+getTile(6,1)+getTile(5,1)+getTile(4,1)+getTile(3,1)+getTile(2,1)+getTile(1,1)+"\n"+
    getTile(8,2)+getTile(7,2)+getTile(6,2)+getTile(5,2)+getTile(4,2)+getTile(3,2)+getTile(2,2)+getTile(1,2)+"\n"+
    getTile(8,3)+getTile(7,3)+getTile(6,3)+getTile(5,3)+getTile(4,3)+getTile(3,3)+getTile(2,3)+getTile(1,3)+"\n"+
    getTile(8,4)+getTile(7,4)+getTile(6,4)+getTile(5,4)+getTile(4,4)+getTile(3,4)+getTile(2,4)+getTile(1,4)+"\n"+
    getTile(8,5)+getTile(7,5)+getTile(6,5)+getTile(5,5)+getTile(4,5)+getTile(3,5)+getTile(2,5)+getTile(1,5)+"\n"+
    getTile(8,6)+getTile(7,6)+getTile(6,6)+getTile(5,6)+getTile(4,6)+getTile(3,6)+getTile(2,6)+getTile(1,6)+"\n"+
    getTile(8,7)+getTile(7,7)+getTile(6,7)+getTile(5,7)+getTile(4,7)+getTile(3,7)+getTile(2,7)+getTile(1,7)+"\n"+
    getTile(8,8)+getTile(7,8)+getTile(6,8)+getTile(5,8)+getTile(4,8)+getTile(3,8)+getTile(2,8)+getTile(1,8)+"\n"+
    getTile(8,9)+getTile(7,9)+getTile(6,9)+getTile(5,9)+getTile(4,9)+getTile(3,9)+getTile(2,9)+getTile(1,9)+"\n"+
    getTile(8,10)+getTile(7,10)+getTile(6,10)+getTile(5,10)+getTile(4,10)+getTile(3,10)+getTile(2,10)+getTile(1,10)+"\n"+
    getTile(8,11)+getTile(7,11)+getTile(6,11)+getTile(5,11)+getTile(4,11)+getTile(3,11)+getTile(2,11)+getTile(1,11)+"\n"+
    getTile(8,12)+getTile(7,12)+getTile(6,12)+getTile(5,12)+getTile(4,12)+getTile(3,12)+getTile(2,12)+getTile(1,12)+"\n"+
    getTile(8,13)+getTile(7,13)+getTile(6,13)+getTile(5,13)+getTile(4,13)+getTile(3,13)+getTile(2,13)+getTile(1,13)+"\n"+
    getTile(8,14)+getTile(7,14)+getTile(6,14)+getTile(5,14)+getTile(4,14)+getTile(3,14)+getTile(2,14)+getTile(1,14)+"\n"+
    getTile(8,15)+getTile(7,15)+getTile(6,15)+getTile(5,15)+getTile(4,15)+getTile(3,15)+getTile(2,15)+getTile(1,15)+"\n"
      console.log(board.length)
      var embed = new Discord.RichEmbed()
      .setDescription(board)
      return embed
    }
      placeTiles() 
      message.channel.send(writeBoard()).then(message=>{
      undoPlaceTiles() 
      setInterval(()=>{
      placeTiles() 
      message.edit(writeBoard())
      undoPlaceTiles() 
        xy.y+=1
        current = {
       a: (xy.x+2)+" "+xy.y,
       b: (xy.x+1)+" "+xy.y,
       c: (xy.x+1)+" "+(xy.y+1),
       d: (xy.x)+" "+(xy.y+1)
      }
      },2500)
    })
    }else
  
  if(command=='reload'){
   throw new Error("reload")
  }else
      
  if(command=='simon'){
    async function pulseRed(message,delmult) {
      await setTimeout(async ()=>{
      await setTimeout(async ()=>{
      simonstat[0]=red
      embed = new Discord.RichEmbed().setDescription(simonstat[0]+simonstat[1]+"\n"+simonstat[2]+simonstat[3]).setColor(0xee0000)
      message.edit(embed)
      simonwait.push(0)
      await setTimeout(()=>{
      simonstat[0]="<:space:537429732518526976>"
      embed = new Discord.RichEmbed().setDescription(simonstat[0]+simonstat[1]+"\n"+simonstat[2]+simonstat[3]).setColor(0x39393e)
      message.edit(embed)
      },1500)
      },1500)
      },1500*delmult-1)
    }
    async function pulseAllRed(message,delmult) {
      await setTimeout(async ()=>{
      simonstat[0]=red
        simonstat[1]=red
        simonstat[2]=red
        simonstat[3]=red
      embed = new Discord.RichEmbed().setDescription(simonstat[0]+simonstat[1]+"\n"+simonstat[2]+simonstat[3]).setColor(0xee0000)
      message.edit(embed)
      simonwait.push(0)
      await setTimeout(()=>{
      simonstat[0]="<:space:537429732518526976>"
        simonstat[1]="<:space:537429732518526976>"
        simonstat[2]="<:space:537429732518526976>"
        simonstat[3]="<:space:537429732518526976>"
      embed = new Discord.RichEmbed().setDescription(simonstat[0]+simonstat[1]+"\n"+simonstat[2]+simonstat[3]).setColor(0x39393e)
      message.edit(embed)
      },750)
      },750)
    }    async function pulseAll(message,delmult) {
      await setTimeout(async ()=>{
      simonstat[0]=red
        simonstat[1]=green
        simonstat[2]=blue
        simonstat[3]=yellow
      embed = new Discord.RichEmbed().setDescription(simonstat[0]+simonstat[1]+"\n"+simonstat[2]+simonstat[3]).setColor(0xeeeeee)
      message.edit(embed)
      simonwait.push(0)
      await setTimeout(()=>{
      simonstat[0]="<:space:537429732518526976>"
        simonstat[1]="<:space:537429732518526976>"
        simonstat[2]="<:space:537429732518526976>"
        simonstat[3]="<:space:537429732518526976>"
      embed = new Discord.RichEmbed().setDescription(simonstat[0]+simonstat[1]+"\n"+simonstat[2]+simonstat[3]).setColor(0x39393e)
      message.edit(embed)
      },750)
      },750)

    }
    async function pulseGreen(message,delmult) {
      await setTimeout(async ()=>{
      await setTimeout(async ()=>{
      simonstat[1]=green
      embed = new Discord.RichEmbed().setDescription(simonstat[0]+simonstat[1]+"\n"+simonstat[2]+simonstat[3]).setColor(0x00ee00)
      message.edit(embed)
      simonwait.push(1)
      await setTimeout(()=>{
      simonstat[1]="<:space:537429732518526976>"
      embed = new Discord.RichEmbed().setDescription(simonstat[0]+simonstat[1]+"\n"+simonstat[2]+simonstat[3]).setColor(0x39393e)
      message.edit(embed)
      },1500)
      },1500)
      },1500*delmult-1)
    }
    async function pulseBlue(message,delmult) {
      await setTimeout(async ()=>{
      await setTimeout(async ()=>{
      simonstat[2]=blue
      embed = new Discord.RichEmbed().setDescription(simonstat[0]+simonstat[1]+"\n"+simonstat[2]+simonstat[3]).setColor(0x0000ee)
      message.edit(embed)
      simonwait.push(2)
      await setTimeout(()=>{
      simonstat[2]="<:space:537429732518526976>"
      embed = new Discord.RichEmbed().setDescription(simonstat[0]+simonstat[1]+"\n"+simonstat[2]+simonstat[3]).setColor(0x39393e)
      message.edit(embed)
      },1500)
      },1500)
      },1500*delmult-1)
    } 
    async function pulseYellow(message,delmult) {
      await setTimeout(async ()=>{
      await setTimeout(async ()=>{
      simonstat[3]=yellow
      embed = new Discord.RichEmbed().setDescription(simonstat[0]+simonstat[1]+"\n"+simonstat[2]+simonstat[3]).setColor(0xeeee00)
      message.edit(embed)
      simonwait.push(3)
      await setTimeout(()=>{
      simonstat[3]="<:space:537429732518526976>"
      embed = new Discord.RichEmbed().setDescription(simonstat[0]+simonstat[1]+"\n"+simonstat[2]+simonstat[3]).setColor(0x39393e)
      message.edit(embed)
      },1500)
      },1500)
      },1500*delmult-1)
    }
    function runPulseList(message) {
      simready = 0
     var i = 0
     while(i<simonlist.length){
      var pulsered = simonlist[i]==0 ? pulseRed(message,i+1) : "" 
      var pulsegreen = simonlist[i]==1 ? pulseGreen(message,i+1) : "" 
      var pulseblue = simonlist[i]==2 ? pulseBlue(message,i+1) : "" 
      var pulseyellow = simonlist[i]==3 ? pulseYellow(message,i+1) : "" 
      i++
     } 
      simready = 1
    }
    function getColorIndex(r) {
     if(r.emoji.id === "556559429659787295"){
       return 0
     }else if(r.emoji.id === "556559404938559526"){
       return 1
     }else if(r.emoji.id === "556559362768896006"){
       return 2
     }else if(r.emoji.id === "556559449167495198"){
       return 3
     }
    }
    //RGBY
    if(playingSim!==message.author.id){
     if(playingSim==""){playingSim = message.author.id}else
     {return message.channel.send("there's already a game in progress")}
    }
    var embed = new Discord.RichEmbed()
    .setDescription(simonstat[0]+simonstat[1]+"\n"+simonstat[2]+simonstat[3])
    .setColor(0x39393e)
    var id = message.author.id
    message.channel.send(embed).then(message=>{
      simonlist.push(Math.floor(Math.random()*4))
      runPulseList(message)
        message.react("556559429659787295").then(()=>message.react("556559404938559526").then(()=>message.react("556559362768896006").then(()=>message.react("556559449167495198"))))
        const filter = (reaction, user) => reaction.emoji.id === "556559429659787295" && user.id == id && simready == 1||reaction.emoji.id === "556559404938559526" && user.id == id && simready == 1||reaction.emoji.id === "556559362768896006" && user.id == id && simready == 1||reaction.emoji.id === "556559449167495198" && user.id == id && simready == 1
        const collector = message.createReactionCollector(filter,{});
        collector.on('collect', r => { 
                                      r.remove(client.users.get(id))
                                      if(getColorIndex(r)==simonwait[0]){
                                        simonwait.shift()
                                        
                                      } else {collector.stop();message.channel.send("GAME OVER.\nYour score was "+simscore);simonlist = [];simscore = 0;playingSim="";return simonwait = []}
                                      if(simonwait.length<=0){
                                        simonlist.push(Math.floor(Math.random()*4))
                                        runPulseList(message)
                                        simscore++
                                      }

 
                                     });
        collector.on('end', collected => {message.clearReactions()});

        
    })
  }else
  
  if(command=="cah"||command=="cards"){
    function end() {
     clearTimeout(turnTimeout)
      cahp=[""]
      requiredplayers = 3
      tzar=1
      awaiting=[""]
      cardEmbed = new Discord.RichEmbed()
      cards = 1
    }
    function startRound() {
     var p = cahp
     p.shift()
     var i = 1
     while(i<=cahp.length){
      sendDmCards(i) 
       i++
     }
    }
    function joinGame(id) {
      cahp.push([id,Math.floor(Math.random()*whiteCards.length),Math.floor(Math.random()*whiteCards.length),Math.floor(Math.random()*whiteCards.length),Math.floor(Math.random()*whiteCards.length),Math.floor(Math.random()*whiteCards.length),Math.floor(Math.random()*whiteCards.length),Math.floor(Math.random()*whiteCards.length)])
      requiredplayers--
      awaiting.push(id)
    }
    function findPlayer(id){
      var i = 0
      while(i<=cahp.length){
        if(cahp[i][0]==id){
         return i 
        }
        i++
      }
      return false
    }
    function playCard(c) {
      c=Number(c)
      var player = findPlayer(message.author.id)
      cardEmbed.addField(cards+".",whiteCards[cahp[player][c]])
      cards++
      cahp[player].splice(c,1,Math.floor(Math.random()*whiteCards.length))
      awaiting.splice(player,1)
    }
    function shiftTzar() {
     tzar++
     if(tzar>cahp.length){
      tzar=1 
     }
    }
    function sendDmCards(p){
      var player = cahp[p]
      var embed = new Discord.RichEmbed()
      .setTitle("Cards Against Humanity")
      .setDescription("Use the command -cah (card number) to choose a card")
      .addField("Black Card",blackCards[blackCard])
      .addField("1",whiteCards[player[1]])
      .addField("2",whiteCards[player[2]])
      .addField("3",whiteCards[player[3]])
      .addField("4",whiteCards[player[4]])
      .addField("5",whiteCards[player[5]])
      .addField("6",whiteCards[player[6]])
      .addField("7",whiteCards[player[7]])
      
      client.users.get(player[0]).send(embed)
    }
    if(requiredplayers>0){
     joinGame(message.author.id)
     message.channel.send(message.member.displayName+" joined Cards Against Humanity, the game still requires "+requiredplayers+" player(s) to start.") 
     requiredplayers--
    }else
    if(requiredplayers<=0&&czarturn==0){
      blackCard=Math.floor(Math.random()*blackCards.length)
      startRound()
      czarturn=1
    }
  }else
  
  if(command==='c4'||command==='connect4'){
    function board() {
    var board =
    c4a[c4[0][5]]+" "+c4a[c4[1][5]]+" "+c4a[c4[2][5]]+" "+c4a[c4[3][5]]+" "+c4a[c4[4][5]]+" "+c4a[c4[5][5]]+" "+c4a[c4[6][5]]+"\n"+
    c4a[c4[0][4]]+" "+c4a[c4[1][4]]+" "+c4a[c4[2][4]]+" "+c4a[c4[3][4]]+" "+c4a[c4[4][4]]+" "+c4a[c4[5][4]]+" "+c4a[c4[6][4]]+"\n"+
    c4a[c4[0][3]]+" "+c4a[c4[1][3]]+" "+c4a[c4[2][3]]+" "+c4a[c4[3][3]]+" "+c4a[c4[4][3]]+" "+c4a[c4[5][3]]+" "+c4a[c4[6][3]]+"\n"+
    c4a[c4[0][2]]+" "+c4a[c4[1][2]]+" "+c4a[c4[2][2]]+" "+c4a[c4[3][2]]+" "+c4a[c4[4][2]]+" "+c4a[c4[5][2]]+" "+c4a[c4[6][2]]+"\n"+
    c4a[c4[0][1]]+" "+c4a[c4[1][1]]+" "+c4a[c4[2][1]]+" "+c4a[c4[3][1]]+" "+c4a[c4[4][1]]+" "+c4a[c4[5][1]]+" "+c4a[c4[6][1]]+"\n"+
    c4a[c4[0][0]]+" "+c4a[c4[1][0]]+" "+c4a[c4[2][0]]+" "+c4a[c4[3][0]]+" "+c4a[c4[4][0]]+" "+c4a[c4[5][0]]+" "+c4a[c4[6][0]]+"\n"+
    ":one: :two: :three: :four: :five: :six: :seven:"
    var embed = new Discord.RichEmbed()
    .setDescription(board)
    .setColor(color)
    return embed;
    }
    
    function end() {
    c4      = [["0","0","0","0","0","0"],
                ["0","0","0","0","0","0"],
                ["0","0","0","0","0","0"],
                ["0","0","0","0","0","0"],
                ["0","0","0","0","0","0"],
                ["0","0","0","0","0","0"],
                ["0","0","0","0","0","0"]]
    c4p = [""]
    clearTimeout(c4Timeout)
    awaitp = "0" 
    }
    
    function r(s){
    if(s="1"){return true}else return false  
    }
    
    function y(s){
    if(s="2"){return true}else return false  
    }
    
    function findOpenSpaces(a){
      var i = 0
      while(i<6){
       if(c4[a][i]=="0"){return i}
       i++ 
      } 
    }
    
    function checkWinR(a) {
      var b = Number(findOpenSpaces(a))-1
      a = Number(a)
      try{
      //U-D
      if(c4[a][b-3]!==undefined&&c4[a][b]=="1"&&c4[a][b-1]=="1"&&c4[a][b-2]=="1"&&c4[a][b-3]=="1"){return true}else
      //UL-DR
      b = Number(findOpenSpaces(a))-1
      a = Number(a)
      if(c4[a+3]!==undefined&&c4[a][b-3]!==undefined&&c4[a][b]=="1"&&c4[a+1][b-1]=="1"&&c4[a+2][b-2]=="1"&&c4[a+3][b-3]=="1"){return true}
      if(c4[a][b+1]!==undefined&&c4[a][b-2]!==undefined&&c4[a+2]!==undefined&&c4[a-1]!==undefined&&c4[a][b]=="1"&&c4[a+1][b-1]=="1"&&c4[a+2][b-2]=="1"&&c4[a-1][b+1]=="1"){return true}
      if(c4[a][b+2]!==undefined&&c4[a][b-1]!==undefined&&c4[a+1]!==undefined&&c4[a-2]!==undefined&&c4[a][b]=="1"&&c4[a+1][b-1]=="1"&&c4[a-1][b+1]=="1"&&c4[a-2][b+2]=="1"){return true}
      if(c4[a-3]!==undefined&&c4[a][b+3]!==undefined&&c4[a][b]=="1"&&c4[a-3][b+3]=="1"&&c4[a-1][b+1]=="1"&&c4[a-2][b+2]=="1"){return true}
      //DL-UR
      b = Number(findOpenSpaces(a))-1
      a = Number(a)
      if(c4[a-3][b-3]!==undefined&&c4[a][b]=="1"&&c4[a-1][b-1]=="1"&&c4[a-2][b-2]=="1"&&c4[a-3][b-3]=="1"){return true}
      if(c4[a-2][b-2]!==undefined&&c4[a+1][b+1]!==undefined&&c4[a][b]=="1"&&c4[a-1][b-1]=="1"&&c4[a-2][b-2]=="1"&&c4[a+1][b+1]=="1"){return true}
      if(c4[a-1][b-1]!==undefined&&c4[a+2][b+2]!==undefined&&c4[a][b]=="1"&&c4[a-1][b-1]=="1"&&c4[a+1][b+1]=="1"&&c4[a+2][b+2]=="1"){return true}
      if(c4[a+3][b+3]!==undefined&&c4[a][b]=="1"&&c4[a+3][b+3]=="1"&&c4[a+1][b+1]=="1"&&c4[a+2][b+2]=="1"){return true}
      //L-R
      b = Number(findOpenSpaces(a))-1
      a = Number(a)
      if(c4[a+3]!==undefined&&c4[a][b]=="1"&&c4[a+1][b]=="1"&&c4[a+2][b]=="1"&&c4[a+3][b]=="1"){return true}
      if(c4[a+2]!==undefined&&c4[a-1]!==undefined&&c4[a][b]=="1"&&c4[a+1][b]=="1"&&c4[a+2][b]=="1"&&c4[a-1][b]=="1"){return true}
      if(c4[a+1]!==undefined&&c4[a-2]!==undefined&&c4[a][b]=="1"&&c4[a+1][b]=="1"&&c4[a-1][b]=="1"&&c4[a-2][b]=="1"){return true}
      if(c4[a-3]!==undefined&&c4[a][b]=="1"&&c4[a-1][b]=="1"&&c4[a-2][b]=="1"&&c4[a-3][b]=="1"){return true}
      return false
      }catch(e){
       console.log(e)
       return false 
      }
    }

    function checkWinY(a) {
      var b = Number(findOpenSpaces(a))-1
      a = Number(a)
      try{
      //U-D
      if(c4[a][b-3]!==undefined&&c4[a][b]=="2"&&c4[a][b-1]=="2"&&c4[a][b-2]=="2"&&c4[a][b-3]=="2"){return true}else
      //UL-DR
      b = Number(findOpenSpaces(a))-1
      a = Number(a)
      if(c4[a+3]!==undefined&&c4[a][b-3]!==undefined&&c4[a][b]=="2"&&c4[a+1][b-1]=="2"&&c4[a+2][b-2]=="2"&&c4[a+3][b-3]=="2"){return true}
      if(c4[a][b+1]!==undefined&&c4[a][b-2]!==undefined&&c4[a+2]!==undefined&&c4[a-1]!==undefined&&c4[a][b]=="2"&&c4[a+1][b-1]=="2"&&c4[a+2][b-2]=="2"&&c4[a-1][b+1]=="2"){return true}
      if(c4[a][b+2]!==undefined&&c4[a][b-1]!==undefined&&c4[a+1]!==undefined&&c4[a-2]!==undefined&&c4[a][b]=="2"&&c4[a+1][b-1]=="2"&&c4[a-1][b+1]=="2"&&c4[a-2][b+2]=="2"){return true}
      if(c4[a-3]!==undefined&&c4[a][b+3]!==undefined&&c4[a][b]=="2"&&c4[a-3][b+3]=="2"&&c4[a-1][b+1]=="2"&&c4[a-2][b+2]=="2"){return true}
      //DL-UR
      b = Number(findOpenSpaces(a))-1
      a = Number(a)
      if(c4[a-3][b-3]!==undefined&&c4[a][b]=="2"&&c4[a-1][b-1]=="2"&&c4[a-2][b-2]=="2"&&c4[a-3][b-3]=="2"){return true}
      if(c4[a-2][b-2]!==undefined&&c4[a+1][b+1]!==undefined&&c4[a][b]=="2"&&c4[a-1][b-1]=="2"&&c4[a-2][b-2]=="2"&&c4[a+1][b+1]=="2"){return true}
      if(c4[a-1][b-1]!==undefined&&c4[a+2][b+2]!==undefined&&c4[a][b]=="2"&&c4[a-1][b-1]=="2"&&c4[a+1][b+1]=="2"&&c4[a+2][b+2]=="2"){return true}
      if(c4[a+3][b+3]!==undefined&&c4[a][b]=="2"&&c4[a+3][b+3]=="2"&&c4[a+1][b+1]=="2"&&c4[a+2][b+2]=="2"){return true}
      //L-R
      b = Number(findOpenSpaces(a))-1
      a = Number(a)
      if(c4[a+3]!==undefined&&c4[a][b]=="2"&&c4[a+1][b]=="2"&&c4[a+2][b]=="2"&&c4[a+3][b]=="2"){return true}
      if(c4[a+2]!==undefined&&c4[a-1]!==undefined&&c4[a][b]=="2"&&c4[a+1][b]=="2"&&c4[a+2][b]=="2"&&c4[a-1][b]=="2"){return true}
      if(c4[a+1]!==undefined&&c4[a-2]!==undefined&&c4[a][b]=="2"&&c4[a+1][b]=="2"&&c4[a-1][b]=="2"&&c4[a-2][b]=="2"){return true}
      if(c4[a-3]!==undefined&&c4[a][b]=="2"&&c4[a-1][b]=="2"&&c4[a-2][b]=="2"&&c4[a-3][b]=="2"){return true}
      return false
      }catch(e){
       console.log(e)
       return false 
      }
    }
    

    

    
    function valid(s) {
      if(s==1||s==2||s==3||s==4||s==5||s==6||s==0){
       return true 
      }else return false
    }
     
    function playCom() {
      var space = Math.floor(Math.random()*7)
      var play = findOpenSpaces(space)
      c4[space][play]="2"
    }
    
    function playR(s) {
      var play = findOpenSpaces(Number(s))
      c4[s][play]="1"
      return play
    }
    
    function playY(s) {
      var play = findOpenSpaces(Number(s))
      c4[s][play]="2"
      return play
    }
    var mention = message.mentions.users.first()
    
    if(args[0]=="end"){
     message.channel.send("Ended Connect4.")
     return end()
    }else
    if(awaitp=="0"&&mention==undefined){
      awaitp = "3"
      c4p.push(message.author.id)
      c4Timeout = setTimeout(()=>{
       end()
       message.channnel.send("Ended Connect4.")
      },300000)
      message.channel.send("Starting a game of Connect4 with bot.")
      message.channel.send(board())
    }else 
    if(awaitp=="0"&&message.mentions.users.first()!==undefined){
      var member = message.mentions.users.first()
      c4p.push(member.id)
      c4p.push(message.author.id)
      awaitp="1"
      c4Timeout = setTimeout(()=>{
       end()
       message.channnel.send("Ended Connect4.")
      },420000)
      message.channel.send("Starting a game of Connect4 with "+message.mentions.members.first().displayName+".")
      message.channel.send(board())
    }else
    if(awaitp=="1"||awaitp=="2"){
     if(c4p[2]==message.author.id||c4p[1]==message.author.id){
       if(c4p[awaitp]==message.author.id){
         args[0]=Number(args[0])-1
         if (!valid(args[0])){return message.channel.send("Invalid column.")}
        if(awaitp=="1"){
          playR(args[0])
         if(checkWinR(args[0])){
          message.channel.send(board().setDescription(client.users.get(c4p[awaitp])+" Wins!"))
          return end()
         }
          message.channel.send(board())
          awaitp="2"
        }else
        if(awaitp=="2"){
          playY(args[0])
         if(checkWinY(args[0])){
          message.channel.send(board().setDescription(client.users.get(c4p[awaitp])+" Wins!"))
          return end()
         }
          message.channel.send(board())
          awaitp="1"
        }
       }else message.channel.send("Wait for the other player.")
     }else{message.channel.send("There's already a game in progress")}
    }else
    if(awaitp=="3"){
      if(c4p[1]==message.author.id){
        if(!valid(args[0])){
         return message.channel.send("Invalid space.") 
        }else{
          args[0]=Number(args[0])-1
          setTimeout(()=>{
          playR(args[0])
         if(checkWinR(args[0])){
          message.channel.send(board().setTitle("You Win!"))
          return end()
         }
         message.channel.send(board()).then(message => {
          setTimeout(()=>{
          playCom()
          if(checkWinY(args[0])){
          message.edit(board().setTitle("Bot Wins!"))
          return end()
         }
          message.edit(board())
         },Math.floor(Math.random()*(2500-1500+1)+1500)) 
         })
         },150) 
        } 
      }else{return message.channel.send("There's already a game in progress")}
    }
  }else

  if(command=='guess'){
    var x = numberSet.values()
    var number = Number(x.next().value)
    if(!number){numberSet.add(Math.floor(Math.random()*499+1));return message.channel.send("Picking a number between 1 and 500, reply with -guess (number) and see if you can get it!");setTimeout(()=>{numberSet.clear();tries=0;message.channel.send("Ending guess game"),90000})}
    var guess = Number(args[0]);if(!args[0]){return message.channel.send("That's not a number.")}
    if(guess>500){return message.channel.send("Too high!")}else

    if(tries>=10){    
    message.channel.send("You ran out of guesses, the number was "+number+".") 
    numberSet.clear()
    tries=0;}else
    if(args[0]=='end'){
    tries = 0;
    numberSet.clear() 
    return message.channel.send("Ended guess game.")
    }else
    if(guess<number){
    tries++
    message.channel.send("Higher!")}else
    if(guess>number){
    tries++
    message.channel.send("Lower!")}else
    if(guess=number){
    tries++
    message.channel.send("Nice! the number was "+number+" and you got it in "+tries+" Guesses.") 
    numberSet.clear()
    tries=0;
    }else{tries++}
  }else
    
    
  if(command=='tictactoe'||command=='ttt'){
  var players=[""]
  tictactoe.forEach(player=>{
    players.push(player) 
  })

        function findSpace(arg) {
      var spaces = ["a1","a2","a3","b1","b2","b3","c1","c2","c3"];
      var i = 0;
      while(i<9){
       if(spaces[i]==arg){return i}else{}
        i++;
      }
      return "invalid"
    }
    
    function x(a) {
      if(a==ttt[1]){return true}else return false
    }
    
    function o(a) {
      if(a==ttt[2]){return true}else return false
    }
    
    function open(a) {
      if(a=="0"){return true}else return false
    }
    
    function playAIturn(){
      var randomSpace=Math.floor(Math.random()*9)
      while(!open(boardStatus[randomSpace])){
        randomSpace=Math.floor(Math.random()*9)
      }
      boardStatus[randomSpace]="2"
    }
        var spaces = ["a1","a2","a3",
                    "b1","b2","b3",
                    "c1","c2","c3"];
    function playXSpace(arg){
    if(findSpace(arg)=='invalid'){return message.channel.send("Invalid space")}
    if(!open(boardStatus[findSpace(arg)])){return message.channel.send("Invalid space")}
     boardStatus[findSpace(arg)]="1"
     drawcounter++
     turnlog="<:XX:547586830779023382> "+spaces[findSpace(arg)].toUpperCase()+" "+turnlog
    }


    function findSpace(arg) {
      
      var i = 0;
      while(i<9){
       if(spaces[i]==arg){return i}else{}
        i++;
      }
      return "invalid"
    }
    
    function x(a) {
      if(a==ttt[1]){return true}else return false
    }
    
    function o(a) {
      if(a==ttt[2]){return true}else return false
    }
    
    function open(a) {
      if(a=="0"){return true}else return false
    }
    
    function advancedAIturn() {
    /*
    A1(0) A2(1) A3(2)
    B1(3) B2(4) B3(5)
    C1(6) C2(7) C3(8)
    */
    var a = [ttt[boardStatus[0]],ttt[boardStatus[1]],ttt[boardStatus[2]]]
    var b = [ttt[boardStatus[3]],ttt[boardStatus[4]],ttt[boardStatus[5]]]
    var c = [ttt[boardStatus[6]],ttt[boardStatus[7]],ttt[boardStatus[8]]] 
     var play
     if(x(a[0])&&x(b[1])){if(open(boardStatus[8])){play=8}}else
     if(x(b[1])&&x(c[2])){if(open(boardStatus[0])){play=0}}else
     if(x(a[2])&&x(b[1])){if(open(boardStatus[6])){play=6}}else
     if(x(c[0])&&x(b[1])){if(open(boardStatus[2])){play=2}}else
     if(x(c[0])&&x(a[2])){if(open(boardStatus[4])){play=4}}else
     if(x(a[0])&&x(c[2])){if(open(boardStatus[4])){play=4}}else
     if(x(a[0])&&x(a[1])){if(open(boardStatus[2])){play=2}}else
     if(x(b[0])&&x(b[1])){if(open(boardStatus[5])){play=5}}else
     if(x(c[0])&&x(c[1])){if(open(boardStatus[8])){play=8}}else
     if(x(a[2])&&x(a[1])){if(open(boardStatus[0])){play=0}}else
     if(x(b[2])&&x(b[1])){if(open(boardStatus[3])){play=3}}else
     if(x(c[2])&&x(c[1])){if(open(boardStatus[6])){play=6}}else
     if(x(a[0])&&x(a[2])){if(open(boardStatus[1])){play=1}}else
     if(x(b[0])&&x(b[2])){if(open(boardStatus[4])){play=4}}else
     if(x(c[0])&&x(c[2])){if(open(boardStatus[7])){play=7}}else
     if(x(a[0])&&x(b[0])){if(open(boardStatus[6])){play=6}}else
     if(x(a[1])&&x(b[1])){if(open(boardStatus[7])){play=7}}else
     if(x(a[2])&&x(b[2])){if(open(boardStatus[8])){play=8}}else
     if(x(a[0])&&x(c[0])){if(open(boardStatus[3])){play=3}}else
     if(x(a[1])&&x(c[1])){if(open(boardStatus[4])){play=4}}else
     if(x(a[2])&&x(c[2])){if(open(boardStatus[5])){play=5}}else
     if(x(b[0])&&x(c[0])){if(open(boardStatus[0])){play=0}}else
     if(x(b[1])&&x(c[1])){if(open(boardStatus[1])){play=1}}else
     if(x(b[2])&&x(c[2])){if(open(boardStatus[2])){play=2}}else
     {
      var inc = 0
      var randomSpace=Math.floor(Math.random()*9)
      while(!open(boardStatus[randomSpace])||inc<20){
        randomSpace=Math.floor(Math.random()*9)
        inc++
      }
      play=randomSpace 
     }
      boardStatus[play]="2"
    }
    

    function playOSpace(arg){
    if(findSpace(arg)=='invalid'){return "invalid"}
    if(!open(boardStatus[findSpace(arg)])){return message.channel.send("Invalid space")}
     boardStatus[findSpace(arg)]="2"
      drawcounter++
      turnlog="<:OO:547579097824493568> "+spaces[findSpace(arg)].toUpperCase()+" "+turnlog
    }
    
    var ttt = ["<:space:537429732518526976>","<:XX:547586830779023382>","<:OO:547579097824493568>"]    
    var a = [ttt[boardStatus[0]],ttt[boardStatus[1]],ttt[boardStatus[2]]]
    var b = [ttt[boardStatus[3]],ttt[boardStatus[4]],ttt[boardStatus[5]]]
    var c = [ttt[boardStatus[6]],ttt[boardStatus[7]],ttt[boardStatus[8]]] 
    
    function sendBoard() {
    a = [ttt[boardStatus[0]],ttt[boardStatus[1]],ttt[boardStatus[2]]]
    b = [ttt[boardStatus[3]],ttt[boardStatus[4]],ttt[boardStatus[5]]]
    c = [ttt[boardStatus[6]],ttt[boardStatus[7]],ttt[boardStatus[8]]] 
    var board = "<:space:537429732518526976><:space:537429732518526976><:Top:547586870226321408><:space:537429732518526976><:Top:547586870226321408><:space:537429732518526976>\n"+
                "<:space:537429732518526976>"+a[0]+"<:Vertical:547586870192635905>"+a[1]+"<:Vertical:547586870192635905>"+a[2]+"\n"+
                "<:Left:547586870209413132><:Horizontal:547586870255681566><:Cross:547586870264070174><:Horizontal:547586870255681566><:Cross:547586870264070174><:Horizontal:547586870255681566><:Right:547586870071001111>\n"+
                "<:space:537429732518526976>"+b[0]+"<:Vertical:547586870192635905>"+b[1]+"<:Vertical:547586870192635905>"+b[2]+"\n"+
                "<:Left:547586870209413132><:Horizontal:547586870255681566><:Cross:547586870264070174><:Horizontal:547586870255681566><:Cross:547586870264070174><:Horizontal:547586870255681566><:Right:547586870071001111>\n"+
                "<:space:537429732518526976>"+c[0]+"<:Vertical:547586870192635905>"+c[1]+"<:Vertical:547586870192635905>"+c[2]+"\n"+
                "<:space:537429732518526976><:space:537429732518526976><:Bottom:547586870213738506><:space:537429732518526976><:Bottom:547586870213738506><:space:537429732518526976>\n"           
    var embed = new Discord.RichEmbed()
    .setDescription(board)
    .setColor(color)  
    .addField("Use -ttt (space) to place an X or O.",turnlog)
    return embed
    }
    
        function sendFirstBoard() {
    a = [ttt[boardStatus[0]],ttt[boardStatus[1]],ttt[boardStatus[2]]]
    b = [ttt[boardStatus[3]],ttt[boardStatus[4]],ttt[boardStatus[5]]]
    c = [ttt[boardStatus[6]],ttt[boardStatus[7]],ttt[boardStatus[8]]] 
    var board = "<:space:537429732518526976>:one:<:Top:547586870226321408>:two:<:Top:547586870226321408>:three:\n"+
                ":regional_indicator_a:"+a[0]+"<:Vertical:547586870192635905>"+a[1]+"<:Vertical:547586870192635905>"+a[2]+"\n"+
                "<:Left:547586870209413132><:Horizontal:547586870255681566><:Cross:547586870264070174><:Horizontal:547586870255681566><:Cross:547586870264070174><:Horizontal:547586870255681566><:Right:547586870071001111>\n"+
                ":regional_indicator_b:"+b[0]+"<:Vertical:547586870192635905>"+b[1]+"<:Vertical:547586870192635905>"+b[2]+"\n"+
                "<:Left:547586870209413132><:Horizontal:547586870255681566><:Cross:547586870264070174><:Horizontal:547586870255681566><:Cross:547586870264070174><:Horizontal:547586870255681566><:Right:547586870071001111>\n"+
                ":regional_indicator_c:"+c[0]+"<:Vertical:547586870192635905>"+c[1]+"<:Vertical:547586870192635905>"+c[2]+"\n"+
                "<:space:537429732518526976><:space:537429732518526976><:Bottom:547586870213738506><:space:537429732518526976><:Bottom:547586870213738506><:space:537429732518526976>\n"           
    var embed = new Discord.RichEmbed()
    .setDescription(board)
    .setColor(color)  
    .addField("Use -ttt (space) to place an X or O.")
    return embed
    }
     
        
    if(tictactoe.size!==0&&!tictactoe.has(message.author.id)){return message.channel.send("There is already a game of Tic-Tac-Toe in progress.")}else
    if(tictactoe.has(message.author.id)&&args[0]=="end"){
    tictactoe.clear();
    clearTimeout(timeout)
    boardStatus=["0","0","0","0","0","0","0","0","0"];
    message.channel.send("Ended Tic-Tac-Toe")
    awaitplayer = "0"
    ;turnlog="";drawcounter=0
    }else  if(tictactoe.size==0&&message.mentions.users.first()==undefined){tictactoe.add(message.author.id);
    boardStatus=["0","0","0","0","0","0","0","0","0"];
    message.channel.send("Starting a game of tic-tac-toe with bot.");
    message.channel.send(sendFirstBoard())
    
    timeout = setTimeout(()=>{tictactoe.clear();
    boardStatus=["0","0","0","0","0","0","0","0","0"];
    turnlog="";drawcounter=0
    message.channel.send("Ended Tic-Tac-Toe")},300000)                                                                
    }else
    if(tictactoe.size==1&&tictactoe.has(message.author.id)){
    var space = args[0]
    if(playXSpace(space)=="invalid"){return message.channel.send("Invalid space.")}
    message.channel.send(sendBoard()).then(message=>{
    /*X Check for win*/if(x(a[0])&&x(a[1])&&x(a[2])||x(a[0])&&x(b[1])&&x(c[2])||x(c[0])&&x(b[1])&&x(a[2])||x(b[0])&&x(b[1])&&x(b[2])||x(c[0])&&x(c[1])&&x(c[2])||x(a[0])&&x(b[0])&&x(c[0])||x(a[1])&&x(b[1])&&x(c[1])||x(a[2])&&x(b[2])&&x(c[2])){message.channel.send("**X Wins!**");clearTimeout(timeout);tictactoe.clear();turnlog="";drawcounter=0;awaitplayer="0";return boardStatus=["0","0","0","0","0","0","0","0","0"]}
    if(drawcounter>=9){message.channel.send("**Draw**");clearTimeout(timeout);tictactoe.clear();awaitplayer=0;return boardStatus=["0","0","0","0","0","0","0","0","0"]}
      setTimeout(()=>{
     advancedAIturn()
            if(drawcounter>=9){message.channel.send("**Draw**");clearTimeout(timeout);tictactoe.clear();awaitplayer=0;return boardStatus=["0","0","0","0","0","0","0","0","0"]}
     /*O Check for win*/if(o(a[0])&&o(a[1])&&o(a[2])||o(a[0])&&o(b[1])&&o(c[2])||o(c[0])&&o(b[1])&&o(a[2])||o(b[0])&&o(b[1])&&o(b[2])||o(c[0])&&o(c[1])&&o(c[2])||o(a[0])&&o(b[0])&&o(c[0])||o(a[1])&&o(b[1])&&o(c[1])||o(a[2])&&o(b[2])&&o(c[2])){message.channel.send("**O Wins!**");clearTimeout(timeout);tictactoe.clear();turnlog="";drawcounter=0;awaitplayer="0";boardStatus=["0","0","0","0","0","0","0","0","0"]}
     message.edit(sendBoard())
    },1500)
    })
    }else 
    if(tictactoe.size==2&&players[awaitplayer]==message.author.id){
    if(awaitplayer=="1"){
      let placeO = playOSpace(args[0])
    if(placeO=="invalid"){return message.channel.send("Invalid space.")}
     /*O Check for win*/if(o(a[0])&&o(a[1])&&o(a[2])||o(a[0])&&o(b[1])&&o(c[2])||o(c[0])&&o(b[1])&&o(a[2])||o(b[0])&&o(b[1])&&o(b[2])||o(c[0])&&o(c[1])&&o(c[2])||o(a[0])&&o(b[0])&&o(c[0])||o(a[1])&&o(b[1])&&o(c[1])||o(a[2])&&o(b[2])&&o(c[2])){message.channel.send("**O Wins!**");clearTimeout(timeout);tictactoe.clear();turnlog="";drawcounter=0;awaitplayer="0";boardStatus=["0","0","0","0","0","0","0","0","0"]}
     message.channel.send(sendBoard())
          if(drawcounter>=9){message.channel.send("**Draw**");clearTimeout(timeout);tictactoe.clear();awaitplayer=0;return boardStatus=["0","0","0","0","0","0","0","0","0"]}
     awaitplayer = "2"
    }else if(awaitplayer=="2"){
      let placeX = playXSpace(args[0])
    if(placeX=="invalid"){return message.channel.send("Invalid space.")}
     /*X Check for win*/if(x(a[0])&&x(a[1])&&x(a[2])||x(a[0])&&x(b[1])&&x(c[2])||x(c[0])&&x(b[1])&&x(a[2])||x(b[0])&&x(b[1])&&x(b[2])||x(c[0])&&x(c[1])&&x(c[2])||x(a[0])&&x(b[0])&&x(c[0])||x(a[1])&&x(b[1])&&x(c[1])||x(a[2])&&x(b[2])&&x(c[2])){message.channel.send("**X Wins!**");clearTimeout(timeout);tictactoe.clear();turnlog="";drawcounter=0;awaitplayer="0";return boardStatus=["0","0","0","0","0","0","0","0","0"]}
     message.channel.send(sendBoard())
          if(drawcounter>=9){message.channel.send("**Draw**");clearTimeout(timeout);tictactoe.clear();awaitplayer=0;return boardStatus=["0","0","0","0","0","0","0","0","0"]}
     awaitplayer = "1"
    }  
      
    }else

    if(tictactoe.size==0&&message.mentions.users.first()!==undefined){tictactoe.add(message.author.id);tictactoe.add(message.mentions.users.first().id)
    boardStatus=["0","0","0","0","0","0","0","0","0"];
    message.channel.send("Starting a game of tic-tac-toe with "+message.mentions.users.first());
    awaitplayer = "2"
    message.channel.send(sendFirstBoard())
    timeout = setTimeout(()=>{tictactoe.clear();
    boardStatus=["0","0","0","0","0","0","0","0","0"];
    turnlog="";drawcounter=0
    awaitplayer="0"
    message.channel.send("Ended Tic-Tac-Toe")},180000)                                                                  
   }
    /*O Check for win*/if(o(a[0])&&o(a[1])&&o(a[2])||o(a[0])&&o(b[1])&&o(c[2])||o(c[0])&&o(b[1])&&o(a[2])||o(b[0])&&o(b[1])&&o(b[2])||o(c[0])&&o(c[1])&&o(c[2])||o(a[0])&&o(b[0])&&o(c[0])||o(a[1])&&o(b[1])&&o(c[1])||o(a[2])&&o(b[2])&&o(c[2])){message.channel.send("**O Wins!**");clearTimeout(timeout);tictactoe.clear();awaitplayer="0";boardStatus=["0","0","0","0","0","0","0","0","0"]}
                         }

  if(command=='cahlist'){
   message.channel.send("White cards: "+whiteCards.length+"\nBlack cards: "+blackCards.length) 
  }
                         })
