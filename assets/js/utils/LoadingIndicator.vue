<template>
<transition name="spinner">
    <div class="spinner-mask" v-if="show">
        <div class="spinner-wrapper">
            <div class="spinner-container">
            <div class="spinner-border text-secondary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            </div>
        </div>
    </div>
</transition>
</template>
<script>

export default {
    data: function() {
        return {
            show: false
        }
    },
    mounted: function () {
        this.show = true
        // needed for transition to work
        this.$nextTick(() => {
            this.show = true
        })
    },
    methods: {
        hide: function() {
            this.show = false
            this.$nextTick(() => {
                this.$emit('hide')
            })
        },
        showp: function() {
          this.show = true
        }
    }
}
</script>
<style>
.spinner-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .15);
  display: table;
  transition: opacity .3s ease;
}
.spinner-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.spinner-container {
  margin: 0px auto;
  width: 5rem;
  transition: all .3s ease;
}
.spinner-border {
  height: 5rem;
  width: 5rem;
}
.spinner-enter {
  opacity: 0;
}
.spinner-leave-active {
  opacity: 0;
}
.spinner-enter .spinner-container,
.spinner-leave-active .spinner-container {
  -webkit-transform: scale(2);
  transform: scale(2);
}
</style>