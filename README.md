### Note: don't forget to install all dependencies!

`npm install`

### If the openAPI specification in YAML files is changed, then it must be compiled into one file using the command:

`npm run gen:spec`

### Environment variables for start app:

```
SERVER_PORT=8080

DOCKER_CONTAINER_NAME=builder-materials-market

ORACLE_SID=bmm
ORACLE_PDB=blackmarllbor0
ORACLE_PWD=pwd
ORACLE_PORT=1521
ORACLE_EDITION=enterprise
ORACLE_USER=daniil
ORACLE_PWD=mama
ORACLE_CONN_STRING=localhost:1521/blackmarllbor0
```
