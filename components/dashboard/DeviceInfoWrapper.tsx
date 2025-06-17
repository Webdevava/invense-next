'use client'

import dynamic from 'next/dynamic'

// Dynamically import DeviceInfo with SSR disabled
const DeviceInfo = dynamic(() => import('@/components/dashboard/device-info'), { ssr: false })

const DeviceInfoWrapper = () => {
  return <DeviceInfo />
}

export default DeviceInfoWrapper