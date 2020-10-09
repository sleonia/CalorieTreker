databasePath='./src/database/.env.json'

echo "Set up database config\n----------------"
echo 'Set user name'
read user
echo 'Set host. Example: 127.0.0.1'
read host
echo 'Set database. Example: calorietreker'
read database
echo 'Set tablename. Example: table'
read database
echo 'Set password'
read password
echo 'Set port'
read port

databaseContent="{\n
\t\"user\": \"${user}\",\n
\t\"host\": \"${host}\",\n
\t\"database\": \"${database}\",\n
\t\"table\": \"${table}\",\n
\t\"password\": \"${password}\",\n
\t\"port\": \"${port}\"\n
}"

echo $databaseContent > $databasePath