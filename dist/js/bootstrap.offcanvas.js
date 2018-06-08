(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.BS = global.BS || {}, global.BS.Offcanvas = {})));
}(this, (function (exports) { 'use strict';

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
    if (!window.matchMedia('(min-width: 992px)').matches) {
      triggerEvent(el, isShown(el) ? EVENT_NAMES.hide : EVENT_NAMES.show);

      el.classList.toggle(CLASS_NAMES.show);

      triggerEvent(el, isShown(el) ? EVENT_NAMES.shown : EVENT_NAMES.hidden);
    }
  };

  var init = function init(el) {
    var controls = document.getElementById(el.getAttribute('aria-controls'));

    if (!controls) {
      throw new Error('Offcanvas toggle must be linked with aria-controls');
    }

    el.addEventListener('click', function () {
      return toggleOffcanvas(controls);
    });

    el.addEventListener('offcanvas.toggle', function () {
      return toggleOffcanvas(controls);
    });
  };

  exports.CLASS_NAMES = CLASS_NAMES;
  exports.EVENT_NAMES = EVENT_NAMES;
  exports.isShown = isShown;
  exports.triggerEvent = triggerEvent;
  exports.toggleOffcanvas = toggleOffcanvas;
  exports.init = init;
  exports.default = init;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
