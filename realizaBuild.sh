yarn build
ssh -i /Users/rparaujo/Documents/projects/OracleCloud/Chave-SSH-Teste/privada.pem ubuntu@150.136.161.96 rm -rf /appl/www/despesas/build
scp -ri /Users/rparaujo/Documents/projects/OracleCloud/Chave-SSH-Teste/privada.pem build/ ubuntu@150.136.161.96:/appl/www/despesas/

