import { useState, useCallback, useEffect } from 'react';
import { useSessionStorageState } from 'ahooks';

interface SystemData {
  navigationWord?: string;
  loginLogo?: string;
  browserLogo?: string;
  navigationLogo?: string;
  /** 工单开关 */
  workOrderFlag?: 'YES' | 'NO';
  /** 接口文档 */
  interfaceDocFlag?: 'YES' | 'NO';
  /** 升级公告 */
  noticeFlag?: 'YES' | 'NO';
  [propName: string]: any;
}

interface WxSystemData {
  /** 企微应用头像 */
  squareLogoUrl?: string;
  /** 企微应用名称 */
  agentAppName?: string;
  [propName: string]: any;
}

interface systemConfigMap {
  systemData: SystemData | null;
  wxSystemData: WxSystemData | null;
}

export default function systemConfigMap() {
  const [systemConfigMap, setSystemConfig] = useState<systemConfigMap>({
    systemData: {
      workOrderFlag: 'YES',
      interfaceDocFlag: 'YES',
      noticeFlag: 'YES',
    },
    wxSystemData: null,
  });

  const updateWxSystemData = useCallback((wxSystemData: WxSystemData) => {
    setSystemConfig((state: systemConfigMap) => {
      return {
        ...state,
        wxSystemData,
      };
    });
  }, []);

  // 无效
  const [msg, setmsg] = useSessionStorageState('nickname');
  useEffect(() => {
    console.log('session');
  }, [msg]);

  return {
    systemConfigMap,
    updateWxSystemData,
  };
}
