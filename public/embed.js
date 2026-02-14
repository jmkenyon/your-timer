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

    if (timer.showBranding) {
      // render branding
    }

    container.innerHTML =
      '<div style="' +
      "background:" + bgColor + ";" +
      "color:" + textColor + ";" +
      "border-radius:16px;" +
      "padding:32px 36px;" +
      "text-align:center;" +
      "max-width:520px;" +
      "margin:20px auto;" +
      "box-shadow:0 10px 40px rgba(0,0,0,0.15);" +
      '">' +

      '<div style="font-size:14px;opacity:0.6;margin-bottom:18px;letter-spacing:0.5px;">' +
      escapeHtml(timer.name) +
      "</div>" +

      '<div style="display:flex;justify-content:center;gap:36px;">' +

        block("days", "Days") +
        block("hours", "Hours") +
        block("mins", "Min") +
        block("secs", "Sec") +

      "</div>" +

      (timer.showBranding ?  

      '<div style="margin-top:20px;">' +
      '<a href="https://yourtimer.io?ref=embed" target="_blank" style="' +
      "font-size:11px;" +
      "opacity:0.4;" +
      "text-decoration:none;" +
      "color:" + textColor + ";" +
      
      '">Powered by YourTimer</a>' +
      "</div>" +

      "</div>"
      : ""
      )

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

      document.getElementById("yourtimer-days").textContent = pad(days);
      document.getElementById("yourtimer-hours").textContent = pad(hours);
      document.getElementById("yourtimer-mins").textContent = pad(mins);
      document.getElementById("yourtimer-secs").textContent = pad(secs);

      requestAnimationFrame(function () {
        setTimeout(tick, 250);
      });
    }

    tick();
  }

  function block(id, label) {
    return (
      '<div style="display:flex;flex-direction:column;align-items:center;">' +
        '<div id="yourtimer-' + id + '" style="' +
          "font-size:40px;" +
          "font-weight:700;" +
          "font-variant-numeric:tabular-nums;" +
          "font-family:ui-monospace,monospace;" +
          "letter-spacing:1px;" +
        '">00</div>' +
        '<div style="' +
          "font-size:11px;" +
          "opacity:0.5;" +
          "margin-top:6px;" +
          "letter-spacing:1px;" +
          "text-transform:uppercase;" +
        '">' + label + "</div>" +
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