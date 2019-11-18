<template>
    <div>
        <div class="card-body">
            <trx-table
                :cols="cols"
                :rows="filteredData"
                :filter-key="filterKey"
                :table="{_class: 'table-sm m-0 table-hover ' + table}"
                :current-page="currentPage"
                :items-per-page="itemsPer"
                @rowClick="rowClicked"
                @count="updateCount"
            >
                <template slot="emailGroupAction" slot-scope="props">
                    <button
                        @click.stop="handleRemoveRow(props.row)" 
                        v-b-tooltip
                        title='Remove'
                        class="btn-sm btn btn-outline-secondary border-0">
                        <i class="fas fa-times m-0"></i>
                    </button>
                </template>

            </trx-table>
        </div>
        <div class="card-footer">
            <trx-pager 
                v-model="currentPage"
                :item-count="itemCount"
                :items-per-page="itemsPer"
                :view-all="viewAll"
                @pagerview="pagerViewChange"
            ></trx-pager>
        </div>
    </div>
</template>

<script>
import { VBTooltip as BTooltip } from 'bootstrap-vue'
import TrxPager from '../../utils/TrxPager.vue';
import TrxTable from '../../utils/TrxTable.vue';
import PagerMixin from '../../mixins/Pagination';

export default {
    props: {
        rows: {
            required: true,
            type: Array
        },
        cols: {
            required: true,
            type: Array
        },
        filterKey: null,
        table: null,
        viewAll: undefined,
        preferredChoice: '',
        statusChoice: '',
        token: null
    },
    mixins: [PagerMixin],
    data: function() {
        
        return {
            currentPage: 1,
            itemsPerPage: 15,
            itemCount: this.rows.length
        }        
    },
    computed: {
        filteredData: function() {

            var data = this.rows;

            if((this.preferredChoice != undefined && this.preferredChoice.length > 0) || 
                (this.statusChoice != undefined && this.statusChoice.length > 0)
            ) {

                var prefer = this.preferredChoice;
                var status = this.statusChoice

                data = data.filter(function(row) {   
                                    
                    if(prefer.length > 0 && status.length > 0) {
                        return row.preferred == prefer && row.is_active == status;
                    } 

                    return row.preferred == prefer || row.is_active == status;
                });
            }

            return data;
        }
    },
    methods: {        
        rowClicked(row) {
            if(this.table !== undefined && this.table.indexOf('table-selectable') !== -1) {
                this.$emit('row-info', row);           
            }            
        },
        handleRemoveRow(row) {
            this.$emit('remove-row', row, this.token);
        }
    },
    components: {
        TrxPager,
        TrxTable,
    },
    directives: {
        BTooltip
    },
}
</script>