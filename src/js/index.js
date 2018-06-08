const CLASS_NAMES = {
  show: 'show',
};

const EVENT_NAMES = {
  show: 'show.bs.offcanvas',
  shown: 'shown.bs.offcanvas',
  hide: 'hide.bs.offcanvas',
  hidden: 'hidden.bs.offcanvas',
};

export const isShown = (el) => el.classList.contains(CLASS_NAMES.show);

export const triggerEvent = (el, eventName) => {
  const event = new CustomEvent(eventName);

  el.dispatchEvent(event);
};

export const toggleOffcanvas = (el) => {
  if (!matchMedia('(min-width: 992px)').matches) {
    triggerEvent(el, isShown(el) ? EVENT_NAMES.hide : EVENT_NAMES.show);

    el.classList.toggle(CLASS_NAMES.show);

    triggerEvent(el, isShown(el) ? EVENT_NAMES.shown : EVENT_NAMES.hidden);
  }
};

export const addEventListener = (el) => {
  const controls = document.getElementById(el.getAttribute('aria-controls'));

  el.addEventListener('click', () => toggleOffcanvas(controls));
};

document.addEventListener('DOMContentLoaded', () => {
  [...document.querySelectorAll('[data-toggle="offcanvas"]')].forEach((el) => addEventListener(el));
});
