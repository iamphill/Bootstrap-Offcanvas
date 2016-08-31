(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function($, window) {
    var Offcanvas, OffcanvasDropdown, OffcanvasTouch, transformCheck;
    OffcanvasDropdown = (function() {
      function OffcanvasDropdown(element) {
        this.element = element;
        this._clickEvent = bind(this._clickEvent, this);
        this.element = $(this.element);
        this.nav = this.element.closest(".nav");
        this.dropdown = this.element.parent().find(".dropdown-menu");
        this.element.on('click', this._clickEvent);
        this.nav.closest('.navbar-offcanvas').on('click', (function(_this) {
          return function() {
            if (_this.dropdown.is('.shown')) {
              return _this.dropdown.removeClass('shown').closest('.active').removeClass('active');
            }
          };
        })(this));
      }

      OffcanvasDropdown.prototype._clickEvent = function(e) {
        if (!this.dropdown.hasClass('shown')) {
          e.preventDefault();
        }
        e.stopPropagation();
        $('.dropdown-toggle').not(this.element).closest('.active').removeClass('active').find('.dropdown-menu').removeClass('shown');
        this.dropdown.toggleClass("shown");
        return this.element.parent().toggleClass('active');
      };

      return OffcanvasDropdown;

    })();
    OffcanvasTouch = (function() {
      function OffcanvasTouch(button, element, location, offcanvas) {
        this.button = button;
        this.element = element;
        this.location = location;
        this.offcanvas = offcanvas;
        this._getFade = bind(this._getFade, this);
        this._getCss = bind(this._getCss, this);
        this._touchEnd = bind(this._touchEnd, this);
        this._touchMove = bind(this._touchMove, this);
        this._touchStart = bind(this._touchStart, this);
        this.endThreshold = 130;
        this.startThreshold = this.element.hasClass('navbar-offcanvas-right') ? $("body").outerWidth() - 60 : 20;
        this.maxStartThreshold = this.element.hasClass('navbar-offcanvas-right') ? $("body").outerWidth() - 20 : 60;
        this.currentX = 0;
        this.fade = this.element.hasClass('navbar-offcanvas-fade') ? true : false;
        $(document).on("touchstart", this._touchStart);
        $(document).on("touchmove", this._touchMove);
        $(document).on("touchend", this._touchEnd);
      }

      OffcanvasTouch.prototype._touchStart = function(e) {
        this.startX = e.originalEvent.touches[0].pageX;
        if (this.element.is('.in')) {
          return this.element.height($(window).outerHeight());
        }
      };

      OffcanvasTouch.prototype._touchMove = function(e) {
        var x;
        if ($(e.target).parents('.navbar-offcanvas').length > 0) {
          return true;
        }
        if (this.startX > this.startThreshold && this.startX < this.maxStartThreshold) {
          e.preventDefault();
          x = e.originalEvent.touches[0].pageX - this.startX;
          x = this.element.hasClass('navbar-offcanvas-right') ? -x : x;
          if (Math.abs(x) < this.element.outerWidth()) {
            this.element.css(this._getCss(x));
            return this.element.css(this._getFade(x));
          }
        } else if (this.element.hasClass('in')) {
          e.preventDefault();
          x = e.originalEvent.touches[0].pageX + (this.currentX - this.startX);
          x = this.element.hasClass('navbar-offcanvas-right') ? -x : x;
          if (Math.abs(x) < this.element.outerWidth()) {
            this.element.css(this._getCss(x));
            return this.element.css(this._getFade(x));
          }
        }
      };

      OffcanvasTouch.prototype._touchEnd = function(e) {
        var end, sendEvents, x;
        if ($(e.target).parents('.navbar-offcanvas').length > 0) {
          return true;
        }
        sendEvents = false;
        x = e.originalEvent.changedTouches[0].pageX;
        if (Math.abs(x) === this.startX) {
          return;
        }
        end = this.element.hasClass('navbar-offcanvas-right') ? Math.abs(x) > (this.endThreshold + 50) : x < (this.endThreshold + 50);
        if (this.element.hasClass('in') && end) {
          this.currentX = 0;
          this.element.removeClass('in').css(this._clearCss());
          this.button.removeClass('is-open');
          sendEvents = true;
        } else if (Math.abs(x - this.startX) > this.endThreshold && this.startX > this.startThreshold && this.startX < this.maxStartThreshold) {
          this.currentX = this.element.hasClass('navbar-offcanvas-right') ? -this.element.outerWidth() : this.element.outerWidth();
          this.element.toggleClass('in').css(this._clearCss());
          this.button.toggleClass('is-open');
          sendEvents = true;
        } else {
          this.element.css(this._clearCss());
        }
        return this.offcanvas.bodyOverflow(sendEvents);
      };

      OffcanvasTouch.prototype._getCss = function(x) {
        x = this.element.hasClass('navbar-offcanvas-right') ? -x : x;
        return {
          "-webkit-transform": "translate3d(" + x + "px, 0px, 0px)",
          "-webkit-transition-duration": "0s",
          "-moz-transform": "translate3d(" + x + "px, 0px, 0px)",
          "-moz-transition": "0s",
          "-o-transform": "translate3d(" + x + "px, 0px, 0px)",
          "-o-transition": "0s",
          "transform": "translate3d(" + x + "px, 0px, 0px)",
          "transition": "0s"
        };
      };

      OffcanvasTouch.prototype._getFade = function(x) {
        if (this.fade) {
          return {
            "opacity": x / this.element.outerWidth()
          };
        } else {
          return {};
        }
      };

      OffcanvasTouch.prototype._clearCss = function() {
        return {
          "-webkit-transform": "",
          "-webkit-transition-duration": "",
          "-moz-transform": "",
          "-moz-transition": "",
          "-o-transform": "",
          "-o-transition": "",
          "transform": "",
          "transition": "",
          "opacity": ""
        };
      };

      return OffcanvasTouch;

    })();
    window.Offcanvas = Offcanvas = (function() {
      function Offcanvas(element) {
        var t, target;
        this.element = element;
        this.bodyOverflow = bind(this.bodyOverflow, this);
        this._sendEventsAfter = bind(this._sendEventsAfter, this);
        this._sendEventsBefore = bind(this._sendEventsBefore, this);
        this._documentClicked = bind(this._documentClicked, this);
        this._close = bind(this._close, this);
        this._open = bind(this._open, this);
        this._clicked = bind(this._clicked, this);
        this._navbarHeight = bind(this._navbarHeight, this);
        target = this.element.attr('data-target') ? this.element.attr('data-target') : false;
        if (target) {
          this.target = $(target);
          if (this.target.length && !this.target.hasClass('js-offcanvas-done')) {
            this.element.addClass('js-offcanvas-has-events');
            this.location = this.target.hasClass("navbar-offcanvas-right") ? "right" : "left";
            this.target.addClass(transform ? "offcanvas-transform js-offcanvas-done" : "offcanvas-position js-offcanvas-done");
            this.target.data('offcanvas', this);
            this.element.on("click", this._clicked);
            this.target.on('transitionend', (function(_this) {
              return function() {
                if (_this.target.is(':not(.in)')) {
                  return _this.target.height('');
                }
              };
            })(this));
            $(document).on("click", this._documentClicked);
            if (this.target.hasClass('navbar-offcanvas-touch')) {
              t = new OffcanvasTouch(this.element, this.target, this.location, this);
            }
            this.target.find(".dropdown-toggle").each(function() {
              var d;
              return d = new OffcanvasDropdown(this);
            });
            this.target.on('offcanvas.toggle', (function(_this) {
              return function(e) {
                return _this._clicked(e);
              };
            })(this));
            this.target.on('offcanvas.close', (function(_this) {
              return function(e) {
                return _this._close(e);
              };
            })(this));
            this.target.on('offcanvas.open', (function(_this) {
              return function(e) {
                return _this._open(e);
              };
            })(this));
          }
        } else {
          console.warn('Offcanvas: `data-target` attribute must be present.');
        }
      }

      Offcanvas.prototype._navbarHeight = function() {
        if (this.target.is('.in')) {
          return this.target.height($(window).outerHeight());
        }
      };

      Offcanvas.prototype._clicked = function(e) {
        e.preventDefault();
        this._sendEventsBefore();
        $(".navbar-offcanvas").not(this.target).trigger('offcanvas.close');
        this.target.toggleClass('in');
        this.element.toggleClass('is-open');
        this._navbarHeight();
        return this.bodyOverflow();
      };

      Offcanvas.prototype._open = function(e) {
        e.preventDefault();
        if (this.target.is('.in')) {
          return;
        }
        this._sendEventsBefore();
        this.target.addClass('in');
        this.element.addClass('is-open');
        this._navbarHeight();
        return this.bodyOverflow();
      };

      Offcanvas.prototype._close = function(e) {
        e.preventDefault();
        if (this.target.is(':not(.in)')) {
          return;
        }
        this._sendEventsBefore();
        this.target.removeClass('in');
        this.element.removeClass('is-open');
        this._navbarHeight();
        return this.bodyOverflow();
      };

      Offcanvas.prototype._documentClicked = function(e) {
        var clickedEl;
        clickedEl = $(e.target);
        if (!clickedEl.hasClass('offcanvas-toggle') && clickedEl.parents('.offcanvas-toggle').length === 0 && clickedEl.parents('.navbar-offcanvas').length === 0 && !clickedEl.hasClass('navbar-offcanvas')) {
          if (this.target.hasClass('in')) {
            e.preventDefault();
            this._sendEventsBefore();
            this.target.removeClass('in');
            this.element.removeClass('is-open');
            this._navbarHeight();
            return this.bodyOverflow();
          }
        }
      };

      Offcanvas.prototype._sendEventsBefore = function() {
        if (this.target.hasClass('in')) {
          return this.target.trigger('hide.bs.offcanvas');
        } else {
          return this.target.trigger('show.bs.offcanvas');
        }
      };

      Offcanvas.prototype._sendEventsAfter = function() {
        if (this.target.hasClass('in')) {
          return this.target.trigger('shown.bs.offcanvas');
        } else {
          return this.target.trigger('hidden.bs.offcanvas');
        }
      };

      Offcanvas.prototype.bodyOverflow = function(events) {
        if (events == null) {
          events = true;
        }
        if (this.target.is('.in')) {
          $('body').addClass('offcanvas-stop-scrolling');
        } else {
          $('body').removeClass('offcanvas-stop-scrolling');
        }
        if (events) {
          return this._sendEventsAfter();
        }
      };

      return Offcanvas;

    })();
    transformCheck = (function(_this) {
      return function() {
        var asSupport, el, regex, translate3D;
        el = document.createElement('div');
        translate3D = "translate3d(0px, 0px, 0px)";
        regex = /translate3d\(0px, 0px, 0px\)/g;
        el.style.cssText = "-webkit-transform: " + translate3D + "; -moz-transform: " + translate3D + "; -o-transform: " + translate3D + "; transform: " + translate3D;
        asSupport = el.style.cssText.match(regex);
        return _this.transform = asSupport.length != null;
      };
    })(this);
    return $(function() {
      transformCheck();
      $('[data-toggle="offcanvas"]').each(function() {
        var oc;
        return oc = new Offcanvas($(this));
      });
      $(window).on('resize', function() {
        $('.navbar-offcanvas.in').each(function() {
          return $(this).height('').removeClass('in');
        });
        return $('.offcanvas-toggle').removeClass('is-open');
      });
      return $('.offcanvas-toggle').each(function() {
        return $(this).on('click', function(e) {
          var el, selector;
          if (!$(this).hasClass('js-offcanvas-has-events')) {
            selector = $(this).attr('data-target');
            el = $(selector);
            if (el) {
              el.height('');
              el.removeClass('in');
              return $('body').css({
                overflow: '',
                position: ''
              });
            }
          }
        });
      });
    });
  })(window.jQuery, window);

}).call(this);
