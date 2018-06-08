import {
  isShown,
  triggerEvent,
  initOffcanvas,
  EVENT_NAMES,
  CLASS_NAMES,
} from '../index';

let matches;

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches,
  };
});

describe('isShown', () => {
  let el;

  beforeEach(() => {
    el = document.createElement('div');
  });

  it('returns true when element has show class', () => {
    el.classList.add(CLASS_NAMES.show);

    expect(isShown(el)).toBe(true);
  });

  it('returns false when element does not have show class', () => {
    expect(isShown(el)).toBe(false);
  });
});

describe('triggerEvent', () => {
  it('triggers custom event', () => {
    const el = {
      dispatchEvent: jest.fn(),
    };

    triggerEvent(el, EVENT_NAMES.show);

    expect(el.dispatchEvent.mock.calls.length).toBe(1);
    expect(el.dispatchEvent.mock.calls[0][0].type).toBe(EVENT_NAMES.show);
  });
});

describe('initOffcanvas', () => {
  let el;

  beforeEach(() => {
    el = {
      addEventListener: jest.fn(),
    };
  });

  it('throws error when control is null', () => {
    expect(() => {
      initOffcanvas(el);
    }).toThrow();
  });

  it('adds click event listener to el', () => {
    const controls = document.createElement('div');

    initOffcanvas(el, controls);

    expect(el.addEventListener.mock.calls.length).toBe(1);
    expect(el.addEventListener.mock.calls[0][0]).toBe('click');
  });

  it('triggers toggleOffcanvas', () => {
    const callback = jest.fn();
    const controls = document.createElement('div');
    const el = document.createElement('div');
    initOffcanvas(el, controls, callback);

    el.click();

    expect(callback.mock.calls.length).toBe(1);
    expect(callback.mock.calls[0][0]).toBe(controls);
  });
});
