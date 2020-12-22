<template>
    <div class="footer-sec">
        © {{currentYear}}. All Rights Reserved.
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentYear: new Date().getFullYear()
        }
    }
}
</script>