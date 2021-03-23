/**
 * default view
 * @param params
 */
export interface GenDefaultTplParams {
    name: string
    extraStr?: string
}
export function genDefaultTpl(params: GenDefaultTplParams) {
    return `<template>
  <div></div>
</template>

<script>
// 
export default {
    name: 'Default',
    data() {
        return {}
    },
    computed: {},
    methods: {},
    mounted() {},
}
</script>

<style>

</style>`
}
