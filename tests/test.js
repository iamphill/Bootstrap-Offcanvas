(function ($) {
    test("Show off-canvas menu test", function (assert) {
        assert.expect(1);
        $("#offcanvas-toggle").trigger("click");

        assert.ok($("#js-bootstrap-offcanvas").hasClass("in"), "Off-Canvas should be visible");
    });

    test("Hide off-canvas menu test", function (assert) {
        assert.expect(1);
        $("#offcanvas-toggle").trigger("click");

        assert.ok($("#js-bootstrap-offcanvas").is(":not(in)"), "Off-Canvas should be hidden");
    });

    test("Body click hide off-canvas menu test", function (assert) {
        var done = assert.async();
        var done2 = assert.async();
        var done3 = assert.async();
        assert.expect(4);

        $("#offcanvas-toggle").trigger("click");
        assert.ok($("#js-bootstrap-offcanvas").hasClass("in"), "Off-Canvas should be visible");

        setTimeout(function () {
          assert.deepEqual($("#js-bootstrap-offcanvas").offset().left, 0, 'Off-Canvas offset should be 0 (Visible)');
          done();
        }, 10);

        setTimeout(function () {
          $("body").trigger("click");
          assert.ok(!$("#js-bootstrap-offcanvas").hasClass("in"), "Off-Canvas should be hidden");
          done2();
        }, 20);

        setTimeout(function () {
          assert.deepEqual($("#js-bootstrap-offcanvas").offset().left, -250, 'Off-Canvas offset should be -250 (Hidden)');
          done3();
        }, 30);
    });

    test("Dropdown test", function (assert) {
        assert.expect(2);
        $("#js-dropdown-test").trigger("click");

        assert.ok($("#js-dropdown-test").parent().hasClass("active"), "Dropdown menu should be visible");
        assert.ok($("#js-dropdown-test").parent().find(".dropdown-menu").hasClass("shown"), "Dropdown menu should be hidden");
    });
})(jQuery);
