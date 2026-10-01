import { useState, useEffect } from 'react';

export interface NetworkDeviceInfo {
  isOnline: boolean;
  networkName: string;
  connectionType: string;
  downlink: number | null;
  rtt: number | null;
  devicePlatform: string;
  deviceName: string;
  browserName: string;
}

export function useNetworkDevice(): NetworkDeviceInfo {
  const [info, setInfo] = useState<NetworkDeviceInfo>(() => {
    return detectNetworkDevice();
  });

  useEffect(() => {
    const updateInfo = () => {
      setInfo(detectNetworkDevice());
    };

    window.addEventListener('online', updateInfo);
    window.addEventListener('offline', updateInfo);

    const nav = navigator as any;
    if (nav.connection) {
      nav.connection.addEventListener('change', updateInfo);
    }

    // Refresh every 5s for ping/telemetry
    const timer = setInterval(updateInfo, 5000);

    return () => {
      window.removeEventListener('online', updateInfo);
      window.removeEventListener('offline', updateInfo);
      if (nav.connection) {
        nav.connection.removeEventListener('change', updateInfo);
      }
      clearInterval(timer);
    };
  }, []);

  return info;
}

function detectNetworkDevice(): NetworkDeviceInfo {
  if (typeof window === 'undefined') {
    return {
      isOnline: true,
      networkName: 'Wi-Fi (Connected)',
      connectionType: 'wifi',
      downlink: 100,
      rtt: 15,
      devicePlatform: 'Linux Ubuntu',
      deviceName: 'Ubuntu Workstation',
      browserName: 'Chrome',
    };
  }

  const isOnline = navigator.onLine;
  const userAgent = navigator.userAgent || '';
  const nav = navigator as any;
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

  // Neutral Platform & Device Detection (no host-OS leakage)
  let devicePlatform = 'Desktop Browser';
  let deviceName = 'Web Client';

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    devicePlatform = 'Mobile Device';
    deviceName = 'iOS Client';
  } else if (/Android/i.test(userAgent)) {
    devicePlatform = 'Mobile Device';
    deviceName = 'Android Client';
  } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
    devicePlatform = 'Desktop Browser';
    deviceName = 'macOS Client';
  } else if (/Windows/i.test(userAgent)) {
    devicePlatform = 'Desktop Browser';
    deviceName = 'Desktop Client';
  } else if (/Linux/i.test(userAgent)) {
    devicePlatform = 'Desktop Browser';
    deviceName = 'Linux Client';
  }

  // Detect Browser
  let browserName = 'Browser';
  if (/Edg/i.test(userAgent)) browserName = 'Edge';
  else if (/Chrome/i.test(userAgent)) browserName = 'Chrome';
  else if (/Safari/i.test(userAgent)) browserName = 'Safari';
  else if (/Firefox/i.test(userAgent)) browserName = 'Firefox';

  // Detect Network Details
  let connectionType = 'network';
  let downlink: number | null = null;
  let rtt: number | null = null;

  if (connection) {
    connectionType = connection.type || connection.effectiveType || 'network';
    downlink = connection.downlink || null;
    rtt = connection.rtt || null;
  }

  // Clean, neutral network label without truncation issues
  let networkName = 'Online';
  if (!isOnline) {
    networkName = 'Offline';
  } else if (downlink) {
    networkName = `Wi-Fi (${downlink} Mbps)`;
  } else {
    networkName = 'Wi-Fi (Connected)';
  }

  return {
    isOnline,
    networkName,
    connectionType,
    downlink,
    rtt,
    devicePlatform,
    deviceName,
    browserName,
  };
}
