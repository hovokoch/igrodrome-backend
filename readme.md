
## Igrodrom



#### Requirements

- NPM with NodeJS (or Nginx server) installed
- PostgreSQL installed



#### Postman

- [Published Docs for Postman Collection](https://documenter.getpostman.com/view/14188688/UVJeDveB)
- [Published Postman Collection JSON](https://www.getpostman.com/collections/250966e4af2772d48b4a)

> All the Postman endpoint-requests must have "{{URL}}" prefix as the Postman environment variable for the host.

> In the Postman auth endpoint-requests (login, third-party-auth)
> add the following test script to the API-endpoints,
> and use **USER_ID_TOKEN** global variable for auth-protected endpoints.
> For example: "Bearer {{USER_ID_TOKEN}}" as the "Authorization" Header.
> These are Postman environment variables for the Bearer-based authentication tokens.
```
var data = pm.response.json();
if (data.token) {
    pm.globals.set("USER_ID_TOKEN", data.token);
} else {
    pm.globals.set("USER_ID_TOKEN", '');
}
```


#### Images

- **Image JPEG/JPG example:** /public/image.jpg
- **Image PNG example:** /public/image.png



#### Demo Test

- Clone the repository and install NPM packages
```
git clone https://github.com/igrodrom/igrodrom-backend.git
cd igrodrom/
npm i
```

- Create empty Postgres DB

- Create ".env" file inside your project root folder, and define required variables as described in ".env.example"

- Run migrations and seeds
```
sequelize db:migrate:undo:all
sequelize db:migrate
sequelize db:seed:all
```

- Run the app (dev)
```
npm start
```



#### Production Test

- Install latest dependencies, if need
```
npm i
```

- Update .env, if need

- Run migrations and seeds, if need
```
sequelize db:migrate:undo:all
sequelize db:migrate
sequelize db:seed:all
```

- Rerun the app (dev)
```
# List all running forever scripts
forever list
# Stop all running forever scripts
forever stopall
# Start SCRIPT as a daemon
forever start server.js
```



#### System Configs in "config/app.js"

- **image_max_size (Number):** maximum size (MB) for one image which will be uploaded.
