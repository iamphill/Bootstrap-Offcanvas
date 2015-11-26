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
        assert.expect(2);

        $("#offcanvas-toggle").trigger("click");
        assert.ok($("#js-bootstrap-offcanvas").hasClass("in"), "Off-Canvas should be visible");

        $("body").trigger("click");
        assert.ok(!$("#js-bootstrap-offcanvas").hasClass("in"), "Off-Canvas should be hidden");
    });

    test("Dropdown test", function (assert) {
        assert.expect(2);
        $("#js-dropdown-test").trigger("click");

        assert.ok($("#js-dropdown-test").parent().hasClass("active"), "Dropdown menu should be visible");
        assert.ok($("#js-dropdown-test").parent().find(".dropdown-menu").hasClass("shown"), "Dropdown menu should be hidden");
    });

    test("Toggle event show offcanvas", function (assert) {
        assert.expect(1);
        $("#js-bootstrap-offcanvas").trigger("offcanvas.toggle");

        assert.ok($("#js-bootstrap-offcanvas").hasClass("in"), "Off-Canvas should be visible");
    });

    test("Toggle event hide offcanvas", function (assert) {
        assert.expect(1);
        $("#js-bootstrap-offcanvas").trigger("offcanvas.toggle");

        assert.ok(!$("#js-bootstrap-offcanvas").hasClass("in"), "Off-Canvas should not be visible");
    });

    test("Toggle event hide offcanvas if already shown", function (assert) {
        assert.expect(2);
        $("#offcanvas-toggle").trigger("click");
        assert.ok($("#js-bootstrap-offcanvas").hasClass("in"), "Off-Canvas should be visible");

        $("#js-bootstrap-offcanvas").trigger("offcanvas.toggle");

        assert.ok(!$("#js-bootstrap-offcanvas").hasClass("in"), "Off-Canvas should not be visible");
    });
})(jQuery);
