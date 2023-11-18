const express = require('express');
const { ServerRequest } = require('http');
const { EventDispatcher } = require('node-event-dispatcher');
const CallbackEventFactory = require('./Helpers/CallbackEventFactory'); // Assurez-vous d'ajuster le chemin selon votre structure de dossier

class WebhookRequestHandler {
  /**
   * @var EventDispatcher
   */
  dispatcher;

  /**
   * @var ServerRequest
   */
  request;

  constructor() {
    this.request = new ServerRequest(process.env); // Utilisez les variables d'environnement de Node.js
    this.dispatcher = new EventDispatcher();
  }

  /**
   * Dispatch event
   *
   * @return void
   */
  dispatch() {
    if (!this.isValidCallbackRequest() && !this.isVerifyTokenRequest()) return;

    let event;
    if (this.isVerifyTokenRequest()) {
      event = CallbackEventFactory.createForVerify(this.getParams());
    } else {
      event = CallbackEventFactory.create(this.getDecodedBody());
    }

    this.dispatcher.dispatch(event, event.getName());
  }

  /**
   * @param {EventSubscriberInterface} subscriber
   * @return void
   */
  addSubscriber(subscriber) {
    this.dispatcher.addSubscriber(subscriber);
  }

  /**
   * @return {boolean}
   */
  isVerifyTokenRequest() {
    if (this.request.method !== 'GET') return false;

    const params = this.request.query;
    if (!params['hub_verify_token'] || !params['hub_mode'] || !params['hub_challenge']) {
      return false;
    }

    return true;
  }

  /**
   * @return {Object}
   */
  getParams() {
    return this.request.query;
  }

  /**
   * Check if the request is a valid webhook request
   *
   * @return {boolean}
   */
  isValidCallbackRequest() {
    const decoded = this.getDecodedBody();

    const object = decoded['object'] || null;
    const entry = decoded['entry'] || null;

    return object === 'page' && entry !== null;
  }

  getDecodedBody() {
    const body = Buffer.from(this.request.body).toString('utf-8');
    return JSON.parse(body);
  }

  /**
   * @return {ServerRequest}
   */
  getRequest() {
    return this.request;
  }
}

