import { init } from './index';

class OffcanvasElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const toggle = this.querySelector('.navbar-toggler');

    init(toggle);
  }
}

window.customElements.define('bs-offcanvas', OffcanvasElement);
