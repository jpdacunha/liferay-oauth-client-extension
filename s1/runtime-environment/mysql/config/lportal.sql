CREATE DATABASE IF NOT EXISTS s1lportal;

ALTER DATABASE s1lportal CHARACTER SET utf8 COLLATE utf8_general_ci;

GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'password';
flush privileges;