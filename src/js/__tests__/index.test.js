import {
  isShown,
  triggerEvent,
  init,
  toggleOffcanvas,
  EVENT_NAMES,
  CLASS_NAMES,
} from '../index';

let matches = false;

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches,
  };
});

afterEach(() => {
  matches = false;
});

describe('isShown', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('div');
  });

  test('returns true when element has show class', () => {
    el.classList.add(CLASS_NAMES.show);

    expect(isShown(el)).toBe(true);
  });

  test('returns false when element does not have show class', () => {
    expect(isShown(el)).toBe(false);
  });
});

describe('triggerEvent', () => {
  test('triggers custom event', () => {
    const el = {
      dispatchEvent: jest.fn(),
    };

    triggerEvent(el, EVENT_NAMES.show);

    expect(el.dispatchEvent.mock.calls.length).toBe(1);
    expect(el.dispatchEvent.mock.calls[0][0].type).toBe(EVENT_NAMES.show);
  });
});

describe('init', () => {
  let el;

  beforeEach(() => {
    el = {
      addEventListener: jest.fn(),
      getAttribute: jest.fn(() => 'test'),
    };
  });

  test('throws error when control is null', () => {
    expect(() => {
      init(el);
    }).toThrow();
  });

  test('adds click event listener to el', () => {
    const controls = document.createElement('div');
    controls.id = 'test';

    document.body.appendChild(controls);

    init(el);

    expect(el.addEventListener.mock.calls.length).toBe(2);
    expect(el.addEventListener.mock.calls[0][0]).toBe('click');
    expect(el.addEventListener.mock.calls[1][0]).toBe('offcanvas.toggle');

    controls.remove();
  });
});

describe('toggleOffcanvas', () => {
  let el;
  let show = false;

  beforeEach(() => {
    el = {
      classList: {
        toggle: jest.fn(() => {
          show = !show;
        }),
        contains: jest.fn(() => show),
      },
      dispatchEvent: jest.fn(),
    };
  });

  afterEach(() => {
    show = false;
  });

  test('does not show when window larger than 992', () => {
    matches = true;

    toggleOffcanvas(el);

    expect(el.classList.toggle.mock.calls.length).toBe(0);
  });

  test('toggles show class', () => {
    toggleOffcanvas(el);

    expect(el.classList.toggle.mock.calls.length).toBe(1);
    expect(el.classList.toggle.mock.calls[0][0]).toBe(CLASS_NAMES.show);
  });

  test('triggers show events', () => {
    toggleOffcanvas(el);

    expect(el.dispatchEvent.mock.calls.length).toBe(2);
    expect(el.dispatchEvent.mock.calls[0][0].type).toBe(EVENT_NAMES.show);
    expect(el.dispatchEvent.mock.calls[1][0].type).toBe(EVENT_NAMES.shown);
  });

  test('triggers hide events', () => {
    show = true;

    toggleOffcanvas(el);

    expect(el.dispatchEvent.mock.calls.length).toBe(2);
    expect(el.dispatchEvent.mock.calls[0][0].type).toBe(EVENT_NAMES.hide);
    expect(el.dispatchEvent.mock.calls[1][0].type).toBe(EVENT_NAMES.hidden);
  });
});
