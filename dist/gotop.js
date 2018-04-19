/*!
 * @autofe/gotop v0.1.0
 * (c) 2018 Autohome Inc.
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global.AutoFE = global.AutoFE || {}, global.AutoFE.Gotop = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'gotop';
var DATA_KEY = 'fe.gotop';
var EVENT_KEY = '.' + DATA_KEY;
var JQUERY_NO_CONFLICT = $.fn[NAME];

var Event = {
  SHOW: 'show' + EVENT_KEY,
  HIDE: 'hide' + EVENT_KEY,
  CLICK: 'click' + EVENT_KEY,
  SCROLL: 'scroll' + EVENT_KEY,
  RESIZE: 'resize' + EVENT_KEY
};

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

function Gotop(elem, options) {
  var _this = this;

  this.options = $.extend({}, Gotop.Default, options);
  this.$elem = $(elem);
  this.$window = $(window);
  this.timer = null;

  this.$elem.on(Event.CLICK, function (e) {
    window.scrollTo(0, 0);

    e.preventDefault();
  });

  this.$window.on(String(Event.SCROLL) + ' ' + String(Event.RESIZE), function () {
    if (_this.timer) {
      clearTimeout(_this.timer);
    }

    _this.timer = setTimeout(function () {
      _this.setPos();
    }, 100);
  });

  this.setPos();
}

Gotop.Default = {};

Gotop.prototype.setPos = function () {
  var $window = this.$window;

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
    var $this = $(this);
    var data = $this.data(DATA_KEY);

    if (!data) {
      var _config = $.extend({}, Gotop.Default, $this.data(), typeof config === 'object' && config);
      data = new Gotop(this, _config);
      $this.data(DATA_KEY, data);
    }

    if (typeof config === 'string') {
      if (typeof data[config] === 'undefined') {
        throw new TypeError('No method named "' + config + '"');
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

$(function () {
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
};

return Gotop;

})));
