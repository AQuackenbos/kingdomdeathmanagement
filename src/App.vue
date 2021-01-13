<template>
  <main id="app" class="">
    <b-message type="is-danger" title="TODO LIST" size="is-small" v-if="todos.length > 0">
      {{ todos }}
    </b-message>
    <b-loading :is-full-page="true" :can-cancel="false" v-model="showLoading">
      <div class="loading-icon" />
      <p style="position:absolute;color:#999">{{ loadingText }}</p>
    </b-loading>
    <Navigation/>
    <div class="container">
      <div class="columns">
        <transition appear name="fade" mode="out-in">
          <router-view :key="routeId"></router-view>
        </transition>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
@import "~@creativebulma/bulma-divider";

.divider {
  &.is-vertical {
    &::before {
      margin-bottom: 0
    }
    
    &::after {
      margin-top: 0
    }
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.slide-enter-active {
  transition: all .15s ease;
}
.slide-leave-active {
  transition: all .15s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter {
  opacity: 0;
  transform: translateX(-10em);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(10em);
}

/** This is hijacked ENTIRELY from Black Ledger. **/

@font-face {
  font-family: 'blackledger';
  src:  url('assets/fonts/blackledger.eot');
  src:  url('assets/fonts/blackledger.eot#iefix') format('embedded-opentype'),
    url('assets/fonts/blackledger.ttf') format('truetype'),
    url('assets/fonts/blackledger.woff') format('woff'),
    url('assets/fonts/blackledger.svg#blackledger') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="bl-"], [class*=" bl-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  vertical-align: middle;
  font-family: 'blackledger' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.special-icon {
    display: inline-block;
    vertical-align: top;
}

.special-icon.small {
    width: 20px;
    height: 20px;
}
.diamond {
    display: inline-block;
    font-weight: bold;
    color: white;
    font-size: 1em;
    line-height: .5em;
    padding-top: 4px;
    width: 1em;
    height: 1em;
    background: black;
/* Rotate */
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
/* Rotate Origin */
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    -o-transform-origin: 0 100%;
    transform-origin: 0 100%;
    margin: 3px -6px 1px 10px;
}

.armor-block {
  position: relative;
  
  .bl-armor {
    vertical-align: bottom;
    color: black;
    font-size: 1.5em;
  }
  
  .amount {
    position: absolute;
    left: 0.35em;
    color: white;
    z-index: 5;
  }
}

.is-scaled {
  .is-size-1, &.is-size-1 {
    font-size: 3em !important;
  }
  .is-size-2, &.is-size-2 {
    font-size: 2.5em !important;
  }
  .is-size-3, &.is-size-3 {
    font-size: 2em !important;
  }
  .is-size-4, &.is-size-4 {
    font-size: 1.5em !important;
  }
  .is-size-5, &.is-size-5 {
    font-size: 1.25em !important;
  }
  .is-size-6, &.is-size-6 {
    font-size: 1em !important;
  }
  .is-size-7, &.is-size-7 {
    font-size: .75em !important;
  }
}

.bl-expansion-dragonking:before {
  content: "\e90f";
}
.bl-expansion-dungbeetleknight:before {
  content: "\e910";
}
.bl-expansion-flowerknight:before {
  content: "\e911";
}
.bl-expansion-liongod:before {
  content: "\e912";
}
.bl-expansion-lionknight:before {
  content: "\e913";
}
.bl-expansion-manhunter:before {
  content: "\e914";
}
.bl-expansion-slenderman:before {
  content: "\e915";
}
.bl-expansion-spidicules:before {
  content: "\e916";
}
.bl-expansion-sunstalker:before {
  content: "\e917";
}
.bl-expansion-gorm:before {
  content: "\e918";
}
.bl-random:before {
  content: "\e919";
}
.bl-ammo:before {
  content: "\e90e";
}
.bl-archive:before {
  content: "\e91f";
}
.bl-milestone:before {
  content: "\e91b";
}
.bl-skull:before {
  content: "\e91c";
}
.bl-timeline:before {
  content: "\e91d";
}
.bl-action:before {
  content: "\e900";
}
.bl-armor:before {
  content: "\e901";
}
.bl-arms:before {
  content: "\e902";
}
.bl-body:before {
  content: "\e903";
}
.bl-develop:before {
  content: "\e904";
}
.bl-endeavor:before {
  content: "\e905";
}
.bl-gear:before {
  content: "\e906";
}
.bl-head:before {
  content: "\e907";
}
.bl-lantern:before {
  content: "\e908";
}
.bl-legs:before {
  content: "\e909";
}
.bl-movement:before {
  content: "\e90a";
}
.bl-nemesis-event:before {
  content: "\e90b";
}
.bl-settlement-event:before {
  content: "\e90c";
}
.bl-special-showdown:before {
  content: "\e90d";
}
.bl-story-event:before {
  content: "\e91a";
}
.bl-waist:before {
  content: "\e91e";
}

</style>

<script>
import Navigation from '@/components/navigation.vue'

export default {
  data: () => ({ todos: ['Finish Survivor Severe Injury area', 'Hunt Thinger','Create User Approval Method', 'Make Categories for Gear/Resources autofills'] }),
  computed: {
    routeId() {
      return this.$route?.name?.split(' ')[0]
    }
  },
  components: {
    Navigation
  }
}
</script>