export function render(items, container, component) {
    container.innerHTML = "";
    items.forEach(item => {
      container.append(component(item));
    });
  }
  