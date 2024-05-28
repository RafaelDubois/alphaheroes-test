# alphaheroes-front

```shell
cp .env.example .env
cp docker-compose.yml ../
```

## Commandes

### Premier lancement du container et changement du docker-compose.yml

```shell
docker-compose up --build --no-recreate -d
```

### lancements ultérieurs

```shell
docker-compose up
```

### accès au shell du container

```shell
docker exec -it alphaheroes-vite_docker-1 sh
```

### Installer nouvelle dépendance dans le containeur

```shell
npm install <dependancy>
```
