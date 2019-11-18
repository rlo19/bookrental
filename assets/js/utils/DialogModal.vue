<template>
<transition name="modal">
    <div class="modal-mask" v-if="show && isShow">
        <div class="modal-wrapper">
            <div class="modal-container" :class="size">
                <div v-if="header" class="modal-header bg-light">
                    <slot name="header">
                        {{ header }}
                        <span class="text-danger float-right" v-if="timer">{{ currentTime }}s</span>
                    </slot>
                </div>
                <slot name="body">
                    <div class="modal-body bg-white">
                        <span v-html="message"></span>
                    </div>
                </slot>
                <div class="modal-footer p-2 bg-light" :class="{'justify-content-between': cancel, 'justify-content-center': !cancel}">
                    <slot name="footer">
                        <button v-if="cancel" class="btn btn-secondary" @click="clickHandler('cancel')">
                            Cancel
                        </button>
                        <button v-if="ok" class="btn btn-primary" @click="clickHandler('ok')">
                            Okay
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</transition>
</template>
<script>

export default {
    props: {
        message: {
            type: String,
            default: ''
        },
        ok: {
            type: String,
            default: ''
        },
        cancel: {
            type: String,
            default: ''
        },
        isShow: {
            default: true,
            type: Boolean
        },
        header: {
            default: '',
            type: String
        },
        size: {
            default: '',
            type: String
        },
        /**
         * Number, in seconds, to count down
         */
        timer: {
            default: null,
            type: Number
        }
    },
    data: function() {
        return {
            show: false,
            currentTime: this.timer
        }
    },
    mounted: function () {
        // needed for transition to work
        this.$nextTick(() => {
            this.show = true

            if (this.timer) {
                var x = this.timers()
            }
        })
    },
    methods: {
        clickHandler: function(action) {
            this.show = false
            this.$nextTick(() => {
                this.$emit(action)
            })
        },

        timers: function () {
            var self = this
            return setInterval(() => {
                self.currentTime--

                if (self.currentTime < 0) {
                    this.clickHandler('ok')
                }
            }, 1000);
        }
    }
}
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 500px;
  margin: 0px auto;
  border-radius: .6rem;
  border: 6px solid rgba(0,0,0,.2);
  transition: all .3s ease;
}
.modal-container.sm {
    width: 400px;
}
.modal-container .modal-header {
    font-weight: bold;
}
.modal-container .modal-body {
    padding-bottom: 2rem;
}

.modal-container .modal-body.scroll {
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
}
.modal-container div:first-child {
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
}
.modal-container div:last-child {
    border-bottom-left-radius: .3rem;
    border-bottom-right-radius: .3rem;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>