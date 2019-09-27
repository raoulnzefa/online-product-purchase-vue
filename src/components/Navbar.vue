<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand :to="{ name: 'Home' }">
      <b-img
        class="logo-align"
        rounded="circle"
        src="https://www.print.com/wp-content/themes/printdotcom/img/logo.svg"
        alt="Logo print.com"
      ></b-img>
    </b-navbar-brand>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item-dropdown text="Product">
          <b-dropdown-item :to="{ name: 'Posters' }">Posters</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'Folders' }">Folders</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'Businesscards' }">Businesscards</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
/**
 * Add to cart.
 *
 * @param {object} product
 * @public
 */
export default {
  name: "Navbar"
};
</script>

<style>
.logo-align {
  height: 50px;
  width: 50px;
}
</style>

