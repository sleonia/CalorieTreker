telegramPath='./src/telegram/.env.token'

echo "Set telegram token"
read token

echo $token > $telegramPath
