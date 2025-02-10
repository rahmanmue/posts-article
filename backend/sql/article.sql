create schema `article`;

use `article`;

create table `posts`(
	`id` int auto_increment primary key,
    `title` varchar(200),
    `content` text,
    `category` varchar(100),
    `created_date` timestamp,
    `updated_date` timestamp,
    `status` varchar(100) check (`status` in ('Publish', 'Draft', 'Trash')) 
);