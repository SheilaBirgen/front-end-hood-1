var backToTop = $("#back-top");
var scrollAmount = 50;
$(window).scroll(function() {
  if ($(this).scrollTop() > scrollAmount) {
    backToTop.fadeIn();
  } else {
    backToTop.fadeOut();
  }
});
backToTop.click(function(e) {
  $("html, body").animate({ scrollTop: 0 }, 400);
});
