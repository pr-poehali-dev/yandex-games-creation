import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

declare global {
  interface Window {
    YaGames: any;
    ysdk: any;
  }
}

async function initYandexSDK() {
  try {
    if (window.YaGames) {
      const ysdk = await window.YaGames.init();
      window.ysdk = ysdk;
      console.log('✅ Яндекс SDK инициализирован');
    }
  } catch (error) {
    console.error('❌ Ошибка инициализации Яндекс SDK:', error);
  }
}

initYandexSDK();

createRoot(document.getElementById("root")!).render(<App />);