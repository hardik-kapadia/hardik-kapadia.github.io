export const clearChildren = (element: Element) => {
  element.replaceChildren();
};

export const createElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  className?: string,
  textContent?: string
) => {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (textContent) {
    element.textContent = textContent;
  }

  return element;
};

export const appendChildren = (parent: Element, children: Element[]) => {
  children.forEach((child) => parent.appendChild(child));
};

export const createTagList = (className: string, tags: string[]) => {
  const list = createElement("ul", className);

  tags.forEach((tag) => {
    list.appendChild(createElement("li", "", tag));
  });

  return list;
};

export const createDetails = (summaryText: string, content: Element) => {
  const details = createElement("details", "expandable expandable--inline");
  const summary = createElement("summary", "", summaryText);
  const wrapper = createElement("div", "expandable__content");

  wrapper.appendChild(content);
  appendChildren(details, [summary, wrapper]);

  return details;
};
