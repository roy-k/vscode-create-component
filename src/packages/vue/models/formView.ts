/**
 * form view
 * @param params
 */
export interface GenFormTplParams {
    name: string
    extraStr?: string
}
export function genFormTpl(params: GenFormTplParams) {
    const { name, extraStr } = params

    return `<template>
    <div class="scroll-container">
        <div class="container">
            <Form ref="formValidate"
                  :model="formData">
                <Card style="margin-bottom: 10px"
                      class="top">
                    <Row style="margin-bottom: 10px"
                         type="flex">
                        <Col :span="6">
                        <FormItem class="query-item"
                                  label="请输入">
                            <!-- <Input v-model="formData.qyMid"
                                   icon="ios-search"
                                   style="width:100%;"
                                   @on-enter="debounceValidate"
                                   placeholder="请输入"> -->
                            <!-- input 防止回车提交 -->
                            <input type="text"
                                   style="display:none;">
                        </FormItem>
                        </Col>
                        <Col :span="6">
                        <FormItem class="wp-100"
                            label="下拉">
                                <!-- <Select v-model="formData.tags"
                                    filterable
                                    multiple>
                                    <Option v-for="item in enums"
                                        :value="item.value"
                                        :key="item.value">{{ item.label }}</Option>
                                </Select> -->
                        </FormItem>
                        </Col>

                    </Row>
                </Card>
            </Form>
        </div>
        <div class="footer">
            <Button class=""
                    type="primary"
                    @click="onSubmit">确认</Button>
            <Button class=""
                    @click="onCloseDrawer">取消</Button>
        </div>
    </div>
</template>

<script>
import debounce from 'lodash/debounce';
// import { getSongInfoByQyMid, submitSongSync } from '@/api/recommendBang/list.graphql';

const domHeight = window.innerHeight - 376;
const tableHeight = Math.max(domHeight, 500);
const maxDrawerWidth = window.innerWidth - 256;

const initPage = {
    pageNo: 1,
    pageSize: 10,
    totalCount: 0,
};
const initFormData = {
    qyMid: '',
}

export default {
    name: '${name}',
    components: {},
    props: [],
    data() {
        return {
            tableHeight,
            maxDrawerWidth,
            formData: {...initFormData},
            rules: {},
            collapseVideos: [],
            songValidate: false,
            songInfo: {},
            page: { ...initPage },
            loading: false,
            noData: false,
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
    },
    watch: {
        // 'formData.qyMid'() {
        //     this.debounceValidate();
        // },
    },
    methods: {
        async onValidateId() {
            const { qyMid } = this.formData;
            if (!qyMid) {
                return;
            }
            // getSongInfoByQyMid({ qyMid }).then(
            //     res => {
            //         this.songInfo = res;
            //         this.songValidate = true;
            //     },
            //     msg => {
            //         this.songInfo = null;
            //         this.songValidate = false;
            //         this.$Message.error(msg);
            //     }
            // );
        },
        resetValidateId() {
            this.songInfo = null;
            this.songValidate = false;
        },
        debounceValidate: debounce(function () {
            return this.onValidateId();
        }, 700),
        onSubmit() {
            if (!this.songValidate) {
                return;
            }
            this.$emit('on-drawer-submitOk', {noRefresh: false, keepDrawer: false});
        },
        onCloseDrawer() {
            this.$emit('on-drawer-close');
        },
    },
    mounted() {},
};
</script>

<style lang="less" scoped>
    .scroll-container {
        height: 100%;
        overflow: auto;
        padding-bottom: 40px;
    }
    /deep/ .ivu-collapse-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .container {
        padding-bottom: 20px;
    }
    .footer {
        position: absolute;
        z-index: 99;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 15px;
        background-color: #fff;
        border-top: 1px solid #e8eaec;
    }
</style>
`
}
