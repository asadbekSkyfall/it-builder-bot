// DotEnv package
require('dotenv').config()
// Telegraf package for build bot
const {Telegraf,Markup} = require('telegraf')
//Const file
const CONST = require('./modules/const.js')
//aboutJs
const about = require('./modules/aboutJs')

// free_course file
const free_course = require('./modules/free_course')
// paid_course file
const paid_course = require('./modules/paid_course')
//For BOT_TOKEN
const bot = new Telegraf(process.env.BOT_TOKEN)

//*Start bot
bot.start((ctx) => ctx.reply(`Hello ${ctx.message.from.first_name ? ctx.message.from.first_name : "stranger"} ` + CONST.START_MSG,Markup.keyboard([
  ["❓ About Author"], 
  ["💰 Donation"], 
  ["✍️ Feedback"]
]).resize()))

//* Help
bot.help(async(ctx) => {
    try {
        await ctx.replyWithHTML(CONST.COMMANDS, Markup.inlineKeyboard(
            [
                Markup.button.url('Bot overview', 'https://github.com/asadbekSkyfall?tab=repositories'),
                Markup.button.url('How to create bot', 'https://github.com/asadbekSkyfall?tab=repositories'),
            ]
        ))
    } catch(e) {
        console.error(e)
    }
})

//* Button for "About Author"
bot.hears('❓ About Author', async(ctx) => {
    try{
        await ctx.replyWithPhoto({
            source: 'img/portrait.jpg'
        }, {
            caption: CONST.AUTHOR,
            parse_mode: "HTML",
            reply_markup: JSON.stringify({"inline_keyboard": [
                [
                Markup.button.url('YouTube', 'https://www.youtube.com/c/ITBuilder/about'),
                Markup.button.url('Udemy', 'https://www.udemy.com/user/asadbek-abduganiev-bakhtiyarovic/'),
                Markup.button.url('GitHub', 'https://github.com/asadbekSkyfall')
                ]
            ]})
        }, {
            disable_web_page_preview: true
        })
    } catch (e) {
        console.error(e)
    }
})

//* Button for "Donation"
bot.hears("💰 Donation", async(ctx) => {
    try {
        await ctx.reply(CONST.DONATION, Markup.inlineKeyboard(
            [
            Markup.button.url('YooMoney', 'https://sobe.ru'),
            Markup.button.url('PayPal', 'https://paypal.me')
            ]
        ))
    } catch (e) {
        console.error(e)
    }
})

//*Button for "Feedback"
bot.hears("✍️ Feedback", async(ctx) => {
    try {
        await ctx.reply("🤔To contact my creator, the author of the ITBuilder channel, go to the channel group by clicking on the button below.", Markup.inlineKeyboard(
            [Markup.button.url('Write a letter', 'https://t.me/@asadbekabdugainev')]
        ))
    } catch (e) {
        console.error(e)
    }
})
/**
 * Function to collect messages on the collection or use of the command
 * @param {String} id Button ID to process
 * @param {String} src Image path, or false to send text only
 * @param {String} text Text message to send
 * @param {Boolean} preview Block previews for links or not, true - block, false - no
 */

function send_msg_action(id, src, text, keyboard=[[]], preview=false) {
    bot.action(id, async(ctx) => {
        try {
            await ctx.answerCbQuery()
            if(src) {
                await ctx.replyWithPhoto({
                    source: src
                }, {
                    caption: text,
                    parse_mode: 'HTML',
                    reply_markup: JSON.stringify({"inline_keyboard": keyboard})
                })
            } else {
                await ctx.replyWithHTML(text, {
                    disable_web_page_preview: !preview,
                    reply_markup: JSON.stringify({"inline_keyboard": keyboard})
                })
            } 
        } catch (e) {
            console.error(e)
        }
    })
}

// brief for programming
bot.command('about_programming', async(ctx) => {
    try {
        await ctx.replyWithHTML(about.about)
    } catch (e) {
        console.error(e)
    }
})

// types of programming
bot.command('types_PL', async(ctx) => {
    try {
        await ctx.replyWithHTML(about.types, Markup.inlineKeyboard([
            [Markup.button.callback("javaScript", 'btn_cat1')],
            [Markup.button.callback("phyton", 'btn_cat2')],
            [Markup.button.callback("java", 'btn_cat3')],
        ]))
    } catch(e) {
        console.error(e)
    }
})
// JavaScript
bot.action('btn_cat1', async(ctx) => {
    try {
        await ctx.answerCbQuery()
        await ctx.replyWithHTML(about.javaScript)
    } catch (e) {
        console.error(e)
    }
})
// Phyton
bot.action('btn_cat2', async(ctx) => {
    try {
        await ctx.answerCbQuery()
        await ctx.replyWithHTML(about.phyton)
    } catch (e) {
        console.error(e)
    }
})
//Java
bot.action('btn_cat3', async(ctx) => {
    try {
        await ctx.answerCbQuery()
        await ctx.replyWithHTML(about.java)
    } catch (e) {
        console.error(e)
    }
})
// Commands /free_course
bot.command('free_course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Free coureses in <a href="https://www.youtube.com/c/Freecodecamp">YouTube</a></b>', Markup.inlineKeyboard([
            [Markup.button.callback('Code Editors', 'btn_category1')],
            [Markup.button.callback('Layout Basics HTML and CSS', 'btn_category2')],
            [Markup.button.callback('Frontend programming JS', 'btn_category3')],
            [Markup.button.callback('Framework for CSS', 'btn_category4')],
            [Markup.button.callback('Framework for JS', 'btn_category5')],
      
        ]))
    } catch (e) {
        console.error(e)
    }
})

// Handling buttons from the Code Editors category
bot.action('btn_category1', async (ctx) => {
    try{
        await ctx.answerCbQuery()
        await ctx.replyWithHTML('<b>Code Editors</b>\nFull course\n 6 minutes', Markup.inlineKeyboard([
            [Markup.button.callback('Editors', 'category1_btn1')]
        ]))
    } catch (e) {
        console.error(e)
    }
})
send_msg_action('category1_btn1', './img/free_course/codeEditor.jpg', free_course[0][0], [[Markup.button.url('Watch', 'https://www.youtube.com/watch?v=4EyhVSAr7Xw')]])

// Handling buttons from the HTML and CSS Basics 
bot.action('btn_category2', async (ctx) => {
    try {
      await ctx.answerCbQuery()
      await ctx.replyWithHTML('<b>Layout Basics HTML and CSS</b>\nfull course\n11 hours', Markup.inlineKeyboard([
        [Markup.button.callback('HTML and CSS', 'category3_btn1')]
        
      ]))
    } catch (e) {
      console.error(e)
    }
  })
  send_msg_action('category3_btn1', './img/free_course/css-html-1.png', free_course[1][0], [[Markup.button.url('Watch', 'https://www.youtube.com/watch?v=pQN-pnXPaVg&t=381s')]])
  
// Handling buttons from the category Frontend development
bot.action('btn_category3', async (ctx) => {
    try {
      await ctx.answerCbQuery()
      await ctx.replyWithHTML('<b>Frontend programming JS</b>\nfull course\n7 hours', Markup.inlineKeyboard([
        [Markup.button.callback('JavaSctipt', 'category4_btn1')],
      ]))
    } catch (e) {
      console.error(e)
    }
  })
  send_msg_action('category4_btn1', './img/free_course/javascript.jpg', free_course[2][0], [[Markup.button.url('Watch', 'https://www.youtube.com/watch?v=jS4aFq5-91M&t=33s')]])
  
// Framework for CSS

bot.action('btn_category4', async (ctx) => {
    try {
      await ctx.answerCbQuery()
      await ctx.replyWithHTML('<b>Framework for CSS</b>\nfull course\n9 hours', Markup.inlineKeyboard([
        [Markup.button.callback('Bootstrap 5', 'category5_btn1')],
      ]))
    } catch (e) {
      console.error(e)
    }
  })
  send_msg_action('category5_btn1', './img/free_course/bootstrap.png', free_course[3][0], [[Markup.button.url('Watch', 'https://www.youtube.com/watch?v=-qfEOE4vtxE')]])

  // Обработка кнопок из категории Вёрстка сайта с нуля
bot.action('btn_category5', async (ctx) => {
    try {
      await ctx.answerCbQuery()
      await ctx.replyWithHTML('<b>React from zero to hero</b>\nfull course\n7 hours', Markup.inlineKeyboard([
        [Markup.button.callback('React', 'category6_btn1')],
      ]))
    } catch (e) {
      console.error(e)
    }
  })
  send_msg_action('category6_btn1', './img/free_course/reactcourse.png', free_course[4][0], [[Markup.button.url('Watch', 'https://www.youtube.com/watch?v=bMknfKXIFA8')]])


  // Commands /paid_course
bot.command('paid_course', async (ctx) => {
    try {
      await ctx.replyWithHTML(`<b>Paid Courses in Udemy and Stepik</b>`, Markup.inlineKeyboard([
        [
          Markup.button.callback('HTML + CSS', 'btn_paid_1'),
          Markup.button.callback('Super JavaScript', 'btn_paid_2')
        ],
        [
          Markup.button.callback('jQuery from zero', 'btn_paid_3'),
        ],
        [
          Markup.button.callback('Git + GitHub', 'btn_paid_4'),
        ],
        [Markup.button.callback('Bootstrap 5 for beginers', 'btn_paid_5')],
        [Markup.button.callback('Frontend programming HTML, CSS and JavaScript', 'btn_paid_6')],
      ]))
    } catch (e) {
      console.error(e)
    }
  })

  send_msg_action('btn_paid_1', 'img/paid_course/1.jpg', paid_course['html'], [[
    Markup.button.url('Udemy', 'https://www.udemy.com/course/itdoctor_html_css/?referralCode=A2836649F9071CB3F903'),
    Markup.button.url('Stepik', 'https://stepik.org/z/101175')
  ]])
  send_msg_action('btn_paid_2', 'img/paid_course/2.jpg', paid_course['js'], [[
    Markup.button.url('Udemy', 'https://www.udemy.com/course/javascript-super/?referralCode=4C766EEB83F94DC1AE19'),
    //Markup.button.url('Stepik', '')
  ]])
  send_msg_action('btn_paid_3', 'img/paid_course/3.jpg', paid_course['jquery'], [[
    Markup.button.url('Udemy', 'https://www.udemy.com/course/jquery-itd/?referralCode=06E84B2AD8EF9A680F2A'),
    // Markup.button.url('Stepik', '')
  ]])
  send_msg_action('btn_paid_5', 'img/paid_course/5.jpg', paid_course['git'], [[
    Markup.button.url('Udemy', 'https://www.udemy.com/course/git-plus-github/?referralCode=28513EF1DA5DCB593C62'),
    Markup.button.url('Stepik', 'https://stepik.org/z/101092')
  ]])
  send_msg_action('btn_paid_12', 'img/paid_course/12.jpg', paid_course['frontend'], [[
    Markup.button.url('Udemy', 'https://www.udemy.com/course/draft/4402699/?referralCode=897A9E65D809AD2359AA'),
    //Markup.button.url('Stepik', '')
  ]])

  // Commands /materials
bot.command('materials', async (ctx) => {
    try {
      await ctx.reply('This section contains useful materials that can be useful to any developer.', Markup.inlineKeyboard(
        [
          [Markup.button.callback('Repository GitHub', 'btn_category_m1')],
          [Markup.button.callback('Books', 'btn_category_m2')],
        ]
        ))
    } catch (e) {
      console.error(e)
    }
  })

  bot.action('btn_category_m1', async (ctx) => {
    try {
      await ctx.answerCbQuery()
      await ctx.reply("My repositories are on GitHub. You can watch the code I write, as well as read the detailed description under the code in the README file, and run the code in some projects (you can find the link in the About or Environments section)", Markup.inlineKeyboard(
        [
          [Markup.button.url('Link capabilities', 'https://github.com/asadbekSkyfall?tab=repositories')],
        ]
      ))
    } catch (e) {
      console.error(e)
    }
  })

  bot.action('btn_category_m2', async (ctx) => {
    try {
      await ctx.answerCbQuery()
      await ctx.reply('Books on JavaScript programming language, libraries and frameworks. Only the best books are collected here, most of which I have read myself and can guarantee their quality. There are also many tasks for programming in any language and separately for practicing in JavaScript', Markup.inlineKeyboard(
        [
          [Markup.button.callback('Eloquent JavaScript', 'https://t.me/programmngbooks/3')],
          [Markup.button.url('JavaScript Defenetive Guide', 'https://t.me/programmngbooks/3')],
          [Markup.button.url("O'rely JavaScript", "https://t.me/programmngbooks/3")],
          [Markup.button.url('The Road to React', 'https://t.me/programmngbooks/6')],
          [Markup.button.url('NodeJs with Express', 'https://t.me/programmngbooks/5')],
        ]
      ))
    } catch (e) {
      console.error(e)
    }
  })
  
//  Run a bot
bot.launch()

// For convenience in the console
console.log("Bot is working")

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))