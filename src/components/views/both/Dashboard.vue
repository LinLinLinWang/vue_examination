<template>
    <div>
    </div>
</template>

<script>

    export default {
        name: 'dashboard',
        data() {
            return {}
        },
        created() {
this.checkuser();
        },
        methods: {
            checkuser() {
                alert(this.$store.state.user);

                alert(this.$store.state.token);
                if (this.$store.state.user.type === 1) {
                    console.log("将要跳转管理员界面"+this.$store.state.user.type)
                    this.$router.push({path: '/manager'});
                } else {
                    console.log("将要跳转普通用户界面"+this.$store.state.user.type)
                    this.$router.push({path: '/normalUserDashboard'});
                }
            }
        }
    }

</script>


<style scoped>
</style>
