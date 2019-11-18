<template>
    <div>
        <div class="card-title"><h5><i class="fas fa-id-badge"></i>Information</h5></div>
        <b-card no-body>
            <b-list-group flush>
                <b-list-group-item>
                    <b-form-group
                        label-cols-lg="3"
                        label="Lab Name"
                        label-for="input-labName"
                        class="m-0 required"
                        invalid-feedback="Please provide a valid lab name"
                        >
                        <b-form-input required :state="hasChange ? validLabName : null" v-model="info.lab.name" id="input-labName"></b-form-input>
                    </b-form-group>
                </b-list-group-item>
                <b-list-group-item>
                    <b-form-group
                        label-cols-lg="3"
                        label="Description"
                        label-for="input-labDesc"
                        class="m-0"
                        invalid-feedback="Description cannot exceed 255 characters"
                        >
                        <b-form-textarea :state="hasChange ? validLabDesc : null" v-model="info.lab.descr" max-rows="6" id="input-labDesc"></b-form-textarea>
                    </b-form-group>
                </b-list-group-item>
                <b-list-group-item>
                    <b-form-group
                        label-cols-lg="3"
                        label="Room"
                        label-for="input-labRoom"
                        class="m-0"
                        invalid-feedback="Room cannot exceed 100 characters"
                        >
                        <b-form-input :state="hasChange ? validLabRoom : null" v-model="info.room" id="input-labRoom"></b-form-input>
                    </b-form-group>
                </b-list-group-item>
                <b-list-group-item>
                    <b-form-group
                        label-cols-lg="3"
                        label="Lab Manager"
                        label-for="input-manager"
                        class="m-0 required"
                        :state="hasChange ? validLabManager : null"
                        invalid-feedback="Please select a manager"
                        >
                        <slot name="manager" :info="info"></slot>
                    </b-form-group>
                </b-list-group-item>
                <b-list-group-item>
                    <b-form-group
                        label-cols-lg="3"
                        label="Building"
                        label-for="input-building"
                        class="m-0 required"
                        :state="hasChange ? validLabBuilding : null"
                        invalid-feedback="Please select a building"
                        >
                        <slot name="building" :info="info"></slot>
                    </b-form-group>
                </b-list-group-item>
                <b-list-group-item>
                    <b-form-group
                        label-cols-lg="3"
                        label="Site"
                        label-for="input-site"
                        class="m-0 required"
                        :state="hasChange ? validLabSite : null"
                        invalid-feedback="Please select a site"
                        >
                        <slot name="site" :info="info"></slot>
                    </b-form-group>
                </b-list-group-item>                
            </b-list-group>
        </b-card>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            required: true,
            type: Object
        }
    },
    data: function() {
        return {
            info: JSON.parse(JSON.stringify(this.data))
        }
    },
    watch: {
        info: {
            deep: true,
            handler() {
                if (this.hasChange) {                    
                    this.$emit('update', this.info)
                } else {
                    this.$emit('update', null)
                }
            }
        }
    },
    computed: {
        hasChange() {
            return JSON.stringify(this.data) !== JSON.stringify(this.info);
        },
        validLabName() {
            return this.info.lab.name != null && this.info.lab.name.length > 0 && this.info.lab.name.length <= 100;
        },
        validLabDesc() {
            return this.info.lab.descr.length <= 255;
        },
        validLabRoom() {
            return this.info.room.length <= 100;
        },
        validLabManager() {
            return this.info.manager.name != null && this.info.manager.name != '';
        },
        validLabBuilding() {
            return this.info.building.name != null && this.info.building.name != '';
        },
        validLabSite() {
            return this.info.site.name != null && this.info.site.name != '';
        }
    },
    methods: {
        isValid() {
            if (
                this.validLabName &&
                this.validLabDesc &&
                this.validLabRoom &&
                this.validLabManager &&
                this.validLabBuilding &&
                this.validLabSite
            ) {
                return Promise.resolve();
            }

            return Promise.reject();
        }
    }
}
</script>