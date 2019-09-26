<template>
  <div>
    <b-table class="text-capitalize" striped hover :items="cart" show-empty>
      <template v-slot:cell(price)="row">{{ row.item.price | currency }}</template>

      <template v-slot:cell(action)="row">
        <b-button variant="success" size="sm" @click="addToCart(row.item.details)" class="mr-1">Add</b-button>
        <b-button variant="danger" size="sm" @click="removeFromCart(row.item.details)">Remove</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { Store } from "../store/Store";
export default {
  computed: {
    cart() {
      return Store.$data.cart;
    }
  },
  methods: {
    removeFromCart(product) {
      Store.removeFromCart(product);
    },
    addToCart(product) {
      Store.addToCart(product);
    }
  }
};
</script>