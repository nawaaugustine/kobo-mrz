/* eslint-disable @typescript-eslint/naming-convention */
import { registerPlugin, Plugin } from '@capacitor/core';

//TODO: Make value addition dynamic based on the value passed to the method
interface NativePluginInterface extends Plugin {
  sendMRT: (
    options: { Tazkira_no_001: string; name: string; father_name: string; hhh_age: number; hhh_gender: string }
  ) => Promise<Record<'response', string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LauncherActivity =
  registerPlugin<NativePluginInterface>('LauncherActivity');
