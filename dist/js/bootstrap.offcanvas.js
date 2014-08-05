(function() {
  var Offcanvas, transformCheck,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Offcanvas = (function() {
    function Offcanvas(element) {
      var target;
      this.element = element;
      this._documentClicked = __bind(this._documentClicked, this);
      this._clicked = __bind(this._clicked, this);
      target = this.element.attr('data-target') ? this.element.attr('data-target') : false;
      if (target) {
        this.target = $(target);
        if (this.target.length) {
          this.location = this.target.hasClass("navbar-offcanvas-right") ? "right" : "left";
          this.target.addClass(transform ? "offcanvas-transform" : "offcanvas-position");
          this.element.on("click", this._clicked);
          $(document).on("click", this._documentClicked);
        } else {
          console.warn("Offcanvas: Can't find target element with selector " + target + ".");
        }
      } else {
        console.warn('Offcanvas: `data-target` attribute must be present.');
      }
    }

    Offcanvas.prototype._clicked = function(e) {
      e.preventDefault();
      return this.target.toggleClass('in');
    };

    Offcanvas.prototype._documentClicked = function(e) {
      var clickedEl;
      clickedEl = $(e.target);
      if (!clickedEl.hasClass('offcanvas-toggle') && clickedEl.parents('.offcanvas-toggle').length === 0 && clickedEl.parents('.navbar-offcanvas').length === 0 && !clickedEl.hasClass('navbar-offcanvas')) {
        if (this.target.hasClass('in')) {
          e.preventDefault();
          return this.target.removeClass('in');
        }
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

  $(function() {
    transformCheck();
    return $('[data-toggle="offcanvas"]').each(function() {
      var oc;
      return oc = new Offcanvas($(this));
    });
  });

}).call(this);
