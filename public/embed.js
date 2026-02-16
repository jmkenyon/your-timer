// public/embed.js

var API_BASE =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:8000"
    : "https://web-production-05aa8.up.railway.app";

(function () {
  "use strict";

  var scripts = document.querySelectorAll(
    'script[data-timer-id][src*="embed.js"]'
  );

  scripts.forEach(function (script) {
    var timerId = script.getAttribute("data-timer-id");
    if (!timerId) return;

    var container = document.createElement("div");
    container.id = "yourtimer-" + timerId;
    container.style.cssText =
      "font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;";
    script.parentNode.insertBefore(container, script.nextSibling);

    fetch(API_BASE + "/api/timer/public/" + timerId)
      .then(function (res) {
        if (!res.ok) throw new Error("Timer not found");
        return res.json();
      })
      .then(function (timer) {
        renderTimer(container, timer);
      })
      .catch(function (err) {
        console.error("YourTimer embed error:", err);
      });
  });

  function renderTimer(container, timer) {
    var defaultStyle = {
      bgColor: "#111111",
      textColor: "#ffffff",
      accentColor: "#ea580c",
      position: "inline",
    };

    var defaultOnComplete = {
      action: "message",
      value: "Time's up!",
    };

    var style = Object.assign({}, defaultStyle, timer.style || {});
    var onComplete = Object.assign(
      {},
      defaultOnComplete,
      timer.on_complete || {}
    );

    var bgColor = style.bgColor;
    var textColor = style.textColor;
    var position = style.position || "inline";
    var tid = timer.id;

    // Position styling
    var positionStyle = "";
    if (position === "top-bar") {
      positionStyle =
        "position:sticky;top:0;z-index:99999;" +
        "border-radius:0;margin:0;max-width:100%;padding:12px 24px;" +
        "box-shadow:0 2px 8px rgba(0,0,0,0.2);";
      // Move container to top of body
      document.body.insertBefore(container, document.body.firstChild);
    } else if (position === "bottom-bar") {
      positionStyle =
        "position:sticky;bottom:0;z-index:99999;" +
        "border-radius:0;margin:0;max-width:100%;padding:12px 24px;" +
        "box-shadow:0 -2px 8px rgba(0,0,0,0.2);";
      // Move container to bottom of body
      document.body.appendChild(container);
    }

    var isBar = position === "top-bar" || position === "bottom-bar";

    var layoutStyle = "";

    if (isBar) {
      layoutStyle =
        "display:flex;align-items:center;justify-content:space-between;gap:20px;";
    } else {
      layoutStyle = "text-align:center;";
    }

    container.innerHTML =
      '<div style="' +
      "background:" +
      bgColor +
      ";" +
      "color:" +
      textColor +
      ";" +
      positionStyle +
      '">' +
      (isBar
        ? // BAR LAYOUT
          '<div id="yourtimer-bar-' +
          tid +
          '" style="' +
          "display:flex;flex-direction:row;align-items:center;justify-content:center;gap:24px;" +
          "max-width:1200px;margin:0 auto;width:100%;" +
          '">' +
          '<div style="font-size:14px;font-weight:500;opacity:0.85;white-space:nowrap;">' +
          escapeHtml(timer.name) +
          "</div>" +
          '<div style="display:flex;gap:20px;">' +
          block(tid, "days", "Days", style.accentColor) +
          block(tid, "hours", "Hours", style.accentColor) +
          block(tid, "mins", "Min", style.accentColor) +
          block(tid, "secs", "Sec", style.accentColor) +
          "</div>" +
          "</div>"
        : // INLINE LAYOUT (original stacked layout)
          '<div style="text-align:center;">' +
          '<div style="font-size:14px;opacity:0.6;margin-bottom:18px;letter-spacing:0.5px;">' +
          escapeHtml(timer.name) +
          "</div>" +
          '<div style="display:flex;justify-content:center;gap:36px;">' +
          block(tid, "days", "Days", style.accentColor) +
          block(tid, "hours", "Hours", style.accentColor) +
          block(tid, "mins", "Min", style.accentColor) +
          block(tid, "secs", "Sec", style.accentColor) +
          "</div>" +
          "</div>") +
      (timer.showBranding
        ? '<div style="margin-top:' +
          (isBar ? "6px" : "20px") +
          ';">' +
          '<a href="https://yourtimer.io?ref=embed" target="_blank" style="' +
          "font-size:10px;opacity:0.4;text-decoration:none;color:" +
          textColor +
          ";" +
          '">Powered by YourTimer</a>' +
          "</div>"
        : "") +
      "</div>";

    if (isBar) {
      var digits = container.querySelectorAll('[id^="yourtimer-' + tid + '-"]');
      digits.forEach(function (el) {
        if (el.id.match(/days|hours|mins|secs/)) {
          el.style.fontSize = "24px";
        }
      });

      var barWrapper = document.getElementById("yourtimer-bar-" + tid);

      function handleResize() {
        if (!barWrapper) return;
        if (window.innerWidth < 640) {
          barWrapper.style.flexDirection = "column";
          barWrapper.style.gap = "8px";
        } else {
          barWrapper.style.flexDirection = "row";
          barWrapper.style.gap = "24px";
        }
      }

      handleResize();
      window.addEventListener("resize", handleResize);
    }
    var targetDate = new Date(timer.target_datetime).getTime();

    function tick() {
      var now = Date.now();
      var diff = targetDate - now;

      if (diff <= 0) {
        handleComplete(container, onComplete);
        return;
      }

      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var mins = Math.floor((diff % 3600000) / 60000);
      var secs = Math.floor((diff % 60000) / 1000);

      document.getElementById("yourtimer-" + tid + "-days").textContent =
        pad(days);
      document.getElementById("yourtimer-" + tid + "-hours").textContent =
        pad(hours);
      document.getElementById("yourtimer-" + tid + "-mins").textContent =
        pad(mins);
      document.getElementById("yourtimer-" + tid + "-secs").textContent =
        pad(secs);

      requestAnimationFrame(function () {
        setTimeout(tick, 250);
      });
    }

    tick();
  }
  function block(timerId, id, label, accentColor) {
    return (
      '<div style="display:flex;flex-direction:column;align-items:center;">' +
      '<div id="yourtimer-' +
      timerId +
      "-" +
      id +
      '" style="' +
      "font-size:40px;" +
      "font-weight:700;" +
      "font-variant-numeric:tabular-nums;" +
      "font-family:ui-monospace,monospace;" +
      "letter-spacing:1px;" +
      "color:" +
      accentColor +
      ";" +
      '">00</div>' +
      '<div style="' +
      "font-size:11px;" +
      "opacity:0.5;" +
      "margin-top:6px;" +
      "letter-spacing:1px;" +
      "text-transform:uppercase;" +
      '">' +
      label +
      "</div>" +
      "</div>"
    );
  }

  function handleComplete(container, onComplete) {
    var action = onComplete.action;
    var value = onComplete.value;

    if (action === "redirect" && value) {
      window.location.href = value;
    } else if (action === "hide") {
      container.style.display = "none";
    } else {
      var blocks = container.querySelectorAll('[id^="yourtimer-"]');
      blocks.forEach(function (el) {
        el.textContent = "00";
        el.style.opacity = "0.5";
      });

      var msg = document.createElement("div");
      msg.style.cssText =
        "margin-top:20px;font-size:16px;font-weight:500;opacity:0.85;";
      msg.textContent = value;
      container.firstChild.appendChild(msg);
    }
  }

  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
  }
})();
