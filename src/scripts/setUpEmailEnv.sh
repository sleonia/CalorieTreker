emailPath='./src/email/.env1.json'

echo "Set up email config\n----------------"
echo 'Set host'
read host

echo 'Set port'
read port

secure=true

echo 'Set service'
read service

echo 'Set domen'
read domen

echo 'Set auth - login'
read login

echo 'Set auth - password'
read password

emailContent="{\n
\t\"host\": \"${host}\",\n
\t\"port\": \"${port}\",\n
\t\"secure\": \"${secure}\",\n
\t\"service\": \"${service}\",\n
\t\"domen\": \"${domen}\",\n
\t\"auth\": {\n
\t\t\"login\": \"${login}\",\n
\t\t\"password\": \"${password}\"\n
\t}\n
}"

echo $emailContent > $emailPath
