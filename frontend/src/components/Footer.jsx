import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer
      className="wow fadeInUp relative dark:bg-[black] pt-20 lg:pt-[100px]"
      data-wow-delay=".15s"
    >
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-3/12">
            <div className="mb-10 w-full">
              <Link
                href="/"
                className="mb-6 inline-block max-w-[160px]"
              >
                 <svg width="32" height="32" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="">
                    <path d="M18.4989 7.28071C18.3936 7.17999 18.2535 7.12377 18.1078 7.12377C17.9621 7.12377 17.822 7.17999 17.7167 7.28071L4.69634 19.719C4.64105 19.7719 4.59705 19.8355 4.56703 19.9059C4.537 19.9763 4.52157 20.052 4.52165 20.1285L4.51953 31.8023C4.51953 32.4025 4.75797 32.9782 5.1824 33.4026C5.60683 33.8271 6.18248 34.0655 6.78272 34.0655H13.5793C13.8795 34.0655 14.1673 33.9463 14.3795 33.7341C14.5917 33.5218 14.7109 33.234 14.7109 32.9339V23.3154C14.7109 23.1653 14.7705 23.0214 14.8766 22.9153C14.9828 22.8092 15.1267 22.7496 15.2767 22.7496H20.9347C21.0847 22.7496 21.2287 22.8092 21.3348 22.9153C21.4409 23.0214 21.5005 23.1653 21.5005 23.3154V32.9339C21.5005 33.234 21.6197 33.5218 21.8319 33.7341C22.0441 33.9463 22.332 34.0655 22.6321 34.0655H29.4259C30.0261 34.0655 30.6018 33.8271 31.0262 33.4026C31.4506 32.9782 31.6891 32.4025 31.6891 31.8023V20.1285C31.6891 20.052 31.6737 19.9763 31.6437 19.9059C31.6137 19.8355 31.5697 19.7719 31.5144 19.719L18.4989 7.28071Z" fill="#45A71E"/>
                    <path d="M34.7187 17.3852L29.4285 12.3241V4.64415C29.4285 4.34404 29.3092 4.05621 29.097 3.844C28.8848 3.63178 28.597 3.51256 28.2969 3.51256H24.9021C24.602 3.51256 24.3142 3.63178 24.1019 3.844C23.8897 4.05621 23.7705 4.34404 23.7705 4.64415V6.90734L19.6741 2.99062C19.2908 2.60304 18.7208 2.38097 18.1048 2.38097C17.4909 2.38097 16.9223 2.60305 16.5389 2.99132L1.49582 17.3838C1.05592 17.8081 1.00075 18.5062 1.40105 18.9659C1.50158 19.0819 1.62466 19.1763 1.76281 19.2432C1.90096 19.3102 2.05129 19.3483 2.20465 19.3554C2.35802 19.3624 2.5112 19.3381 2.65489 19.284C2.79857 19.23 2.92976 19.1472 3.04045 19.0408L17.7158 5.01758C17.8211 4.91685 17.9612 4.86064 18.1069 4.86064C18.2526 4.86064 18.3927 4.91685 18.498 5.01758L33.1747 19.0408C33.3909 19.2482 33.6805 19.3613 33.98 19.3555C34.2795 19.3496 34.5644 19.2253 34.7724 19.0097C35.2067 18.5599 35.1706 17.8173 34.7187 17.3852Z" fill="#45A71E"/>
                  </svg>
              </Link>
              <p className="mb-8 max-w-[270px] text-base text-gray-7">
                Nuviane is dedicated to revolutionizing Housing Stabilization Services (HSS) through innovative technology solutions.
              </p>
              <div className="-mx-3 flex items-center">
                <Link
                  href="/"
                  className="px-3 text-gray-7 hover:text-white"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path
                      d="M16.294 8.86875H14.369H13.6815V8.18125V6.05V5.3625H14.369H15.8128C16.1909 5.3625 16.5003 5.0875 16.5003 4.675V1.03125C16.5003 0.653125 16.2253 0.34375 15.8128 0.34375H13.3034C10.5878 0.34375 8.69714 2.26875 8.69714 5.12187V8.1125V8.8H8.00964H5.67214C5.19089 8.8 4.74402 9.17812 4.74402 9.72812V12.2031C4.74402 12.6844 5.12214 13.1313 5.67214 13.1313H7.94089H8.62839V13.8188V20.7281C8.62839 21.2094 9.00652 21.6562 9.55652 21.6562H12.7878C12.994 21.6562 13.1659 21.5531 13.3034 21.4156C13.4409 21.2781 13.544 21.0375 13.544 20.8312V13.8531V13.1656H14.2659H15.8128C16.2596 13.1656 16.6034 12.8906 16.6721 12.4781V12.4438V12.4094L17.1534 10.0375C17.1878 9.79688 17.1534 9.52187 16.9471 9.24687C16.8784 9.075 16.569 8.90312 16.294 8.86875Z"
                    />
                  </svg>
                </Link>
                <a
                  href="/"
                  className="px-3 text-gray-7 hover:text-white"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path
                      d="M20.1236 5.91236C20.2461 5.76952 20.0863 5.58286 19.905 5.64972C19.5004 5.79896 19.1306 5.8974 18.5837 5.95817C19.2564 5.58362 19.5693 5.04828 19.8237 4.39259C19.885 4.23443 19.7 4.09092 19.5406 4.16647C18.8931 4.47345 18.1945 4.70121 17.4599 4.83578C16.7338 4.11617 15.6988 3.6665 14.5539 3.6665C12.3554 3.6665 10.5725 5.32454 10.5725 7.36908C10.5725 7.65933 10.6081 7.94206 10.6752 8.21276C7.51486 8.06551 4.6968 6.71359 2.73896 4.64056C2.60477 4.49848 2.36128 4.51734 2.27772 4.69063C2.05482 5.15296 1.93056 5.66584 1.93056 6.20582C1.93056 7.49014 2.6332 8.62331 3.70132 9.28732C3.22241 9.27293 2.76441 9.17961 2.34234 9.02125C2.13684 8.94416 1.90127 9.07964 1.92888 9.28686C2.14084 10.8781 3.42915 12.1909 5.09205 12.5011C4.75811 12.586 4.40639 12.6311 4.04253 12.6311C3.95431 12.6311 3.86685 12.6284 3.78019 12.6231C3.55967 12.6094 3.38044 12.8067 3.47499 12.9954C4.09879 14.2404 5.44575 15.1096 7.0132 15.1367C5.65077 16.13 3.93418 16.7218 2.06882 16.7218C1.83882 16.7218 1.74015 17.0175 1.9442 17.1178C3.52016 17.8924 5.31487 18.3332 7.22182 18.3332C14.545 18.3332 18.549 12.6914 18.549 7.79843C18.549 7.63827 18.545 7.47811 18.5377 7.31945C19.1321 6.92012 19.6664 6.44528 20.1236 5.91236Z"
                    />
                  </svg>
                </a>
                <Link
                  href="/"
                  className="px-3 text-gray-7 hover:text-white"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path
                      d="M11.0297 14.4305C12.9241 14.4305 14.4598 12.8948 14.4598 11.0004C14.4598 9.10602 12.9241 7.57031 11.0297 7.57031C9.13529 7.57031 7.59958 9.10602 7.59958 11.0004C7.59958 12.8948 9.13529 14.4305 11.0297 14.4305Z"
                    />
                    <path
                      d="M14.7554 1.8335H7.24463C4.25807 1.8335 1.83334 4.25823 1.83334 7.24479V14.6964C1.83334 17.7421 4.25807 20.1668 7.24463 20.1668H14.6962C17.7419 20.1668 20.1667 17.7421 20.1667 14.7555V7.24479C20.1667 4.25823 17.7419 1.8335 14.7554 1.8335ZM11.0296 15.4948C8.51614 15.4948 6.53496 13.4545 6.53496 11.0002C6.53496 8.54586 8.54571 6.50554 11.0296 6.50554C13.4839 6.50554 15.4946 8.54586 15.4946 11.0002C15.4946 13.4545 13.5134 15.4948 11.0296 15.4948ZM17.2393 6.91952C16.9436 7.24479 16.5 7.42221 15.9973 7.42221C15.5538 7.42221 15.1102 7.24479 14.7554 6.91952C14.4301 6.59425 14.2527 6.18027 14.2527 5.67758C14.2527 5.17489 14.4301 4.79049 14.7554 4.43565C15.0807 4.08081 15.4946 3.90339 15.9973 3.9339C16.4409 3.90339 16.914 4.08081 17.2393 4.40608C17.535 4.79049 17.7419 5.23403 17.7419 5.70715C17.7124 6.18027 17.535 6.59425 17.2393 6.91952Z"
                    />
                    <path
                      d="M16.0276 4.96777C15.6432 4.96777 15.318 5.29304 15.318 5.67745C15.318 6.06186 15.6432 6.38713 16.0276 6.38713C16.412 6.38713 16.7373 6.06186 16.7373 5.67745C16.7373 5.29304 16.4416 4.96777 16.0276 4.96777Z"
                    />
                  </svg>
                </Link>
                <a
                  href="/"
                  className="px-3 text-gray-7 hover:text-white"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path
                      d="M18.8065 1.8335H3.16399C2.42474 1.8335 1.83334 2.42489 1.83334 3.16414V18.8362C1.83334 19.5459 2.42474 20.1668 3.16399 20.1668H18.7473C19.4866 20.1668 20.078 19.5754 20.078 18.8362V3.13457C20.1371 2.42489 19.5457 1.8335 18.8065 1.8335ZM7.24464 17.4168H4.55379V8.69371H7.24464V17.4168ZM5.88443 7.48135C4.99733 7.48135 4.31721 6.77167 4.31721 5.91414C4.31721 5.05661 5.0269 4.34694 5.88443 4.34694C6.74196 4.34694 7.45163 5.05661 7.45163 5.91414C7.45163 6.77167 6.8011 7.48135 5.88443 7.48135ZM17.4463 17.4168H14.7554V13.1883C14.7554 12.183 14.7258 10.8523 13.336 10.8523C11.9167 10.8523 11.7097 11.976 11.7097 13.0996V17.4168H9.01884V8.69371H11.6506V9.90608H11.6801C12.0645 9.1964 12.9221 8.48672 14.2527 8.48672C17.0027 8.48672 17.5054 10.2609 17.5054 12.6856V17.4168H17.4463Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold">About Us</h4>
              <ul>
                <li>
                  <Link
                    href="/"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    href="/"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <Link
                    href="/"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    Testimonial
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold ">Features</h4>
              <ul>
                <li>
                  <Link
                    href="/features"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-and-conditions"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    Refund policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold">
                Our Products
              </h4>
              <ul>
                <li>
                  <a
                    href="/sale"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    For Sale
                  </a>
                </li>
                <li>
                  <a
                    href="/rent"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    For Rent
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-12 border-t border-[#8890A4] border-opacity-40 py-8 lg:mt-[60px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-2/3 lg:w-1/2">
              <div className="my-1">
                <div
                  className="-mx-3 flex items-center justify-center md:justify-start"
                >
                  <a
                    href="/privacy-policy"
                    className="px-3 text-base text-gray-7 hover:underline"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/terms-and-conditions"
                    className="px-3 text-base text-gray-7 hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/3 lg:w-1/2">
              <div className="my-1 flex justify-center md:justify-end">
                <p className="text-base text-gray-7">
                  Designed and Developed by 
                  <a
                    href="https://www.realhiveconsultants.com/"
                    rel="nofollow noopner"
                    target="_blank"
                    className="text-gray-1 hover:underline"
                  >
                    &nbsp;Realhive Consultants
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
