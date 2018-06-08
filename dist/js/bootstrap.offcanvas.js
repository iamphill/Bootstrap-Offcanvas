(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Bootstrap = global.Bootstrap || {}, global.Bootstrap.Offcanvas = {})));
}(this, (function (exports) { 'use strict';

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var CLASS_NAMES = {
    show: 'show'
  };

  var EVENT_NAMES = {
    show: 'show.bs.offcanvas',
    shown: 'shown.bs.offcanvas',
    hide: 'hide.bs.offcanvas',
    hidden: 'hidden.bs.offcanvas'
  };

  var isShown = function isShown(el) {
    return el.classList.contains(CLASS_NAMES.show);
  };

  var triggerEvent = function triggerEvent(el, eventName) {
    var event = new CustomEvent(eventName);

    el.dispatchEvent(event);
  };

  var toggleOffcanvas = function toggleOffcanvas(el) {
    if (!matchMedia('(min-width: 992px)').matches) {
      triggerEvent(el, isShown(el) ? EVENT_NAMES.hide : EVENT_NAMES.show);

      el.classList.toggle(CLASS_NAMES.show);

      triggerEvent(el, isShown(el) ? EVENT_NAMES.shown : EVENT_NAMES.hidden);
    }
  };

  var addEventListener = function addEventListener(el) {
    var controls = document.getElementById(el.getAttribute('aria-controls'));

    el.addEventListener('click', function () {
      return toggleOffcanvas(controls);
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    [].concat(toConsumableArray(document.querySelectorAll('[data-toggle="offcanvas"]'))).forEach(function (el) {
      return addEventListener(el);
    });
  });

  exports.isShown = isShown;
  exports.triggerEvent = triggerEvent;
  exports.toggleOffcanvas = toggleOffcanvas;
  exports.addEventListener = addEventListener;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
