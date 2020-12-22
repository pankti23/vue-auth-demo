<template>
    <div>
        <h1>Hi {{userData.user.first_name}}!</h1>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            userData: state => state.auth            
        })
    },
};
</script>