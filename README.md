# Laravel Mix Vue Project Setup

## Getting start

First make the clone of this repository
```html
$ git clone https://github.com/Asad-Iftikhar/laravel-vue-mix-boilerplate.git
```

## Open Project
Navigate into the newly created project directory:

```sh
$ cd laravel-mix-vue
```


## Modify Environment Configuration
Copy .env.example to make .env and Modify the .env file to match your database configuration. Below is an example configuration:

```sh
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel-vue-mix
DB_USERNAME=root
DB_PASSWORD=root
```

## Create Database if Not Exists
A custom Artisan command has been created to make the database if it does not already exist. Run the following command to create the database:

```sh
$ php artisan make:database
```

## Run Migrations
Create the base table by running the migrations:

```sh
$ php artisan migrate

```

## Serve Project
To serve the project, use the Artisan serve command:

```sh
$ php artisan serve

```
# Start Vue APP
To install vue dependencies, use the following command:
```sh
$ npm install

```


## Run Vue App using Mix
To serve the vue app, use the below command:

```sh
$ npm run watch

```

