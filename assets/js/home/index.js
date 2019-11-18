// import AdminCatalog from '../../Components/AdminCatalog.vue'
// import LabLayout from './Components/LabLayout.vue'
// import FormMixin from '../../../mixins/Form'
// import TrxSelectModal from '../../../utils/TrxSelectModal'
// import TrxSearchModal from '../../../search/EmployeeSearchModal'
import { FormPlugin, FormGroupPlugin, LayoutPlugin, TooltipPlugin, FormCheckboxPlugin, FormInputPlugin, CardPlugin, ListGroupPlugin, ButtonPlugin, TabsPlugin, FormTextareaPlugin, DropdownPlugin } from 'bootstrap-vue'
Vue.use(FormGroupPlugin)
Vue.use(FormPlugin)
Vue.use(LayoutPlugin)
Vue.use(FormCheckboxPlugin)
Vue.use(FormInputPlugin)
Vue.use(CardPlugin)
Vue.use(ListGroupPlugin)
Vue.use(ButtonPlugin)
Vue.use(TabsPlugin)
Vue.use(FormTextareaPlugin)
Vue.use(DropdownPlugin)
Vue.use(TooltipPlugin)

const home = new Vue({
    el: '#home',
    data: {
        loading: true,
        filterKey: '',
        table: '',
        cols: null,
        rows: null,
    },
    created: function() {
        this.loading = false
    },
    components: {
        // AdminCatalog,
        // LabLayout,
        // TrxSelectModal,
        // TrxSearchModal        
    },
    methods: {
        rowInfos(info) {
            let form = this.makeForm('/admin/ehs/lab/info', {
                info: this.formatData(info, false),
                isNew: false
            });

            form.submit()
        },
        newLab() {
            let form = this.makeForm('/admin/ehs/lab/info', {
                info: this.formatData(),
                isNew: true
            });

            form.submit()
        },
        formatData(info = '', isNew = true) {
            let struct = {
                lab: {
                    id: info['id'] || '',
                    uuid: info['uuid'] || '',
                    descr: info['descr'] || '',
                    isActive: info['is_active'] || 'Active',
                    name: info['name'] || ''
                },
            };

            let struct2;

            if (!isNew) {
                struct2 = {
                    building: {
                        id: info['building_id'] || '',
                        name: info['building_name'] || ''                
                    },
                    manager: {
                        id: info['manager_id'] || '',
                        name: info['manager_name'] || '',
                    },
                    site: {
                        id: info['site_id'] || '',
                        name: info['site_name'] || ''
                    }
                };
            } else {
                struct2 = {
                    building: '',
                    manager: '',
                    site: ''
                };
            }

            let struct3 = {
                room: info['room'] || ''
            };

            return Object.assign({}, struct, struct2, struct3);
        }
    },
    mixins: [FormMixin]
 });