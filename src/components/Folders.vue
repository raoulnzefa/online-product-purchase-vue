<template>
  <div>
    <h2>Folders</h2>
    <b-card-group deck v-for="(folder, index) in getFilteredFolderProducts" :key="index">
      <b-card no-body border-variant="light" align="left">
        <p class="card-header capitalize">{{index}}</p>
        <b-card-text>
          <b-list-group>
            <b-list-group-item
              class="capitalize"
              v-for="(folderItem, index) in folder"
              :key="index"
            >
              <span class="value-text-align">{{folderItem.details}}</span>
              <span class="price-text-align">{{folderItem.price | currency}}</span>
              <b-button-group class="b-button-group-align">
                <b-button variant="success" @click="addToCart(folderItem)">Add to cart</b-button>
              </b-button-group>
            </b-list-group-item>
          </b-list-group>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import foldersItem from "./json/folders.json";
import { Store } from "../store/Store";

/**
 * Folder component
 *
 * @version 1.0.1
 * @displayName Folders
 */
export default {
  name: "Folders",
  data() {
    return {
      folderListItems: foldersItem
    };
  },
  computed: {
    /**
     * Gets filtered values based on exclude property
     */
    getFilteredFolderProducts() {
      const filteredProductList = [];
      const excludePropertyName = [];
      let price = 1050;

      /**
       * Gets excludePropertyName array from exclude property
       */
      for (const excludePropertyGroup of this.folderListItems.excludes) {
        for (const excludePropertyItem of excludePropertyGroup) {
          if (excludePropertyName.indexOf(excludePropertyItem.property) < 0) {
            excludePropertyName.push(excludePropertyItem.property);
          }
        }
      }

      /**
       * Gets filteredProductList based on exclude properties
       */
      for (const folderPropertyGroup of this.folderListItems.propertyGroups) {
        for (const folderPropertyItem of folderPropertyGroup.properties) {
          for (const folderPropertyOption of folderPropertyItem.options) {
            for (const excludePropertyItemName of excludePropertyName) {
              if (folderPropertyItem.slug === excludePropertyItemName) {
                if (folderPropertyOption.name && folderPropertyOption.name.nl) {
                  --price; // mock price for demo
                  filteredProductList.push({
                    key: excludePropertyItemName,
                    details: folderPropertyOption.name.nl,
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