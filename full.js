(Element.prototype.clickable = function () {
  const e = this.querySelectorAll("a"),
      t = this.getAttribute("data-clickable-pos"),
      n = "first" === t ? 0 : "last" === t ? e.length - 1 : t,
      i = e[null !== n ? n : 0];
  let o = { downTime: null, upTime: null, middle: null, aux: null, hyperlink: null, otherLinksClicked: null };
  this.addEventListener("mousedown", (e) => {
      (o.downTime = +new Date()),
          (o.middle = 2 === e.button),
          (o.aux = 3 === e.button),
          (o.hyperlink = "a" === e.target.tagName.toLowerCase()),
          (o.otherLinksClicked = !!((!e.target === i && e.target.matches("a")) || e.target.closest("a")));
  }),
      this.addEventListener("mouseup", () => {
          (o.upTime = +new Date()), o.upTime - o.downTime < 400 && !o.aux && !o.hyperlink && !o.otherLinksClicked && i.click();
      });
}),
  window.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll(".clickable").forEach((e) => e.clickable());
  }),
  (function (e, t, n) {
      (n.SocialShare = function (t, i, o, r) {
          var s,
              a,
              l,
              c,
              u,
              d = "516334307659113",
              h = "https://www.facebook.com/dialog/share?",
              f = "https://twitter.com/intent/tweet?",
              p = "https://www.linkedin.com/shareArticle?",
              m = function (n, o) {
                  var r, s;
                  switch (n) {
                      case "twitter":
                          (r = 550), (s = 500);
                          break;
                      case "facebook":
                          (r = 670), (s = 400);
                          break;
                      default:
                          (r = 500), (s = 500);
                  }
                  var a = "width=" + r + ",height=" + s + ",left=" + (screen.width / 2 - r / 2) + ",top=" + (screen.height / 2 - s / 2) + ",";
                  (a += "resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes"),
                      e.open(o, "popup", a)
                          ? i.preventDefault()
                          : (console.log("Unable to open popup, most likely due to a popup blocker!"),
                            (function (e) {
                                t.attr("href", e), t.attr("target", "_blank");
                            })(o));
              },
              g = {
                  facebook: function (e) {
                      var t = { app_id: d, display: "popup", href: e.url, title: e.title, description: e.description, picture: e.media },
                          i = n.param(t);
                      return h + i;
                  },
                  twitter: function (e) {
                      var t = { text: e.title, url: e.url },
                          i = n.param(t);
                      return f + i;
                  },
                  "linked-in": function (e) {
                      var t = { mini: "true", url: e.url, title: e.title, summary: e.description },
                          i = n.param(t);
                      return p + i;
                  },
              };
          (s = t.data("description")),
              (a = t.data("type")),
              (l = t.data("url")),
              (c = { type: a, title: t.data("title"), description: s, media: t.data("media"), url: l }),
              (u = (function (e) {
                  var t = g[e.type];
                  return t ? t(e) : null;
              })(c)),
              (function (t, n, o) {
                  if ("print" === t) return i.preventDefault(), void e.print();
                  if ("email" === t) {
                      var r = { subject: o.title, body: encodeURI(o.url) };
                      return e.open("mailto:?subject=" + r.subject + "&body=" + r.body, "_self"), void i.preventDefault();
                  }
                  m(t, n);
              })(c.type, u, c);
      }),
          (n.fn.socialShare = function (e, t, i) {
              if (!n.data(this, "share-button")) {
                  var o = new n.SocialShare(this, e, t, i);
                  this.data("share-button", o);
              }
              return this.data("share-button");
          }),
          n(function () {
              n(t).on("click", ".js-share-button", function (e) {
                  n(this).socialShare(e, ".js-share-button");
              });
          });
  })(window, document, jQuery);
const swiper = new Swiper(".logo-grid-block__slider", {
  loop: !1,
  slidesPerView: "auto",
  spaceBetween: 46,
  breakpoints: { 1200: { spaceBetween: 66 }, 1400: { spaceBetween: 86 } },
  navigation: { nextEl: ".page-link-next", prevEl: ".page-link-previous" },
});
!(function (e) {
  "use strict";
  e(".mega-menu__nav-item[data-bs-toggle][href]").each(function () {
      var t = e(this).attr("href"),
          n = "_blank" === e(this).attr("target"),
          i = e('<a class="visually-hidden" tabindex="-1"></a>');
      i.attr("href", t),
          n && i.attr("target", "_blank"),
          i.insertAfter(e(this)),
          e(this).on("click", (e) => {
              i[0].click();
          });
  });
  var t = e(".site-header__main-nav");
  t.multilevelNav({ hoverIntent: !0, hoverIntentTimeout: 300, wholeLinkToggler: !0, toggleOnClickOnly: !0, navbarMegaMenuBackdrop: !0, keepMenuOpenOnFocusOut: !1 }),
      t.multilevelSlideOver({ offCanvasCloseAllMenus: !0, dynamicHeight: !1, backButtonText: "Back", topLevelToggleOnClickOnly: !0, slideTitleLink: !1, dynamicBackButtonTitle: !0 }),
      e(".mln__back-btn").addClass("btn"),
      e(".main-nav .btn-close").each(function () {
          e(this).on("click", function () {
              e(this).closest(".mln__has-child--showing").find('.mln__toggle-link[aria-expanded="true"]').first().trigger("click");
          });
      }),
      e("#navSearchCollapseToggle").on("click", function () {
          e(window).width() > 1199 && (e('.mln__toggle-link[aria-expanded="true"]').trigger("click"), e("#siteSearchInput").focus());
      });
  var n = e(".main-nav").attr("data-mln-breakpoint");
  e("#navSearchCollapseToggle").on("click", function () {
      window.matchMedia("(max-width: " + (n - 1) + "px)").matches && e('.toggle-off-canvas[aria-expanded="true"]').trigger("click");
  }),
      e(document).mouseup(function (t) {
          e(t.target).is(".nav-search__collapse, .nav-search__collapse *") || e("#navSearchCollapse").collapse("hide");
      });
  const i = document.documentElement,
      o = "js-window-resizing";
  let r = window.innerWidth;
  window.addEventListener("resize", () => {
      let e = window.innerWidth;
      r !== e && i.classList.add(o), (r = e);
  }),
      window.addEventListener(
          "resize",
          (function (e) {
              let t;
              return function (n) {
                  t && clearTimeout(t), (t = setTimeout(e, 150, n));
              };
          })(() => {
              i.classList.remove(o);
          })
      );
  const s = document.querySelector("header");
  new Headroom(s, {
      offset: 100,
      tolerance: 20,
      onUnpin: function () {
          e("#navSearchCollapse").collapse("hide"), e("body").removeClass("header-is-pinned"), e(window).width() > 1199 && e('.mln__toggle-link[aria-expanded="true"]').trigger("click"), e("header").removeClass("headroom--pinned");
      },
      onPin: function () {
          e("body").addClass("header-is-pinned");
      },
      onTop: function () {
          e(window).width() > 1199 && e("body").removeClass("header-is-pinned");
      },
  }).init();
  let a = e(".mega-menu__col .tab-pane"),
      l = e(".mega-menu__nav-item");
  e(".mln__toggle-link").on("click", function () {
      a.removeClass("show active"), l.removeClass("active");
  });
  let c = e(".mega-menu__col:nth-child(1) .mega-menu__nav-item:not(.active)"),
      u = e(".mega-menu__col:nth-child(3) .tab-pane"),
      d = e(".mega-menu__col:nth-child(2) .mega-menu__nav-item");
  c.on("click", function () {
      u.removeClass("show active"), d.removeClass("active");
  });
  if (document.querySelector("#sectionNav")) {
      e("body").attr("data-bs-spy", "scroll"), e("body").attr("data-bs-target", "#sectionNav"), e("body").attr("data-bs-root-margin", "30% 0px -70% 0px");
      var h = e("#sectionNavCollapseToggle"),
          f = h.text(),
          p = e(".js-section-nav-list");
      e(window).on("scroll", function () {
          p.find(".active").length || h.html(f);
      }),
          e(window).on("activate.bs.scrollspy", function () {
              h.html("");
              var e = p.find(".active").text();
              h.html(e);
          }),
          e(".section-nav__collapse .section-nav__item").on("click", function () {
              e(this).closest(".section-nav__collapse").collapse("hide");
          }),
          e(document).mouseup(function (t) {
              e(t.target).is(".section-nav__collapse, .section-nav__collapse *") || e(".section-nav__collapse").collapse("hide");
          }),
          e(document).mouseup(function (t) {
              e(t.target).is(".sidebar-nav__collapse, .sidebar-nav__collapse *") || e("#sidebarNavCollapse").collapse("hide");
          });
  }
  const m = document.querySelectorAll(".modal");
  m.length &&
      m.forEach((t) => {
          document.body.appendChild(t),
              t.addEventListener("hidden.bs.modal", (n) => {
                  e("iframe", t).length > 0 &&
                      e("iframe", t).each((t, n) => {
                          e(n).attr("src").indexOf("youtube") > 0 && n.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                      });
              }),
              t.addEventListener("show.bs.modal", (e) => {
                  document.querySelectorAll('[data-bs-spy="scroll"]').forEach((e) => {
                      bootstrap.ScrollSpy.getOrCreateInstance(e).refresh();
                  });
              });
      });
  const g = new URLSearchParams(window.location.search);
  if (null !== g.get("modal")) {
      var v = e("#" + g.get("modal"));
      v.length && v.modal("show");
  }
  e(".transcript-collapse__toggle").on("click", function () {
      var t = e(this),
          n = t.attr("aria-expanded"),
          i = t.attr("data-hash");
      "false" === n && (window.location.hash = i);
  });
  if (document.querySelector(".home-slider")) {
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
  e(".video-hero__pause-btn").on("click", function (t) {
      t.preventDefault(),
          e(this).hasClass("is-paused")
              ? (e(this).removeClass("is-paused"), document.querySelectorAll(".video-hero__item video").forEach((e) => e.play()))
              : (e(this).addClass("is-paused"), document.querySelectorAll(".video-hero__item video").forEach((e) => e.pause()));
  }),
      e("input.form-control--search")
          .wrap('<span class="form-control-clear-wrap"></span>')
          .after(
              e('<button type="button" class="btn btn-close btn--clear-input"><span class="visually-hidden">Clear search field</span></button>').click(function () {
                  e(this).prev("input").val("").trigger("change").focus(), preventDefault;
              })
          );
})(jQuery);
let tocContainer = document.getElementById("insightsToc"),
  insightsSidebar = document.getElementById("insights-sidebar");
function generateTableOfContents() {
  const e = document.querySelectorAll(".js-insights-toc-anchor");
  if (tocContainer && e.length > 0) {
      const t = document.createElement("ul"),
          n = document.getElementById("insights-sidebar"),
          i = document.getElementById("insights-toc"),
          o = document.getElementById("insights-toc-mobile");
      n && (n.style.display = "block"), i && (i.style.display = "block"), o && (o.style.display = "block"), t.classList.add("sidebar-nav__list", "js-section-nav-list");
      let r = 0;
      e.forEach((e) => {
          r++;
          let n = `heading${r}`;
          e.id = n;
          const i = document.createElement("li"),
              o = document.createElement("a");
          (o.textContent = e.textContent), (o.href = `#${n}`), i.appendChild(o), t.appendChild(i);
      }),
          tocContainer.appendChild(t);
  }
}
function viewport() {
  var e = window,
      t = "inner";
  return "innerWidth" in window || ((t = "client"), (e = document.documentElement || document.body)), { width: e[t + "Width"], height: e[t + "Height"] };
}
function toggleDomLocation(e, t, n, i) {
  let o = $(window);
  $(e).each(function () {
      var e = $(this);
      viewport().width < i ? e.appendTo($(t)) : e.appendTo($(n));
      var r = o.width();
      o.on("resize", function () {
          var s = o.width();
          r !== s && (viewport().width < i ? e.appendTo($(t)) : e.appendTo($(n))), (r = s);
      });
  });
}
function resetNav() {
  let e = $(window);
  var t = e.width();
  e.on("resize", function () {
      var n = e.width();
      t !== n && viewport().width > 1199 && $('.toggle-off-canvas[aria-expanded="true"]').trigger("click"), (t = n);
  });
}
window.addEventListener("DOMContentLoaded", (e) => {
  insightsSidebar && generateTableOfContents();
}),
  toggleDomLocation(".site-header__utility-nav", ".js-utility-nav--mobile-parking", ".js-utility-nav--desktop-parking", 1200),
  toggleDomLocation("#navSearchCollapseToggle", ".js-search-toggle--mobile-parking", ".js-search-toggle--desktop-parking", 1200),
  toggleDomLocation(".sidebar-nav", ".js-sidebar-nav--mobile-parking", ".js-sidebar-nav--desktop-parking", 992),
  toggleDomLocation(".profile-page__contact-info", ".js-profile-contact--mobile-parking", ".js-profile-contact--desktop-parking", 992),
  toggleDomLocation(".insights-header__share-links", ".js-share-links--mobile-parking", ".js-share-links--desktop-parking", 992),
  toggleDomLocation(".insights-page__contributor-widget-wrap", ".insights-contributor--mobile-parking", ".insights-contributor--desktop-parking", 992),
  toggleDomLocation(".filter-bar-collapse-wrap", ".js-sidebar-search--mobile-parking", ".js-sidebar-search--desktop-parking", 992),
  resetNav(),
  window.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll(".single-click").forEach((e) => e.clickable());
  });
var videoBlock = document.querySelectorAll(".video-block");
if (videoBlock.length) {
  ((tag = document.createElement("script")).src = "https://www.youtube.com/iframe_api"), (firstScriptTag = document.getElementsByTagName("script")[0]).parentNode.insertBefore(tag, firstScriptTag);
  const e =
          '\n        <div id="videoModal" class="video-block__modal modal fade" tabindex="-1" aria-hidden="true">\n            <div class="modal-dialog modal-dialog-centered modal-xl">\n            <div class="modal-content">\n                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n                <div class="video-block__body ratio ratio-16x9">\n                    <div class="video-block__video"></div>\n                </div>\n                </div>\n            </div>\n        </div>\n    ',
      t = document.createElement("div");
  (t.innerHTML = e),
      document.body.appendChild(t),
      videoBlock.forEach((e) => {
          const t = `https://img.youtube.com/vi/${e.getAttribute("data-yt-id")}/hqdefault.jpg`;
          if (!e.querySelector(".video-block__thumbnail")) {
              const n = document.createElement("img");
              (n.src = t), n.classList.add("video-block__thumbnail"), n.setAttribute("width", "1600"), n.setAttribute("height", "900");
              e.querySelector(".video-block__video-wrap").prepend(n);
          }
      });
}
let player,
  currentYtId = null;
function constructYoutubePlayer(e, t) {
  if (null !== currentYtId && currentYtId !== t) {
      videoModalEl.querySelector(".video-block__video").remove();
      const e = document.createElement("div");
      e.classList.add("video-block__video"), videoModalEl.querySelector(".video-block__body").appendChild(e), (currentYtId = null);
  }
  var n = "ytPlayer-" + t;
  e.querySelector(".video-block__video").setAttribute("id", n),
      null === currentYtId &&
          (player = new YT.Player(n, {
              height: "1920",
              width: "1080",
              videoId: t,
              playerVars: { playsinline: 1, modestbranding: 1, rel: 0, autoplay: 1 },
              events: {
                  onReady: function () {
                      videoModalEl.addEventListener("hidden.bs.modal", function (e) {
                          player.pauseVideo();
                      });
                  },
              },
          })),
      (currentYtId = t);
}
const videoModalEl = document.getElementById("videoModal");
videoBlock.forEach((e) => {
  e.querySelector('[data-bs-toggle="modal"]').addEventListener("click", (e) => {
      const t = e.target.closest(".video-block").getAttribute("data-yt-id");
      constructYoutubePlayer(videoModalEl, t);
  });
});
var insightsVideo = document.querySelectorAll(".insights-video");
if (insightsVideo.length) {
  var tag,
      firstScriptTag,
      ytPlayer = document.querySelectorAll(".insights-video__video");
  if (ytPlayer.length) ((tag = document.createElement("script")).src = "https://www.youtube.com/iframe_api"), (firstScriptTag = document.getElementsByTagName("script")[0]).parentNode.insertBefore(tag, firstScriptTag);
  function onPlayerStateChange(e) {
      setTimeout(() => {
          e.target.getIframe().classList.add("insights-video__video--playing");
      }, 100);
  }
  insightsVideo.forEach((e) => {
      const t = `https://img.youtube.com/vi/${e.querySelector(".insights-video__video").getAttribute("data-yt-id")}/hqdefault.jpg`;
      if (!e.querySelector(".video-block__thumbnail")) {
          const n = document.createElement("img");
          (n.src = t), n.classList.add("video-block__thumbnail"), n.setAttribute("width", "1600"), n.setAttribute("height", "900");
          e.querySelector(".video-block__video-wrap").prepend(n);
      }
  }),
      (window.onYouTubeIframeAPIReady = function () {
          ytPlayer.forEach((e, t) => {
              let n;
              var i = e.getAttribute("data-yt-id"),
                  o = "ytPlayer-" + i + t;
              e.setAttribute("id", o),
                  (n = new YT.Player(o, { height: "1920", width: "1080", videoId: i, playerVars: { playsinline: 1, modestbranding: 1, rel: 0 }, events: { onStateChange: onPlayerStateChange } })),
                  e.setAttribute("loading", "lazy");
          });
      });
} //# sourceMappingURL=main.min.js.map
