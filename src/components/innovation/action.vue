<template>
    <div class="action content">
    <section class="field is-grouped" style="width:100%">
      <p class="left light-brown">
        <a class="bl-endeavor is-size-3" style="color:black;background:white;border-radius:5em;" v-for="n in action.cost" :key="n"><br /></a>
      </p>
      <p class="right brown">
        <strong v-if="action.name">{{ action.name }} &mdash;&nbsp;</strong>
        <span v-if="action.description" v-html="action.description" />
      </p>
    </section>
    <table class="table is-striped" v-if="action.results">
      <tbody>
        <tr v-for="(r,i) in action.results" :key="i">
          <td class="left" v-html="r.roll" />
          <td class="right" v-html="r.result" />
        </tr>
      </tbody>
    </table>
    </div>
</template>

<style lang="scss">
.brown {
  background: #9c6833 !important;
  color: #fff !important;
}

.light-brown {
  background: #e4b98e !important;
}

.button.circle-icon {
  padding: 0.5em 1em;
}


.action {
  &:not(:last-child) {
    margin-bottom: 1em;
  }

  strong {
    color: white;
  }
  
  .field {
    margin-bottom: 0;
  }
  
  .table {
    margin-top: 0;
  }
  
  p, td {
    font-size: 0.75em;
    border: 1px solid black;
    margin-bottom: 0 !important;
    padding: .5em;
    
    ul {
      margin-top: 0;
    }
    
    &.left {
      width: 20%;
      border-radius: .5em 0 0 .5em;
    }
    
    &.right {
      width: 80%;
      border-radius: 0 .5em .5em 0;
      text-align: left;
    }
  }
  
  td strong {
    color: black;
  }
  
  .button {
    background: black;
    color: white;
  }
}

</style>
<script>
export default {
    name: 'Action',
    props: ['action']
}
</script>