<template>
  <div>
    <div>
      <div>
        <div>
          <b-card-group deck v-for="(folder, index) in fileredProducts" :key="index">
            <b-card no-body border-variant="light" align="left">
              <p class="card-header capitalize">{{index}}</p>
              <b-card-text>
                <b-list-group>
                  <b-list-group-item
                    class="capitalize"
                    v-for="(test, index) in folder"
                    :key="index"
                  >
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
      </div>
    </div>
  </div>
</template>


<script>
import businesscards from "./json/businesscards.json";
import { Store } from "../store/Store";

export default {
  name: "Businesscards",
  data() {
    return {
      businesscardsItems: businesscards
    };
  },
  computed: {
    fileredProducts() {
      const updatedQueryList = [];
      const pages = [];
      const obj = {};
      for (const newquery of this.businesscardsItems.excludes) {
        for (const newquery1 of newquery) {
          if (pages.indexOf(newquery1.property) < 0) {
            pages.push(newquery1.property);
          }
        }
      }

      for (const query of this.businesscardsItems.propertyGroups) {
        for (const query1 of query.properties) {
          for (const query2 of query1.options) {
            for (const page of pages) {
              if (query1.slug === page) {
                if (query2.name && query2.name.nl) {
                  updatedQueryList.push({
                    key: page,
                    value: query2.name.nl,
                    price: 350
                  });
                }
              }
            }
          }
        }
      }

      var cars = updatedQueryList.reduce((r, a) => {
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
      return cars;
    }
  },
  methods: {
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
</style>