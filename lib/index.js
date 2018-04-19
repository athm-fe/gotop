import $ from 'jquery';

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'gotop';
const DATA_KEY = 'fe.gotop';
const EVENT_KEY = `.${DATA_KEY}`;
const JQUERY_NO_CONFLICT = $.fn[NAME];

const Event = {
  SHOW: `show${EVENT_KEY}`,
  HIDE: `hide${EVENT_KEY}`,
  CLICK: `click${EVENT_KEY}`,
  SCROLL: `scroll${EVENT_KEY}`,
  RESIZE: `resize${EVENT_KEY}`
};

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

function Gotop(elem, options) {
  this.options = $.extend({}, Gotop.Default, options);
  this.$elem = $(elem);
  this.$window = $(window);
  this.timer = null;

  this.$elem.on(Event.CLICK, (e) => {
    window.scrollTo(0, 0);

    e.preventDefault();
  });

  this.$window.on(`${Event.SCROLL} ${Event.RESIZE}`, () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.setPos();
    }, 100);
  });

  this.setPos();
}

Gotop.Default = {};

Gotop.prototype.setPos = function () {
  const $window = this.$window;

  if ($window.scrollTop() > $window.height()) {
    this.$elem.show();
    this.$elem.trigger(Event.SHOW);
  } else {
    this.$elem.hide();
    this.$elem.trigger(Event.HIDE);
  }
};

/**
 * ------------------------------------------------------------------------
 * Plugin Definition
 * ------------------------------------------------------------------------
 */

function Plugin(config) {
  return this.each(function () {
    const $this = $(this);
    let data = $this.data(DATA_KEY);

    if (!data) {
      const _config = $.extend({}, Gotop.Default, $this.data(), typeof config === 'object' && config);
      data = new Gotop(this, _config);
      $this.data(DATA_KEY, data);
    }

    if (typeof config === 'string') {
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }
      data[config]();
    }
  });
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

$(function() {
  Plugin.call($('[data-toggle="gotop"]'));
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME] = Plugin;
$.fn[NAME].Constructor = Gotop;
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT;
  return Plugin;
}

export default Gotop;
