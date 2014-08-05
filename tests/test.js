test("Show off-canvas menu test", function (assert) {
    $("#offcanvas-toggle").trigger("click");

    assert.ok($("#js-bootstrap-offcanvas").hasClass("in"), "Off-Canvas should be visible");
});

test("Hide off-canvas menu test", function (assert) {
    $("#offcanvas-toggle").trigger("click");

    assert.ok(!$("#js-bootstrap-offcanvas").hasClass("in"), "Off-Canvas should be hidden");
});

test("Body click hide off-canvas menu test", function (assert) {
    $("#offcanvas-toggle").trigger("click");
    assert.ok($("#js-bootstrap-offcanvas").hasClass("in"), "Off-Canvas should be visible");

    $("body").trigger("click");
    assert.ok(!$("#js-bootstrap-offcanvas").hasClass("in"), "Off-Canvas should be hidden");
});

test("Dropdown test", function (assert) {
    $("#js-dropdown-test").trigger("click");

    assert.ok($("#js-dropdown-test").parent().hasClass("active"), "Dropdown menu should be visible");
    assert.ok($("#js-dropdown-test").parent().find(".dropdown-menu").hasClass("shown"), "Dropdown menu should be hidden");
});
