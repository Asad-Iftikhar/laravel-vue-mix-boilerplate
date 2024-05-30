<?php

namespace App\Console\Commands;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use PDO;
use Exception;

use Illuminate\Console\Command;

class MakeDatabaseCommand extends Command
{

    /**
     * The name and description of the command.
     *
     * @var string
     */
    protected $name = 'make:database';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:database';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create the database based on config/database.php';

    /**
     * Execute the console command.
     */
    // Command logic goes here
    public function handle()
    {
        $default = Config::get('database.default');
        $connections = Config::get('database.connections');

        if (!isset($connections[$default])) {
            $this->error("Database connection [$default] is not configured.");
            return;
        }

        $connection = $connections[$default];
        $dbName = $connection['database'];

        switch ($default) {
            case 'mysql':
                $this->createMySQLDatabase($connection, $dbName);
                break;
            case 'pgsql':
                $this->createPostgresDatabase($connection, $dbName);
                break;
            case 'sqlite':
                $this->createSQLiteDatabase($connection, $dbName);
                break;
            case 'sqlsrv':
                $this->createSQLServerDatabase($connection, $dbName);
                break;
            default:
                $this->error("Unsupported database driver: $default");
                break;
        }
    }

    private function createMySQLDatabase($connection, $dbName)
    {
        $dbHost = $connection['host'];
        $dbUser = $connection['username'];
        $dbPassword = $connection['password'];

        try {
            $pdo = new PDO("mysql:host=$dbHost", $dbUser, $dbPassword);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $query = $pdo->query("SHOW DATABASES LIKE '$dbName'");
            if ($query->rowCount() > 0) {
                $this->info("Database '$dbName' already exists.");
            } else {
                $pdo->exec("CREATE DATABASE `$dbName`");
                $this->info("Database '$dbName' created successfully.");
            }
        } catch (Exception $e) {
            $this->error("Error creating MySQL database: " . $e->getMessage());
        }
    }

    private function createPostgresDatabase($connection, $dbName)
    {
        $dbHost = $connection['host'];
        $dbUser = $connection['username'];
        $dbPassword = $connection['password'];

        try {
            $pdo = new PDO("pgsql:host=$dbHost", $dbUser, $dbPassword);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $query = $pdo->query("SELECT 1 FROM pg_database WHERE datname='$dbName'");
            if ($query->rowCount() > 0) {
                $this->info("Database '$dbName' already exists.");
            } else {
                $pdo->exec("CREATE DATABASE \"$dbName\"");
                $this->info("Database '$dbName' created successfully.");
            }
        } catch (Exception $e) {
            $this->error("Error creating PostgreSQL database: " . $e->getMessage());
        }
    }

    private function createSQLiteDatabase($connection, $dbName)
    {
        $databasePath = $connection['database'];

        if (file_exists($databasePath)) {
            $this->info("Database '$dbName' already exists.");
        } else {
            try {
                new PDO("sqlite:$databasePath");
                $this->info("Database '$dbName' created successfully.");
            } catch (Exception $e) {
                $this->error("Error creating SQLite database: " . $e->getMessage());
            }
        }
    }

    private function createSQLServerDatabase($connection, $dbName)
    {
        $dbHost = $connection['host'];
        $dbUser = $connection['username'];
        $dbPassword = $connection['password'];

        try {
            $pdo = new PDO("sqlsrv:Server=$dbHost", $dbUser, $dbPassword);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $query = $pdo->query("SELECT name FROM master.dbo.sysdatabases WHERE name = '$dbName'");
            if ($query->rowCount() > 0) {
                $this->info("Database '$dbName' already exists.");
            } else {
                $pdo->exec("CREATE DATABASE [$dbName]");
                $this->info("Database '$dbName' created successfully.");
            }
        } catch (Exception $e) {
            $this->error("Error creating SQL Server database: " . $e->getMessage());
        }
    }
}
