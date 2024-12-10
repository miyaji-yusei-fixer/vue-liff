<template>
  {{ displayMessage }}
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import liff from "@line/liff";

type LiffState = {
  profile?: {
    userId: string;
    displayName: string;
    pictureUrl?: string;
    statusMessage?: string;
  };
};

export default defineComponent({
  name: 'App',
  setup() {
    const displayMessage = ref("");
    const isInClient = ref<boolean | "NOT_INITIALIZED">("NOT_INITIALIZED");
    const liffState = reactive<LiffState>({
      profile: undefined,
    });

    const getProfile = async () => {
      const liffId = process.env.VUE_APP_LIFF_ID || "";
      isInClient.value = await liff.isInClient()
      if (isInClient.value) {
        try {
          displayMessage.value = `LIFF ID：${liffId}`;
          await liff.init({ liffId: liffId });
          const profile = await liff.getProfile();
          liffState.profile = profile;
          displayMessage.value = liffState.profile.userId
        } catch {
          displayMessage.value = "エラーが発生しました。"
        }
      } else {
        displayMessage.value = "LIFF IDが設定されていないか、LINEブラウザで開かれていません";
      }
    };

    onMounted(() => {
      getProfile();
    });

    return {
      displayMessage, // displayMessage を返す
      liffState,
      isInClient,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>