Turbolinks.start();
document.addEventListener('turbolinks:load', function(event) {
    console.log("turbolinks:load");
    $('[data-toggle="offcanvas"]').bootstrapOffcanvas();
});
document.addEventListener('turbolinks:before-cache', function(event) {
  $('.js-offcanvas-done').removeClass('js-offcanvas-done');
})