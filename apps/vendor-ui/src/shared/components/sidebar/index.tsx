// 'use client'
// import useSidebar from 'apps/vendor-ui/src/hooks/useSidebar'
// import useVendor from 'apps/vendor-ui/src/hooks/useVendor'

// import { usePathname } from 'next/navigation'
// import React, { useEffect } from 'react'
// import Box from '../box'
// import { Sidebar } from '../sidebar.styles'
// import Link from 'next/link'
// import Logo from 'apps/vendor-ui/src/assets/svgs/logo'

// import SidebarItem from './sidebar.item'

// import SidebarMenu from './sidebar.menu'
// import { BellPlus, BellRing, CalendarPlus, CreditCard, Headset, LayoutDashboard, ListOrdered, LogOut, Mail, PackageSearch, Settings, SquarePlus, TicketPercent} from 'lucide-react'


// function SidebarBarWrapper() {
//     const {activeSidebar, setActiveSidebar} = useSidebar()
//     const pathName = usePathname()
//     const {existingVendor} = useVendor()

//     useEffect(() => {
//         setActiveSidebar(pathName)
//     }, [pathName, setActiveSidebar])

//     const getIconColor = (route:string) => activeSidebar === route ? "#0085ff" : "#969696"

//     return(
//     <Box
//     css={{
//         height: "100vh",
//         zIndex: 202,
//         position: "sticky",
//         padding: "8px",
//         top: "0",
//         overflowY: "scroll",
//         scrollbarWidth: "none",
//     }}
//     className='sidebar-wrapper'
//     >
//     <Sidebar.Header>
//         <Box>
//             <Link href={"/"} className="flex justify-center text-center gap-2">
//             <Logo/>
//             <Box>
//                 <h3 className="text-xl font-medium text-[#ecedee]">{existingVendor?.shop?.name || "Whiskp"}</h3>
//                 <h5 className="font-medium text-xs text-[#ecedeecf] whitespace-nowrap overflow-hidden text-ellipsis max-w-[170px]">
//                     {existingVendor?.shop?.address || "Justina eze street" }
//                 </h5>
//             </Box>
//             </Link>
//         </Box>
//     </Sidebar.Header>

//     <div className="block my-3 h-full">
//         <Sidebar.Body className='body sidebar'>
//            <SidebarItem
//            title="Dashboard"
//            icon={<LayoutDashboard size={20} fill={getIconColor("/dashboard")}/>}
//            isActive={activeSidebar === "/dashboard"}
//            href="/dashboard"
//            /> 

//            <div className="mt-2 ">
//             <SidebarMenu title ="Main Menu">
//                 <SidebarItem
//                 isActive={activeSidebar === "/dashboard/orders"}
//                 title='Orders'
//                 href='/dashboard/orders'
//                 icon={
//                     <ListOrdered size={20} fill={getIconColor("/dashboard/orders")}/>
//                 }
//                 />
//                 <SidebarItem
//                 isActive={activeSidebar === "/dashboard/payments"}
//                 title='Payments'
//                 href='/dashboard/payments'
//                 icon={
//                     <CreditCard size={20} fill={getIconColor("/dashboard/payments")}/>
//                 }
//                 />  
//             </SidebarMenu>

//             <SidebarMenu title ="Products">
//             <SidebarItem
//                 isActive={activeSidebar === "/dashboard/create-product"}
//                 title='Create Product'
//                 href='/dashboard/create-product'
//                 icon={
//                     <SquarePlus size={20} fill={getIconColor("/dashboard/create-product")}/>
//                 }
//                 />
//                 <SidebarItem
//                 isActive={activeSidebar === "/dashboard/all-products"}
//                 title='All Products'
//                 href='/dashboard/all-products'
//                 icon={
//                     <PackageSearch size={20} fill={getIconColor("/dashboard/all-products")}/>
//                 }
//                 />
               
//             </SidebarMenu>
            
//             <SidebarMenu title ="Events">
//                 <SidebarItem
//                 isActive={activeSidebar === "/dashboard/create-event"}
//                 title='Create Event'
//                 href='/dashboard/create-event'
//                 icon={
//                     <CalendarPlus size={20} fill={getIconColor("/dashboard/create-event")}/>
//                 }
//                 />
//                 <SidebarItem
//                 isActive={activeSidebar === "/dashboard/all-events"}
//                 title='All Events'
//                 href='/dashboard/all-events'
//                 icon={
//                     <BellPlus size={20} fill={getIconColor("/dashboard/all-events")}/>
//                 }
//                 />  
//             </SidebarMenu>

//             <SidebarMenu title ="Controllers">
//                 <SidebarItem
//                 isActive={activeSidebar === "/dashboard/inbox"}
//                 title='Inbox'
//                 href='/dashboard/inbox'
//                 icon={
//                     <Mail size={20} fill={getIconColor("/dashboard/inbox")}/>
//                 }
//                 />
//                 <SidebarItem
//                 isActive={activeSidebar === "/dashboard/settings"}
//                 title='Settings'
//                 href='/dashboard/settings'
//                 icon={
//                     <Settings size={20} fill={getIconColor("/dashboard/settings")}/>
//                 }
//                 />  
//                 <SidebarItem
//                 isActive={activeSidebar === "/dashboard/notifications"}
//                 title='Notifications'
//                 href='/dashboard/notifications'
//                 icon={
//                     <BellRing size={20} fill={getIconColor("/dashboard/notifications")}/>
//                 }
//                 />  
//             </SidebarMenu>

//             <SidebarMenu title ="Extras">
//                 <SidebarItem
//                 isActive={activeSidebar === "/dashboard/discount-codes"}
//                 title='Discount Codes'
//                 href='/dashboard/discount-codes'
//                 icon={
//                     <TicketPercent size={20} fill={getIconColor("/dashboard/discount-codes")}/>
//                 }
//                 />
//                 <SidebarItem
//                 isActive={activeSidebar === "/logout"}
//                 title='Logout'
//                 href='/logout'
//                 icon={
//                     <LogOut size={20} fill={getIconColor("/logout")}/>
//                 }
//                 />  
             
//             </SidebarMenu>

//            </div>
//         </Sidebar.Body>
//     </div>
//     </Box>
//   )
// }

// export default SidebarBarWrapper


'use client'
import useSidebar from '../../../hooks/useSidebar'
import useVendor from '../../../hooks/useVendor'

import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import Box from '../box'
import { Sidebar } from '../sidebar.styles'
import Link from 'next/link'
import Logo from '../../../../src/assets/svgs/logo'

import SidebarItem from './sidebar.item'

import SidebarMenu from './sidebar.menu'
import { BellPlus, BellRing, CalendarPlus, CreditCard, LayoutDashboard, ListOrdered, LogOut, Mail, Menu, PackageSearch, Settings, SquarePlus, TicketPercent, X} from 'lucide-react'


type SidebarBarWrapperProps = {
    mobileOpen: boolean;
    setMobileOpen: (value: boolean) => void;
  }

function SidebarBarWrapper ({ mobileOpen, setMobileOpen }: SidebarBarWrapperProps) {
    const {activeSidebar, setActiveSidebar} = useSidebar()
    const pathName = usePathname()
    const {existingVendor} = useVendor()


    useEffect(() => {
        setActiveSidebar(pathName)
        setMobileOpen(false)
    }, [pathName, setActiveSidebar])

    const getIconColor = (route:string) => activeSidebar === route ? "#0085ff" : "#969696"

    return(
        <>
        {/* Mobile Hamburger toggle button */}
        <button
          aria-label="Toggle menu"
          className="xl:hidden fixed top-4 left-4 z-[300] p-2 bg-gray-800 rounded-md text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
  
        {/* Overlay behind sidebar on mobile */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-[201]"
            onClick={() => setMobileOpen(false)}
          />
        )}
        
        <Box
      className={`
        fixed top-0 left-0 h-screen w-[250px] bg-[#1a1a1a] 
        transition-transform duration-300 ease-in-out z-[202]
        xl:sticky xl:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      style={{
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        padding: '8px',
      }}
>

    <Sidebar.Header>
        <Box>
            <Link href={"/"} className="flex justify-center text-center gap-2">
            <Logo/>
            <Box>
                <h3 className="text-xl font-medium text-[#ecedee]">{existingVendor?.shop?.name || "Whiskp"}</h3>
                <h5 className="font-medium text-xs text-[#ecedeecf] whitespace-nowrap overflow-hidden text-ellipsis max-w-[170px]">
                    {existingVendor?.shop?.address || "Justina eze street" }
                </h5>
            </Box>
            </Link>
        </Box>
    </Sidebar.Header>

    <div className="block my-3 h-full">
        <Sidebar.Body className='body sidebar'>
           <SidebarItem
           title="Dashboard"
           icon={<LayoutDashboard size={20} fill={getIconColor("/dashboard")}/>}
           isActive={activeSidebar === "/dashboard"}
           href="/dashboard"
           /> 

           <div className="mt-2 ">
            <SidebarMenu title ="Main Menu">
                <SidebarItem
                isActive={activeSidebar === "/dashboard/orders"}
                title='Orders'
                href='/dashboard/orders'
                icon={
                    <ListOrdered size={20} fill={getIconColor("/dashboard/orders")}/>
                }
                />
                <SidebarItem
                isActive={activeSidebar === "/dashboard/payments"}
                title='Payments'
                href='/dashboard/payments'
                icon={
                    <CreditCard size={20} fill={getIconColor("/dashboard/payments")}/>
                }
                />  
            </SidebarMenu>

            <SidebarMenu title ="Products">
            <SidebarItem
                isActive={activeSidebar === "/dashboard/create-product"}
                title='Create Product'
                href='/dashboard/create-product'
                icon={
                    <SquarePlus size={20} fill={getIconColor("/dashboard/create-product")}/>
                }
                />
                <SidebarItem
                isActive={activeSidebar === "/dashboard/all-products"}
                title='All Products'
                href='/dashboard/all-products'
                icon={
                    <PackageSearch size={20} fill={getIconColor("/dashboard/all-products")}/>
                }
                />
               
            </SidebarMenu>
            
            <SidebarMenu title ="Events">
                <SidebarItem
                isActive={activeSidebar === "/dashboard/create-event"}
                title='Create Event'
                href='/dashboard/create-event'
                icon={
                    <CalendarPlus size={20} fill={getIconColor("/dashboard/create-event")}/>
                }
                />
                <SidebarItem
                isActive={activeSidebar === "/dashboard/all-events"}
                title='All Events'
                href='/dashboard/all-events'
                icon={
                    <BellPlus size={20} fill={getIconColor("/dashboard/all-events")}/>
                }
                />  
            </SidebarMenu>

            <SidebarMenu title ="Controllers">
                <SidebarItem
                isActive={activeSidebar === "/dashboard/inbox"}
                title='Inbox'
                href='/dashboard/inbox'
                icon={
                    <Mail size={20} fill={getIconColor("/dashboard/inbox")}/>
                }
                />
                <SidebarItem
                isActive={activeSidebar === "/dashboard/settings"}
                title='Settings'
                href='/dashboard/settings'
                icon={
                    <Settings size={20} fill={getIconColor("/dashboard/settings")}/>
                }
                />  
                <SidebarItem
                isActive={activeSidebar === "/dashboard/notifications"}
                title='Notifications'
                href='/dashboard/notifications'
                icon={
                    <BellRing size={20} fill={getIconColor("/dashboard/notifications")}/>
                }
                />  
            </SidebarMenu>

            <SidebarMenu title ="Extras">
                <SidebarItem
                isActive={activeSidebar === "/dashboard/discount-codes"}
                title='Discount Codes'
                href='/dashboard/discount-codes'
                icon={
                    <TicketPercent size={20} fill={getIconColor("/dashboard/discount-codes")}/>
                }
                />
                <SidebarItem
                isActive={activeSidebar === "/logout"}
                title='Logout'
                href='/logout'
                icon={
                    <LogOut size={20} fill={getIconColor("/logout")}/>
                }
                />  
             
            </SidebarMenu>

           </div>
        </Sidebar.Body>
    </div>
    </Box>
    </>
  )
}

export default SidebarBarWrapper
