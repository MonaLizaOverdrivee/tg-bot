import {Bot} from './src/bot'

console.log('start 2')
const bootstrap = async () => {
    const bot = new Bot()

    await bot.start()
}

await bootstrap()
