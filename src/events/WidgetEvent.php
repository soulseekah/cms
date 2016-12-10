<?php
/**
 * @link      https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license   https://craftcms.com/license
 */

namespace craft\events;

use craft\base\WidgetInterface;

/**
 * WidgetEvent class.
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since  3.0
 */
class WidgetEvent extends \yii\base\Event
{
    // Properties
    // =========================================================================

    /**
     * @var WidgetInterface The widget associated with this event.
     */
    public $widget;

    /**
     * @var boolean Whether the widget is brand new
     */
    public $isNew = false;
}
