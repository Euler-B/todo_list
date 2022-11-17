import { Controller } from "@hotwired/stimulus"
import { Turbo } from "@hotwired/turbo-rails";

// Connects to data-controller="check"
export default class extends Controller {
  connect() {
    console.log("check controler connected");
  }

  active(event) {
    console.log("El controlador check ha sido activado");
    console.log(event.target);
    const id = event.target.dataset.id;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    fetch(`/tasks/${id}/active`, {
      method: "POST",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({ conspleted: event.target,checked })
    })
    .then(response => response.text())
    .then(Turbo.renderStreamMessage)
  }
}


