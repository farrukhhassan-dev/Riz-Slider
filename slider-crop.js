
if (document.querySelector(".home-slider")) {
  const e = jQuery; // Add this line to define e
      const y = document.querySelectorAll(".home-background__set > *").length;
      var _ = 1;
      let b,
          w = !1;
      function x() {
          b = setInterval(C, 1e4);
      }
      function C(t, n) {
          (_ = n || _),
              e(".home-background__set > .home-background__item").removeClass("active"),
              e(".home-background__set > .home-background__item:nth-child(" + _ + ")").addClass("active"),
              document.querySelectorAll(".home-background__item video").forEach((e) => e.pause()),
              document.querySelectorAll(".home-background__item.active video").forEach((e) => e.play()),
              e(".home-slider__set > .home-slider__item.active--no-transition").removeClass("active--no-transition"),
              e(".home-slider__set > .home-slider__item.active").removeClass("active"),
              !0 !== t
                  ? e(".home-slider__set > .home-slider__item:nth-child(" + _ + ")").addClass("active")
                  : (e(".home-slider__pause-btn:not(.is-paused)").trigger("click"), e(".home-slider__set > .home-slider__item:nth-child(" + _ + ")").addClass("active active--no-transition"));
          var i,
              o,
              r = e(window).width(),
              s = (_ - 1) * r;
          (i = e(".home-slider__set")),
              (o = s),
              (w = !0),
              i.scrollLeft(o),
              setTimeout(() => {
                  w = !1;
              }, 100),
              e(".home-slider__card-row > .container-fluid > .home-slider__card").removeClass("active"),
              e(".home-slider__card-row > .container-fluid > .home-slider__card:nth-child(" + _ + ")").addClass("active"),
              e(".home-slider__dot-bar > .container-fluid > .home-slider__dot-bar__dot").removeClass("active"),
              e(".home-slider__dot-bar > .container-fluid > .home-slider__dot-bar__dot:nth-child(" + _ + ")").addClass("active"),
              e(".home-slider__curves__color").addClass("tuck-away"),
              setTimeout(function () {
                  e(".home-slider__curves__color").removeClass("tuck-away");
              }, 1e3),
              _ < y ? _++ : (_ = 1);
      }
      e(".home-slider__set .home-slider__item").each(function (t) {
          e(this).attr("data-slide-index", t + 1);
      }),
          C(),
          x(),
          e(".home-slider__card").on("click", function (t) {
              t.preventDefault(), clearInterval(b), e(".home-slider__card-row > .container-fluid > .home-slider__card").removeClass("active"), e(this).addClass("active");
              var n = e(this).index();
              C(!1, (_ = n + 1)), e(".home-slider__pause-btn").addClass("is-paused");
          }),
          e(".home-slider__pause-btn").on("click", function (t) {
              t.preventDefault(),
                  e(this).hasClass("is-paused") ? (C(), x(), e(this).removeClass("is-paused")) : (clearInterval(b), e(this).addClass("is-paused"), document.querySelectorAll(".home-background__item video").forEach((e) => e.pause()));
          });
      const T = document.querySelector(".home-slider__set"),
          k = document.querySelectorAll(".home-slider__set .home-slider__item"),
          E = new IntersectionObserver(
              (t) => {
                  t.forEach((t) => {
                      if (t.isIntersecting) {
                          C(!w, parseInt(e(t.target).attr("data-slide-index")));
                      }
                  });
              },
              { root: T, threshold: 0.51 }
          );
      k.forEach((e) => {
          E.observe(e);
      });
  }