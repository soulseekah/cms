<?php
/**
 * @link      https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license   https://craftcms.com/license
 */

namespace craft\events;

/**
 * RegisterEmailMessagesEvent class.
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since  3.0
 */
class RegisterEmailMessagesEvent extends \yii\base\Event
{
    // Properties
    // =========================================================================

    /**
     * @var array List of registered email messages. Each message should contain 'key', 'category', and 'sourceLanguage' keys.
     */
    public $messages = [];
}
