/* Persist "Done when" checkboxes across refreshes and page navigation.
 *
 * Why: the lab runs ~60 minutes with a break in the middle, and people
 * hop between the two Build Agent paths. Ticks that vanish on refresh
 * would be about as annoying as ticks that don't tick.
 *
 * Keyed on page path + the item's own text, so a tick survives edits
 * elsewhere on the page and resets (correctly) if that step is reworded.
 * localStorage can be blocked by corporate policy or private browsing —
 * if it is, the boxes still tick, they just don't persist.
 */
(function () {
  "use strict";

  var PREFIX = "lab-check:";

  function storage() {
    try {
      var s = window.localStorage;
      s.setItem(PREFIX + "probe", "1");
      s.removeItem(PREFIX + "probe");
      return s;
    } catch (e) {
      return null;                       // blocked — degrade to non-persistent
    }
  }

  function keyFor(item) {
    var label = (item.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120);
    return PREFIX + window.location.pathname + "::" + label;
  }

  function init() {
    var store = storage();
    var boxes = document.querySelectorAll(
      ".task-list-item input[type='checkbox']"
    );

    Array.prototype.forEach.call(boxes, function (box) {
      var item = box.closest(".task-list-item");
      if (!item) return;

      var key = keyFor(item);

      if (store && store.getItem(key) === "1") {
        box.checked = true;
      }

      box.addEventListener("change", function () {
        if (!store) return;
        if (box.checked) {
          store.setItem(key, "1");
        } else {
          store.removeItem(key);
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
