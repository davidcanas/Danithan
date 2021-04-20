const { EthanEmbed } = require("ethanutils")
const Command  = require("../../Structures/Command")
const fetch = require("node-fetch")
const puppeteer = require('puppeteer');
const fs = require('fs');
module.exports = class renderCommand extends Command {
constructor(client) {
    super(client,  { 
        name: "render", 
        aliases: ["renderizar"],
         category: "Util",
        cooldown: 0,
        devOnly: false
    })
}
async execute(ctx) {
    const waitMsg = await ctx.msg.createMessage('Processando informções importantes !');
    let url;
    if (!args[0].startsWith('https'))
    url = 'https://' + args[0];
else
    url = args[0];
    const isPorn = await checkPorn();
    if (isPorn) {
        waitMsg.edit(`Ocorreu um erro: \`Cannot render pornografic content 408 BAD REQUEST\``);
        return browser.close();
    }
    async function exists() {
        return new Promise(async (resolve, _reject) => {
            setTimeout(() => {
                resolve(null);
            }, 5000)
            try {
                const res = await fetch(url);

                if (res)
                    resolve(res.url);
                else
                    resolve(null);
            } catch (err) {
                resolve(null);
            }
        })
    }
    const finalURL = await exists();

    if (!finalURL)
        return waitMsg.edit(`O site informado não existe ou está offline`);
    async function checkPorn() {
        const res = await fetch(`https://fortiguard.com/search?q=${finalURL}&engine=1`);
        const text = await res.text();
        if (text.includes('Pornography')) 
            return true;
        else 
            return false;
    }
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    });

    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1
    });
    try {
        await waitMsg.edit('Ok, tudo ok agora verificando informações adicionais')
        await page.goto(url);
    } catch (err) {
        waitMsg.edit('Ocorreu um Erro: `404 - Not found`');
        return browser.close();
    }
    const img = await page.screenshot({ encoding: 'base64' });
    const emba = new EthanEmbed()
    .setTitle("Render")
    .setURL(finalURL)
    .setColor("BLUE")
    .setImage("attachment://print.png")
    const msg = await ctx.msg.channel.createMessage({embed: emba.embed }, {
        name: 'print.png',
        file: Buffer.from(res.img, 'base64')
      });
}}