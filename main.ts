import {Bot} from './src/bot'

console.log(process.env.TOKEN)
const bootstrap = async () => {
    const bot = new Bot()

    await bot.start()
}

await bootstrap()
