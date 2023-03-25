# unmannered-bot

### Запуск
1. установить:

    https://nodejs.org/dist/v18.15.0/node-v18.15.0-x64.msi

    https://git-scm.com/download/win

2. В терминале выполнить команды
    ```
    git clone https://github.com/MonaLizaOverdrivee/unmannered-bot.git
    
    cd unmannered-bot
    
    npm i
    
    ```

3. добавить свой токен в .env:

    ```
    TOKEN=your_token
    ```
    где your_token твой api token из telegram
    
4. затем выполнить команду:

    ```
    npm run start
    ```
свои команды можно добавлять в файле: src/provisioning/local.commands.ts, описания для контекстного меню добавляются автоматически
