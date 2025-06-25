"use client"
import {Sidebar, Menu, MenuItem, SubMenu, menuClasses } from 'react-pro-sidebar';
import moment from 'moment';
import { useMainProvider } from '@/providers/MainProvider';
  import {
    Newspaper,
    Users,
    PlusCircle,
    User2Icon,
    Notebook,
    CircleChevronLeft,
    CircleChevronRight,
    LogOut,
    ShieldPlus,
    BadgeDollarSign,
    CircleDollarSign,
    Blinds,
    LayoutList,
    BarChart,
    Badge,
    Calendar,
    Book,
    Users2,
    MapPlus,
    Diamond,
    ShoppingCart,
    Cog,
    House,
    TableProperties,
    Car,
    LayoutDashboard
  } from 'lucide-react';

import Link from 'next/link';
import React, { useState } from 'react';


//                   <CommandItem>
//                     <LayoutList className='h-4 w-4' />
//                     Tasks and Reminders
//                     <TaskList />
//                   </CommandItem>

//             <CommandList>
//               <CommandGroup heading='Help'>
//                 {/* <CommandItem>
//                   <Cog className='mr-2 h-4 w-4' />
//                   <Link href='/my-account'>Settings</Link>
//                 </CommandItem> */}

//                   (currentUser?.isPremium || currentUser?.isEnterprise) && !membershipIsValid &&
//                   <CommandItem>
//                     <ShieldPlus className='mr-2 h-4 w-4' />
//                     <Link href='/features'>Update Membership</Link>
//                   </CommandItem>
//                 }
//                 {
//                   (currentUser?.isFreeTrial || !currentUser?.isSubscribed) && !orgMode &&
//                   <CommandItem>
//                     <ShieldPlus className='mr-2 h-4 w-4' />
//                     <Link href='/features#pricing'>Upgrade to Premium</Link>
//                   </CommandItem>
//                 }
//                 <CommandItem>
//                   <User2Icon className='mr-2 h-4 w-4' />
//                   <Link href='/my-account'>My Profile</Link>
//                 </CommandItem>
//                 {
//                   !orgMode &&
//                   <CommandItem>
//                     <CircleDollarSign className='mr-2 h-4 w-4' />
//                     <Link href='/billing'>My Billing</Link>
//                   </CommandItem>
//                 }
//                 <CommandItem>
//                   <LogOut className='mr-2 h-4 w-4' />
//                   <button onClick={handleLogout}>Logout</button>
//                 </CommandItem>
//               </CommandGroup>
//               <CommandSeparator />
//             </CommandList>

//           </Command>
//         </div>
//       </div>
//     );
// };

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#FFFFFF',
      color: '#0B2B5F',
    },
    menu: {
      menuContent: '##0B2B5F',
      icon: '#0B2B5F',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
};

const MainSideBar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(true);
  const [broken, setBroken] = React.useState(false);
  const { orgMode, currentUser, sellerMode, setUser, setAdminMode, setCurrentUser, setOrgMode,setSellerMode,setCustomProperties, setTempUser, setCurrentClient } = useMainProvider();

  const handleLogout = async () => {
    localStorage.clear();
    setUser(null); setOrgMode(false); setSellerMode(false); setAdminMode(false);
    setCurrentUser(null); setCustomProperties([]);
    setCurrentClient(null); setTempUser(null);
    setSellerMode(false);
    setOrgMode(false);
    router.push("/")
  }
  let days = 365;
  if (currentUser?.isEnterprise) {
    days = 365;
  } else if (currentUser?.isPremium) {
    days = 365;
  } else if(currentUser?.isFreeTrial) {
    days = 7;
  }
  const futureDate = moment(currentUser?.subscriptionDate).add(days, "days").format("YYYY-MM-DD");
  const membershipIsValid = moment(futureDate).isAfter(moment().format("YYYY-MM-DD"));

  const menuItemStyles = {
    root: {
      fontSize: '15px',
      fontWeight: 400,
    },
    icon: {
      color: themes['light'].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes['light'].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? "#fbfcfd"
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes['light'].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: "#FFFFFF",
        color: themes['light'].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div className="text-black">
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        backgroundColor="#fff"
        rootStyles={{
          color: themes["light"].sidebar.color,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ flex: 1, marginBottom: '32px' }}>
            <div style={{ padding: '0 24px', marginBottom: '8px' }}>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
              <SubMenu
                label="Housing Module"
                icon={<House />}
              >
                <MenuItem component={<Link href="/dashboard" />} icon={<LayoutDashboard />} >Dashboard</MenuItem>
                <SubMenu label="Clients & Staff" icon={<Users />}>
                   {
                    (orgMode || sellerMode) &&  
                      <>
                      <MenuItem component={<Link href="/clients" />}>Client List</MenuItem>
                      </>
                   }
                  <MenuItem> Housing Plan</MenuItem>
                  <MenuItem> Eligibility Alerts</MenuItem>
                  <MenuItem> Assigned Staff</MenuItem>
                  <MenuItem> Client Documents</MenuItem>
                  <MenuItem> Staff Directory</MenuItem>
                  <MenuItem> Staff Policies</MenuItem>
                  <MenuItem component={<Link href="/members" />}>{orgMode? `${currentUser?.orgName} 's Members` : "Staff Members"}</MenuItem>
                </SubMenu>
                <SubMenu label="Reports" icon={<TableProperties />}>
                  <MenuItem component={<Link href="/add-visit" />} icon={<PlusCircle />}>
                    Add Visit
                  </MenuItem>
                  <MenuItem component={<Link href="/reports" />} icon={<TableProperties />}>
                    View Reports
                  </MenuItem>
                </SubMenu>
                {orgMode && (
                  <MenuItem component={<Link href="/my-clients" />} icon={<Users />}> My Clients</MenuItem>
                )}
              </SubMenu>
              
              <SubMenu label="Transportation Module" icon={<Car />}>
                <MenuItem icon={<LayoutDashboard />}>Transport Dashboard</MenuItem>
                <SubMenu label="Trips Scheduling" icon={<Calendar />}>
                  <MenuItem> List</MenuItem>
                  <MenuItem> Details</MenuItem>
                </SubMenu>
                
              </SubMenu>
              <SubMenu label="Theme" icon={<Users2 />}>
                <MenuItem> Dark</MenuItem>
                <MenuItem> Light</MenuItem>
              </SubMenu>
              <SubMenu label="Components" icon={<Diamond />}>
                <MenuItem> Grid</MenuItem>
                <MenuItem> Layout</MenuItem>
                <SubMenu label="Forms">
                  <MenuItem> Input</MenuItem>
                  <MenuItem> Select</MenuItem>
                  <SubMenu label="More">
                    <MenuItem> CheckBox</MenuItem>
                    <MenuItem> Radio</MenuItem>
                  </SubMenu>
                </SubMenu>
              </SubMenu>
              <SubMenu label="E-commerce" icon={<ShoppingCart />}>
                <MenuItem> Product</MenuItem>
                <MenuItem> Orders</MenuItem>
                <MenuItem> Credit card</MenuItem>
              </SubMenu>
            </Menu>
            <Menu>
               {
                  (!orgMode && sellerMode) && 
                  <>
                    <MenuItem component={<Link href='/owner-billings'/>} icon={<BadgeDollarSign />}>
                      Billings
                    </MenuItem>
                  </>
                }
            </Menu>
          
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem icon={<Calendar />} suffix={<Badge variant="success">New</Badge>}>
                Calendar
              </MenuItem>
                {
                  (!orgMode && !sellerMode)&&
                  <>
                    <MenuItem component={<Link href='/my-properties' />} icon={<TableProperties />}>
                      My Properties
                    </MenuItem>
                    <MenuItem component={<Link href='/services' />} icon={<Notebook />}>
                      Services
                    </MenuItem>
                  </>
                }
            </Menu>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
export default MainSideBar;