(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

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

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  function _CustomElement() {
    return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
  }
  Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
  Object.setPrototypeOf(_CustomElement, HTMLElement);

  var OffcanvasElement = function (_CustomElement2) {
    inherits(OffcanvasElement, _CustomElement2);

    function OffcanvasElement() {
      classCallCheck(this, OffcanvasElement);
      return possibleConstructorReturn(this, (OffcanvasElement.__proto__ || Object.getPrototypeOf(OffcanvasElement)).call(this));
    }

    createClass(OffcanvasElement, [{
      key: 'connectedCallback',
      value: function connectedCallback() {
        var toggle = this.querySelector('.navbar-toggler');

        init(toggle);
      }
    }]);
    return OffcanvasElement;
  }(_CustomElement);

  window.customElements.define('bs-offcanvas', OffcanvasElement);

})));
