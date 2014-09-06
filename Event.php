<?php
/**
 * @package   ImpressPages
 */


/**
 * Created by PhpStorm.
 * User: mangirdas
 * Date: 9/6/14
 * Time: 2:12 PM
 */

namespace Plugin\NestedColumns;


class Event
{
    public static function ipBeforeController()
    {
        ipAddCss('assets/nestedColumns.css');
    }
}
