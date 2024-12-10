<template>
  {{ displayMessage }}
  <br />
  {{ closedMessage }}
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
    const closedMessage = ref("");
    const isInClient = ref<boolean | "NOT_INITIALIZED">("NOT_INITIALIZED");
    const liffState = reactive<LiffState>({
      profile: undefined,
    });
    const delay = 5000; // 5秒後に閉じる
    const countdownInterval = ref<ReturnType<typeof setInterval> | null>(null); // タイマーのIDを保持するための変数
    const countdownTime = ref(delay / 1000); // カウントダウンの時間（秒）

    const getProfile = async () => {
      const liffId = process.env.VUE_APP_LIFF_ID || "";
      isInClient.value = await liff.isInClient();
      if (isInClient.value) {
        try {
          displayMessage.value = `LIFF ID：${liffId}`;
          await liff.init({ liffId: liffId });
          const profile = await liff.getProfile();
          liffState.profile = profile;
          displayMessage.value = liffState.profile.userId;
          liff.scanCodeV2();
        } catch {
          displayMessage.value = "エラーが発生しました。";
        }
      } else {
        displayMessage.value = "LIFF IDが設定されていないか、LINEブラウザで開かれていません";
      }
    };

    const startTimer = () => {
      closedMessage.value = `${countdownTime.value}秒後にブラウザを閉じます`;

      countdownInterval.value = setInterval(() => {
        countdownTime.value -= 1;
        if (countdownTime.value <= 0) {
          clearInterval(countdownInterval.value!); // インターバルをクリア
          liff.closeWindow(); // ブラウザを閉じる
        } else {
          closedMessage.value = `${countdownTime.value}秒後にブラウザを閉じます`;
        }
      }, 1000); // 1秒ごとに更新
    };

    onMounted(async () => {
      await getProfile();
      await startTimer();
    });

    return {
      displayMessage,
      closedMessage,
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