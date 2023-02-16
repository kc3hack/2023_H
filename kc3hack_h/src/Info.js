import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {useEffect,useState} from 'react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


reportWebVitals();


function Info(){

    /* Service workerの登録 */
    /* 参考 https://neos21.net/blog/2022/08/05-01.html */
    
    useEffect(() => {

        /*
        // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す。
        const register_serviceWorker = async () => {

            //登録したService Worker
            const serviceWorkerRegistration = await window.navigator.serviceWorker.register('./service-worker.js', { scope: '/' });

            if(serviceWorkerRegistration.installing) {
                console.log('  Service Worker を初回登録しています…', serviceWorkerRegistration);
                //@type {ServiceWorker} インストール中の Service Worker 
                const installingServiceWorker = serviceWorkerRegistration.installing;
                installingServiceWorker.addEventListener('statechange', (event) => {
                console.log('  Service Worker の初回インストール状況 : ', installingServiceWorker.state, event);  // (installing) → installed → activating → activated
            });
            }else {
                // 2回目以降は `serviceWorkerRegistration.installing` は `null` になっており `active` プロパティの方に ServiceWorker が格納されている模様
                console.log('  Service Worker はインストール済のようです', serviceWorkerRegistration);
            }

            await navigator.serviceWorker.ready;  // Service Worker の準備を待機する : 戻り値は `serviceWorkerRegistration` と同一なのでココでは再取得しなくて良い
            console.log("register_serviceWorker:成功");
        }
        

        register_serviceWorker();
        */
        serviceWorkerRegistration.register();

        const announcePush = async () => {
            // Service Worker を取得する
            const serviceWorkerRegistration = await navigator.serviceWorker.ready;
            console.log(serviceWorkerRegistration);

            // 公開鍵の文字列 : 別途用意しておく
            const applicationServerPublicKey = 'BIfAzcSgX28wre3ya6KDreW4D8lEwzC_ihEmBnUKa2epyRAEdvb7rMeLjj-3etgtE_HTKjnHDApnACAJWzTs9eo';

            /** @type {PushSubscription} Push サービスを開始する : ココで Push 通知の許可ウィンドウが表示される */
            const pushSubscription = await serviceWorkerRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(applicationServerPublicKey)
            });

            // サーバに PushSubscription 情報を送信する
            const response = await window.fetch('/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pushSubscription.toJSON())
            });

            //公開鍵変換用関数
            function urlBase64ToUint8Array(base64String) {
                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding).replace((/\-/g), '+').replace((/_/g), '/');
                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);
                for(let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
                return outputArray;
            }
            
        }
        
        announcePush();
        
    },[])


    /* NotificationAPIテスト*/
    /*
    useEffect(() => {
        Notification.requestPermission().then(function(result) {
            console.log(result);
        });
      const n = new Notification('テスト')
        }
      ,[]);
      */
    
    return(
        <>
        <div>
          天気画面
        </div>
        </>
      )
    
  }

  export default Info; 