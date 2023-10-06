import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartPie, faCircleNodes, faHome } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
      <div className="w-100p h-full">
        {/* Top header */}
        <header className="bg-red-950 text-white px-4 py-2 text-sm flex justify-between items-center">
          <div className="flex items-center">
            <Image
              className="relative"
              src="/tesseractLogo.svg"
              alt="TesseractCMS Logo"
              width={20}
              height={22}
              priority
            />
            <div className="px-4">
              <a href="/" role="link">
                <FontAwesomeIcon icon={faHome} />
                <div className="inline px-1 underline">Syntax Meridian</div>
              </a>
            </div>
          </div>
        </header>

        {/* Content section */}
        <div className="flex w-full h-full">

          {/* Left sidebar */}
          <div className="w-64 h-full bg-red-950 text-white py-2">
            <div className="flex py-2 px-6 items-center bg-red-800">
              <FontAwesomeIcon icon={faCircleNodes} />
              <div className="inline px-1 text-sm">Dashboard</div>
            </div>
            <div className="flex py-2 px-6 items-center bg-red-900">
              <FontAwesomeIcon icon={faChartPie} />
              <div className="inline px-1 text-sm">Visitor Metrics</div>
            </div>
          </div>

          {/* Main content */}
          <div className="w-full h-full bg-gray-200 p-6">
            {/* Your main content goes here */}
          </div>

        </div>
      </div>
  )
}
