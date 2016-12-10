<?php
/**
 * @link      https://craftcms.com/
 * @copyright Copyright (c) Pixel & Tonic, Inc.
 * @license   https://craftcms.com/license
 */

namespace craft\events;

/**
 * Draft event class.
 *
 * @author Pixel & Tonic, Inc. <support@pixelandtonic.com>
 * @since  3.0
 */
class DraftEvent extends \yii\base\Event
{
    // Properties
    // =========================================================================

    /**
     * @var \craft\models\EntryDraft The draft model associated with the event.
     */
    public $draft;

    /**
     * @var boolean Whether the draft is brand new
     */
    public $isNew = false;
}
