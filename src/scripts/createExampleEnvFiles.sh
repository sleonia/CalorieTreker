# /bin/sh
# Create database config file
databasePath='./src/database/.env.json'
databaseContent='{
	"user": "qwerty",
	"host": "127.0.0.1",
	"database": "databaseName",
	"table": "table",
	"password": "12345",
	"port": "5432"
}'

echo $databaseContent > $databasePath

# Create telegram config file
telegramPath='./src/telegram/.env'
telegramToken='NhOyisZp45K4eD28tI1Zipp0MM9E6jE+pXRdTFLNhoZEQiopyJkGIJt1/8BHPw=='

echo $telegramToken > $telegramPath