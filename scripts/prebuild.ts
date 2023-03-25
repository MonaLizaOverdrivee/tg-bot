import path from "node:path";
import {writeFile, stat} from "fs/promises";

const provisioningDir = path.join(process.cwd(), './src/provisioning')

interface FileInfo {
    dir: string
    fileName: string
    mockContent: string
}

const files: FileInfo[] = [
    {
        dir: provisioningDir,
        fileName: 'local.commands.ts',
        mockContent: `import {Context} from "telegraf";
        
interface Command {
    handler: (context: Context) => void
    description: string
}

export const localCommands: Record${'<' + 'string, Command' + '>'} = {
    baza: {
        handler: (ctx) => ctx.reply('Пах чмо'),
        description: "выдать базу"
    },
    bazat: {
        handler: (ctx) => ctx.reply('Ткачепч жидохохол'),
        description: "выдать базу по ткачепчу"
    },
    check: {
        handler: (ctx) => ctx.reply('########'),
        description: "расовая проверка"
    },
}`
    },
    {
        dir: process.cwd(),
        fileName: '.env',
        mockContent: 'TOKEN='
    }
]

const checkFile = async (file: FileInfo): Promise<boolean> => {
    try {
        await stat(path.join(file.dir, file.fileName))

        return true
    } catch {
        return false
    }
}

const createFile = async (file: FileInfo): Promise<void> => {

    await writeFile(path.resolve(file.dir, file.fileName), file.mockContent)
}
const generateStaticResources =  async (files: FileInfo[]): Promise<void> => {
    for (const file of files) {

        if (await checkFile(file)) {
           continue;
        }

        await createFile(file)
        console.log(`Файл ${file.fileName} успешно создан в папке ${file.dir}`)
    }

}
await generateStaticResources(files)

