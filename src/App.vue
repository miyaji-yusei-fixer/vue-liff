<template>
  {{ displayMessage }}
  <br />
  {{ closedMessage }}
  <div v-if="scannedValue">
    <h2>スキャン結果:</h2>
    <p>{{ scannedValue }}</p>
  </div>
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
    const scannedValue = ref("");
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
          liff.scanCodeV2()
            .then((result) => {
              scannedValue.value = result.value || ""; // QRコードから読み取った値を保存
            })
            .catch((error) => {
              console.error('QR code scan failed:', error);
            })
            .then(() => {
              startTimer();
            });
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

    onMounted(() => {
      getProfile();
    });

    return {
      displayMessage,
      closedMessage,
      scannedValue,
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