import { useEffect } from "react";
import RouteContainer from "./components/RouteContainer";
import './index.css';
import ToastProvider from "./toast/ToastProvider";
import { AuthenticateProvider } from "./useAuthenticate";
import { App as CapacitorApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

export default function App() {
 useEffect(() => {

  if (Capacitor.isNativePlatform()) {
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setStyle({ style: Style.Dark });
    StatusBar.setBackgroundColor({ color: '#FFFFFF' });
  }

  let backListener;

  const setupBackButton = async () => {
    if (Capacitor.isNativePlatform()) {
      backListener = await CapacitorApp.addListener(
        'backButton',
        ({ canGoBack }) => {
          if (canGoBack) {
            window.history.back();
          } else {
            CapacitorApp.exitApp();
          }
        }
      );
    }
  };

  setupBackButton();

  return () => {
    if (backListener) {
      backListener.remove();
    }
  };
}, []);
  return (
    <ToastProvider>
      <AuthenticateProvider>
        <RouteContainer />
      </AuthenticateProvider>
    </ToastProvider>
  )
}

