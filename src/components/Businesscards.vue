<template>
  <div>
    <h2>Business Cards</h2>
    <b-card-group deck v-for="(card, index) in getFilteredBusinessCards" :key="index">
      <b-card no-body border-variant="light" align="left">
        <p class="card-header capitalize">{{index}}</p>
        <b-card-text>
          <b-list-group>
            <b-list-group-item class="capitalize" v-for="(test, index) in card" :key="index">
              <span class="value-text-align">{{test.value}}</span>
              <span class="price-text-align">{{test.price | currency}}</span>
              <b-button-group class="b-button-group-align">
                <b-button variant="success" @click="addToCart(test)">Add to cart</b-button>
              </b-button-group>
            </b-list-group-item>
          </b-list-group>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>


<script>
import businesscards from "./json/businesscards.json";
import { Store } from "../store/Store";

/**
 * Businesscards component described here
 *
 * @version 1.0.1
 * @displayName Businesscards
 */
export default {
  name: "Businesscards",
  data() {
    return {
      businesscardsItems: businesscards
    };
  },
  computed: {
    /**
     * Gets filtered values based on exclude property
     */
    getFilteredBusinessCards() {
      const filteredProductList = [];
      const excludePropertyName = [];
      let price = 3050;

      /**
       * Gets excludePropertyName array from exclude property
       */
      for (const excludePropertyGroup of this.businesscardsItems.excludes) {
        for (const excludePropertyItem of excludePropertyGroup) {
          if (excludePropertyName.indexOf(excludePropertyItem.property) < 0) {
            excludePropertyName.push(excludePropertyItem.property);
          }
        }
      }

      /**
       * Gets filteredProductList based on exclude properties
       */
      for (const cardPropertyGroup of this.businesscardsItems
        .propertyGroups) {
        for (const cardPropertyItem of cardPropertyGroup.properties) {
          for (const cardPropertyOption of cardPropertyItem.options) {
            for (const excludePropertyItemName of excludePropertyName) {
              if (cardPropertyItem.slug === excludePropertyItemName) {
                if (cardPropertyOption.name && cardPropertyOption.name.nl) {
                  --price; // mock price for demo
                  filteredProductList.push({
                    key: excludePropertyItemName,
                    value: cardPropertyOption.name.nl,
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
        const { key, value, price } = a;
        r[key] = [
          ...(r[key] || []),
          {
            value,
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