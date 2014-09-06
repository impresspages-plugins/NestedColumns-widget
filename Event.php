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

    public static function ipBeforeWidgetMove($info)
    {
        $widget = \Ip\Internal\Content\Model::getWidgetRecord($info['widgetId']);
        if ($widget['name'] != 'NestedColumns') {
            //ignore if it is not a Container widget
            return;
        }

        if (empty($widget['data']['cols']) || !is_array($widget['data']['cols'])) {
            $widget['data']['cols'] = array(
                'column'.$widget['id'].'_1',
                'column'.$widget['id'].'_2'
            );
        }

        if ($widget['revisionId'] != $info['revisionId'] || $widget['languageId'] != $info['languageId']) {
            foreach($widget['data']['cols'] as $col) {
                $containerWidgets = \Ip\Internal\Content\Model::getBlockWidgetRecords($col, $widget['revisionId'], $widget['languageId']);
                foreach($containerWidgets as $key => $containerWidget)
                {
                    \Ip\Internal\Content\Model::moveWidget($containerWidget['id'], $key, $col, $info['revisionId'], $info['languageId']);
                }
            }
        }



    }



}
