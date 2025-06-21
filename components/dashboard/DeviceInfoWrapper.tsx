'use client'

import dynamic from 'next/dynamic'

// Dynamically import DeviceInfo with SSR disabled
const DeviceMap = dynamic(() => import('@/components/dashboard/device-map'), { ssr: false })

const DeviceInfoWrapper = () => {
  return <DeviceMap/>
}

export default DeviceInfoWrapper