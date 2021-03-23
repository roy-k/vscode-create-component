import * as Case from 'case'

/**
 * list view
 * @param params
 */
export interface GenListTplParams {
    name: string
    extraStr?: string
}
export function genListTpl(params: GenListTplParams) {
    const { name, extraStr } = params

    return `<template>
    <div>
        <Card style="margin-bottom: 10px"
              class="top"
              dis-hover>
            <Form :model="formData"
                  :label-width="80"
                  :rules="rules"
                  inline>
                <!-- <FormItem class="query-item"
                          prop="judgeName"
                          label="名字"
                          label-position="left">
                    <Input type="text"
                           clearable
                           v-model="formData.judgeName"
                           @on-enter="searchData()">
                    </Input>
                </FormItem>
                <FormItem class="query-item"
                          prop="identityType"
                          label="类型"
                          label-position="left">
                    <Select clearable
                            v-model="formData.identityType"
                            @on-change="searchData()">
                        <Option v-for="item in enumJuryIdType"
                                :key="item.value"
                                :value="item.value">{{
                            item.label
                        }}</Option>
                    </Select>
                </FormItem>
                <FormItem class="query-item"
                          prop="identityType"
                          label="状态"
                          label-position="left">
                    <Select clearable
                            v-model="formData.status"
                            @on-change="searchData()">
                        <Option v-for="item in enumJuryStatus"
                                :key="item.value"
                                :value="item.value">{{
                            item.label
                        }}</Option>
                    </Select>
                </FormItem>
                <FormItem class="query-item"
                          prop="identityType"
                          label="类型"
                          label-position="left">
                    <Select clearable
                            v-model="formData.accountType"
                            @on-change="searchData()">
                        <Option v-for="item in enumAccountType"
                                :key="item.value"
                                :value="item.value">{{
                            item.label
                        }}</Option>
                    </Select>
                </FormItem> -->
                <FormItem :label-width="0">
                    <Button class="query-button"
                            type="primary"
                            @click="searchData()">查询</Button>
                    <Button class="query-button"
                            @click="resetQuery">重置</Button>
                </FormItem>
            </Form>
        </Card>
        <Card class="top mb-10"
              dis-hover>
            <Row class="mb-10"
                 type="flex"
                 justify="space-between">
                <Col span="16">
                <Button class="query-button"
                        type="primary"
                        @click="onCreateItem">新建</Button>
                </Col>
                <Col span="1"
                     class="tb_header_setting"
                     style="text-align: right;">
                <Poptip placement="left-start"
                        trigger="click">
                    <Button class="fr"
                            type="primary"
                            shape="circle"
                            icon="md-settings"
                            style="font-size:20px;"></Button>
                    <div slot="title">选择显示的表头字段</div>
                    <div slot="content">
                        <CheckboxGroup style="text-align:left"
                                       v-model="selectedColumns">
                            <Row v-for="item in defaultColumns"
                                 :key="item.key">
                                <Checkbox :label="item.key">
                                    <span>{{ item.title }}</span>
                                </Checkbox>
                            </Row>
                        </CheckboxGroup>
                    </div>
                </Poptip>
                </Col>
            </Row>
            <Tables :height="tableHeight"
                    ref="tables"
                    stripe
                    :loading="loading"
                    v-model="listData"
                    :columns="tableColumns"
                    :pageNo="page.pageNo"
                    :pageSize="page.pageSize"
                    :pageTotal="page.totalCount"
                    @getData="searchData"
                    :showSizer="true"
                    :page-size-opts="[10, 30, 50, 100]" />
        </Card>
        <Drawer :title="drawerState.title || '操作'"
                :closable="true"
                :mask-closable="drawerState.maskClosable !== undefined ? drawerState.maskClosable : true"
                :value="!!drawerState.state"
                v-model="showDrawer"
                :width="drawerWidth"
                @on-close="beforeCloseDrawer">
            <Form v-if="showDrawer && drawerState.state === 'juryInfo'"
                      v-bind="drawerState.props"
                      @on-drawer-submitOk="onDrawerSubmitOk" />
        </Drawer>
    </div>
</template>

<script>
import debounce from 'lodash/debounce';
// import { enumJuryIdType, enumJuryStatus, enumAccountType } from '@/enums/recommendBang';
import Tables from '_c/tables';
import Form from './form';
import { LS } from '_libs/persistence';

const domHeight = window.innerHeight - 376;
const tableHeight = Math.max(domHeight, 500);
const maxDrawerWidth = window.innerWidth - 256;

const initPage = {
    pageNo: 1,
    pageSize: 10,
    totalCount: 0,
};
const initFormData = {
    judgeName: '',
    uniProRecCharId: '',
    identityType: '',
    status: '',
    accountType: '',
};
const initColumnKeys = [
    'id',
    'status',
    'updateEmp',
    'operator',
];
export default {
    name: '${name}',
    components: {
        Tables,
        Form,
    },
    data() {
        // const localColumnKeysSet = LS('${Case.camel(Case.camel(name))}TableColumnsSet');
        // const selectedColumns = localColumnKeysSet || [...initColumnKeys];
        return {
            tableHeight,
            maxDrawerWidth,
            // uploadHeaders: { STAFFNAME: 'local' },
            // 查询条件备用
            loading: false,
            enumJuryIdType: enumJuryIdType.enumsData,
            enumJuryStatus: enumJuryStatus.enumsData,
            enumAccountType: enumAccountType.enumsData,
            formData: { ...initFormData },
            rules: {
                // password: [
                //   { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                //   { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' },
                // ],
            },
            page: { ...initPage },
            selectedColumns,
            defaultColumns: [
                {
                    key: 'id',
                    width: 100,
                    title: 'ID',
                },
                {
                    key: 'judgeName',
                    title: '名字',
                    width: 150,
                },
                {
                    key: 'judgeNickName',
                    title: '昵称',
                    width: 150,
                },
                {
                    key: 'judgePhone',
                    width: 150,
                    title: '手机号',
                },
                {
                    key: 'judgeIntroduction',
                    minWidth: 250,
                    title: '简介',
                    render: (h, { row, index }) => {
                        // 可以保留换行
                        return <pre>{row.judgeIntroduction}</pre>;
                    },
                },
                // {
                //     key: 'judgeIdentityTypes',
                //     title: '身份类型',
                //     width: 120,
                //     render: (h, { row, index }) => {
                //         const { judgeIdentityTypes = [] } = row;
                //         const str = judgeIdentityTypes.map(v => enumJuryIdType.getLabel(v)).join(', ');
                //         return <span>{str}</span>;
                //     },
                // },
                {
                    key: 'grade',
                    title: '等级',
                    width: 120,
                },
                {
                    key: 'area',
                    title: '地域',
                    width: 120,
                },
                {
                    key: 'status',
                    title: '状态',
                    width: 120,
                    render: (h, { row, index }) => {
                        return <span>{enumJuryStatus.getLabel(row.status)}</span>;
                    },
                },
                {
                    key: 'updateEmp',
                    title: '最后操作人',
                    width: 120,
                },
                {
                    key: 'operator',
                    title: '操作',
                    width: 320,
                    fixed: 'right',
                    render: (h, { row, index }) => {
                        const { status, id } = row;
                        return [
                            <Button
                                // vAuthority={'U0190302'}
                                class="mr8"
                                onClick={e => {
                                    this.onEditItem(row);
                                }}
                            >
                                编辑
                            </Button>,
                            status === 1 && (
                                <Button
                                    // vAuthority={'U0190305'}
                                    class="mr8"
                                    onClick={e => {
                                        this.updateJudgeStatus(id, 2);
                                    }}
                                >
                                    通过审核
                                </Button>
                            ),
                        ];
                    },
                },
            ],
            listData: [],
            showDrawer: false,
            drawerState: {
                state: '',
                props: {},
            },
        };
    },
    computed: {
        drawerWidth() {
            const dt = this.drawerState.width;
            return dt ? Math.min(maxDrawerWidth, dt) : maxDrawerWidth;
        },
        tableColumns() {
            return this.defaultColumns
            // return this.defaultColumns.filter(({ key }) => this.selectedColumns.includes(key));
        },
    },
    watch: {
        // selectedColumns() {
        //     LS('${Case.camel(name)}TableColumnsSet', this.selectedColumns);
        // },
    },
    methods: {
        async searchData(params) {
            const query = Object.assign(
                {},
                this.formData,
                params || {
                    pageNo: 1,
                    pageSize: this.page.pageSize,
                }
            );
            this.loading = true;
            try {
                // const data = await getDataList(query);
                // this.loading = false;
                // const { totalCount, pageSize, pageNo, content } = data;
                // this.page = {
                //     pageNo: pageNo ?? query.pageNo,
                //     pageSize: pageSize ?? query.pageSize,
                //     totalCount,
                // };
                // this.listData = content ?? [];
            } catch (error) {
                this.loading = false;
            }
        },
        debounceSearchData: debounce(function (params) {
            return this.searchData(params);
        }, 100),
        resetQuery() {
            this.formData = { ...initFormData };
            this.searchData();
        },
        onCreateItem(item) {
            this.drawerState = {
                state: 'form',
                title: '新建',
                maskClosable: false,
                width: 600,
                props: {
                    type: 'create',
                    juryItem: item,
                },
            };
            this.showDrawer = true;
        },
        onEditItem(item) {
            this.drawerState = {
                state: 'form',
                title: '编辑',
                maskClosable: false,
                width: 600,
                props: {
                    type: 'edit',
                    juryItem: item,
                },
            };
            this.showDrawer = true;
        },
        onDrawerSubmitOk(data) {
            const {noRefresh, keepDrawer} = data || {}
            if (!noRefresh) {
                this.searchData();
            }
            if(!keepDrawer) {
                this.showDrawer = false;
            }
        },
        beforeCloseDrawer() {
            this.drawerState = {
                ...this.drawerState,
                state: '',
                props: {},
            };
        },
    },
    mounted() {
        this.searchData();
    },
};
</script>

<style lang="less">
    // @import '~@/assets/styles/vars.less';
</style>
`
}
