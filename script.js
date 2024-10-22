// ==UserScript==
// @name         Who Is Watching My Ticket?
// @namespace    http://tampermonkey.net/
// @version      2024-10-22
// @description  Displays the name of non-avatar Zendesk agents
// @author       Haitam Hamdan
// @match        https://veeva.zendesk.com/agent/tickets/*
// @icon         https://static.zdassets.com/classic/images/favicon_2.ico
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const viewerStyles = `
  .viewer-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  .viewer-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 8px;
  }
  .viewer-name {
    padding: 1px;
    display: flex;
    justify-content: center;
  }
  `;

  // Inject CSS styles into the page
  function injectStyles(styles) {
    const style = document.createElement('style');
    style.innerHTML = styles;
    document.head.appendChild(style);
  }

  // Process all viewers and display their names
  function processViewers() {
    const ulElement = document.getElementById('agentCollisionViewerList');
    if (!ulElement) {
      logError('<ul id="agentCollisionViewerList"> element not found!');
      return;
    }

    const liElements = ulElement.querySelectorAll('li');
    liElements.forEach(processViewerItem);
  }

  // Extract viewers' names and append them to the list item
  function processViewerItem(liElement) {
    if (liElement.querySelector('span.viewer-name')) return;

    const buttonElement = liElement.querySelector('button');
    if (!buttonElement) return;

    const viewerName = getViewerNameFromButton(buttonElement);
    if (!viewerName) return;

    appendViewerNameToListItem(liElement, viewerName);
  }

  function getViewerNameFromButton(buttonElement) {
    const ariaLabel = buttonElement.getAttribute('aria-label');
    if (!ariaLabel) return null;

    const nameParts = ariaLabel.split(' ');
    return nameParts.length >= 2 ? [nameParts[0], nameParts[1]] : null;
  }

  // Append a span with the viewer's name to the list item
  function appendViewerNameToListItem(liElement, viewerName) {
    liElement.classList.add('viewer-list');

    const containerElement = document.createElement('div');
    containerElement.classList.add('viewer-container');

    const firstNameElement = createViewerSpan(viewerName[0], ['first-name', 'viewer-name']);
    const lastNameElement = createViewerSpan(viewerName[1], ['last-name', 'viewer-name']);

    containerElement.appendChild(firstNameElement);
    containerElement.appendChild(lastNameElement);
    liElement.appendChild(containerElement);
  }

  function createViewerSpan(text, classNames) {
    const spanElement = document.createElement('span');
    spanElement.textContent = text;
    classNames.forEach((className) => spanElement.classList.add(className));
    return spanElement;
  }

  function logError(message) {
    console.error(`[Who Is Watching My Ticket]: ${message}`);
  }

  injectStyles(viewerStyles);

  // Run the viewer processing every 2 seconds
  setInterval(processViewers, 2000);
})();
