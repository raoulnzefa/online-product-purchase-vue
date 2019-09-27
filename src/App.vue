<template>
  <b-container id="app">
    <b-row>
      <b-col>
        <nav-bar></nav-bar>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <router-view />
      </b-col>
      <b-col>
        <h2>Shopping Cart</h2>
        <shopping-cart></shopping-cart>
        <p>
          <b>Total Cost: {{ totalCost | currency }}</b>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { Store } from "./store/Store";

/**
 * App component
 *
 * @version 1.0.1
 * @displayName App
 */

export default {
  name: "app",
  computed: {
    totalCost() {
      return Store.totalCost;
    }
  }
};
</script>
