<template>
  <div>
    <h2>Posters</h2>
    <b-card-group deck v-for="(poster, index) in getFilteredposterProducts" :key="index">
      <b-card no-body border-variant="light" align="left">
        <p class="card-header capitalize">{{index}}</p>
        <b-card-text>
          <b-list-group>
            <b-list-group-item class="capitalize" v-for="(posterItem, index) in poster" :key="index">
              <span class="value-text-align">{{posterItem.details}}</span>
              <span class="price-text-align">{{posterItem.price | currency}}</span>
              <b-button-group class="b-button-group-align">
                <b-button variant="success" @click="addToCart(posterItem)">Add to cart</b-button>
              </b-button-group>
            </b-list-group-item>
          </b-list-group>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import postersItems from "./json/posters.json";
import { Store } from "../store/Store";

/**
 * Posters component described here
 *
 * @version 1.0.1
 * @displayName Posters
 */
export default {
  name: "Posters",
  data() {
    return {
      posterListItems: postersItems
    };
  },
  computed: {
    /**
     * Gets filtered values based on exclude property
     */
    getFilteredposterProducts() {
      const filteredProductList = [];
      const excludePropertyName = [];
      let price = 250;

      /**
       * Gets excludePropertyName array from exclude property
       */
      for (const excludePropertyGroup of this.posterListItems.excludes) {
        for (const excludePropertyItem of excludePropertyGroup) {
          if (excludePropertyName.indexOf(excludePropertyItem.property) < 0) {
            excludePropertyName.push(excludePropertyItem.property);
          }
        }
      }

      /**
       * Gets filteredProductList based on exclude properties
       */
      for (const posterPropertyGroup of this.posterListItems.propertyGroups) {
        for (const posterPropertyItem of posterPropertyGroup.properties) {
          for (const posterPropertyOption of posterPropertyItem.options) {
            for (const excludePropertyItemName of excludePropertyName) {
              if (posterPropertyItem.slug === excludePropertyItemName) {
                if (posterPropertyOption.name && posterPropertyOption.name.nl) {
                  --price; // mock price for demo
                  filteredProductList.push({
                    key: excludePropertyItemName,
                    details: posterPropertyOption.name.nl,
                    price: price
                  });
                }
              }
            }
          }
        }
      }

      /**
       * Gets filtered values based on grouping by exclude property name
       */
      var groupedItemsByName = filteredProductList.reduce((r, a) => {
        const { key, details, price } = a;
        r[key] = [
          ...(r[key] || []),
          {
            details,
            price
          }
        ];
        return r;
      }, {});
      return groupedItemsByName;
    }
  },
  methods: {
    /**
     * Add to cart.
     *
     * @param {object} product
     * @public
     */
    addToCart(product) {
      Store.addToCart(product);
    }
  }
};
</script>
<style>
.homeText {
  font-size: 35px;
  color: red;
  text-align: center;
}
.card-header {
  font-weight: bold;
}
.b-button-group-align {
  float: right;
}
.capitalize {
  text-transform: capitalize;
}
.value-text-align {
  width: 60%;
  display: inline-block;
}
h2 {
  text-align: center;
}
</style>
