<?php

//namespace Plugin\GridExample\Setup;
namespace Plugin\News\Setup;

class Worker extends \Ip\SetupWorker
{

    public function activate()
    {
        $sql = '
        CREATE TABLE IF NOT EXISTS
           ' . ipTable('news') . '
        (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `newsOrder` double,
        `Title` varchar(255),
        `City` varchar(255),
        `Lang` varchar(255),
        `Type` varchar(255),
        `DateModified` date,
        `DateValid` date,
        `Url` varchar(255),
        `Summary` text,
        `Content` text,
        `Enabled` boolean,
        `photo` varchar(255),
        PRIMARY KEY (`id`)
        )';

        ipDb()->execute($sql);

    }

    public function deactivate()
    {

    }

    public function remove()
    {

    }

}
