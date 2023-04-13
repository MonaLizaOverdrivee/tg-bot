import {Bot} from './src/bot'

console.log('start')
const bootstrap = async () => {
    const bot = new Bot()

    await bot.start()
}

await bootstrap()
