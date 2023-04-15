import {Bot} from './src/bot'

const bootstrap = async () => {
    const bot = new Bot()

    await bot.start()
}

await bootstrap()
