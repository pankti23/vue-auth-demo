<template>
    <div class="header-sec">
        {{userName}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: 'User'
        }
    },
    created() {
        this.$root.$on('changeUserName', (name) => {
            this.userName = name;
        });
    }
}
</script>