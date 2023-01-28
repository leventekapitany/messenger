import { useUserStore } from './stores/user-store';

declare global {
  interface Window {
    handleToken: ({ credential }: { credential: string }) => void;
    google: {
      accounts: {
        id: {
          initialize: ({
            client_id,
            callback,
          }: {
            client_id: string;
            callback: CallableFunction;
          }) => void;
          prompt: (notification?: any) => void;
        };
      };
    };
  }
}

export default {
  init: () => {
    window.handleToken = async resp => {
      const token = resp.credential;
      const userStore = useUserStore();
      userStore.setUserFromToken(token);
    
      const { accessToken, tokenPayload } = userStore;
      console.log({ accessToken, tokenPayload });
    };
    
    window.google.accounts.id.initialize({
      client_id:
        '412380997821-cchlhvbh65qir6a9ujiio46mac58nel2.apps.googleusercontent.com',
      callback: window.handleToken,
    });
  },
  prompt: () => {
    window.google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        document.cookie = `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        window.google.accounts.id.prompt();
      }
    });
  }
}


