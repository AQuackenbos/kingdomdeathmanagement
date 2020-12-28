<template>
  <div class="box gear-card">
    <div class="armor" v-if="item.type === 'armor' || item.grants.armor">
      <div class="armor-block">
        <span class="bl-armor is-size-4"></span>
        <span class="amount">{{ item.armor.amount }}</span>
        <span class="armor-loc" :class="iconTranslation[l]" v-for="l in item.armor.locations" :key="l"></span>
      </div>
    </div>
    <div class="weapon" v-if="item.type === 'weapon' || item.grants.attack">
      <div class="weapon-holder">
        <span class="bl-action" style="color:black;background:white;border-radius:5em"></span>
        <hr />
        <span>{{ item.weapon.speed }}</span>
        <div class="weapon-inner">
          <div class="top">{{ item.weapon.accuracy }}</div>
          <div class="bot">{{ item.weapon.strength }}</div>
        </div>
      </div>
    </div>
    <div class="top-text">
      <h1 class="is-size-5">{{ item.name }}</h1>
      <p class="is-size-7">{{ classifications }}</p>
    </div>
    <div class="center-image">
        <div v-if="item.type === 'armor' || item.grants.armor">
          <div v-if="item.armor.locations.length > 0">
            <span class="is-size-1" :class="iconTranslation[l]" v-for="l in item.armor.locations" :key="l"></span>
          </div>
          <div v-else>
            <span class="is-size-1" :class="iconTranslation['armor']"></span>
          </div>
        </div>
        <div v-else-if="item.type === 'weapon' || item.grants.attack">
          <span class="is-size-1" :class="iconTranslation['weapon']"></span>
        </div>
        <div v-else-if="item.type === 'item'">
          <span class="is-size-1" :class="iconTranslation['item']"></span>
        </div>
        <div v-else>
          <span class="is-size-1 bl-random"></span>
        </div>
    </div>
    <div class="bottom-text">
      <div v-if="item.affinities.length > 0">
        <div class="affinity" v-for="(a,aidx) in item.affinities" :key="aidx">
          <b-icon icon="square-full" :style="{ color: a.toLowerCase() }" size="is-medium" />
        </div>
      </div>
      <div class="is-size-6 keywords" v-if="item.keywords.length > 0">
        <span v-for="(k,kidx) in item.keywords" :key="kidx">
          <strong>{{ k }}</strong>
          <span v-if="(kidx+1) !== item.keywords.length">, </span>
        </span>
      </div>
      <div class="is-size-7 unlock" v-if="(item.unlock.requires && item.unlock.requires.length > 0)">
        <section class="field" :class="{ 'is-grouped': item.unlock.sizing !== 2 }" style="width:100%">
          <p :class="{ 'sm': item.unlock.sizing === 0, 'lg': item.unlock.sizing === 1, 'fl': item.unlock.sizing === 2 }">
            <b-icon
              v-for="(r,ridx) in item.unlock.requires.map(r => r.toLowerCase())" :key="ridx"
              :icon="r.includes('connection') ? 'puzzle-piece' : 'square-full'"
              size="is-small"
              :type="r.includes('red') ? 'is-danger' : r.includes('blue') ? 'is-info' : 'is-success'"
            />
          </p>
        </section>
      </div>
    </div>
    <div class="connection-container" :class="p" v-for="p in ['top','bottom','left','right']" :key="p">
      <div class="connection" :class="p">
        <span class="bl-milestone" v-if="item.connections[p]" :style="{ color: item.connections[p] }"></span>
      </div>
    </div>
  </div>
</template>

<script>
import GearCard from '@/components/storage/gear/card'

export default {
  name: 'GearMini',
  extends: GearCard
}
</script>